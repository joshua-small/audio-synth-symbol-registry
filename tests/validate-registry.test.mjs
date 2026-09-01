import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { cpSync, copyFileSync, mkdtempSync, readdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import os from "node:os";
import { fileURLToPath } from "node:url";
import path from "node:path";
import test from "node:test";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fixtureRoot = path.join(repositoryRoot, "tests", "fixtures");

const temporaryCorpus = () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "asr-validator-"));
  cpSync(repositoryRoot, directory, {
    recursive: true,
    filter: (source) => !source.endsWith(`${path.sep}.git`) && !source.endsWith(`${path.sep}node_modules`),
  });
  symlinkSync(path.join(repositoryRoot, "node_modules"), path.join(directory, "node_modules"), "dir");
  return directory;
};

const applyAssessmentMutation = (corpusRoot, mutationFixture) => {
  const mutation = JSON.parse(readFileSync(
    path.join(corpusRoot, "tests", "fixtures", "assessment-mutations", mutationFixture),
    "utf8",
  ));
  if (mutation.operation === "remove-assessments") {
    rmSync(path.join(corpusRoot, "registry", "assessments"), { force: true, recursive: true });
    return;
  }

  const assessmentDirectory = path.join(corpusRoot, "registry", "assessments");
  const snapshots = readdirSync(assessmentDirectory)
    .filter((file) => file.endsWith(".json"))
    .flatMap((file) => {
      const assessmentPath = path.join(assessmentDirectory, file);
      const assessmentSet = JSON.parse(readFileSync(assessmentPath, "utf8"));
      return assessmentSet.assessments
        .filter((item) => item.record_id === mutation.record_id)
        .filter((item) => !mutation.target_assessment_version || item.assessment_version === mutation.target_assessment_version)
        .map((assessment) => ({ assessment, assessmentPath, assessmentSet }));
    });
  const current = snapshots.sort(
    (left, right) => Date.parse(right.assessment.assessed_at) - Date.parse(left.assessment.assessed_at),
  )[0];
  assert.ok(current, `Fixture targets a missing assessment: ${mutation.record_id}`);
  const { assessment, assessmentPath, assessmentSet } = current;
  assert.ok(assessment, `Fixture targets a missing assessment: ${mutation.record_id}`);

  if (mutation.operation === "clear-dimension-evidence") {
    assessment.dimensions[mutation.dimension].evidence_ids = [];
  } else if (mutation.operation === "promote-record-with-ineligible-latest") {
    const recordPath = path.join(corpusRoot, "registry", "symbols", `${mutation.symbol_file}.json`);
    const record = JSON.parse(readFileSync(recordPath, "utf8"));
    record.status = mutation.status;
    writeFileSync(recordPath, `${JSON.stringify(record, null, 2)}\n`);
  } else if (mutation.operation === "duplicate-assessment-timestamp") {
    assessmentSet.assessments.push(structuredClone(assessment));
  } else if (mutation.operation === "append-newer-historical-snapshot") {
    const newerSnapshot = structuredClone(assessment);
    newerSnapshot.assessed_at = mutation.assessed_at;
    newerSnapshot.status_at_assessment = mutation.status_at_assessment;
    assessmentSet.assessments.push(newerSnapshot);
  } else if (mutation.operation === "add-artifact-ref") {
    assessmentSet.assessment_set_version = "0.2.0";
    for (const item of assessmentSet.assessments) item.assessment_version = "0.2.0";
    assessment.dimensions[mutation.dimension].artifact_refs = mutation.references ?? [mutation.reference];
    if (mutation.remove_evidence_id) {
      assessment.dimensions[mutation.dimension].evidence_ids = assessment.dimensions[mutation.dimension].evidence_ids
        .filter((id) => id !== mutation.remove_evidence_id);
    }
  } else if (mutation.operation === "add-artifact-ref-without-version-bump") {
    assessment.dimensions[mutation.dimension].artifact_refs = [mutation.reference];
  } else {
    throw new Error(`Unsupported assessment mutation: ${mutation.operation}`);
  }

  writeFileSync(assessmentPath, `${JSON.stringify(assessmentSet, null, 2)}\n`);
};

