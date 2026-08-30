import Ajv2020 from "ajv/dist/2020.js";
import { createHash } from "node:crypto";
import { readdir, readFile, realpath } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const readJson = async (relativePath) =>
  JSON.parse(await readFile(path.join(root, relativePath), "utf8"));

const failures = [];
const fail = (message) => failures.push(message);
const semver = /^(0|[1-9][0-9]*)[.](0|[1-9][0-9]*)[.](0|[1-9][0-9]*)(?:-(?:0|[1-9][0-9]*|[0-9]*[A-Za-z-][0-9A-Za-z-]*)(?:[.](?:0|[1-9][0-9]*|[0-9]*[A-Za-z-][0-9A-Za-z-]*))*)?(?:[+][0-9A-Za-z-]+(?:[.][0-9A-Za-z-]+)*)?$/;
const identifier = /^asr:[a-z][a-z0-9-]*(?:[.][a-z][a-z0-9-]*)+$/;
const fullDate = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
const isFullDate = (value) => {
  const match = fullDate.exec(value);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return year >= 1 && month >= 1 && month <= 12 && day >= 1 && day <= daysInMonth[month - 1];
};
const isHttpsUrl = (value) => {
  if (/\s/.test(value)) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" && parsed.hostname.length > 0;
  } catch {
    return false;
  }
};

const metadata = await readJson("registry/registry-metadata.json");
const packageJson = await readJson("package.json");
const ledger = await readJson("evidence/ledger.json");
const readme = await readFile(path.join(root, "README.md"), "utf8");
const artifacts = metadata && typeof metadata.artifacts === "object" && !Array.isArray(metadata.artifacts)
  ? metadata.artifacts
  : {};
const registryArtifact = artifacts.registry && typeof artifacts.registry === "object" ? artifacts.registry : {};
const schemaArtifact = artifacts.schema && typeof artifacts.schema === "object" ? artifacts.schema : {};
const assessmentsArtifact = artifacts.assessments && typeof artifacts.assessments === "object" ? artifacts.assessments : null;
const derivedAnalysesArtifact = artifacts.derived_analyses && typeof artifacts.derived_analyses === "object"
  ? artifacts.derived_analyses
  : null;
const toolingArtifact = artifacts.tooling && typeof artifacts.tooling === "object" ? artifacts.tooling : {};
const entrySchemaPath = typeof schemaArtifact.entry_schema === "string"
  ? schemaArtifact.entry_schema
  : "registry/schema/entry.schema.json";
const evidenceLedgerSchemaPath = typeof schemaArtifact.evidence_ledger_schema === "string"
  ? schemaArtifact.evidence_ledger_schema
  : "registry/schema/evidence-ledger.schema.json";
if (entrySchemaPath === "registry/schema/entry.schema.json" && typeof schemaArtifact.entry_schema !== "string") {
  fail("Registry metadata must declare a readable entry schema path.");
}
let entrySchema;
try {
  entrySchema = await readJson(entrySchemaPath);
} catch {
  fail(`Registry metadata entry schema is not readable: ${entrySchemaPath}`);
  entrySchema = await readJson("registry/schema/entry.schema.json");
}
if (typeof schemaArtifact.evidence_ledger_schema !== "string") {
  fail("Registry metadata must declare a readable evidence ledger schema path.");
}
let evidenceLedgerSchema;
try {
  evidenceLedgerSchema = await readJson(evidenceLedgerSchemaPath);
} catch {
  fail(`Registry metadata evidence ledger schema is not readable: ${evidenceLedgerSchemaPath}`);
  evidenceLedgerSchema = await readJson("registry/schema/evidence-ledger.schema.json");
}
const filterResponseSchema = await readJson("registry/schema/filter-response.schema.json");
const assessmentSchema = await readJson("registry/schema/acceptance-assessment.schema.json");
const assessmentSetSchema = await readJson("registry/schema/assessment-set.schema.json");
const assessmentFormatVersions = assessmentSchema.properties?.assessment_version?.enum ?? [];
const assessmentSetFormatVersions = assessmentSetSchema.properties?.assessment_set_version?.enum ?? [];
if (assessmentsArtifact
  && (!assessmentFormatVersions.includes(assessmentsArtifact.format_version)
    || !assessmentSetFormatVersions.includes(assessmentsArtifact.format_version))) {
  fail("Assessment metadata format version differs from the assessment schemas.");
}

