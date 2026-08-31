import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash, createHmac } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { validateStudySvgBytes } from "./validate-study-svg.mjs";

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const stableJson = (value) => `${JSON.stringify(value, null, 2)}\n`;
const SHA256 = /^[0-9a-f]{64}$/;
const COMMIT = /^[0-9a-f]{40}$/;
const LOCK_SOURCE_COMMIT = "4ad8ec92477a938355df06bc943a57372c7f3438";
const SIX_RECORDS = new Set([
  "asr:filter.high-pass",
  "asr:filter.low-pass",
  "asr:filter.band-pass",
  "asr:filter.band-stop",
  "asr:filter.low-shelf",
  "asr:filter.high-shelf",
]);
const SIX_CHOICES = new Map([
  ["high-pass", "High-pass filter"],
  ["low-pass", "Low-pass filter"],
  ["band-pass", "Band-pass filter"],
  ["band-stop", "Band-stop filter"],
  ["low-shelf", "Low-shelf filter"],
  ["high-shelf", "High-shelf filter"],
  ["none", "None of these"],
  ["unknown", "I do not know"],
]);
const DIRECTED_CONTROLS = new Map([
  ["asr:filter.low-shelf", "high-pass"],
  ["asr:filter.high-shelf", "low-pass"],
  ["asr:filter.high-pass", "low-shelf"],
  ["asr:filter.low-pass", "high-shelf"],
  ["asr:filter.band-pass", "band-stop"],
  ["asr:filter.band-stop", "band-pass"],
]);
const PRIMING = /(?:\bboost\b|\bcut\b|positive[\s_-]*gain|negative[\s_-]*gain|gain[\s_-]*magnitude|0\s*dB|zero[\s_-]*dB|base[\s_-]*line|upper[\s_-]*branch|lower[\s_-]*branch|low[\s_-]*cut|high[\s_-]*cut)/i;

function fail(message) {
  throw new Error(message);
}

function requireString(value, field) {
  if (typeof value !== "string" || value.length === 0) fail(`${field} must be a non-empty string`);
  return value;
}

function requireExactSet(actual, expected, field) {
  if (actual.length !== expected.size || new Set(actual).size !== actual.length
    || actual.some((value) => !expected.has(value))) {
    fail(`${field} must contain exactly the required unique values`);
  }
}

function yamlQuotedValue(text, key, field) {
  const matches = [...text.matchAll(new RegExp(`^\\s*${key}:\\s*"([^"]+)"\\s*$`, "gm"))];
  if (matches.length !== 1) fail(`${field} must declare ${key} exactly once as a quoted scalar`);
  return matches[0][1];
}

function requireRepositoryPath(value, field) {
  requireString(value, field);
  if (value.startsWith("/") || value.includes("\\") || value.split("/").includes("..") || value.split("/").includes(".")) {
    fail(`${field} must be a normalized repository-relative POSIX path`);
  }
  return value;
}

function blindDerivative(sourceBytes) {
  validateStudySvgBytes(sourceBytes);
  const source = sourceBytes.toString("utf8");
  const derivative = source
    .replace(/\s+role="img"/, "")
    .replace(/\s+aria-labelledby="[^"]+"/, "")
    .replace(/\s*<title\b[^>]*>[\s\S]*?<\/title>\s*/g, "\n")
    .replace(/\s*<desc\b[^>]*>[\s\S]*?<\/desc>\s*/g, "\n");
  if (/<(?:title|desc)\b|aria-|\brole=|\bid=|<\?xml|<!--|<!DOCTYPE/i.test(derivative)) {
    fail("blind derivative retains prohibited metadata");
  }
  return Buffer.from(derivative, "utf8");
}