const applyLedgerMutation = (corpusRoot, mutationFixture) => {
  const mutation = JSON.parse(readFileSync(
    path.join(corpusRoot, "tests", "fixtures", "ledger-mutations", mutationFixture),
    "utf8",
  ));
  const ledgerPath = path.join(corpusRoot, "evidence", "ledger.json");
  const ledger = JSON.parse(readFileSync(ledgerPath, "utf8"));
  const source = ledger.sources.find((item) => item.id === mutation.source_id);
  assert.ok(source, `Fixture targets a missing evidence source: ${mutation.source_id}`);

  if (mutation.operation === "set") {
    source[mutation.field] = mutation.value;
  } else if (mutation.operation === "delete") {
    delete source[mutation.field];
  } else {
    throw new Error(`Unsupported ledger mutation: ${mutation.operation}`);
  }

  writeFileSync(ledgerPath, `${JSON.stringify(ledger, null, 2)}\n`);
};

const runValidator = ({
  fixture,
  metadataFixture,
  metadataMutation,
  ledgerFixture,
  ledgerMutationFixture,
  assessmentMutationFixture,
  readmeRegistryVersion,
  derivedRegistryMutation,
} = {}) => {
  const corpusRoot = temporaryCorpus();
  try {
    if (metadataFixture) {
      copyFileSync(
        path.join(corpusRoot, "tests", "fixtures", "invalid-metadata", metadataFixture),
        path.join(corpusRoot, "registry", "registry-metadata.json"),
      );
    }
    if (metadataMutation) {
      const metadataPath = path.join(corpusRoot, "registry", "registry-metadata.json");
      const metadata = JSON.parse(readFileSync(metadataPath, "utf8"));
      Object.assign(metadata.artifacts.assessments, metadataMutation);
      writeFileSync(metadataPath, `${JSON.stringify(metadata, null, 2)}\n`);
    }
    if (ledgerFixture) {
      copyFileSync(
        path.join(corpusRoot, "tests", "fixtures", "invalid-ledgers", ledgerFixture),
        path.join(corpusRoot, "evidence", "ledger.json"),
      );
    }
    if (ledgerMutationFixture) {
      applyLedgerMutation(corpusRoot, ledgerMutationFixture);
    }
    if (readmeRegistryVersion) {
      const readmePath = path.join(corpusRoot, "README.md");
      const readme = readFileSync(readmePath, "utf8");
      writeFileSync(
        readmePath,
        readme.replace(/^Registry release: \*\*[^*]+\*\*\\\r?$/m, `Registry release: **${readmeRegistryVersion}**\\`),
      );
    }
    if (fixture) {
      rmSync(path.join(corpusRoot, "registry", "symbols"), { force: true, recursive: true });
      cpSync(
        path.join(corpusRoot, "tests", "fixtures", "invalid-records", fixture),
        path.join(corpusRoot, "registry", "symbols"),
        { recursive: true },
      );
    }
    if (assessmentMutationFixture) {
      applyAssessmentMutation(corpusRoot, assessmentMutationFixture);
    }
    if (derivedRegistryMutation) {
      const registryPath = path.join(corpusRoot, "evidence", "derived-analyses.json");
      const registry = JSON.parse(readFileSync(registryPath, "utf8"));
      derivedRegistryMutation(registry, corpusRoot);
      writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
    }
    return spawnSync(process.execPath, ["tooling/validate-registry.mjs"], {
      cwd: corpusRoot,
      encoding: "utf8",
    });
  } finally {
    rmSync(corpusRoot, { force: true, recursive: true });
  }
};

test("canonical corpus validates", () => {
  const result = runValidator();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Validated 6 registry record\(s\)/);
});

