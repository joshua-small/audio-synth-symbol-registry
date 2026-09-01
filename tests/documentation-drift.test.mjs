import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const readJson = async (relativePath) => JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
const readText = async (relativePath) => readFile(path.join(root, relativePath), "utf8");

test("current prototype, evidence status, and roadmap cover every live record", async () => {
  const [metadata, packageManifest, readme, prototype, status, roadmap, skeleton, blockerMap,
    decisions, symbolFiles] = await Promise.all([
    readJson("registry/registry-metadata.json"),
    readJson("package.json"),
    readText("README.md"),
    readText("docs/interchange-prototype.md"),
    readText("docs/current-evidence-status.md"),
    readText("docs/prioritized-next-work.md"),
    readText("docs/internal-unicode-proposal-skeleton.md"),
    readText("docs/unicode-proposal-critical-path-audit.md"),
    readText("docs/decision-log.md"),
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
  assert.ok(status.includes("| `asr:filter.band-stop` | 18/20 |"));
  assert.doesNotMatch(status, /shelf records?[^\n]*14\/20/i);
  assert.doesNotMatch(status, /predate DA-009|overlap audit is pending/i);
  assert.match(status, /low-shelf[^\n]*low shelving filter[^\n]*resolved as bounded alias[^\n]*isolated distinction from high pass is the sole material blocker/i);
  assert.match(status, /high-shelf[^\n]*high shelving filter[^\n]*resolved as bounded alias[^\n]*isolated distinction from low pass is the sole material blocker/i);
  assert.doesNotMatch(roadmap, /Status as of 2026-08-29, after work merged through PR #24|initial four-record scope|affect the four records/);
  assert.ok(roadmap.includes(`registry metadata ${metadata.artifacts.registry.version}`));

  assert.equal(packageManifest.version, metadata.artifacts.tooling.version);
  assert.ok(readme.includes(`Tooling release: **${packageManifest.version}**`));
  assert.ok(status.includes(`| Tooling | ${packageManifest.version} | \`package.json\` |`));
  const validationResult = status.match(/`npm test` passed (\d+)\/(\d+)/);
  assert.ok(validationResult, "current status omits the completed npm test result");
  assert.equal(validationResult[1], validationResult[2], "current status records an incomplete test run");
  assert.match(status, /Exact-head independent adverse review is complete\./);

  assert.match(roadmap, /exact-head reviewed in assessment artifact 0\.3\.5 through \[PR #100\]/);
  assert.doesNotMatch(roadmap, /assessment artifact 0\.3\.5; exact-head adverse review pending|Adversely review assessment artifact 0\.3\.5/);
  assert.match(roadmap, /Issue #28 is closed/);
  assert.match(roadmap, /PR #49[\s\S]*superseded by the approved `compact-a` geometry lock integrated in PR #72/);
  assert.match(roadmap, /closed PR #61/);

  for (const [id, reviewedHead, pull] of [
    ["D-026", "8fc5a70e9adbf38240339c363c6f26a8a695c265", 99],
    ["D-027", "be3304cb37e4247065b2dbb94b4f86f23b248189", 100],
    ["D-028", "d015e5ae6e4ea5a4f6657620d90f85ad8bc7b2d6", 102],
  ]) {
    const section = decisions.split(`## ${id}:`)[1]?.split("\n## D-")[0] ?? "";
    assert.match(section, /Status: Accepted subject to exact-head independent adverse review/);
    assert.match(section, new RegExp(`${reviewedHead}[\\s\\S]*PR #${pull}`));
  }

  assert.doesNotMatch(blockerMap, /Run its property simulations|build a private proof font/i);
  assert.match(blockerMap, /bounded abstract mixed-direction, line-break, normalization, orientation, and accessibility simulations/);
  assert.match(blockerMap, /private, cmap-free proof font[\s\S]*complete/);
  assert.doesNotMatch(skeleton, /\[UNMET\] mixed-direction behavior|\[UNMET\] line breaking and adjacent|\[UNMET\] normalization and sequence analysis|\[UNMET\] accessibility behavior and text fallback/);
  assert.match(skeleton, /\[PARTIAL - PRIVATE PROOF PASSED\][^\n]*bidi-neutral/);
  assert.match(skeleton, /\[PARTIAL - PRIVATE PROOF PASSED\][^\n]*abstract identity-normalization/);
  assert.match(skeleton, /Unicode critical-path audit[^\n]*DA-013 v0\.2\.2/);
});

test("current assessment selects the evidence-triggered six-record snapshot", async () => {
  const metadata = await readJson("registry/registry-metadata.json");
  assert.equal(metadata.artifacts.assessments.current_snapshot,
    "registry/assessments/registry-0.4.1-2026-09-01.json");
  const snapshot = await readJson(metadata.artifacts.assessments.current_snapshot);
  assert.equal(snapshot.assessments.length, 6);
  const byId = new Map(snapshot.assessments.map((assessment) => [assessment.record_id, assessment]));
  for (const id of ["asr:filter.low-shelf", "asr:filter.high-shelf"]) {
    assert.equal(byId.get(id).dimensions.overlap_audit.score, 3);
    assert.equal(byId.get(id).total_score, 19);
    assert.equal(byId.get(id).result.recommended_status, "evidence-collecting");
    assert.equal(byId.get(id).hard_blockers.length, 1);
    assert.equal(byId.get(id).material_open_questions.length, 1);
    assert.doesNotMatch(JSON.stringify(byId.get(id).hard_blockers), /shelving-term disposition remains material/i);
    assert.doesNotMatch(JSON.stringify(byId.get(id).material_open_questions), /shelving filter is an exact alias/i);
    assert.doesNotMatch(JSON.stringify(byId.get(id).hard_blockers), /overlap audit is absent|overlap audit is pending/i);
  }
  assert.match(byId.get("asr:filter.low-shelf").result.rationale, /isolated distinction from high pass remains material/i);
  assert.match(byId.get("asr:filter.high-shelf").result.rationale, /isolated distinction from low pass remains material/i);
  assert.equal(byId.get("asr:filter.high-pass").total_score, 20);
  assert.equal(byId.get("asr:filter.low-pass").total_score, 20);
  assert.equal(byId.get("asr:filter.band-pass").total_score, 20);
  assert.equal(byId.get("asr:filter.band-stop").total_score, 18);
  assert.equal(byId.get("asr:filter.band-stop").dimensions.text_and_accessibility.score, 3);
  assert.equal(byId.get("asr:filter.band-stop").dimensions.visual_convergence.score, 3);
  assert.match(JSON.stringify(byId.get("asr:filter.band-stop")), /DA-023/);
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

test("shelf shelving aliases remain bounded and preserve isolated recognition", async () => {
  for (const [file, alias, related, adjacent] of [
    ["filter.low-shelf.json", "low shelving filter", "low shelving", "high-pass"],
    ["filter.high-shelf.json", "high shelving filter", "high shelving", "low-pass"],
  ]) {
    const record = await readJson(`registry/symbols/${file}`);
    assert.deepEqual(record.semantics.aliases, [alias]);
    assert.deepEqual(record.semantics.related_terms, [related]);
    assert.ok(record.open_questions.some(({ question, status }) =>
      question.includes(alias) && status === "resolved"));
    assert.ok(record.open_questions.some(({ question, status }) =>
      question.toLowerCase().includes(`isolated use reliably distinguish`) &&
      question.toLowerCase().includes(adjacent) && status === "open"));
    const notes = record.notes.join("\n");
    assert.match(notes, /response class/i);
    assert.match(notes, /morphological relationship, not an orthographic variant/i);
    assert.match(notes, /Explicit product documentation overrides generic alias lookup/i);
    assert.match(notes, /concatenated or camel-case tokens are not inferred/i);
  }
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

test("portable-text dossier preserves direct and adverse evidence under Unicode HOLD", async () => {
  const [ledger, derived, dossier, status, blockerMap] = await Promise.all([
    readJson("evidence/ledger.json"),
    readJson("evidence/derived-analyses.json"),
    readText("evidence/reports/2026-09-01-portable-text-and-interchange-need-corpus.md"),
    readText("docs/current-evidence-status.md"),
    readText("docs/unicode-proposal-critical-path-audit.md"),
  ]);
  const ids = new Set(ledger.sources.map(({ id }) => id));
  for (const id of ["EV-205", "EV-206", "EV-207", "EV-208", "EV-209"]) {
    assert.ok(ids.has(id), `portable-text dossier source missing ${id}`);
  }
  assert.ok(derived.artifacts.some(({ id, version }) => id === "DA-024" && version === "0.1.0"));
  assert.match(dossier, /negative for portable response-glyph use across all six records/i);
  assert.match(dossier, /FontAudio and Iconify count as one lineage/i);
  assert.match(dossier, /A single scalar can tokenize into multiple model tokens/i);
  assert.match(dossier, /Band-stop has zero accepted drawing-required or label-failure cases/i);
  assert.match(status, /Scores: 20, 20, 20, 18, 19, and 19/);
  assert.match(status, /Formal Unicode proposal: `HOLD`/);
  assert.match(blockerMap, /Independent character use and public plain-text encoding need remain open for all six records/i);
  assert.doesNotMatch(dossier, /Unicode status: `GO`|formal Unicode proposal: `GO`/i);
});

test("evolutionary-history dossier separates semantics, graphics, and source families", async () => {
  const [ledger, derived, dossier, status] = await Promise.all([
    readJson("evidence/ledger.json"),
    readJson("evidence/derived-analyses.json"),
    readText("evidence/reports/2026-09-01-evolutionary-history-corpus-v2.md"),
    readText("docs/current-evidence-status.md"),
  ]);
  const byId = new Map(ledger.sources.map((source) => [source.id, source]));
  for (let number = 210; number <= 221; number += 1) {
    assert.ok(byId.has(`EV-${number}`), `evolutionary-history source missing EV-${number}`);
  }
  assert.ok(derived.artifacts.some(({ id, version }) => id === "DA-026" && version === "0.1.0"));
  assert.equal(byId.get("EV-212").source_capture.preservation.mode, "metadata-only");
  assert.equal(byId.get("EV-221").source_capture.preservation.mode, "metadata-only");
  assert.match(dossier, /not a market-share estimate, user census, sales ranking, or proof/i);
  assert.match(dossier, /Semantic continuity is strong and long-lived\. Graphic continuity is episodic/i);
  assert.match(dossier, /no reviewed source documents that design step/i);
  assert.match(dossier, /low shelf and high shelf identify the affected frequency side/i);
  assert.match(dossier, /Bell 1923 remains an acquisition lead/i);
  assert.match(dossier, /no independently used portable target response glyph/i);
  assert.match(status, /not one unbroken graphic lineage/i);
  assert.match(status, /Formal Unicode proposal: `HOLD`/);
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
