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
  assert.ok(status.includes("| `asr:filter.low-shelf` | 19/20 |"));
  assert.ok(status.includes("| `asr:filter.high-shelf` | 19/20 |"));
  assert.ok(status.includes("| `asr:filter.high-pass` | 20/20 |"));
  assert.ok(status.includes("| `asr:filter.low-pass` | 20/20 |"));
  assert.ok(status.includes("| `asr:filter.band-pass` | 20/20 |"));
  assert.ok(status.includes("| `asr:filter.band-stop` | 16/20 |"));
  assert.doesNotMatch(status, /shelf records?[^\n]*14\/20/i);
  assert.doesNotMatch(status, /predate DA-009|overlap audit is pending/i);
  assert.match(status, /low-shelf[^\n]*shelving-term disposition and isolated distinction from high pass remain material/i);
  assert.match(status, /high-shelf[^\n]*shelving-term disposition and isolated distinction from low pass remain material/i);
  assert.doesNotMatch(roadmap, /Status as of 2026-08-29, after work merged through PR #24|initial four-record scope|affect the four records/);
  assert.ok(roadmap.includes(`registry metadata ${metadata.artifacts.registry.version}`));
});

test("current assessment selects the post-disposition six-record snapshot", async () => {
  const metadata = await readJson("registry/registry-metadata.json");
  assert.equal(metadata.artifacts.assessments.current_snapshot,
    "registry/assessments/registry-0.3.1-2026-08-31.json");
  const snapshot = await readJson(metadata.artifacts.assessments.current_snapshot);
  assert.equal(snapshot.assessments.length, 6);
  const byId = new Map(snapshot.assessments.map((assessment) => [assessment.record_id, assessment]));
  for (const id of ["asr:filter.low-shelf", "asr:filter.high-shelf"]) {
    assert.equal(byId.get(id).dimensions.overlap_audit.score, 3);
    assert.equal(byId.get(id).total_score, 19);
    assert.equal(byId.get(id).result.recommended_status, "evidence-collecting");
    assert.doesNotMatch(JSON.stringify(byId.get(id).hard_blockers), /overlap audit is absent|overlap audit is pending/i);
  }
  assert.match(byId.get("asr:filter.low-shelf").result.rationale, /isolated distinction from high pass remain material/i);
  assert.match(byId.get("asr:filter.high-shelf").result.rationale, /isolated distinction from low pass remain material/i);
  assert.equal(byId.get("asr:filter.high-pass").total_score, 20);
  assert.equal(byId.get("asr:filter.low-pass").total_score, 20);
  assert.equal(byId.get("asr:filter.band-pass").total_score, 20);
  assert.equal(byId.get("asr:filter.band-stop").total_score, 16);
  for (const id of [
    "asr:filter.high-pass",
    "asr:filter.low-pass",
    "asr:filter.band-pass",
    "asr:filter.band-stop",
  ]) {
    assert.equal(byId.get(id).result.eligible, true);
    assert.equal(byId.get(id).result.recommended_status, "registry-candidate");
    assert.equal(byId.get(id).status_at_assessment, "registry-candidate");
  }
  assert.match(JSON.stringify(byId.get("asr:filter.band-stop")), /no Notch-only evidence transfers/);
});