const invalidRecordFixtures = [
  ["unknown-top-level-property", /must NOT have additional properties/],
  ["unsupported-status", /\/status must be equal to one of the allowed values/],
  ["invalid-semantics-category", /\/semantics\/category must be equal to constant/],
  ["invalid-filter-response-glyph-concept", /\/representations\/representative_glyph_concept must be equal to one of the allowed values/],
  ["missing-confidence", /must have required property 'confidence'/],
  ["missing-open-question-status", /must have required property 'status'/],
  ["unknown-evidence-source", /unknown evidence source EV-999/],
];

for (const [fixture, expectedFailure] of invalidRecordFixtures) {
  test(`rejects ${fixture} fixture for the intended reason`, () => {
    const result = runValidator({ fixture });
    assert.equal(result.status, 1, result.stdout);
    assert.match(result.stderr, expectedFailure);
  });
}

test("rejects metadata with a leading-zero SemVer component", () => {
  const result = runValidator({ metadataFixture: "leading-zero-registry-version.json" });
  assert.equal(result.status, 1, result.stdout);
  assert.match(result.stderr, /metadata artifact registry has invalid SemVer 01\.0\.0/);
});

test("rejects a ledger version that differs from metadata", () => {
  const result = runValidator({ ledgerFixture: "ledger-version-mismatch.json" });
  assert.equal(result.status, 1, result.stdout);
  assert.match(result.stderr, /Evidence ledger and registry metadata versions differ/);
});

test("rejects a README registry release that differs from metadata", () => {
  const result = runValidator({ readmeRegistryVersion: "0.1.0" });
  assert.equal(result.status, 1, result.stdout);
  assert.match(result.stderr, /README registry release 0\.1\.0 differs from registry metadata 0\.3\.2/);
});

const invalidLedgerMutations = [
  ["invalid-id.json", /\/sources\/0\/id must match pattern/],
  ["missing-required-field.json", /\/sources\/0 must have required property 'rights_note'/],
  ["unknown-property.json", /\/sources\/0 must NOT have additional properties/],
  ["unsupported-source-type.json", /\/sources\/0\/type must be equal to one of the allowed values/],
  ["invalid-accessed-date.json", /\/sources\/0\/accessed_on must match format "date"/],
  ["invalid-calendar-date.json", /\/sources\/0\/accessed_on must match format "date"/],
  ["invalid-zero-year.json", /\/sources\/0\/accessed_on must match format "date"/],
  ["invalid-publication-date.json", /\/sources\/0\/publication_date must match a schema in anyOf/],
  ["invalid-url.json", /\/sources\/0\/url must match format "https-url"/],
  ["invalid-capture-timestamp.json", /\/source_capture\/accessed_at must match format "offset-date-time"/],
  ["impossible-capture-timestamp.json", /\/source_capture\/accessed_at must match format "offset-date-time"/],
  ["metadata-only-with-archive.json", /\/source_capture\/preservation\/archive_url must be equal to constant/],
  ["checksum-only-with-archive.json", /\/source_capture\/preservation\/archive_url must be equal to constant/],
  ["archive-only-with-checksum.json", /\/source_capture\/preservation\/checksum must be equal to constant/],
  ["invalid-capture-checksum.json", /\/source_capture\/preservation\/checksum must match a schema in anyOf/],
];

for (const [ledgerMutationFixture, expectedFailure] of invalidLedgerMutations) {
  test(`rejects ${ledgerMutationFixture} for the intended ledger schema rule`, () => {
    const result = runValidator({ ledgerMutationFixture });
    assert.equal(result.status, 1, result.stdout);
    assert.match(result.stderr, expectedFailure);
  });
}

