import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import Ajv from "ajv";
import { buildPrivateIconPackage } from "./build-private-icon-package.mjs";

const TOOL_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = path.resolve(TOOL_DIR, "../..");
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");

async function fileMap(directory, prefix = "") {
  const entries = await readdir(path.join(directory, prefix), { withFileTypes: true });
  const files = new Map();
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const relative = path.join(prefix, entry.name);
    if (entry.isDirectory()) {
      for (const [name, bytes] of await fileMap(directory, relative)) files.set(name, bytes);
    } else {
      files.set(relative.split(path.sep).join("/"), await readFile(path.join(directory, relative)));
    }
  }
  return files;
}

export async function validatePrivateIconPackage(root = DEFAULT_ROOT, parentDirectory = null) {
  root = path.resolve(root);
  const temporaryParent = parentDirectory ? null : await mkdtemp(path.join(tmpdir(), "asr-private-icons-"));
  const parent = path.resolve(parentDirectory ?? temporaryParent);
  try {
    const first = await buildPrivateIconPackage(root, path.join(parent, "build-a"));
    const second = await buildPrivateIconPackage(root, path.join(parent, "build-b"));
    const [filesA, filesB] = await Promise.all([fileMap(first.output), fileMap(second.output)]);
    assert.deepEqual([...filesA.keys()], [...filesB.keys()]);
    for (const [name, bytes] of filesA) assert.deepEqual(bytes, filesB.get(name), `nondeterministic output: ${name}`);

    const schema = JSON.parse(await readFile(path.join(first.output, "schema/manifest.schema.json"), "utf8"));
    const manifest = JSON.parse(await readFile(path.join(first.output, "manifest.json"), "utf8"));
    const validate = new Ajv({ allErrors: true, strict: true }).compile(schema);
    assert.equal(validate(manifest), true, JSON.stringify(validate.errors));
    assert.equal(manifest.icons.length, 6);
    assert.ok(manifest.icons.every(({ code_points: points }) => points.unicode === null && points.smufl === null && points.private_use === null));
    assert.ok(manifest.icons.every(({ artwork }) => !artwork.canonical && !artwork.accepted && artwork.publication_status === "unpublished"));
    assert.ok(manifest.icons.every((icon) => JSON.stringify(icon.alias_policy.exact_labels) === JSON.stringify([icon.name, ...icon.aliases])));
    assert.ok(manifest.icons.every((icon) => JSON.stringify(icon.alias_policy.related_only_labels) === JSON.stringify(icon.related_terms)));
    assert.ok(manifest.icons.every(({ alias_policy: policy }) => policy.explicit_product_documentation === "overrides-and-disables-generic-lookup"
      && policy.normalization.attributive_separator_variants === "first-internal-space-or-hyphen-only"
      && policy.normalization.other_separator_changes === false
      && policy.normalization.morphological_inference === false));

    for (const icon of manifest.icons) {
      const [packaged, source] = await Promise.all([
        readFile(path.join(first.output, icon.svg.package_path)),
        readFile(path.join(root, icon.svg.source_path)),
      ]);
      assert.deepEqual(packaged, source, `${icon.semantic_id} SVG bytes changed`);
      assert.equal(sha256(packaged), icon.svg.sha256);
    }

    const integrity = JSON.parse(await readFile(path.join(first.output, "package-integrity.json"), "utf8"));
    for (const [name, hash] of Object.entries(integrity.files)) assert.equal(sha256(await readFile(path.join(first.output, name))), hash);
    const packageHash = sha256(Buffer.from([...filesA.entries()].map(([name, bytes]) => `${name}\0${sha256(bytes)}`).join("\n")));
    return {
      status: "private-icon-package-validation-passed",
      package_hash: packageHash,
      deterministic_build: { identical: true, file_count: filesA.size },
      registry_version: manifest.source.registry_version,
      icon_count: manifest.icons.length,
      source_svg_bytes_preserved: true,
      boundaries: manifest.boundaries,
      code_points: { unicode: [], smufl: [], private_use: [] },
      output: parentDirectory ? first.output : null,
    };
  } finally {
    if (temporaryParent) await rm(temporaryParent, { recursive: true, force: true });
  }
}

async function main() {
  const report = await validatePrivateIconPackage();
  console.log(JSON.stringify(report, null, 2));
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main().catch((error) => { console.error(error.stack ?? error.message); process.exitCode = 1; });
}
