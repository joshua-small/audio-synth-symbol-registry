import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { promisify } from "node:util";
import { PROPERTY_PROFILE, resolveLineBreak, resolveNeutral, simulateNormalizationIdentity, simulateProperties } from "../tooling/private-font-proof/simulate-filter-symbol-properties.mjs";
import { validatePrivateFontProof } from "../tooling/private-font-proof/validate-private-font-proof.mjs";

const root = process.cwd();
const execFileAsync = promisify(execFile);
const hashFile = async (relativePath) => createHash("sha256")
  .update(await readFile(path.join(root, relativePath)))
  .digest("hex");

test("abstract property simulation preserves neutral, atomic, and accessible behavior", async () => {
  assert.deepEqual(PROPERTY_PROFILE, {
    general_category: "So",
    canonical_combining_class: 0,
    bidi_class: "ON",
    bidi_mirrored: false,
    line_break: "AL",
    script: "Common",
    east_asian_width: "N",
    normalization: "identity",
    joining: "none",
    math: false,
    emoji: false,
  });
  assert.equal(resolveNeutral("L", "L", "R"), "L");
  assert.equal(resolveNeutral("R", "EN", "L"), "R");
  assert.equal(resolveNeutral("L", "R", "L"), "L");
  assert.equal(resolveNeutral("L", "R", "R"), "R");
  assert.equal(resolveLineBreak("AL", "ASR-AL"), false);
  assert.equal(resolveLineBreak("NU", "ASR-AL"), false);
  assert.equal(resolveLineBreak("SP", "ASR-AL"), true);

  const records = await Promise.all([
    "filter.high-pass.json", "filter.low-pass.json", "filter.band-pass.json",
    "filter.band-stop.json", "filter.low-shelf.json", "filter.high-shelf.json",
  ].map((filename) => readFile(path.join(root, "registry/symbols", filename), "utf8").then(JSON.parse)));
  const simulation = simulateProperties(records);
  assert.equal(simulation.pass, true);
  assert.deepEqual(simulation.code_points, []);
  assert.equal(simulation.symbols.length, 6);
  assert.equal(simulation.bidi_cases.length, 6);
  assert.equal(simulation.line_break_cases.length, 6);
  assert.ok(simulation.line_break_cases.every(({ pass }) => pass));
  assert.ok(simulation.bidi_cases.every(({ pass, mirrored }) => pass && !mirrored));
  assert.ok(simulation.symbols.every(({ abstract_token: token, normalization_checks: checks }) =>
    checks.length === 4 && checks.every(({ input, expected, actual, pass }) =>
      pass && input === token && expected === token && actual === token)));
  assert.equal(simulateNormalizationIdentity("{asr:filter.high-pass}", "NFC"), "{asr:filter.high-pass}");
  assert.throws(() => simulateNormalizationIdentity("{asr:filter.high-pass}", "UNKNOWN"), /unsupported abstract normalization form/);
  assert.ok(simulation.symbols.every((symbol) =>
    symbol.line_break.atomic_internal_breaks === 0
    && symbol.accessibility.glyph_has_intrinsic_accessible_name === false
    && symbol.accessibility.spoken_label));
});

test("private cmap-free proof is deterministic and passes bounded locked-SVG rendering thresholds", async (context) => {
  const lock = JSON.parse(await readFile(path.join(root, "artwork/study-locks/six-member-compact-a.json"), "utf8"));
  const before = new Map(await Promise.all(lock.assets.map(async ({ path: sourcePath }) =>
    [sourcePath, await hashFile(sourcePath)])));
  const parent = await mkdtemp(path.join(tmpdir(), "asr-private-font-proof-"));
  context.after(() => rm(parent, { recursive: true, force: true }));

  const report = await validatePrivateFontProof(root, path.join(parent, "proof"));
  assert.equal(report.status, "private-proof-validation-passed");
  assert.equal(report.source_commit.length, 40);
  assert.equal(report.deterministic_build.identical, true);
  assert.equal(report.encoding_boundary.cmap_present, false);
  assert.deepEqual(report.encoding_boundary.code_points, []);
  assert.equal(report.property_simulation.pass, true);
  assert.equal(report.serialized_direct_glyph_inspection.length, 6);
  assert.ok(report.serialized_direct_glyph_inspection.every(({ requested_gid: input, roundtrip_gid: output, pass }) => input === output && pass));
  assert.ok(report.serialized_direct_glyph_inspection.every(({ glyph_name: name }) => name.startsWith("asr.filter.")));
  assert.equal(report.rendering.comparisons.length, 60);
  assert.equal(report.rendering.all_pass, true);
  assert.ok(report.rendering.comparisons.every(({ pass }) => pass));
  assert.equal(report.boundaries.published, false);
  assert.equal(report.boundaries.unicode_code_points_assigned, false);
  assert.equal(report.boundaries.pua_used, false);

  for (const { path: sourcePath, sha256 } of lock.assets) {
    assert.equal(await hashFile(sourcePath), sha256);
    assert.equal(await hashFile(sourcePath), before.get(sourcePath));
  }
});

test("private proof tooling refuses to write generated artifacts into the repository", async () => {
  const output = path.join(root, "private-proof-output-must-not-exist");
  await assert.rejects(validatePrivateFontProof(root, output), /outside the repository/);
});

test("repository records commitments and tooling but tracks no generated font proof", async () => {
  const [report, packageJson, metadata, tracked] = await Promise.all([
    readFile(path.join(root, "docs/private-unencoded-font-proof-2026-08-31.md"), "utf8"),
    readFile(path.join(root, "package.json"), "utf8").then(JSON.parse),
    readFile(path.join(root, "registry/registry-metadata.json"), "utf8").then(JSON.parse),
    execFileAsync("git", ["ls-files"], { cwd: root }).then(({ stdout }) => stdout.split("\n")),
  ]);
  assert.equal(packageJson.version, "0.8.0");
  assert.equal(metadata.artifacts.tooling.version, packageJson.version);
  assert.match(report, /no `cmap`/);
  assert.match(report, /no PUA or code point/);
  assert.match(report, /Unicode `HOLD` remain unchanged/);
  assert.match(report, /repository tests passed/);
  const trackedProofFiles = tracked.filter((filename) => filename.startsWith("tooling/private-font-proof/"));
  assert.deepEqual(trackedProofFiles.sort(), [
    "tooling/private-font-proof/build_private_font_proof.py",
    "tooling/private-font-proof/requirements.lock.txt",
    "tooling/private-font-proof/simulate-filter-symbol-properties.mjs",
    "tooling/private-font-proof/validate-private-font-proof.mjs",
  ]);
  assert.ok(tracked.every((filename) => !/(?:^|\/)(?:build-[ab]|glyphs|rendering|property-simulation)(?:\/|$)/.test(filename)));
  assert.ok(tracked.every((filename) => !/\.(?:ttf|otf|woff2?|ttx)$/i.test(filename)));
});
