import { createHash } from "node:crypto";
import { lstat, mkdir, readFile, realpath, writeFile } from "node:fs/promises";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const stableJson = (value) => `${JSON.stringify(value, null, 2)}\n`;

function fail(message) {
  throw new Error(message);
}

function escapeScriptJson(value) {
  return JSON.stringify(value).replaceAll("<", "\\u003c").replaceAll(">", "\\u003e").replaceAll("&", "\\u0026");
}

function validatePublicInstrument(instrument, formId) {
  if (instrument.package_schema_version !== "0.2.0" || instrument.construction_status !== "construction-only") {
    fail("offline validation requires a construction-only package schema 0.2.0 instrument");
  }
  if (instrument.stimuli?.length !== 6 || new Set(instrument.stimuli.map(({ token }) => token)).size !== 6) {
    fail("offline validation requires exactly six unique stimuli");
  }
  if (instrument.forced_choices?.length !== 8 || new Set(instrument.forced_choices.map(({ id }) => id)).size !== 8) {
    fail("offline validation requires exactly eight unique forced choices");
  }
  const form = instrument.forms?.find(({ form }) => form === formId);
  if (!form) fail(`form ${formId} does not exist`);
  const tokens = new Set(instrument.stimuli.map(({ token }) => token));
  if (form.stimulus_order.length !== 6 || form.stimulus_order.some((token) => !tokens.has(token))) {
    fail(`form ${formId} has an invalid stimulus order`);
  }
  for (const token of tokens) {
    const order = form.choice_order_by_stimulus?.[token];
    if (!Array.isArray(order) || order.length !== 8 || new Set(order).size !== 8) {
      fail(`form ${formId} has an invalid choice order for ${token}`);
    }
  }
}

function validateBlindSvg(bytes, token) {
  const source = bytes.toString("utf8");
  if (!Buffer.from(source, "utf8").equals(bytes)) fail(`stimulus is not canonical UTF-8: ${token}`);
  if (!/^<svg\s[^>]*xmlns="http:\/\/www\.w3\.org\/2000\/svg"[^>]*viewBox="[^"]+"[^>]*>[\s\S]*<\/svg>\s*$/.test(source)) {
    fail(`stimulus is not a standalone SVG: ${token}`);
  }
  if (/<\/?(?!svg\b|path\b|line\b|polyline\b|circle\b)[A-Za-z][^>]*>|<\?(?:xml)?|<!|<!--|\bon[a-z]+\s*=|\b(?:href|id|role|aria-[\w-]+)\s*=|url\s*\(/i.test(source)) {
    fail(`stimulus contains prohibited SVG structure or metadata: ${token}`);
  }
}

const STYLE = `
:root { color-scheme: light; font: 112.5%/1.5 system-ui, sans-serif; background: #f3f5f7; color: #17202a; }
* { box-sizing: border-box; }
body { margin: 0; }
main { width: min(48rem, 100%); margin: 0 auto; padding: clamp(1rem, 4vw, 3rem); }
.notice { border: 3px solid #7a4100; background: #fff4d8; padding: 1rem; font-weight: 700; }
.progress { margin-block: 1.5rem .5rem; color: #36454f; }
.card { background: #fff; border: 2px solid #506070; border-radius: .75rem; padding: clamp(1rem, 4vw, 2rem); box-shadow: 0 .25rem .8rem #17202a20; }
.stimulus { display: block; width: min(16rem, 80vw); height: auto; margin: 1rem auto 2rem; }
fieldset { border: 0; padding: 0; margin: 1rem 0; }
legend { font-weight: 700; margin-bottom: .5rem; }
label { display: block; padding: .35rem 0; }
textarea { display: block; width: 100%; min-height: 7rem; font: inherit; border: 2px solid #506070; border-radius: .35rem; padding: .65rem; }
button { font: inherit; font-weight: 700; border: 2px solid #173f70; border-radius: .35rem; background: #175ca8; color: #fff; padding: .65rem 1rem; cursor: pointer; }
button:hover { background: #11487f; }
button:focus-visible, input:focus-visible, textarea:focus-visible { outline: .25rem solid #ffbf47; outline-offset: .2rem; }
.error { color: #8a1c0d; font-weight: 700; min-height: 1.5em; }
.hidden { display: none !important; }
.choice { border: 1px solid #bcc6cf; border-radius: .35rem; margin: .4rem 0; padding: .55rem; }
.confidence { display: grid; grid-template-columns: repeat(5, minmax(2.75rem, 1fr)); gap: .35rem; }
.confidence label { text-align: center; border: 1px solid #bcc6cf; border-radius: .35rem; }
.endpoints { display: flex; justify-content: space-between; gap: 1rem; font-size: .88rem; }
.export { overflow-wrap: anywhere; min-height: 14rem; }
@media (forced-colors: active) { .card, button, textarea, .choice { border-color: CanvasText; } }
@media (max-width: 24rem) { :root { font-size: 100%; } .confidence { grid-template-columns: 1fr; } .confidence label { text-align: left; } }
`;

