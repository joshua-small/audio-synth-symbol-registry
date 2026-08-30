import assert from "node:assert/strict";
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
  } else {
    throw new Error(`Unsupported assessment mutation: ${mutation.operation}`);
  }

  writeFileSync(assessmentPath, `${JSON.stringify(assessmentSet, null, 2)}\n`);
};

const runValidator = ({ fixture, metadataFixture, ledgerFixture, assessmentMutationFixture } = {}) => {
  const corpusRoot = temporaryCorpus();
  try {
    if (metadataFixture) {
      copyFileSync(
        path.join(corpusRoot, "tests", "fixtures", "invalid-metadata", metadataFixture),
        path.join(corpusRoot, "registry", "registry-metadata.json"),
      );
    }
    if (ledgerFixture) {
      copyFileSync(
        path.join(corpusRoot, "tests", "fixtures", "invalid-ledgers", ledgerFixture),
        path.join(corpusRoot, "evidence", "ledger.json"),
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
  assert.match(result.stdout, /Validated 4 registry record\(s\)/);
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
  assert.match(result.stdout, /Validated 4 registry record\(s\), 2 assessment set\(s\)/);
});
