import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const CHOICE_BY_RECORD = new Map([
  ["asr:filter.high-pass", "high-pass"],
  ["asr:filter.low-pass", "low-pass"],
  ["asr:filter.band-pass", "band-pass"],
  ["asr:filter.band-stop", "band-stop"],
  ["asr:filter.low-shelf", "low-shelf"],
  ["asr:filter.high-shelf", "high-shelf"],
]);
const FREE_TEXT_BY_RECORD = new Map([
  ["asr:filter.high-pass", ["high-pass", "high pass", "low cut", "hpf"]],
  ["asr:filter.low-pass", ["low-pass", "low pass", "high cut", "lpf"]],
  ["asr:filter.band-pass", ["band-pass", "band pass", "bpf"]],
  ["asr:filter.band-stop", ["band-stop", "band stop", "band-reject"]],
  ["asr:filter.low-shelf", ["low shelf", "low-shelf filter"]],
  ["asr:filter.high-shelf", ["high shelf", "high-shelf filter"]],
]);

function fail(message) { throw new Error(message); }
const stableJson = (value) => `${JSON.stringify(value, null, 2)}\n`;

export function buildPrivateScoringKey(answerKey) {
  const mappings = answerKey.stimuli;
  if (!Array.isArray(mappings) || mappings.length !== 6) fail("answer key must contain exactly six stimuli");
  const rows = mappings.map(({ token, record_id }) => {
    if (typeof token !== "string" || token.length === 0) fail("answer-key tokens must be non-empty strings");
    if (!CHOICE_BY_RECORD.has(record_id)) fail(`unsupported record in answer key: ${record_id}`);
    return {
      opaque_stimulus_token: token,
      record_id,
      correct_forced_choice_id: CHOICE_BY_RECORD.get(record_id),
      exact_free_text_normalized: FREE_TEXT_BY_RECORD.get(record_id),
    };
  }).sort((left, right) => left.opaque_stimulus_token.localeCompare(right.opaque_stimulus_token));
  if (new Set(rows.map(({ opaque_stimulus_token }) => opaque_stimulus_token)).size !== 6) fail("answer-key tokens must be unique");
  if (new Set(rows.map(({ record_id }) => record_id)).size !== CHOICE_BY_RECORD.size) fail("answer key must cover each supported record exactly once");
  const key = { scoring_key_schema_version: "0.1.0", rows };
  return { key, sha256: sha256(stableJson(key)) };
}