async function loadLockedBinding(plan, planDirectory, readBytes) {
  const bindingPath = resolve(planDirectory, requireString(plan.binding_manifest_path, "binding_manifest_path"));
  const binding = JSON.parse(await readBytes(bindingPath, "utf8"));
  if (binding.binding_schema_version !== "0.1.0") fail("unsupported binding_schema_version");
  if (binding.construction_status !== "construction-only") fail("binding must remain construction-only");
  if (binding.candidate_family_id !== "compact-a") fail("binding must use compact-a");
  if (!COMMIT.test(binding.source_commit)) fail("binding source_commit must be a full lowercase commit SHA");
  if (binding.source_commit !== LOCK_SOURCE_COMMIT) fail("binding source_commit is not the authoritative geometry-lock commit");
  if (plan.source_commit !== binding.source_commit) fail("plan source_commit differs from binding manifest");
  if (!Array.isArray(binding.assets)) fail("binding assets must be an array");
  requireExactSet(binding.assets.map(({ record_id }) => record_id), SIX_RECORDS, "binding record IDs");
  const assetIds = binding.assets.map(({ asset_id }) => requireString(asset_id, "binding asset_id"));
  if (new Set(assetIds).size !== assetIds.length) fail("binding asset IDs must be unique");

  const repositoryRoot = resolve(dirname(bindingPath), requireString(binding.repository_root, "binding repository_root"));
  requireRepositoryPath(binding.artwork_metadata_path, "artwork_metadata_path");
  requireRepositoryPath(binding.lock_manifest_path, "lock_manifest_path");
  const artworkMetadata = JSON.parse(await readBytes(resolve(repositoryRoot, binding.artwork_metadata_path), "utf8"));
  const lock = JSON.parse(await readBytes(resolve(repositoryRoot, binding.lock_manifest_path), "utf8"));
  if (artworkMetadata.artwork_version !== "0.0.0" || artworkMetadata.publication_status !== "unpublished"
    || artworkMetadata.canonical_assets?.length !== 0) {
    fail("artwork must remain version 0.0.0, unpublished, and noncanonical");
  }
  if (lock.purpose !== "blinded-study-package-construction" || lock.asset_status !== "draft") {
    fail("study lock must authorize draft package construction only");
  }
  requireExactSet(lock.assets.map(({ record_id }) => record_id), SIX_RECORDS, "lock record IDs");

  const familyCandidates = artworkMetadata.draft_candidates.filter(({ candidate_family_id }) => candidate_family_id === "compact-a");
  requireExactSet(familyCandidates.map(({ record_id }) => record_id), SIX_RECORDS, "compact-a metadata record IDs");
  const candidates = new Map(familyCandidates.map((candidate) => [candidate.record_id, candidate]));
  const locked = new Map(lock.assets.map((asset) => [asset.record_id, asset]));
  const loaded = new Map();
  for (const asset of binding.assets) {
    requireRepositoryPath(asset.source_path, `${asset.record_id} source_path`);
    requireRepositoryPath(asset.provenance_path, `${asset.record_id} provenance_path`);
    requireRepositoryPath(asset.qa_manifest_path, `${asset.record_id} qa_manifest_path`);
    if (!SHA256.test(asset.source_sha256)) fail(`${asset.record_id} has invalid source_sha256`);
    const candidate = candidates.get(asset.record_id);
    const lockAsset = locked.get(asset.record_id);
    if (!candidate || !lockAsset) fail(`${asset.record_id} is absent from artwork metadata or lock`);
    if (candidate.asset_id !== asset.asset_id || candidate.candidate_family_id !== "compact-a"
      || candidate.candidate_path !== asset.source_path || candidate.provenance_path !== asset.provenance_path
      || candidate.asset_status !== "draft") {
      fail(`${asset.record_id} binding differs from draft artwork metadata`);
    }
    if (lockAsset.path !== asset.source_path || lockAsset.sha256 !== asset.source_sha256) {
      fail(`${asset.record_id} binding differs from study lock`);
    }
    const provenance = await readBytes(resolve(repositoryRoot, asset.provenance_path), "utf8");
    if (yamlQuotedValue(provenance, "asset_id", asset.provenance_path) !== asset.asset_id
      || yamlQuotedValue(provenance, "record_id", asset.provenance_path) !== asset.record_id
      || yamlQuotedValue(provenance, "asset_path", asset.provenance_path) !== asset.source_path
      || yamlQuotedValue(provenance, "asset_status", asset.provenance_path) !== "draft"
      || yamlQuotedValue(provenance, "artwork_version", asset.provenance_path) !== "0.0.0"
      || yamlQuotedValue(provenance, "source_sha256", asset.provenance_path) !== asset.source_sha256
      || !provenance.includes("human_artwork_lock: \"exact source SHA-256 locked for blinded study-package construction")) {
      fail(`${asset.record_id} binding differs from provenance`);
    }
    const qa = JSON.parse(await readBytes(resolve(repositoryRoot, asset.qa_manifest_path), "utf8"));
    if (qa.source_sha256 !== asset.source_sha256 || qa.source_file !== asset.source_path.split("/").at(-1)) {
      fail(`${asset.record_id} binding differs from QA manifest`);
    }
    const bytes = await readBytes(resolve(repositoryRoot, asset.source_path));
    if (sha256(bytes) !== asset.source_sha256) fail(`${asset.record_id} locked source digest differs from repository bytes`);
    loaded.set(asset.record_id, { ...asset, bytes });
  }
  return { binding, bindingPath, loaded };
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

export async function buildStudyPackage(planPath, outputPath, options = {}) {
  const readBytes = options.readFile ?? readFile;
  const absolutePlan = resolve(planPath);
  const planDirectory = dirname(absolutePlan);
  const outputDirectory = resolve(outputPath);
  const planBytes = await readBytes(absolutePlan);
  const plan = JSON.parse(planBytes.toString("utf8"));
  const packageSchemaVersion = plan.package_schema_version ?? "0.1.0";
  if (!["0.1.0", "0.2.0"].includes(packageSchemaVersion)) fail("unsupported package_schema_version");
  const studyId = requireString(plan.study_id, "study_id");
  const seed = requireString(plan.randomization_seed, "randomization_seed");
  if (Buffer.byteLength(seed, "utf8") < 32) fail("randomization_seed must contain at least 32 UTF-8 bytes");
  if (!Number.isInteger(plan.form_count) || plan.form_count < 1) fail("form_count must be a positive integer");
  if (!Array.isArray(plan.stimuli) || plan.stimuli.length < 2) fail("stimuli must contain at least two entries");
  if (!Array.isArray(plan.forced_choices) || plan.forced_choices.length < 2) fail("forced_choices must contain at least two entries");

  let lockedBinding = null;
  if (packageSchemaVersion === "0.2.0") {
    if (plan.construction_status !== "construction-only") fail("0.2.0 plans must be construction-only");
    if (plan.participant_prompt !== "Which filter response is the best match?") fail("participant prompt must use the approved neutral wording");
    if (plan.shelf_semantic_target !== "affected-frequency-side" || plan.gain_sign_priming !== false) {
      fail("shelf task must target affected frequency side without gain-sign priming");
    }
    lockedBinding = await loadLockedBinding(plan, planDirectory, readBytes);
    requireExactSet(plan.stimuli.map(({ record_id }) => record_id), SIX_RECORDS, "plan record IDs");
    const participantFacing = [plan.participant_prompt, ...(plan.participant_instructions ?? []), ...(plan.participant_help ?? [])];
    if (participantFacing.some((text) => PRIMING.test(requireString(text, "participant-facing text")))) {
      fail("participant-facing text contains gain-sign or shelf-alias priming");
    }
    if (!Array.isArray(plan.directed_negative_controls)) fail("directed_negative_controls must be an array");
    const controls = new Map(plan.directed_negative_controls.map((control) => [control.target_record_id, control.confused_with_choice_id]));
    if (plan.directed_negative_controls.length !== DIRECTED_CONTROLS.size || controls.size !== DIRECTED_CONTROLS.size
      || [...DIRECTED_CONTROLS].some(([target, confusion]) => controls.get(target) !== confusion)) {
      fail("directed_negative_controls must contain the six approved ordered pairs");
    }
  }

  const recordIds = new Set();
  const tokens = new Set();
  const publicStimuli = [];
  const privateStimuli = [];
  const assetWrites = [];

  for (const [index, stimulus] of plan.stimuli.entries()) {
    const recordId = requireString(stimulus.record_id, `stimuli[${index}].record_id`);
    if (recordIds.has(recordId)) fail(`duplicate record_id: ${recordId}`);
    recordIds.add(recordId);
    const bound = lockedBinding?.loaded.get(recordId);
    if (bound && (stimulus.expected_asset_id !== bound.asset_id
      || stimulus.expected_source_sha256 !== bound.source_sha256)) {
      fail(`${recordId} plan expectation differs from locked binding`);
    }
    const sourcePath = bound ? resolve(dirname(lockedBinding.bindingPath), lockedBinding.binding.repository_root, bound.source_path)
      : resolve(planDirectory, requireString(stimulus.blind_svg_path, `stimuli[${index}].blind_svg_path`));
    // Locked 0.2.0 sources were read and hashed exactly once by loadLockedBinding.
    const sourceBytes = bound?.bytes ?? await readFile(sourcePath);
    const bytes = bound ? blindDerivative(sourceBytes) : sourceBytes;
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
    privateStimuli.push(packageSchemaVersion === "0.2.0" ? {
      token,
      record_id: recordId,
      asset_id: bound.asset_id,
      source_path: bound.source_path,
      source_sha256: bound.source_sha256,
      output_sha256: digest,
    } : { token, record_id: recordId, source_path: stimulus.blind_svg_path, sha256: digest });
    assetWrites.push({ bytes, filename });
  }

  const publicChoices = plan.forced_choices.map((choice, index) => ({
    id: requireString(choice.id, `forced_choices[${index}].id`),
    label: requireString(choice.label, `forced_choices[${index}].label`),
  }));
  const choiceIds = publicChoices.map(({ id }) => id);
  if (new Set(choiceIds).size !== choiceIds.length) fail("forced choice IDs must be unique");
  if (packageSchemaVersion === "0.2.0") {
    requireExactSet(choiceIds, new Set(SIX_CHOICES.keys()), "forced choice IDs");
    if (publicChoices.some(({ id, label }) => SIX_CHOICES.get(id) !== label)) fail("forced choice labels must match the approved six-way labels");
  }

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
    package_schema_version: packageSchemaVersion,
    ...(packageSchemaVersion === "0.2.0" ? {
      construction_status: "construction-only",
      participant_prompt: plan.participant_prompt,
    } : {}),
    study_id: studyId,
    stimuli: publicStimuli,
    forced_choices: publicChoices,
    forms,
  };
  const privateKey = {
    package_schema_version: packageSchemaVersion,
    study_id: studyId,
    randomization_seed: seed,
    stimuli: privateStimuli,
    ...(packageSchemaVersion === "0.2.0" ? {
      construction_status: "construction-only",
      source_commit: lockedBinding.binding.source_commit,
      plan_sha256: sha256(planBytes),
      binding_manifest_sha256: sha256(await readBytes(lockedBinding.bindingPath)),
      directed_negative_controls: plan.directed_negative_controls.map(({ target_record_id, confused_with_choice_id }) => ({
        target_token: opaqueToken(seed, target_record_id),
        confused_with_choice_id,
      })),
      shelf_semantic_target: "affected-frequency-side",
      gain_sign_priming: false,
    } : {}),
  };

  await mkdir(outputDirectory, { recursive: false });
  await mkdir(join(outputDirectory, "public", "assets"), { recursive: true });
  await mkdir(join(outputDirectory, "private"), { recursive: false, mode: 0o700 });
  await Promise.all(assetWrites.map(({ bytes, filename }) =>
    writeFile(join(outputDirectory, "public", "assets", filename), bytes)));
  await writeFile(join(outputDirectory, "public", "instrument.json"), stableJson(publicInstrument));
  await writeFile(
    join(outputDirectory, "private", "answer-key.json"),
    stableJson(privateKey),
    { mode: 0o600 },
  );
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
