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
  const reassessmentSection = roadmap.split("### 2. Maintain the six-record assessment lifecycle")[1]
    ?.split("### 3. Prepare a blinded six-way study package after geometry lock")[0] ?? "";

  for (const record of records) {
    assert.ok(prototype.includes(`| \`${record.id}\``), `prototype omits ${record.id}`);
    assert.ok(status.includes(`| \`${record.id}\``), `status synthesis omits ${record.id}`);
    assert.ok(reassessmentSection.includes(`\`${record.id}\``), `roadmap reassessment omits ${record.id}`);
  }
  assert.ok(status.includes(`Registry and evidence ledger | ${metadata.artifacts.registry.version}`));
  assert.ok(status.includes(`Schema | ${metadata.artifacts.schema.version}`));
  assert.doesNotMatch(prototype, /four current records|four canonical ASCII IDs/);
  assert.doesNotMatch(status, /Current records:\*\* all four|ledger version 0\.1\.3/);
  assert.ok(status.includes("| `asr:filter.low-shelf` | 17/20 |"));
  assert.ok(status.includes("| `asr:filter.high-shelf` | 17/20 |"));
  assert.doesNotMatch(status, /shelf records?[^\n]*14\/20/i);
  assert.doesNotMatch(status, /predate DA-009|overlap audit is pending/i);
  assert.match(status, /three-independent-source safeguard open/i);
  assert.doesNotMatch(roadmap, /Status as of 2026-08-29, after work merged through PR #24|initial four-record scope|affect the four records/);
  assert.ok(roadmap.includes(`registry metadata ${metadata.artifacts.registry.version}`));
});

test("current assessment selects the post-shelf evidence snapshot", async () => {
  const metadata = await readJson("registry/registry-metadata.json");
  assert.equal(metadata.artifacts.assessments.current_snapshot,
    "registry/assessments/registry-0.2.2-2026-08-31.json");
  const snapshot = await readJson(metadata.artifacts.assessments.current_snapshot);
  assert.equal(snapshot.assessments.length, 6);
  const byId = new Map(snapshot.assessments.map((assessment) => [assessment.record_id, assessment]));
  for (const id of ["asr:filter.low-shelf", "asr:filter.high-shelf"]) {
    assert.equal(byId.get(id).dimensions.overlap_audit.score, 3);
    assert.equal(byId.get(id).total_score, 17);
    assert.equal(byId.get(id).result.recommended_status, "evidence-collecting");
    assert.match(byId.get(id).result.rationale, /three-source safeguard/);
    assert.doesNotMatch(JSON.stringify(byId.get(id).hard_blockers), /overlap audit is absent|overlap audit is pending/i);
  }
});