test("font strategy preserves the unencoded HOLD boundary", async () => {
  const fontStrategy = await readText("docs/character-properties-font-strategy.md");
  assert.match(fontStrategy, /General_Category=So/);
  assert.match(fontStrategy, /Canonical_Combining_Class=0/);
  assert.match(fontStrategy, /Bidi_Class=ON/);
  assert.match(fontStrategy, /Bidi_Mirrored=N/);
  assert.match(fontStrategy, /Line_Break=AL/);
  assert.match(fontStrategy, /`Script` \| `Common`/);
  assert.match(fontStrategy, /`East_Asian_Width` \| `N`/);
  assert.match(fontStrategy, /repository's `HOLD` position/);
  assert.match(fontStrategy, /Do not use PUA|no PUA/i);
  assert.match(fontStrategy, /does not recommend Unicode character names or code points/);
  assert.match(fontStrategy, /Do not publish a font|no font publication/i);
  assert.match(fontStrategy, /glyph name or glyph ID/i);
  assert.match(fontStrategy, /font proves renderability rather than encoding need/i);
});

test("internal Unicode skeleton remains visibly non-submittable and covers all live records", async () => {
  const [metadata, skeleton, symbolFiles] = await Promise.all([
    readJson("registry/registry-metadata.json"),
    readText("docs/internal-unicode-proposal-skeleton.md"),
    import("node:fs/promises").then(({ readdir }) => readdir(path.join(root, "registry/symbols"))),
  ]);
  const records = await Promise.all(symbolFiles.filter((file) => file.endsWith(".json"))
    .map((file) => readJson(`registry/symbols/${file}`)));
  const repertoireRows = skeleton.split("\n")
    .filter((line) => line.startsWith("| [`asr:filter."));

  assert.equal(repertoireRows.length, records.length);
  for (const record of records) {
    const matchingRows = repertoireRows.filter((line) => line.includes("[`" + record.id + "`]"));
    assert.equal(matchingRows.length, 1, `skeleton needs exactly one protected repertoire row for ${record.id}`);
    assert.match(matchingRows[0], /\| `\[UNMET - immutable name\]` \| `\[UNASSIGNED\]` \| `\[PLACEHOLDER - no proposal glyph accepted\]` \| `\[UNMET\]` \|$/);
  }
  assert.match(skeleton, /NOT A PROPOSAL\. NOT SUBMITTABLE\. Unicode status: `HOLD`/);
  assert.match(skeleton, /\[UNASSIGNED\]/);
  assert.match(skeleton, /\[UNMET - IMMUTABLE NAME\]/i);
  assert.match(skeleton, /no Unicode proposal has been submitted/i);
  assert.match(skeleton, /No third-party image is embedded/i);
  assert.match(skeleton, /DA-014 found no portable independent character use/i);
  assert.match(skeleton, new RegExp(`DA-006 v${metadata.artifacts.derived_analyses.version.replaceAll(".", "\\.")}`));
  assert.match(skeleton, /High-pass, low-pass, band-pass, and band-stop are reversible `registry-candidate` records; both shelves remain `evidence-collecting`; Unicode `HOLD`\./);
  assert.doesNotMatch(skeleton, /U\+[0-9A-F]{4,6}\s+(?:AUDIO|FILTER)/i);
});

test("band-pass candidate promotion remains assessment-backed and provisional", async () => {
  const [metadata, record, readiness] = await Promise.all([
    readJson("registry/registry-metadata.json"),
    readJson("registry/symbols/filter.band-pass.json"),
    readText("docs/band-pass-registry-candidate-readiness.md"),
  ]);
  const snapshot = await readJson(metadata.artifacts.assessments.current_snapshot);
  const assessment = snapshot.assessments.find(({ record_id: id }) => id === record.id);

  assert.equal(record.status, "registry-candidate");
  assert.equal(record.id, "asr:filter.band-pass");
  assert.equal(record.semantics.text_fallback, "BPF");
  assert.equal(record.semantics.spoken_label, "band-pass filter");
  assert.equal(assessment.status_at_assessment, "registry-candidate");
  assert.equal(assessment.total_score, 20);
  assert.equal(assessment.result.recommended_status, "registry-candidate");
  assert.equal(assessment.result.eligible, true);
  assert.equal(assessment.hard_blockers.length, 0);
  assert.equal(assessment.material_open_questions.length, 0);
  assert.equal(assessment.review.independent_agent_review, "passed");

  for (const [dimension, floor] of Object.entries({
    semantic_stability: 3,
    independent_usage: 2,
    text_and_accessibility: 2,
    visual_convergence: 2,
    overlap_audit: 2,
    legal_provenance: 2,
  })) {
    assert.ok(assessment.dimensions[dimension].score >= floor,
      `${dimension} no longer clears its candidate floor`);
  }

  assert.match(readiness, /D-021 explicitly delegates `registry-candidate` promotion/);
  assert.match(readiness, /EV-100 and EV-101/);
  assert.match(readiness, /DA-002, DA-003, DA-005, and DA-012[\s\S]*never counted as new\nindependent sources/);
  assert.match(readiness, /does not itself promote the record/);
  assert.match(readiness, /formal Unicode non-go remains active/);
  assert.match(readiness, /Proposed batched owner decision/);
});