for (const [name, artifact] of Object.entries(artifacts)) {
  if (artifact.version !== null && !semver.test(artifact.version)) {
    fail(`metadata artifact ${name} has invalid SemVer ${artifact.version}`);
  }
}
if (!semver.test(packageJson.version)) fail(`package.json has invalid SemVer ${packageJson.version}`);
if (packageJson.version !== toolingArtifact.version) fail("package.json and tooling metadata versions differ.");
if (!Array.isArray(registryArtifact.includes) || !registryArtifact.includes.includes("evidence/ledger.json")) {
  fail("Registry metadata must declare the evidence ledger as registry data.");
}
if (!assessmentsArtifact
  || !semver.test(assessmentsArtifact.version)
  || !semver.test(assessmentsArtifact.format_version)
  || typeof assessmentsArtifact.schema !== "string"
  || typeof assessmentsArtifact.current_snapshot !== "string") {
  fail("Registry metadata must declare a readable assessments artifact.");
}
if (!derivedAnalysesArtifact
  || !semver.test(derivedAnalysesArtifact.version)
  || !semver.test(derivedAnalysesArtifact.format_version)
  || typeof derivedAnalysesArtifact.schema !== "string"
  || typeof derivedAnalysesArtifact.index !== "string") {
  fail("Registry metadata must declare a readable derived-analyses artifact.");
}
if (!semver.test(ledger.ledger_version)) fail(`evidence ledger has invalid SemVer ${ledger.ledger_version}`);
if (ledger.ledger_version !== registryArtifact.version) {
  fail("Evidence ledger and registry metadata versions differ.");
}
const readmeRegistryVersion = readme.match(/^Registry release: \*\*([^*]+)\*\*\\\r?$/m)?.[1];
if (!readmeRegistryVersion) {
  fail("README must declare the registry release in its Status section.");
} else if (readmeRegistryVersion !== registryArtifact.version) {
  fail(`README registry release ${readmeRegistryVersion} differs from registry metadata ${registryArtifact.version}.`);
}

const ajv = new Ajv2020({ allErrors: true, strict: true });
ajv.addFormat("date", { type: "string", validate: isFullDate });
ajv.addFormat("https-url", { type: "string", validate: isHttpsUrl });
ajv.addSchema(entrySchema);
ajv.addSchema(assessmentSchema);
const validateEvidenceLedger = ajv.compile(evidenceLedgerSchema);
const validateFilterResponse = ajv.compile(filterResponseSchema);
const validateAssessmentSet = ajv.compile(assessmentSetSchema);

if (!validateEvidenceLedger(ledger)) {
  for (const error of validateEvidenceLedger.errors ?? []) {
    fail(`evidence/ledger.json: schema ${error.instancePath || "/"} ${error.message}`);
  }
}
let derivedAnalysisSchema;
let derivedAnalysisRegistry;
try {
  derivedAnalysisSchema = await readJson(derivedAnalysesArtifact?.schema ?? "registry/schema/derived-analysis-registry.schema.json");
  derivedAnalysisRegistry = await readJson(derivedAnalysesArtifact?.index ?? "evidence/derived-analyses.json");
} catch {
  fail("Derived-analysis schema or index is not readable.");
  derivedAnalysisSchema = await readJson("registry/schema/derived-analysis-registry.schema.json");
  derivedAnalysisRegistry = { schema_version: "0.1.0", registry_version: "0.1.0", artifacts: [] };
}
const validateDerivedAnalysisRegistry = ajv.compile(derivedAnalysisSchema);
if (!validateDerivedAnalysisRegistry(derivedAnalysisRegistry)) {
  for (const error of validateDerivedAnalysisRegistry.errors ?? []) {
    fail(`evidence/derived-analyses.json: schema ${error.instancePath || "/"} ${error.message}`);
  }
}
if (derivedAnalysesArtifact && derivedAnalysisRegistry.schema_version !== derivedAnalysesArtifact.format_version) {
  fail("Derived-analysis metadata format version differs from its index schema version.");
}
if (derivedAnalysesArtifact && derivedAnalysisRegistry.registry_version !== derivedAnalysesArtifact.version) {
  fail("Derived-analysis registry version differs from metadata.");
}