function runtimeSource(stateSource, payload) {
  return `${stateSource.replace(/^export /gm, "")}
const PAYLOAD = ${escapeScriptJson(payload)};
const instrument = PAYLOAD.instrument;
const stimulusByToken = new Map(PAYLOAD.stimuli.map((item) => [item.token, item]));
const choiceById = new Map(instrument.forced_choices.map((choice) => [choice.id, choice]));
let state = createHarnessState(instrument, PAYLOAD.form);
const card = document.querySelector("#task-card");
const progress = document.querySelector("#progress");
const error = document.querySelector("#error");
const phaseTitle = document.querySelector("#phase-title");

function escapeHtml(value) {
  return String(value).replace(/[&<>\"]/g, (character) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[character]);
}
function setError(message) { error.textContent = message; error.focus(); }
function render() {
  error.textContent = "";
  if (state.phase === "free-text") renderFreeText();
  else if (state.phase === "forced-choice") renderForcedChoice();
  else if (state.phase === "contamination") renderContamination();
  else renderComplete();
  phaseTitle.focus();
}
function stimulusHtml(token) {
  const item = stimulusByToken.get(token);
  return '<img class="stimulus" alt="Unlabeled test symbol" src="data:image/svg+xml;base64,' + item.base64 + '">';
}
function renderFreeText() {
  phaseTitle.textContent = "Unprompted meaning";
  progress.textContent = 'Phase 1 of 3: symbol ' + (state.position + 1) + ' of 6';
  const token = state.stimulus_order[state.position];
  card.innerHTML = stimulusHtml(token) + '<form id="task"><label for="meaning"><strong>In an audio or synthesis context, what do you think this symbol means?</strong></label><textarea id="meaning" autocomplete="off"></textarea><label><input id="unknown" type="checkbox"> I do not know</label><button type="submit">Save and continue</button></form>';
  const text = document.querySelector("#meaning");
  const unknown = document.querySelector("#unknown");
  unknown.addEventListener("change", () => { text.disabled = unknown.checked; if (unknown.checked) text.value = ""; });
  document.querySelector("#task").addEventListener("submit", (event) => {
    event.preventDefault();
    try { applyHarnessAction(state, {type:"answer-free-text", text:text.value, unknown:unknown.checked}, instrument); render(); }
    catch (problem) { setError(problem.message); }
  });
}
function renderForcedChoice() {
  phaseTitle.textContent = "Forced recognition and confidence";
  progress.textContent = 'Phase 2 of 3: symbol ' + (state.position + 1) + ' of 6';
  const token = state.stimulus_order[state.position];
  const order = instrument.forms.find((form) => form.form === state.form).choice_order_by_stimulus[token];
  const choices = order.map((id) => '<label class="choice"><input required type="radio" name="choice" value="' + escapeHtml(id) + '"> ' + escapeHtml(choiceById.get(id).label) + '</label>').join("");
  const confidence = [1,2,3,4,5].map((value) => '<label><input required type="radio" name="confidence" value="' + value + '"> ' + value + '</label>').join("");
  card.innerHTML = stimulusHtml(token) + '<form id="task"><fieldset><legend>' + escapeHtml(instrument.participant_prompt) + '</legend>' + choices + '</fieldset><fieldset aria-describedby="confidence-help"><legend>How confident are you in your answer?</legend><div class="confidence">' + confidence + '</div><p id="confidence-help">1 is not at all confident; 5 is very confident.</p></fieldset><button type="submit">Save and continue</button></form>';
  document.querySelector("#task").addEventListener("submit", (event) => {
    event.preventDefault();
    const choice = new FormData(event.currentTarget).get("choice");
    const confidenceValue = Number(new FormData(event.currentTarget).get("confidence"));
    try { applyHarnessAction(state, {type:"answer-forced-choice", choice_id:choice, confidence:confidenceValue}, instrument); render(); }
    catch (problem) { setError(problem.message); }
  });
}
function renderContamination() {
  phaseTitle.textContent = "Prior recognition";
  progress.textContent = "Phase 3 of 3: one question";
  card.innerHTML = '<form id="task"><fieldset><legend>Before this validation, did you recognize any symbol from a specific product or interface?</legend><label><input required type="radio" name="flag" value="yes"> Yes</label><label><input required type="radio" name="flag" value="no"> No</label><label><input required type="radio" name="flag" value="unsure"> Not sure</label></fieldset><label for="note">If yes, which symbol or product? Do not include personal information.</label><textarea id="note"></textarea><button type="submit">Simulate submission</button></form>';
  document.querySelector("#task").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try { applyHarnessAction(state, {type:"answer-contamination", flag:data.get("flag"), note:data.get("flag") === "yes" ? document.querySelector("#note").value : ""}, instrument); render(); }
    catch (problem) { setError(problem.message); }
  });
}
async function renderComplete() {
  phaseTitle.textContent = "Synthetic submission complete";
  progress.textContent = "Validation run complete";
  const result = exportSyntheticResult(state);
  const serialized = JSON.stringify(result, null, 2);
  card.innerHTML = '<p>No response was transmitted or written to persistent browser storage. Reloading clears this in-memory synthetic run.</p><label for="export"><strong>Synthetic export preview</strong></label><textarea id="export" class="export" readonly></textarea><p id="receipt">Computing local receipt...</p><button id="restart" type="button">Clear and restart</button>';
  document.querySelector("#export").value = serialized;
  if (globalThis.crypto?.subtle) {
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(serialized));
    document.querySelector("#receipt").textContent = "Local SHA-256 receipt: " + [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2,"0")).join("");
  } else document.querySelector("#receipt").textContent = "Receipt unavailable in this local browser context.";
  document.querySelector("#restart").addEventListener("click", () => { state = createHarnessState(instrument, PAYLOAD.form); render(); });
}
window.addEventListener("beforeunload", () => { state = null; });
render();
`;
}

