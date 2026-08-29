import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const readJson = async (relativePath) =>
  JSON.parse(await readFile(path.join(root, relativePath), "utf8"));

const failures = [];
const fail = (message) => failures.push(message);
const semver = /^0\.(?:[0-9]+)\.(?:[0-9]+)$/;
const identifier = /^asr:[a-z][a-z0-9-]*(?:\.[a-z][a-z0-9-]*)+$/;

const metadata = await readJson("registry/registry-metadata.json");
const packageJson = await readJson("package.json");
const ledger = await readJson("evidence/ledger.json");

if (!semver.test(packageJson.version)) fail(`package.json version is not a supported bootstrap SemVer: ${packageJson.version}`);
if (metadata.registry_version !== packageJson.version) fail("Registry metadata and package version differ.");
if (metadata.schema_version !== packageJson.version) fail("Registry metadata and schema version differ.");

const sourceIds = new Set(ledger.sources.map((source) => source.id));
const seenIds = new Set();
const recordDir = path.join(root, "registry", "symbols");
const files = (await readdir(recordDir)).filter((file) => file.endsWith(".json"));

for (const file of files) {
  const relativePath = path.join("registry", "symbols", file);
  const record = await readJson(relativePath);
  const required = ["schema_version", "id", "name", "status", "semantics", "representations", "unicode", "evidence"];

  for (const field of required) {
    if (!(field in record)) fail(`${relativePath}: missing ${field}`);
  }

  if (record.schema_version !== metadata.schema_version) fail(`${relativePath}: schema version differs from registry metadata`);
  if (!identifier.test(record.id)) fail(`${relativePath}: invalid identifier ${record.id}`);
  if (seenIds.has(record.id)) fail(`${relativePath}: duplicate identifier ${record.id}`);
  seenIds.add(record.id);

  if (!record.semantics?.text_fallback || !record.semantics?.spoken_label) fail(`${relativePath}: missing portable text or speech representation`);
  if (record.representations?.axis_bearing_form !== "illustrative-only") fail(`${relativePath}: v0.1 requires axis-bearing forms to remain illustrative-only`);
  if (record.unicode?.status !== "not-submitted") fail(`${relativePath}: v0.1 records must not imply a Unicode submission`);

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
  console.log(`Validated ${files.length} registry record(s), ${sourceIds.size} evidence source(s), version ${packageJson.version}.`);
}