const sources = Array.isArray(ledger.sources) ? ledger.sources : [];
if (sources.length === 0) {
  fail("Evidence ledger has no sources.");
}
const sourceIds = new Set();
for (const source of sources) {
  for (const field of ["id", "publisher", "title", "url", "accessed_on", "location", "direct_observation", "interpretation", "rights_note"]) {
    if (!source[field]) fail(`evidence source ${source.id ?? "<missing>"}: missing ${field}`);
  }
  if (sourceIds.has(source.id)) fail(`evidence ledger has duplicate source ID ${source.id}`);
  sourceIds.add(source.id);
}

const derivedArtifactsById = new Map();
const artifactKey = ({ artifact_id, artifact_version }) => `${artifact_id}@${artifact_version}`;
const artifactEntryKey = (artifact) => artifactKey({ artifact_id: artifact.id, artifact_version: artifact.version });
for (const artifact of derivedAnalysisRegistry.artifacts ?? []) {
  const key = artifactEntryKey(artifact);
  if (derivedArtifactsById.has(key)) {
    fail(`derived-analysis registry has duplicate artifact version ${key}`);
  }
  derivedArtifactsById.set(key, artifact);
  for (const sourceId of artifact.input_evidence_ids ?? []) {
    if (!sourceIds.has(sourceId)) fail(`derived analysis ${artifact.id} references unknown evidence source ${sourceId}`);
  }
  const resolvedPath = path.resolve(root, artifact.path ?? "");
  const allowedDocsRoot = `${path.resolve(root, "docs")}${path.sep}`;
  const allowedReportsRoot = `${path.resolve(root, "evidence", "reports")}${path.sep}`;
  if (!resolvedPath.startsWith(allowedDocsRoot) && !resolvedPath.startsWith(allowedReportsRoot)) {
    fail(`derived analysis ${artifact.id} has an unsafe artifact path`);
  } else {
    try {
      const canonicalPath = await realpath(resolvedPath);
      if (!canonicalPath.startsWith(allowedDocsRoot) && !canonicalPath.startsWith(allowedReportsRoot)) {
        fail(`derived analysis ${artifact.id} resolves outside allowed artifact roots`);
      }
      const content = await readFile(canonicalPath);
      const digest = createHash("sha256").update(content).digest("hex");
      if (digest !== artifact.content_sha256) {
        fail(`derived analysis ${artifact.id} content digest differs from its registered version`);
      }
    } catch {
      fail(`derived analysis ${artifact.id} path is not readable: ${artifact.path}`);
    }
  }
}

const pathsByArtifactId = new Map();
for (const artifact of derivedAnalysisRegistry.artifacts ?? []) {
  const versions = pathsByArtifactId.get(artifact.id) ?? new Map();
  if (versions.has(artifact.path)) {
    fail(`derived analysis ${artifact.id} versions must use distinct immutable paths`);
  }
  versions.set(artifact.path, artifact.version);
  pathsByArtifactId.set(artifact.id, versions);
  for (const dependency of artifact.input_artifact_refs ?? []) {
    if (!derivedArtifactsById.has(artifactKey(dependency))) {
      fail(`derived analysis ${artifactEntryKey(artifact)} references unknown derived input ${artifactKey(dependency)}`);
    }
  }
}

const visitState = new Map();
const visitArtifact = (key) => {
  if (visitState.get(key) === "active") {
    fail(`derived-analysis dependency cycle includes ${key}`);
    return;
  }
  if (visitState.get(key) === "done") return;
  visitState.set(key, "active");
  const artifact = derivedArtifactsById.get(key);
  for (const dependency of artifact?.input_artifact_refs ?? []) visitArtifact(artifactKey(dependency));
  visitState.set(key, "done");
};
for (const key of derivedArtifactsById.keys()) visitArtifact(key);