export async function buildOfflineHarness(publicDirectory, outputDirectory, formId) {
  const sourceDirectory = resolve(publicDirectory);
  const sourceRealPath = await realpath(sourceDirectory);
  const output = resolve(outputDirectory);
  const instrumentBytes = await readFile(join(sourceDirectory, "instrument.json"));
  const instrument = JSON.parse(instrumentBytes.toString("utf8"));
  validatePublicInstrument(instrument, formId);
  const stimuli = [];
  for (const stimulus of instrument.stimuli) {
    const expectedAsset = `assets/${stimulus.token}.svg`;
    if (stimulus.asset !== expectedAsset) fail(`stimulus asset path must be exactly ${expectedAsset}`);
    const assetPath = join(sourceDirectory, stimulus.asset);
    const assetStat = await lstat(assetPath);
    if (!assetStat.isFile() || assetStat.isSymbolicLink()) fail(`stimulus must be a regular non-symlink file: ${stimulus.token}`);
    const assetRealPath = await realpath(assetPath);
    const fromPublic = relative(sourceRealPath, assetRealPath);
    if (fromPublic.startsWith("..") || fromPublic === "" || resolve(sourceRealPath, fromPublic) !== assetRealPath) {
      fail(`stimulus escapes the public package directory: ${stimulus.token}`);
    }
    const bytes = await readFile(assetRealPath);
    if (sha256(bytes) !== stimulus.sha256) fail(`stimulus hash mismatch: ${stimulus.token}`);
    validateBlindSvg(bytes, stimulus.token);
    stimuli.push({ token: stimulus.token, base64: bytes.toString("base64") });
  }
  const stateSource = await readFile(new URL("./offline-harness-state.mjs", import.meta.url), "utf8");
  const runtime = runtimeSource(stateSource, { instrument, form: formId, stimuli });
  const styleHash = Buffer.from(createHash("sha256").update(STYLE).digest()).toString("base64");
  const scriptHash = Buffer.from(createHash("sha256").update(runtime).digest()).toString("base64");
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data:; connect-src 'none'; form-action 'none'; base-uri 'none'; style-src 'sha256-${styleHash}'; script-src 'sha256-${scriptHash}'"><title>Offline synthetic recognition validation</title><style>${STYLE}</style></head>
<body><main><p class="notice">PRIVATE OFFLINE SYNTHETIC VALIDATION ONLY. Do not enter real participant data.</p><p id="progress" class="progress"></p><h1 id="phase-title" tabindex="-1"></h1><p id="error" class="error" role="alert" tabindex="-1" aria-live="assertive"></p><section id="task-card" class="card" aria-labelledby="phase-title"></section><noscript>This validation harness requires JavaScript.</noscript></main><script>${runtime}</script></body></html>\n`;
  await mkdir(output, { recursive: false, mode: 0o700 });
  await writeFile(join(output, "index.html"), html, { flag: "wx", mode: 0o600 });
  const manifest = {
    harness_schema_version: "0.1.0",
    construction_status: "private-offline-synthetic-validation-only",
    form: formId,
    instrument_sha256: sha256(instrumentBytes),
    index_sha256: sha256(html),
    stimulus_count: 6,
    free_text_before_forced_choice: true,
    contamination_once_at_end: true,
    network_listener: false,
    persistent_storage: false,
    real_participant_data_authorized: false,
  };
  await writeFile(join(output, "manifest.json"), stableJson(manifest), { flag: "wx", mode: 0o600 });
  return manifest;
}

function parseArguments(argv) {
  const values = {};
  for (let index = 0; index < argv.length; index += 2) {
    if (!argv[index]?.startsWith("--") || argv[index + 1] === undefined) fail("arguments must be --name value pairs");
    values[argv[index].slice(2)] = argv[index + 1];
  }
  if (!values.public || !values.out || !values.form) fail("usage: --public package/public --out new-directory --form 001");
  return values;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const args = parseArguments(process.argv.slice(2));
  buildOfflineHarness(args.public, args.out, args.form)
    .then((manifest) => process.stdout.write(`${stableJson(manifest)}`))
    .catch((error) => { process.stderr.write(`${basename(process.argv[1])}: ${error.message}\n`); process.exitCode = 1; });
}
