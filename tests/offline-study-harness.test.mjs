import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, mkdir, readFile, rename, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { buildOfflineHarness } from "../tooling/build-offline-study-harness.mjs";
import { applyHarnessAction, createHarnessState, exportSyntheticResult } from "../tooling/offline-harness-state.mjs";
import { buildPrivateScoringKey, validateSyntheticExport } from "../tooling/validate-synthetic-study-export.mjs";

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const records = ["high-pass", "low-pass", "band-pass", "band-stop", "low-shelf", "high-shelf"];
const choices = [...records, "none", "unknown"];

function fixtureInstrument() {
  const tokens = records.map((_, index) => `opaque-token-${index + 1}`);
  return {
    package_schema_version: "0.2.0",
    construction_status: "construction-only",
    participant_prompt: "Which filter response is the best match?",
    study_id: "synthetic-fixture",
    stimuli: tokens.map((token) => ({ token, asset: `assets/${token}.svg`, sha256: null })),
    forced_choices: choices.map((id) => ({ id, label: id.replaceAll("-", " ") })),
    forms: [{
      form: "001",
      stimulus_order: tokens,
      choice_order_by_stimulus: Object.fromEntries(tokens.map((token, index) => [token, [...choices.slice(index), ...choices.slice(0, index)]])),
    }],
  };
}

async function fixturePackage() {
  const root = await mkdtemp(join(tmpdir(), "asr-offline-harness-"));
  const publicDirectory = join(root, "public");
  await mkdir(join(publicDirectory, "assets"), { recursive: true });
  const instrument = fixtureInstrument();
  for (const stimulus of instrument.stimuli) {
    const bytes = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M8 32H56"/></svg>');
    stimulus.sha256 = sha256(bytes);
    await writeFile(join(publicDirectory, stimulus.asset), bytes);
  }
  await writeFile(join(publicDirectory, "instrument.json"), `${JSON.stringify(instrument, null, 2)}\n`);
  return { root, publicDirectory, instrument };
}

test("state machine blocks forced-choice labels until all six unprompted answers", () => {
  const instrument = fixtureInstrument();
  const state = createHarnessState(instrument, "001");
  assert.equal(state.phase, "free-text");
  assert.throws(() => applyHarnessAction(state, { type: "answer-forced-choice", choice_id: "high-pass", confidence: 5 }, instrument), /not allowed/);
  for (let index = 0; index < 5; index += 1) {
    applyHarnessAction(state, { type: "answer-free-text", text: `synthetic answer ${index}`, unknown: false }, instrument);
    assert.equal(state.phase, "free-text");
  }
  assert.throws(() => applyHarnessAction(state, { type: "answer-free-text", text: "text", unknown: true }, instrument), /either free text/);
  applyHarnessAction(state, { type: "answer-free-text", text: "", unknown: true }, instrument);
  assert.equal(state.phase, "forced-choice");
  assert.equal(state.free_text.length, 6);
});

test("state machine requires six forced choices, confidence, and one terminal contamination answer", () => {
  const instrument = fixtureInstrument();
  const state = createHarnessState(instrument, "001");
  for (let index = 0; index < 6; index += 1) applyHarnessAction(state, { type: "answer-free-text", text: "synthetic", unknown: false }, instrument);
  assert.throws(() => applyHarnessAction(state, { type: "answer-forced-choice", choice_id: "high-pass", confidence: 0 }, instrument), /confidence/);
  for (let index = 0; index < 6; index += 1) applyHarnessAction(state, { type: "answer-forced-choice", choice_id: "unknown", confidence: 1 }, instrument);
  assert.equal(state.phase, "contamination");
  assert.throws(() => exportSyntheticResult(state), /incomplete/);
  applyHarnessAction(state, { type: "answer-contamination", flag: "no", note: "" }, instrument);
  const result = exportSyntheticResult(state);
  assert.equal(result.synthetic_validation, true);
  assert.equal(result.free_text.length, 6);
  assert.equal(result.forced_choice.length, 6);
  assert.deepEqual(result.contamination, { flag: "no", note: null });
  assert.throws(() => applyHarnessAction(state, { type: "answer-contamination", flag: "no" }, instrument), /not allowed/);
});

