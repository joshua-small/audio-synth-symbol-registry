import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { cpSync, copyFileSync, mkdtempSync, rmSync, symlinkSync } from "node:fs";
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

const runValidator = ({ fixture, metadataFixture, ledgerFixture } = {}) => {
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
  assert.match(result.stderr, /evidence ledger version differs from evidence metadata/);
});

test("rejects metadata that omits the evidence ledger path", () => {
  const result = runValidator({ metadataFixture: "metadata-no-evidence-ledger.json" });
  assert.equal(result.status, 1, result.stdout);
  assert.match(result.stderr, /metadata artifact evidence must define ledger path/);
});

test("rejects metadata that declares a missing entry schema", () => {
  const result = runValidator({ metadataFixture: "metadata-missing-entry-schema.json" });
  assert.notEqual(result.status, 0, result.stdout);
  assert.match(result.stderr, /does-not-exist\.json/);
});