const seenIds = new Set();
const recordsById = new Map();
const recordDir = path.join(root, "registry", "symbols");
const recordFiles = (await readdir(recordDir)).filter((file) => file.endsWith(".json"));

for (const file of recordFiles) {
  const relativePath = path.join("registry", "symbols", file);
  const record = await readJson(relativePath);

  if (!validateFilterResponse(record)) {
    for (const error of validateFilterResponse.errors ?? []) {
      fail(`${relativePath}: schema ${error.instancePath || "/"} ${error.message}`);
    }
  }
  if (record.schema_version !== schemaArtifact.version) fail(`${relativePath}: schema version differs from schema metadata`);
  if (!identifier.test(record.id)) fail(`${relativePath}: invalid identifier ${record.id}`);
  if (seenIds.has(record.id)) fail(`${relativePath}: duplicate identifier ${record.id}`);
  seenIds.add(record.id);
  recordsById.set(record.id, record);

  for (const evidence of record.evidence ?? []) {
    if (!sourceIds.has(evidence.source_id)) fail(`${relativePath}: unknown evidence source ${evidence.source_id}`);
  }
}

if (recordFiles.length === 0) fail("No symbol records found.");

const checkEvidenceIds = (relativePath, label, evidenceIds = []) => {
  for (const sourceId of evidenceIds) {
    if (!sourceIds.has(sourceId)) fail(`${relativePath}: ${label} references unknown evidence source ${sourceId}`);
  }
};
const checkArtifactRefs = (relativePath, label, artifactRefs = [], evidenceIds = []) => {
  for (const reference of artifactRefs) {
    const key = artifactKey(reference);
    const artifact = derivedArtifactsById.get(key);
    if (!artifact) {
      fail(`${relativePath}: ${label} references unknown derived artifact ${key}`);
      continue;
    }
    for (const sourceId of reference.input_evidence_ids_used ?? []) {
      if (!artifact.input_evidence_ids.includes(sourceId)) {
        fail(`${relativePath}: ${label} uses ${sourceId}, which is not an input of ${key}`);
      }
      if (!evidenceIds.includes(sourceId)) {
        fail(`${relativePath}: ${label} derived-artifact input ${sourceId} is absent from evidence_ids`);
      }
    }
  }
};

const hasOpen = (notes = []) => notes.some((note) => note.status === "open");
const hasOpenMaterialCounterevidence = (notes = []) => notes.some((note) => note.status === "open" && note.material === true);
const hasOpenBlocker = (blockers = []) => blockers.some((blocker) => blocker.status === "open");
const candidateEligible = (assessment) => {
  const dimensions = assessment.dimensions;
  return assessment.total_score >= 13
    && dimensions.semantic_stability.score >= 3
    && dimensions.independent_usage.score >= 2
    && dimensions.text_and_accessibility.score >= 2
    && dimensions.visual_convergence.score >= 2
    && dimensions.overlap_audit.score >= 2
    && dimensions.legal_provenance.score >= 2
    && !hasOpen(assessment.material_open_questions)
    && !hasOpenMaterialCounterevidence(assessment.counterevidence)
    && !hasOpenBlocker(assessment.hard_blockers)
    && assessment.review.independent_agent_review === "passed";
};
const acceptedEligible = (assessment) => {
  const dimensions = assessment.dimensions;
  return assessment.total_score >= 18
    && dimensions.semantic_stability.score === 4
    && dimensions.independent_usage.score === 4
    && dimensions.text_and_accessibility.score === 3
    && dimensions.visual_convergence.score >= 2
    && dimensions.overlap_audit.score >= 2
    && dimensions.legal_provenance.score === 3
    && !hasOpen(assessment.material_open_questions)
    && !hasOpenMaterialCounterevidence(assessment.counterevidence)
    && !hasOpenBlocker(assessment.hard_blockers)
    && assessment.review.independent_agent_review === "passed"
    && assessment.review.public_review_days >= 14
    && typeof assessment.review.public_review_reference === "string"
    && assessment.review.public_review_reference.length > 0
    && assessment.human_review.required === true
    && assessment.human_review.authorization_status === "received"
    && typeof assessment.human_review.authorization_reference === "string"
    && assessment.human_review.authorization_reference.length > 0;
};

