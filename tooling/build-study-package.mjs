import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash, createHmac } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const stableJson = (value) => `${JSON.stringify(value, null, 2)}\n`;

function fail(message) {
  throw new Error(message);
}

function requireString(value, field) {
  if (typeof value !== "string" || value.length === 0) fail(`${field} must be a non-empty string`);
  return value;
}

function deterministicOrder(items, seed, context) {
  return [...items]
    .map((item) => ({
      item,
      key: createHmac("sha256", seed).update(`${context}\0${item}`).digest("hex"),
    }))
    .sort((left, right) => left.key.localeCompare(right.key))
    .map(({ item }) => item);
}

function opaqueToken(seed, recordId) {
  return createHmac("sha256", seed).update(`stimulus\0${recordId}`).digest("hex").slice(0, 20);
}

export async function buildStudyPackage(planPath, outputPath) {
  const absolutePlan = resolve(planPath);
  const planDirectory = dirname(absolutePlan);
  const outputDirectory = resolve(outputPath);
  const plan = JSON.parse(await readFile(absolutePlan, "utf8"));
  const studyId = requireString(plan.study_id, "study_id");
  const seed = requireString(plan.randomization_seed, "randomization_seed");
  if (Buffer.byteLength(seed, "utf8") < 32) fail("randomization_seed must contain at least 32 UTF-8 bytes");
  if (!Number.isInteger(plan.form_count) || plan.form_count < 1) fail("form_count must be a positive integer");
  if (!Array.isArray(plan.stimuli) || plan.stimuli.length < 2) fail("stimuli must contain at least two entries");
  if (!Array.isArray(plan.forced_choices) || plan.forced_choices.length < 2) fail("forced_choices must contain at least two entries");

  const recordIds = new Set();
  const tokens = new Set();
  const publicStimuli = [];
  const privateStimuli = [];
  const assetWrites = [];

  for (const [index, stimulus] of plan.stimuli.entries()) {
    const recordId = requireString(stimulus.record_id, `stimuli[${index}].record_id`);
    if (recordIds.has(recordId)) fail(`duplicate record_id: ${recordId}`);
    recordIds.add(recordId);
    const sourcePath = resolve(planDirectory, requireString(stimulus.blind_svg_path, `stimuli[${index}].blind_svg_path`));
    const bytes = await readFile(sourcePath);
    const sourceText = bytes.toString("utf8").toLowerCase();
    const forbiddenTerms = [recordId, ...(stimulus.forbidden_terms ?? [])]
      .map((term) => requireString(term, `stimuli[${index}].forbidden_terms`).toLowerCase());
    for (const term of forbiddenTerms) {
      if (sourceText.includes(term)) fail(`blind SVG for ${recordId} contains forbidden term: ${term}`);
    }
    const token = opaqueToken(seed, recordId);
    if (tokens.has(token)) fail(`opaque token collision for ${recordId}`);
    tokens.add(token);
    const filename = `${token}.svg`;
    const digest = sha256(bytes);
    publicStimuli.push({ token, asset: `assets/${filename}`, sha256: digest });
    privateStimuli.push({ token, record_id: recordId, source_path: stimulus.blind_svg_path, sha256: digest });
    assetWrites.push({ sourcePath, filename });
  }

  const publicChoices = plan.forced_choices.map((choice, index) => ({
    id: requireString(choice.id, `forced_choices[${index}].id`),
    label: requireString(choice.label, `forced_choices[${index}].label`),
  }));
  const choiceIds = publicChoices.map(({ id }) => id);
  if (new Set(choiceIds).size !== choiceIds.length) fail("forced choice IDs must be unique");

  const forms = Array.from({ length: plan.form_count }, (_, index) => {
    const form = String(index + 1).padStart(3, "0");
    return {
      form,
      stimulus_order: deterministicOrder([...tokens], seed, `form:${form}:stimuli`),
      choice_order_by_stimulus: Object.fromEntries(
        [...tokens].map((token) => [token, deterministicOrder(choiceIds, seed, `form:${form}:choices:${token}`)]),
      ),
    };
  });

  const publicInstrument = {
    package_schema_version: "0.1.0",
    study_id: studyId,
    stimuli: publicStimuli,
    forced_choices: publicChoices,
    forms,
  };
  const privateKey = {
    package_schema_version: "0.1.0",
    study_id: studyId,
    randomization_seed: seed,
    stimuli: privateStimuli,
  };

  await mkdir(outputDirectory, { recursive: false });
  await mkdir(join(outputDirectory, "public", "assets"), { recursive: true });
  await mkdir(join(outputDirectory, "private"), { recursive: false });
  await Promise.all(assetWrites.map(({ sourcePath, filename }) =>
    copyFile(sourcePath, join(outputDirectory, "public", "assets", filename))));
  await writeFile(join(outputDirectory, "public", "instrument.json"), stableJson(publicInstrument));
  await writeFile(join(outputDirectory, "private", "answer-key.json"), stableJson(privateKey));
  return { publicInstrument, privateKey };
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length !== 4 || args[0] !== "--plan" || args[2] !== "--out") {
    fail("usage: node tooling/build-study-package.mjs --plan PLAN.json --out NEW_DIRECTORY");
  }
  await buildStudyPackage(args[1], args[3]);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
