import Ajv2020 from "ajv/dist/2020.js";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const readJson = async (relativePath) =>
  JSON.parse(await readFile(path.join(root, relativePath), "utf8"));

const failures = [];
const fail = (message) => failures.push(message);
const semver = /^(0|[1-9][0-9]*)[.](0|[1-9][0-9]*)[.](0|[1-9][0-9]*)(?:-(?:0|[1-9][0-9]*|[0-9]*[A-Za-z-][0-9A-Za-z-]*)(?:[.](?:0|[1-9][0-9]*|[0-9]*[A-Za-z-][0-9A-Za-z-]*))*)?(?:[+][0-9A-Za-z-]+(?:[.][0-9A-Za-z-]+)*)?$/;
const identifier = /^asr:[a-z][a-z0-9-]*(?:[.][a-z][a-z0-9-]*)+$/;

const metadata = await readJson("registry/registry-metadata.json");
const packageJson = await readJson("package.json");
const ledger = await readJson("evidence/ledger.json");
const artifacts = metadata && typeof metadata.artifacts === "object" && !Array.isArray(metadata.artifacts)
  ? metadata.artifacts
  : {};
const registryArtifact = artifacts.registry && typeof artifacts.registry === "object" ? artifacts.registry : {};
const schemaArtifact = artifacts.schema && typeof artifacts.schema === "object" ? artifacts.schema : {};
const assessmentsArtifact = artifacts.assessments && typeof artifacts.assessments === "object" ? artifacts.assessments : null;
const toolingArtifact = artifacts.tooling && typeof artifacts.tooling === "object" ? artifacts.tooling : {};
const entrySchemaPath = typeof schemaArtifact.entry_schema === "string"
  ? schemaArtifact.entry_schema
  : "registry/schema/entry.schema.json";
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
const filterResponseSchema = await readJson("registry/schema/filter-response.schema.json");
const assessmentSchema = await readJson("registry/schema/acceptance-assessment.schema.json");
const assessmentSetSchema = await readJson("registry/schema/assessment-set.schema.json");
const assessmentFormatVersion = assessmentSchema.properties?.assessment_version?.const;
const assessmentSetFormatVersion = assessmentSetSchema.properties?.assessment_set_version?.const;
if (assessmentsArtifact
  && (assessmentsArtifact.format_version !== assessmentFormatVersion
    || assessmentsArtifact.format_version !== assessmentSetFormatVersion)) {
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
if (!semver.test(ledger.ledger_version)) fail(`evidence ledger has invalid SemVer ${ledger.ledger_version}`);
if (ledger.ledger_version !== registryArtifact.version) {
  fail("Evidence ledger and registry metadata versions differ.");
}

const ajv = new Ajv2020({ allErrors: true, strict: true });
ajv.addSchema(entrySchema);
ajv.addSchema(assessmentSchema);
const validateFilterResponse = ajv.compile(filterResponseSchema);
const validateAssessmentSet = ajv.compile(assessmentSetSchema);

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

  for (const assessment of assessmentSet.assessments) {
    const record = recordsById.get(assessment.record_id);
    if (!record) {
      fail(`${relativePath}: assessment references unknown record ${assessment.record_id}`);
      continue;
    }
    if (assessmentsArtifact && assessment.assessment_version !== assessmentsArtifact.format_version) {
      fail(`${relativePath}: ${assessment.record_id} assessment format version differs from assessment metadata`);
    }
    const snapshots = assessmentsByRecord.get(assessment.record_id) ?? [];
    snapshots.push({ relativePath, assessment });
    assessmentsByRecord.set(assessment.record_id, snapshots);

    const dimensions = Object.values(assessment.dimensions);
    const calculatedTotal = dimensions.reduce((total, dimension) => total + dimension.score, 0);
    if (assessment.total_score !== calculatedTotal) {
      fail(`${relativePath}: ${assessment.record_id} total_score ${assessment.total_score} does not equal calculated score ${calculatedTotal}`);
    }

    for (const [name, dimension] of Object.entries(assessment.dimensions)) {
      checkEvidenceIds(relativePath, `${assessment.record_id} ${name}`, dimension.evidence_ids);
      if (dimension.score > 0 && dimension.evidence_ids.length === 0) {
        fail(`${relativePath}: ${assessment.record_id} ${name} has a positive score without evidence IDs`);
      }
    }
    for (const note of [...assessment.counterevidence, ...assessment.material_open_questions]) {
      checkEvidenceIds(relativePath, `${assessment.record_id} note`, note.evidence_ids);
    }
    for (const blocker of assessment.hard_blockers) {
      checkEvidenceIds(relativePath, `${assessment.record_id} hard blocker`, blocker.evidence_ids);
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