const assessmentDir = path.join(root, "registry", "assessments");
let assessmentFiles = [];
try {
  assessmentFiles = (await readdir(assessmentDir)).filter((file) => file.endsWith(".json"));
} catch {
  fail("Acceptance assessment directory is not readable.");
}
const assessmentsByRecord = new Map();

for (const file of assessmentFiles) {
  const relativePath = path.join("registry", "assessments", file);
  const assessmentSet = await readJson(relativePath);

  if (!validateAssessmentSet(assessmentSet)) {
    for (const error of validateAssessmentSet.errors ?? []) {
      fail(`${relativePath}: schema ${error.instancePath || "/"} ${error.message}`);
    }
    continue;
  }
  if (assessmentsArtifact
    && path.normalize(relativePath) === path.normalize(assessmentsArtifact.current_snapshot)
    && assessmentSet.assessment_set_version !== assessmentsArtifact.format_version) {
    fail(`${relativePath}: current assessment-set format version differs from assessment metadata`);
  }

  for (const assessment of assessmentSet.assessments) {
    const record = recordsById.get(assessment.record_id);
    if (!record) {
      fail(`${relativePath}: assessment references unknown record ${assessment.record_id}`);
      continue;
    }
    if (!assessmentFormatVersions.includes(assessment.assessment_version)) {
      fail(`${relativePath}: ${assessment.record_id} uses an unsupported assessment format version`);
    }
    if (assessment.assessment_version !== assessmentSet.assessment_set_version) {
      fail(`${relativePath}: ${assessment.record_id} assessment version differs from its set version`);
    }
    const nodesWithArtifactRefs = [
      ...Object.values(assessment.dimensions),
      ...assessment.counterevidence,
      ...assessment.material_open_questions,
      ...assessment.hard_blockers,
    ];
    if (assessment.assessment_version === "0.1.0"
      && nodesWithArtifactRefs.some((node) => Object.hasOwn(node, "artifact_refs"))) {
      fail(`${relativePath}: ${assessment.record_id} format 0.1.0 cannot contain artifact_refs`);
    }
    const snapshots = assessmentsByRecord.get(assessment.record_id) ?? [];
    snapshots.push({ relativePath, assessment, assessmentSetVersion: assessmentSet.assessment_set_version });
    assessmentsByRecord.set(assessment.record_id, snapshots);

    const dimensions = Object.values(assessment.dimensions);
    const calculatedTotal = dimensions.reduce((total, dimension) => total + dimension.score, 0);
    if (assessment.total_score !== calculatedTotal) {
      fail(`${relativePath}: ${assessment.record_id} total_score ${assessment.total_score} does not equal calculated score ${calculatedTotal}`);
    }

    for (const [name, dimension] of Object.entries(assessment.dimensions)) {
      checkEvidenceIds(relativePath, `${assessment.record_id} ${name}`, dimension.evidence_ids);
      checkArtifactRefs(relativePath, `${assessment.record_id} ${name}`, dimension.artifact_refs, dimension.evidence_ids);
      if (dimension.score > 0 && dimension.evidence_ids.length === 0) {
        fail(`${relativePath}: ${assessment.record_id} ${name} has a positive score without evidence IDs`);
      }
    }
    for (const note of [...assessment.counterevidence, ...assessment.material_open_questions]) {
      checkEvidenceIds(relativePath, `${assessment.record_id} note`, note.evidence_ids);
      checkArtifactRefs(relativePath, `${assessment.record_id} note`, note.artifact_refs, note.evidence_ids);
    }
    for (const blocker of assessment.hard_blockers) {
      checkEvidenceIds(relativePath, `${assessment.record_id} hard blocker`, blocker.evidence_ids);
      checkArtifactRefs(relativePath, `${assessment.record_id} hard blocker`, blocker.artifact_refs, blocker.evidence_ids);
    }

    const recommendsPromotion = ["registry-candidate", "registry-accepted"].includes(assessment.result.recommended_status);
    if (recommendsPromotion && !assessment.result.eligible) {
      fail(`${relativePath}: ${assessment.record_id} recommends promotion but result.eligible is false`);
    }
    if (assessment.result.eligible && !recommendsPromotion) {
      fail(`${relativePath}: ${assessment.record_id} is eligible but does not recommend a promotion status`);
    }
    if (assessment.result.recommended_status === "registry-candidate" && !candidateEligible(assessment)) {
      fail(`${relativePath}: ${assessment.record_id} does not meet all registry-candidate requirements`);
    }
    if (assessment.result.recommended_status === "registry-accepted" && !acceptedEligible(assessment)) {
      fail(`${relativePath}: ${assessment.record_id} does not meet all registry-accepted requirements`);
    }
  }
}