export function validateSyntheticExport(result, answerKey, instrument) {
  if (result.synthetic_validation !== true || result.export_schema_version !== "0.1.0") fail("export is not an authorized synthetic-validation export");
  if (result.study_id !== answerKey.study_id) fail("export and answer key study IDs differ");
  if (!instrument || instrument.study_id !== answerKey.study_id || instrument.package_schema_version !== answerKey.package_schema_version) {
    fail("public instrument does not match the private answer key");
  }
  if (result.package_schema_version !== instrument.package_schema_version) fail("export package schema differs from the instrument");
  const form = instrument.forms?.find(({ form }) => form === result.form);
  if (!form) fail("export form does not exist in the public instrument");
  if (result.free_text?.length !== 6 || result.forced_choice?.length !== 6) fail("export must contain six answers in each phase");
  const { key, sha256: scoringKeySha256 } = buildPrivateScoringKey(answerKey);
  const keyed = new Map(key.rows.map((row) => [row.opaque_stimulus_token, row]));
  const freeTokens = result.free_text.map(({ opaque_stimulus_token }) => opaque_stimulus_token);
  const forcedTokens = result.forced_choice.map(({ opaque_stimulus_token }) => opaque_stimulus_token);
  if (new Set(freeTokens).size !== 6 || new Set(forcedTokens).size !== 6 || freeTokens.some((token) => !keyed.has(token)) || forcedTokens.some((token) => !keyed.has(token))
    || freeTokens.some((token, index) => token !== form.stimulus_order[index]) || forcedTokens.some((token, index) => token !== form.stimulus_order[index])) {
    fail("export tokens do not match the private scoring key");
  }
  for (const row of result.free_text) {
    if (typeof row.unknown !== "boolean") fail("free-text unknown must be boolean");
    const hasText = typeof row.response_text === "string" && row.response_text.trim().length > 0;
    if (row.unknown === hasText || (row.unknown && row.response_text !== null)) fail("free-text rows require exactly one of response text or unknown");
  }
  const canonicalChoices = instrument.forced_choices?.map(({ id }) => id);
  const expectedChoices = new Set([...CHOICE_BY_RECORD.values(), "none", "unknown"]);
  if (!Array.isArray(canonicalChoices) || canonicalChoices.length !== expectedChoices.size || new Set(canonicalChoices).size !== expectedChoices.size
    || canonicalChoices.some((id) => !expectedChoices.has(id))) fail("instrument forced choices are invalid");
  for (const row of result.forced_choice) {
    const offered = form.choice_order_by_stimulus?.[row.opaque_stimulus_token];
    if (!Array.isArray(offered) || offered.length !== 8 || row.displayed_choice_order?.length !== 8 || offered.some((id, index) => row.displayed_choice_order[index] !== id)
      || !canonicalChoices.includes(row.forced_choice_id) || !offered.includes(row.forced_choice_id)) {
      fail("forced-choice row differs from the offered form");
    }
    if (!Number.isInteger(row.confidence) || row.confidence < 1 || row.confidence > 5) fail("forced-choice confidence must be an integer from 1 through 5");
  }
  if (!["yes", "no", "unsure"].includes(result.contamination?.flag)) fail("contamination flag must be yes, no, or unsure");
  const note = result.contamination?.note;
  if (result.contamination.flag === "yes") {
    if (!(note === null || (typeof note === "string" && note.trim().length > 0))) fail("yes contamination note must be null or non-empty text");
  } else if (note !== null) fail("contamination note must be null unless the flag is yes");
  const freeTextExact = result.free_text.reduce((count, row) => {
    if (row.unknown === true) return count;
    const normalized = row.response_text?.trim().toLowerCase();
    return count + (keyed.get(row.opaque_stimulus_token).exact_free_text_normalized.includes(normalized) ? 1 : 0);
  }, 0);
  const forcedCorrect = result.forced_choice.reduce((count, row) => count + (
    keyed.get(row.opaque_stimulus_token).correct_forced_choice_id === row.forced_choice_id ? 1 : 0
  ), 0);
  return {
    validation_schema_version: "0.1.0",
    synthetic_validation: true,
    scoring_key_sha256: scoringKeySha256,
    free_text_exact: freeTextExact,
    forced_choice_correct: forcedCorrect,
    item_count: 6,
    contamination_flag: result.contamination?.flag ?? null,
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const argumentsByName = Object.fromEntries(Array.from({ length: process.argv.slice(2).length / 2 }, (_, index) => process.argv.slice(2).slice(index * 2, index * 2 + 2)).map(([name, value]) => [name?.replace(/^--/, ""), value]));
  if (!argumentsByName.export || !argumentsByName["answer-key"] || !argumentsByName.instrument) {
    process.stderr.write("usage: --export synthetic-export.json --answer-key private/answer-key.json --instrument public/instrument.json\n");
    process.exitCode = 1;
  } else {
    Promise.all([readFile(resolve(argumentsByName.export), "utf8"), readFile(resolve(argumentsByName["answer-key"]), "utf8"), readFile(resolve(argumentsByName.instrument), "utf8")])
      .then(([result, key, instrument]) => process.stdout.write(stableJson(validateSyntheticExport(JSON.parse(result), JSON.parse(key), JSON.parse(instrument)))))
      .catch((error) => { process.stderr.write(`${error.message}\n`); process.exitCode = 1; });
  }
}
