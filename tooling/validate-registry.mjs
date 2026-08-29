import Ajv2020 from "ajv/dist/2020.js";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const readJson = async (relativePath) =>
  JSON.parse(await readFile(path.join(root, relativePath), "utf8"));

const failures = [];
const fail = (message) => failures.push(message);
const semver = /^(0|[1-9][0-9]*)[.](0|[1-9][0-9]*)[.](0|[1-9][0-9]*)(?:-(?:0|[1-9][0-9]*|[0-9]*[A-Za-z-][0-9A-Za-z-]*)(?:[.](?:0|[1-9][0-9]*|[0-9]*[A-Za-z-][0-9A-Za-z-]*))*)?(?:[+][0-9A-Za-z-]+(?:[.][0-9A-Za-z-]+)*)?$/;
const identifier = /^asr:[a-z][a-z0-9-]*(?:[.][a-z][a-z0-9-]*)+$/;

const metadata = await readJson("registry/registry-metadata.json");
const packageJson = await readJson("package.json");
const ledger = await readJson("evidence/ledger.json");
const entrySchema = await readJson("registry/schema/entry.schema.json");
const filterResponseSchema = await readJson("registry/schema/filter-response.schema.json");

for (const [name, artifact] of Object.entries(metadata.artifacts)) {
  if (artifact.version !== null && !semver.test(artifact.version)) {
    fail(`metadata artifact ${name} has invalid SemVer ${artifact.version}`);
  }
}
if (!semver.test(packageJson.version)) fail(`package.json has invalid SemVer ${packageJson.version}`);
if (packageJson.version !== metadata.artifacts.tooling.version) fail("package.json and tooling metadata versions differ.");

const ajv = new Ajv2020({ allErrors: true, strict: true });
ajv.addSchema(entrySchema);
const validateFilterResponse = ajv.compile(filterResponseSchema);

if (!Array.isArray(ledger.sources) || ledger.sources.length === 0) {
  fail("Evidence ledger has no sources.");
}
const sourceIds = new Set();
for (const source of ledger.sources ?? []) {
  for (const field of ["id", "publisher", "title", "url", "accessed_on", "location", "direct_observation", "interpretation", "rights_note"]) {
    if (!source[field]) fail(`evidence source ${source.id ?? "<missing>"}: missing ${field}`);
  }
  if (sourceIds.has(source.id)) fail(`evidence ledger has duplicate source ID ${source.id}`);
  sourceIds.add(source.id);
}

const seenIds = new Set();
const recordDir = path.join(root, "registry", "symbols");
const files = (await readdir(recordDir)).filter((file) => file.endsWith(".json"));

for (const file of files) {
  const relativePath = path.join("registry", "symbols", file);
  const record = await readJson(relativePath);

  if (!validateFilterResponse(record)) {
    for (const error of validateFilterResponse.errors ?? []) {
      fail(`${relativePath}: schema ${error.instancePath || "/"} ${error.message}`);
    }
  }
  if (record.schema_version !== metadata.artifacts.schema.version) fail(`${relativePath}: schema version differs from schema metadata`);
  if (!identifier.test(record.id)) fail(`${relativePath}: invalid identifier ${record.id}`);
  if (seenIds.has(record.id)) fail(`${relativePath}: duplicate identifier ${record.id}`);
  seenIds.add(record.id);

  for (const evidence of record.evidence ?? []) {
    if (!sourceIds.has(evidence.source_id)) fail(`${relativePath}: unknown evidence source ${evidence.source_id}`);
  }
}

if (files.length === 0) fail("No symbol records found.");

if (failures.length) {
  console.error("Registry validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Validated ${files.length} registry record(s), ${sourceIds.size} evidence source(s), registry ${metadata.artifacts.registry.version}, schema ${metadata.artifacts.schema.version}, tooling ${metadata.artifacts.tooling.version}.`);
}