for (const [recordId, record] of recordsById) {
  const snapshots = assessmentsByRecord.get(recordId) ?? [];
  if (snapshots.length === 0) {
    fail(`No acceptance assessment found for ${recordId}`);
    continue;
  }

  const datedSnapshots = snapshots.map((snapshot) => ({
    ...snapshot,
    timestamp: Date.parse(snapshot.assessment.assessed_at)
  }));
  for (const snapshot of datedSnapshots) {
    if (Number.isNaN(snapshot.timestamp)) {
      fail(`${snapshot.relativePath}: ${recordId} has an invalid assessed_at timestamp`);
    }
  }
  const mostRecentTimestamp = Math.max(...datedSnapshots.map((snapshot) => snapshot.timestamp));
  const currentSnapshots = datedSnapshots.filter((snapshot) => snapshot.timestamp === mostRecentTimestamp);
  if (currentSnapshots.length !== 1) {
    fail(`${recordId}: current assessment is ambiguous; use distinct assessed_at timestamps`);
    continue;
  }

  const currentAssessment = currentSnapshots[0].assessment;
  const candidateResult = ["registry-candidate", "registry-accepted"].includes(currentAssessment.result.recommended_status)
    && currentAssessment.result.eligible
    && candidateEligible(currentAssessment);
  const acceptedResult = currentAssessment.result.recommended_status === "registry-accepted"
    && currentAssessment.result.eligible
    && acceptedEligible(currentAssessment);

  if (record.status === "registry-candidate" && !candidateResult) {
    fail(`${recordId}: registry-candidate requires a current eligible candidate-or-accepted assessment`);
  }
  if (record.status === "registry-accepted" && !acceptedResult) {
    fail(`${recordId}: registry-accepted requires a current eligible accepted assessment with documented human authorization`);
  }
}

if (assessmentFiles.length === 0) fail("No acceptance assessment files found.");
if (assessmentsArtifact && !assessmentFiles.includes(path.basename(assessmentsArtifact.current_snapshot))) {
  fail("Assessment metadata current snapshot is not readable from the assessment directory.");
} else if (assessmentsArtifact) {
  const declaredCurrentPath = path.normalize(assessmentsArtifact.current_snapshot);
  for (const [recordId, snapshots] of assessmentsByRecord) {
    const mostRecentTimestamp = Math.max(...snapshots.map(({ assessment }) => Date.parse(assessment.assessed_at)));
    const current = snapshots.find(({ assessment }) => Date.parse(assessment.assessed_at) === mostRecentTimestamp);
    if (current && path.normalize(current.relativePath) !== declaredCurrentPath) {
      fail(`${recordId}: metadata current snapshot does not contain the most recent assessment`);
    }
  }
}

if (failures.length) {
  console.error("Registry validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Validated ${recordFiles.length} registry record(s), ${assessmentFiles.length} assessment set(s), ${sourceIds.size} evidence source(s), registry ${registryArtifact.version}, assessments ${assessmentsArtifact.version}, schema ${schemaArtifact.version}, tooling ${toolingArtifact.version}.`);
}