test("keeps evidence IDs with four or more digits citable across schemas", () => {
  const schemaPaths = [
    "registry/schema/evidence-ledger.schema.json",
    "registry/schema/entry.schema.json",
    "registry/schema/acceptance-assessment.schema.json",
    "registry/schema/derived-analysis-registry.schema.json",
  ];
  const patterns = schemaPaths.flatMap((schemaPath) => {
    const schema = JSON.parse(readFileSync(path.join(repositoryRoot, schemaPath), "utf8"));
    const found = [];
    const visit = (value) => {
      if (!value || typeof value !== "object") return;
      if (typeof value.pattern === "string" && value.pattern.startsWith("^EV-")) found.push(value.pattern);
      for (const child of Object.values(value)) visit(child);
    };
    visit(schema);
    return found;
  });

  assert.equal(patterns.length, 7);
  for (const pattern of patterns) {
    assert.match("EV-1000", new RegExp(pattern));
    assert.doesNotMatch("EV-01", new RegExp(pattern));
  }
});

test("rejects metadata that omits the evidence ledger path", () => {
  const result = runValidator({ metadataFixture: "metadata-no-evidence-ledger.json" });
  assert.equal(result.status, 1, result.stdout);
  assert.match(result.stderr, /Registry metadata must declare the evidence ledger as registry data/);
});

test("rejects metadata that declares a missing entry schema", () => {
  const result = runValidator({ metadataFixture: "metadata-missing-entry-schema.json" });
  assert.notEqual(result.status, 0, result.stdout);
  assert.match(result.stderr, /does-not-exist\.json/);
});

test("rejects assessment metadata whose format version differs from its schemas", () => {
  const result = runValidator({ metadataMutation: { format_version: "0.1.1" } });
  assert.equal(result.status, 1, result.stdout);
  assert.match(result.stderr, /Assessment metadata format version differs from the assessment schemas/);
});

test("rejects metadata whose declared format differs from the current snapshot", () => {
  const result = runValidator({ metadataMutation: { format_version: "0.1.0" } });
  assert.equal(result.status, 1, result.stdout);
  assert.match(result.stderr, /current assessment-set format version differs from assessment metadata/);
});

test("rejects assessment metadata that points to a missing current snapshot", () => {
  const result = runValidator({ metadataMutation: { current_snapshot: "registry/assessments/missing.json" } });
  assert.equal(result.status, 1, result.stdout);
  assert.match(result.stderr, /Assessment metadata current snapshot is not readable/);
});

test("rejects assessment metadata that designates a historical snapshot as current", () => {
  const result = runValidator({ metadataMutation: { current_snapshot: "registry/assessments/bootstrap-2026-08-29.json" } });
  assert.equal(result.status, 1, result.stdout);
  assert.match(result.stderr, /metadata current snapshot does not contain the most recent assessment/);
});

const invalidAssessmentMutations = [
  ["positive-score-missing-evidence-id.json", /semantic_stability has a positive score without evidence IDs/],
  ["no-assessment.json", /No acceptance assessment found for asr:filter\.high-pass/],
  ["promoted-record-ineligible-latest.json", /registry-accepted requires a current eligible accepted assessment/],
  ["same-timestamp-ambiguity.json", /current assessment is ambiguous/],
];

for (const [assessmentMutationFixture, expectedFailure] of invalidAssessmentMutations) {
  test(`rejects ${assessmentMutationFixture} for the intended assessment rule`, () => {
    const result = runValidator({ assessmentMutationFixture });
    assert.equal(result.status, 1, result.stdout);
    assert.match(result.stderr, expectedFailure);
  });
}

test("preserves historical assessments when a newer snapshot is appended", () => {
  const result = runValidator({ assessmentMutationFixture: "newer-historical-snapshot.json" });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Validated 6 registry record\(s\), 8 assessment set\(s\)/);
});

test("rejects a duplicate derived-analysis ID-version pair", () => {
  const result = runValidator({
    derivedRegistryMutation: (registry) => registry.artifacts.push(structuredClone(registry.artifacts[0])),
  });
  assert.equal(result.status, 1, result.stdout);
  assert.match(result.stderr, /duplicate artifact version DA-001@0.1.0/);
});