test("builder emits one self-contained offline page and no answer-bearing or persistence tree", async () => {
  const { root, publicDirectory } = await fixturePackage();
  const output = join(root, "harness");
  const manifest = await buildOfflineHarness(publicDirectory, output, "001");
  const html = await readFile(join(output, "index.html"), "utf8");
  assert.equal(manifest.network_listener, false);
  assert.equal(manifest.persistent_storage, false);
  assert.equal(manifest.real_participant_data_authorized, false);
  assert.match(html, /Content-Security-Policy/);
  assert.match(html, /connect-src 'none'/);
  assert.match(html, /PRIVATE OFFLINE SYNTHETIC VALIDATION ONLY/);
  assert.match(html, /focus-visible/);
  assert.match(html, /aria-live="assertive"/);
  assert.match(html, /width: min\(48rem, 100%\)/);
  assert.doesNotMatch(html, /localStorage|sessionStorage|indexedDB|serviceWorker|fetch\(|XMLHttpRequest|WebSocket/);
  await assert.rejects(readFile(join(output, "private", "answer-key.json")));
  await assert.rejects(buildOfflineHarness(publicDirectory, output, "001"));
});

test("builder rejects a stimulus whose bytes no longer match the public manifest", async () => {
  const { root, publicDirectory, instrument } = await fixturePackage();
  await writeFile(join(publicDirectory, instrument.stimuli[0].asset), "tampered");
  await assert.rejects(buildOfflineHarness(publicDirectory, join(root, "harness"), "001"), /hash mismatch/);
});

test("private scoring-key commitment and synthetic analysis remain deterministic", () => {
  const instrument = fixtureInstrument();
  const recordIds = records.map((name) => `asr:filter.${name}`);
  const answerKey = {
    package_schema_version: instrument.package_schema_version,
    study_id: instrument.study_id,
    stimuli: instrument.stimuli.map(({ token }, index) => ({ token, record_id: recordIds[index] })),
  };
  const state = createHarnessState(instrument, "001");
  for (const name of records) applyHarnessAction(state, { type: "answer-free-text", text: name.replace("-", " "), unknown: false }, instrument);
  for (const name of records) applyHarnessAction(state, { type: "answer-forced-choice", choice_id: name, confidence: 5 }, instrument);
  applyHarnessAction(state, { type: "answer-contamination", flag: "unsure", note: "" }, instrument);
  const exported = exportSyntheticResult(state);
  const result = validateSyntheticExport(exported, answerKey, instrument);
  assert.equal(result.free_text_exact, 6);
  assert.equal(result.forced_choice_correct, 6);
  assert.equal(result.item_count, 6);
  assert.equal(result.scoring_key_sha256, buildPrivateScoringKey(answerKey).sha256);
  assert.match(result.scoring_key_sha256, /^[0-9a-f]{64}$/);

  for (const mutation of [
    (copy) => { copy.forced_choice[0].forced_choice_id = "bogus"; },
    (copy) => { copy.forced_choice[0].confidence = 999; },
    (copy) => { copy.forced_choice[0].displayed_choice_order = ["bogus"]; },
    (copy) => { copy.forced_choice[0].displayed_choice_order.push("bogus"); },
    (copy) => { copy.free_text[0].unknown = true; },
    (copy) => { copy.contamination = { flag: "invalid", note: null }; },
    (copy) => { copy.contamination = { flag: "no", note: "not allowed" }; },
    (copy) => { copy.form = "999"; },
  ]) {
    const copy = structuredClone(exported);
    mutation(copy);
    assert.throws(() => validateSyntheticExport(copy, answerKey, instrument));
  }
});

test("builder rejects traversal and symlink stimulus paths even with a matching hash", async () => {
  const { root, publicDirectory, instrument } = await fixturePackage();
  const secret = Buffer.from("PRIVATE ANSWER KEY CONTENT");
  await writeFile(join(root, "secret.svg"), secret);
  instrument.stimuli[0].asset = "../secret.svg";
  instrument.stimuli[0].sha256 = sha256(secret);
  await writeFile(join(publicDirectory, "instrument.json"), `${JSON.stringify(instrument, null, 2)}\n`);
  await assert.rejects(buildOfflineHarness(publicDirectory, join(root, "traversal-harness"), "001"), /asset path must be exactly/);

  const second = await fixturePackage();
  const externalAssets = join(second.root, "external-assets");
  await rename(join(second.publicDirectory, "assets"), externalAssets);
  await symlink(externalAssets, join(second.publicDirectory, "assets"), "dir");
  await assert.rejects(buildOfflineHarness(second.publicDirectory, join(second.root, "symlink-harness"), "001"), /escapes the public package directory/);
});
