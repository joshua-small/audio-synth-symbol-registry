import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const readJson = async (relativePath) => JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
const readText = async (relativePath) => readFile(path.join(root, relativePath), "utf8");

test("current prototype, evidence status, and roadmap cover every live record", async () => {
  const [metadata, prototype, status, roadmap, symbolFiles] = await Promise.all([
    readJson("registry/registry-metadata.json"),
    readText("docs/interchange-prototype.md"),
    readText("docs/current-evidence-status.md"),
    readText("docs/prioritized-next-work.md"),
    import("node:fs/promises").then(({ readdir }) => readdir(path.join(root, "registry/symbols"))),
  ]);
  const records = await Promise.all(symbolFiles.filter((file) => file.endsWith(".json"))
    .map((file) => readJson(`registry/symbols/${file}`)));
  const reassessmentSection = roadmap.split("### 2. Reassess all six records after the evidence lanes merge")[1]
    ?.split("### 3. Exercise six-record interchange workflows")[0] ?? "";

  for (const record of records) {
    assert.ok(prototype.includes(`| \`${record.id}\``), `prototype omits ${record.id}`);
    assert.ok(status.includes(`| \`${record.id}\``), `status synthesis omits ${record.id}`);
    assert.ok(reassessmentSection.includes(`\`${record.id}\``), `roadmap reassessment omits ${record.id}`);
  }
  assert.ok(status.includes(`Registry and evidence ledger | ${metadata.artifacts.registry.version}`));
  assert.ok(status.includes(`Schema | ${metadata.artifacts.schema.version}`));
  assert.doesNotMatch(prototype, /four current records|four canonical ASCII IDs/);
  assert.doesNotMatch(status, /Current records:\*\* all four|ledger version 0\.1\.3/);
  assert.doesNotMatch(roadmap, /Status as of 2026-08-29, after work merged through PR #24|initial four-record scope|affect the four records/);
  assert.ok(roadmap.includes(`registry metadata ${metadata.artifacts.registry.version}`));
});