test("rejects a derived analysis with an unknown input source", () => {
  const result = runValidator({
    derivedRegistryMutation: (registry) => registry.artifacts[0].input_evidence_ids.push("EV-999"),
  });
  assert.equal(result.status, 1, result.stdout);
  assert.match(result.stderr, /DA-001 references unknown evidence source EV-999/);
});

test("rejects a derived analysis whose file is missing", () => {
  const result = runValidator({
    derivedRegistryMutation: (registry) => { registry.artifacts[0].path = "docs/does-not-exist.md"; },
  });
  assert.equal(result.status, 1, result.stdout);
  assert.match(result.stderr, /DA-001 path is not readable/);
});

test("rejects a derived analysis whose content digest is stale", () => {
  const result = runValidator({
    derivedRegistryMutation: (registry) => { registry.artifacts[0].content_sha256 = "0".repeat(64); },
  });
  assert.equal(result.status, 1, result.stdout);
  assert.match(result.stderr, /DA-001 content digest differs from its registered version/);
});

test("rejects an assessment reference to an unknown derived artifact", () => {
  const result = runValidator({ assessmentMutationFixture: "unknown-derived-artifact.json" });
  assert.equal(result.status, 1, result.stdout);
  assert.match(result.stderr, /references unknown derived artifact DA-999/);
});

test("rejects an assessment reference to the wrong artifact version", () => {
  const result = runValidator({ assessmentMutationFixture: "wrong-derived-artifact-version.json" });
  assert.equal(result.status, 1, result.stdout);
  assert.match(result.stderr, /references unknown derived artifact DA-005@9.9.9/);
});

test("allows historical derived-analysis versions and resolves both exact pairs", () => {
  const result = runValidator({
    assessmentMutationFixture: "two-derived-artifact-versions.json",
    metadataMutation: { format_version: "0.2.0" },
    derivedRegistryMutation: (registry, corpusRoot) => {
      const sourcePath = path.join(corpusRoot, "docs", "unicode-overlap-audit.md");
      const versionedPath = path.join(corpusRoot, "docs", "unicode-overlap-audit-0.2.0.md");
      copyFileSync(sourcePath, versionedPath);
      const next = structuredClone(registry.artifacts.find((artifact) => artifact.id === "DA-005"));
      next.version = "0.2.0";
      next.path = "docs/unicode-overlap-audit-0.2.0.md";
      next.content_sha256 = createHash("sha256").update(readFileSync(versionedPath)).digest("hex");
      registry.artifacts.push(next);
    },
  });
  assert.equal(result.status, 0, result.stderr);
});

test("rejects laundering an unrelated source through a derived artifact", () => {
  const result = runValidator({ assessmentMutationFixture: "unrelated-derived-input.json" });
  assert.equal(result.status, 1, result.stdout);
  assert.match(result.stderr, /uses EV-006, which is not an input of DA-005@0.1.0/);
});

test("rejects a derived input omitted from the containing evidence IDs", () => {
  const result = runValidator({ assessmentMutationFixture: "omitted-derived-input.json" });
  assert.equal(result.status, 1, result.stdout);
  assert.match(result.stderr, /derived-artifact input EV-037 is absent from evidence_ids/);
});

test("rejects derived-analysis dependency cycles", () => {
  const result = runValidator({
    derivedRegistryMutation: (registry) => {
      registry.artifacts.find((artifact) => artifact.id === "DA-001").input_artifact_refs = [
        { artifact_id: "DA-006", artifact_version: "0.1.0" },
      ];
    },
  });
  assert.equal(result.status, 1, result.stdout);
  assert.match(result.stderr, /dependency cycle includes/);
});

test("rejects artifact_refs inside assessment format 0.1.0", () => {
  const result = runValidator({ assessmentMutationFixture: "artifact-ref-in-v1.json" });
  assert.equal(result.status, 1, result.stdout);
  assert.match(result.stderr, /format 0.1.0 cannot contain artifact_refs/);
});
