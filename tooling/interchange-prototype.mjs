import { readFile, readdir } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const DEFAULT_REGISTRY_DIR = new URL("../registry/symbols/", import.meta.url);

export async function loadRegistry(registryDir = DEFAULT_REGISTRY_DIR) {
  const directory = registryDir instanceof URL ? registryDir : pathToFileURL(path.resolve(registryDir) + path.sep);
  const files = (await readdir(directory)).filter((name) => name.endsWith(".json")).sort();
  const entries = await Promise.all(
    files.map(async (name) => JSON.parse(await readFile(new URL(name, directory), "utf8"))),
  );
  return new Map(entries.map((entry) => [entry.id, entry]));
}

export function resolveInterchange(ids, registry, assetRefs = {}) {
  return ids.map((id) => {
    const entry = registry.get(id);
    if (!entry) {
      throw new Error(`Unknown registry ID: ${id}`);
    }

    const resolved = {
      id: entry.id,
      text: entry.semantics.text_fallback,
      speech: entry.semantics.spoken_label,
    };

    if (Object.hasOwn(assetRefs, id)) {
      resolved.asset_ref = assetRefs[id];
    }

    return resolved;
  });
}

export function formatInterchange(resolved, format = "json") {
  if (format === "text") return resolved.map(({ text }) => text).join(" ");
  if (format === "speech") return resolved.map(({ speech }) => speech).join(", ");
  if (format === "json") return JSON.stringify(resolved, null, 2);
  throw new Error(`Unsupported format: ${format}`);
}

async function main(argv) {
  let format = "json";
  let assetMapPath;
  const ids = [];

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--format") {
      format = argv[index + 1];
      index += 1;
    } else if (argument === "--asset-map") {
      assetMapPath = argv[index + 1];
      index += 1;
    } else {
      ids.push(argument);
    }
  }

  if (ids.length === 0) {
    throw new Error("Provide at least one canonical registry ID.");
  }

  const assetRefs = assetMapPath
    ? JSON.parse(await readFile(path.resolve(assetMapPath), "utf8"))
    : {};
  const registry = await loadRegistry();
  process.stdout.write(`${formatInterchange(resolveInterchange(ids, registry, assetRefs), format)}\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main(process.argv.slice(2)).catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  });
}
