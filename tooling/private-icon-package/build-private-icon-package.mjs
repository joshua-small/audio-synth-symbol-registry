import { createHash } from "node:crypto";
import { mkdir, readFile, realpath, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { validateStudySvgBytes } from "../validate-study-svg.mjs";

const TOOL_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = path.resolve(TOOL_DIR, "../..");
const LOCK_PATH = "artwork/study-locks/six-member-compact-a.json";
const ARTWORK_METADATA_PATH = "artwork/metadata.json";
const REGISTRY_METADATA_PATH = "registry/registry-metadata.json";
const EXPECTED_IDS = [
  "asr:filter.high-pass",
  "asr:filter.low-pass",
  "asr:filter.band-pass",
  "asr:filter.band-stop",
  "asr:filter.low-shelf",
  "asr:filter.high-shelf",
];
const EXTERNAL_MAPPINGS = {
  "asr:filter.high-pass": {
    fontaudio_iconify: { name: "filter-highpass", relationship: "exact-class", evidence_id: "EV-122" },
    ardour_toolkit: { name: "highpass", relationship: "exact-class", evidence_id: "EV-120" },
    dsssp: { name: "HighPassIcon", relationship: "exact-class", evidence_id: "EV-101" },
  },
  "asr:filter.low-pass": {
    fontaudio_iconify: { name: "filter-lowpass", relationship: "exact-class", evidence_id: "EV-122" },
    ardour_toolkit: { name: "lowpass", relationship: "exact-class", evidence_id: "EV-120" },
    dsssp: { name: "LowPassIcon", relationship: "exact-class", evidence_id: "EV-101" },
  },
  "asr:filter.band-pass": {
    fontaudio_iconify: { name: "filter-bandpass", relationship: "exact-class", evidence_id: "EV-122" },
    ardour_toolkit: { name: "bandpass", relationship: "exact-class", evidence_id: "EV-120" },
    dsssp: { name: "BandPassIcon", relationship: "exact-class", evidence_id: "EV-101" },
  },
  "asr:filter.band-stop": {
    fontaudio_iconify: { name: "filter-notch", relationship: "related-only", evidence_id: "EV-122" },
    ardour_toolkit: { name: "bandreject", relationship: "exact-class", evidence_id: "EV-120" },
    dsssp: { name: "NOTCH", relationship: "related-only", evidence_id: "EV-101" },
  },
  "asr:filter.low-shelf": {
    fontaudio_iconify: { name: "filter-shelving-lo", relationship: "exact-class", evidence_id: "EV-122" },
    ardour_toolkit: { name: "lowshelf", relationship: "exact-class", evidence_id: "EV-120" },
    dsssp: { name: "low-shelf.svg", relationship: "exact-class", evidence_id: "EV-174" },
  },
  "asr:filter.high-shelf": {
    fontaudio_iconify: { name: "filter-shelving-hi", relationship: "exact-class", evidence_id: "EV-122" },
    ardour_toolkit: { name: "highshelf", relationship: "exact-class", evidence_id: "EV-120" },
    dsssp: { name: "high-shelf.svg", relationship: "exact-class", evidence_id: "EV-174" },
  },
};
const BLOCKED_ALIAS_EXAMPLES = {
  "asr:filter.high-pass": ["cut the lows", "low-frequency cut", "low cut amount", "low cut-off frequency"],
  "asr:filter.low-pass": ["cut the highs", "high-frequency cut", "high cut amount", "high cut-off frequency"],
  "asr:filter.band-pass": ["pass the mids", "bandwidth", "band-pass amount"],
  "asr:filter.band-stop": ["notch filter", "notch Q", "band-stop amount"],
  "asr:filter.low-shelf": ["low shelving", "LS", "lowshelf product enum", "low-shelf gain"],
  "asr:filter.high-shelf": ["high shelving", "HS", "highshelf product enum", "high-shelf gain"],
};
const PROHIBITED_ALIAS_INFERENCE = [
  "substring", "arbitrary-phrase", "morphological", "parameter", "implementation", "preset", "algorithm", "product-behavior",
];

const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const json = (value) => `${JSON.stringify(value, null, 2)}\n`;
const packageKey = (id) => id.slice("asr:".length).replace(".", "-");
const absolute = (root, relative) => path.resolve(root, relative);
const foldAlias = (label) => label.replace(/^[\t\n\f\r ]+|[\t\n\f\r ]+$/g, "").replace(/[A-Z]/g, (character) => character.toLowerCase());
function approvedAliasVariants(label) {
  const folded = foldAlias(label);
  const separatorIndex = folded.search(/[ -]/);
  if (separatorIndex === -1) return [folded];
  const toggled = `${folded.slice(0, separatorIndex)}${folded[separatorIndex] === "-" ? " " : "-"}${folded.slice(separatorIndex + 1)}`;
  return [folded, toggled];
}

function fail(message) {
  throw new Error(`Private icon package build refused: ${message}`);
}

function assertOutsideRepository(root, output) {
  const relative = path.relative(root, output);
  if (!relative || (!relative.startsWith("..") && !path.isAbsolute(relative))) {
    fail("output must be outside the repository");
  }
}

function requireMatch(source, pattern, label) {
  const match = source.match(pattern);
  if (!match) fail(`${label} is missing or changed`);
  return match[1];
}

function parseLockedSvg(bytes) {
  const source = bytes.toString("utf8");
  const validated = validateStudySvgBytes(bytes);
  const viewBox = requireMatch(source, /<svg[^>]+viewBox="([^"]+)"/, "SVG viewBox");
  const pathMarkup = requireMatch(source, /\n  (<path [^\n]+\/>)/, "single path markup");
  if (validated.geometry_count !== 1 || viewBox !== "0 0 24 24") fail("locked SVG structure is outside the package profile");
  if (!pathMarkup.includes('stroke="currentColor"') || !pathMarkup.includes('stroke-width="2.25"')
      || !pathMarkup.includes('stroke-linecap="round"') || !pathMarkup.includes('stroke-linejoin="round"')) {
    fail("locked SVG path style is outside the package profile");
  }
  return { viewBox, pathMarkup };
}

function verifyProvenance(source, asset) {
  if (!source.includes(`record_id: "${asset.record_id}"`)
      || !source.includes(`asset_path: "${asset.path}"`)
      || !source.includes('asset_status: "draft"')
      || !source.includes('artwork_version: "0.0.0"')
      || !source.includes('prohibited_source_material_used: false')
      || !source.includes('license: "CC0-1.0"')
      || !source.includes(`source_sha256: "${asset.sha256}"`)
      || !source.includes('human_artwork_acceptance: "pending"')) {
    fail(`provenance boundary mismatch for ${asset.record_id}`);
  }
}

function validateAliasPolicies(icons) {
  for (const icon of icons) {
    const exact = new Set(icon.alias_policy.allowed_lookup_labels);
    const expected = [...new Set(icon.alias_policy.exact_labels.flatMap(approvedAliasVariants))];
    if (JSON.stringify(icon.alias_policy.allowed_lookup_labels) !== JSON.stringify(expected)) fail(`allowed alias variants drifted for ${icon.semantic_id}`);
    for (const label of [...icon.alias_policy.related_only_labels, ...icon.alias_policy.blocked_examples]) {
      if (exact.has(foldAlias(label))) fail(`non-exact label promoted for ${icon.semantic_id}: ${label}`);
    }
    if (icon.alias_policy.normalization.morphological_inference !== false
        || icon.alias_policy.normalization.attributive_separator_variants !== "first-internal-space-or-hyphen-only"
        || icon.alias_policy.normalization.other_separator_changes !== false
        || icon.alias_policy.explicit_product_documentation !== "overrides-and-disables-generic-lookup"
        || !["arbitrary-phrase", "parameter", "implementation", "morphological"].every((rule) => icon.alias_policy.prohibited_inference.includes(rule))) {
      fail(`alias policy is not fail-closed for ${icon.semantic_id}`);
    }
  }
}

function buildLookup(icons) {
  const exactIndex = {};
  for (const icon of icons) {
    for (const label of icon.alias_policy.allowed_lookup_labels) {
      const normalized = foldAlias(label);
      if (exactIndex[normalized] && exactIndex[normalized] !== icon.package_key) fail(`ambiguous exact alias: ${label}`);
      exactIndex[normalized] = icon.package_key;
    }
  }
  return `// Generated private internal lookup. Do not edit or publish.\n`
    + `export const FILTER_SYMBOLS = Object.freeze(${JSON.stringify(Object.fromEntries(icons.map((icon) => [icon.package_key, icon])), null, 2)});\n`
    + `export const FILTER_SYMBOL_KEYS = Object.freeze(Object.keys(FILTER_SYMBOLS));\n`
    + `const EXACT_ALIAS_INDEX = Object.freeze(${JSON.stringify(exactIndex, null, 2)});\n`
    + `const foldAlias = (label) => label.replace(/^[\\t\\n\\f\\r ]+|[\\t\\n\\f\\r ]+$/g, "").replace(/[A-Z]/g, (character) => character.toLowerCase());\n`
    + `export function getFilterSymbol(key) { return FILTER_SYMBOLS[key] ?? null; }\n`
    + `export function resolveFilterSymbolAlias(label, options = {}) {\n`
    + `  if (typeof label !== "string" || options.context !== "audio-filter-response-class" || options.explicitProductDocumentation === true) return null;\n`
    + `  const key = EXACT_ALIAS_INDEX[foldAlias(label)];\n`
    + `  return key ? FILTER_SYMBOLS[key] : null;\n`
    + `}\n`;
}

function buildTypes(icons) {
  const keys = icons.map(({ package_key: key }) => `"${key}"`).join(" | ");
  return `export type FilterSymbolKey = ${keys};\n`
    + `export interface AliasPolicy { readonly match_scope: "whole-label-audio-filter-response-class-only"; readonly exact_labels: readonly string[]; readonly allowed_lookup_labels: readonly string[]; readonly related_only_labels: readonly string[]; readonly blocked_examples: readonly string[]; readonly normalization: { readonly ascii_case_fold: true; readonly trim_outer_ascii_whitespace: true; readonly attributive_separator_variants: "first-internal-space-or-hyphen-only"; readonly other_separator_changes: false; readonly morphological_inference: false }; readonly explicit_product_documentation: "overrides-and-disables-generic-lookup"; readonly prohibited_inference: readonly string[]; }\n`
    + `export interface FilterSymbol { readonly semantic_id: string; readonly package_key: FilterSymbolKey; readonly name: string; readonly definition: string; readonly aliases: readonly string[]; readonly related_terms: readonly string[]; readonly alias_policy: AliasPolicy; readonly text_fallback: string; readonly spoken_label: string; readonly registry_status: "evidence-collecting" | "registry-candidate"; readonly code_points: { readonly unicode: null; readonly smufl: null; readonly private_use: null }; }\n`
    + `export declare const FILTER_SYMBOLS: Readonly<Record<FilterSymbolKey, FilterSymbol>>;\n`
    + `export declare const FILTER_SYMBOL_KEYS: readonly FilterSymbolKey[];\n`
    + `export declare function getFilterSymbol(key: string): FilterSymbol | null;\n`
    + `export declare function resolveFilterSymbolAlias(label: string, options?: { readonly context?: "audio-filter-response-class"; readonly explicitProductDocumentation?: boolean }): FilterSymbol | null;\n`;
}

function buildAccessibilityExample(icons, bodies) {
  const controls = icons.map((icon) => `    <button type="button" aria-label="${icon.accessibility.control_label}"><svg aria-hidden="true" focusable="false"><use href="../sprite/audio-filter-symbols.svg#${icon.package_key}"></use></svg></button>`).join("\n");
  const informative = icons.map((icon) => `    <img src="../svg/${icon.package_key}.svg" alt="${icon.accessibility.informative_alt}">`).join("\n");
  const inline = icons.map((icon, index) => {
    const titleId = `consumer-filter-title-${index + 1}-${icon.package_key}`;
    return `    <svg role="img" aria-labelledby="${titleId}" viewBox="${icon.svg.view_box}"><title id="${titleId}">${icon.name}</title>${bodies[index].pathMarkup}</svg>`;
  }).join("\n");
  return `<!doctype html>\n<html lang="en">\n<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Private filter icon accessibility examples</title><link rel="stylesheet" href="css-mask.css"></head>\n<body>\n  <p><strong>PRIVATE INTERNAL / UNPUBLISHED / NONCANONICAL</strong></p>\n  <h1>Filter icon accessibility examples</h1>\n  <section aria-labelledby="controls"><h2 id="controls">Named controls with decorative glyphs</h2>\n${controls}\n  </section>\n  <section aria-labelledby="informative"><h2 id="informative">Informative standalone images</h2>\n${informative}\n  </section>\n  <section aria-labelledby="inline"><h2 id="inline">Consumer-owned inline titles</h2>\n    <p>Each meaningful inline SVG uses a consumer-owned unique title ID. Iconify components default to decorative and aria-hidden unless the consumer supplies an equivalent unique-ID wrapper.</p>\n${inline}\n  </section>\n</body>\n</html>\n`;
}

function buildCss(icons) {
  return `/* PRIVATE INTERNAL / UNPUBLISHED / NONCANONICAL */\n.filter-icon { display: inline-block; width: 1.5rem; height: 1.5rem; background: currentColor; mask: center / contain no-repeat; -webkit-mask: center / contain no-repeat; }\n`
    + icons.map((icon) => `.filter-icon--${icon.package_key} { mask-image: url("../svg/${icon.package_key}.svg"); -webkit-mask-image: url("../svg/${icon.package_key}.svg"); }`).join("\n")
    + "\n";
}

export async function buildPrivateIconPackage(root = DEFAULT_ROOT, outputDirectory) {
  if (!outputDirectory) fail("an explicit output directory is required");
  root = path.resolve(root);
  const output = path.resolve(outputDirectory);
  assertOutsideRepository(root, output);
  const [realRoot, realParent] = await Promise.all([realpath(root), realpath(path.dirname(output))]);
  assertOutsideRepository(realRoot, path.join(realParent, path.basename(output)));
  await mkdir(output, { recursive: false });

  const [lock, artworkMetadata, registryMetadata, schemaBytes] = await Promise.all([
    readFile(absolute(root, LOCK_PATH), "utf8").then(JSON.parse),
    readFile(absolute(root, ARTWORK_METADATA_PATH), "utf8").then(JSON.parse),
    readFile(absolute(root, REGISTRY_METADATA_PATH), "utf8").then(JSON.parse),
    readFile(path.join(TOOL_DIR, "manifest.schema.json")),
  ]);
  if (lock.lock_id !== "six-member-compact-a-2026-08-30" || lock.purpose !== "blinded-study-package-construction"
      || lock.asset_status !== "draft" || lock.assets.length !== 6
      || JSON.stringify(lock.assets.map(({ record_id: id }) => id)) !== JSON.stringify(EXPECTED_IDS)
      || !lock.does_not_authorize.includes("publication") || !lock.does_not_authorize.includes("release")
      || !lock.does_not_authorize.includes("artwork acceptance")) fail("artwork lock boundary mismatch");
  if (artworkMetadata.artwork_version !== "0.0.0" || artworkMetadata.publication_status !== "unpublished"
      || artworkMetadata.canonical_assets.length !== 0 || artworkMetadata.draft_candidates.length !== 6) {
    fail("artwork metadata is no longer unpublished, noncanonical draft state");
  }

  const icons = [];
  const bodies = [];
  for (const asset of lock.assets) {
    const suffix = asset.record_id.slice("asr:".length);
    const key = packageKey(asset.record_id);
    const recordPath = `registry/symbols/${suffix}.json`;
    const candidate = artworkMetadata.draft_candidates.find(({ record_id: id }) => id === asset.record_id);
    if (!candidate || candidate.candidate_path !== asset.path || candidate.asset_status !== "draft") fail(`artwork candidate mismatch for ${asset.record_id}`);
    const [record, svgBytes, provenance] = await Promise.all([
      readFile(absolute(root, recordPath), "utf8").then(JSON.parse),
      readFile(absolute(root, asset.path)),
      readFile(absolute(root, candidate.provenance_path), "utf8"),
    ]);
    if (record.id !== asset.record_id || record.schema_version !== registryMetadata.artifacts.schema.version
        || record.unicode.status !== "not-submitted" || record.unicode.existing_unicode_mapping !== null
        || record.representations.asset_status !== "not-yet-drawn") fail(`registry boundary mismatch for ${asset.record_id}`);
    if (sha256(svgBytes) !== asset.sha256) fail(`source SHA-256 mismatch for ${asset.record_id}`);
    verifyProvenance(provenance, asset);
    const parsed = parseLockedSvg(svgBytes);
    const packagePath = `svg/${key}.svg`;
    await mkdir(path.join(output, "svg"), { recursive: true });
    await writeFile(path.join(output, packagePath), svgBytes);
    bodies.push({ key, ...parsed });
    icons.push({
      semantic_id: record.id,
      package_key: key,
      name: record.name,
      definition: record.semantics.definition,
      aliases: record.semantics.aliases,
      related_terms: record.semantics.related_terms ?? [],
      alias_policy: {
        match_scope: "whole-label-audio-filter-response-class-only",
        exact_labels: [record.name, ...record.semantics.aliases],
        allowed_lookup_labels: [...new Set([record.name, ...record.semantics.aliases].flatMap(approvedAliasVariants))],
        related_only_labels: record.semantics.related_terms ?? [],
        blocked_examples: BLOCKED_ALIAS_EXAMPLES[record.id],
        normalization: {
          ascii_case_fold: true, trim_outer_ascii_whitespace: true,
          attributive_separator_variants: "first-internal-space-or-hyphen-only", other_separator_changes: false,
          morphological_inference: false,
        },
        explicit_product_documentation: "overrides-and-disables-generic-lookup",
        prohibited_inference: PROHIBITED_ALIAS_INFERENCE,
      },
      text_fallback: record.semantics.text_fallback,
      spoken_label: record.semantics.spoken_label,
      registry_status: record.status,
      artwork: {
        family: "compact-a", asset_id: candidate.asset_id, source_asset_status: "draft",
        registry_asset_status: record.representations.asset_status, publication_status: "unpublished",
        canonical: false, accepted: false,
      },
      svg: {
        view_box: parsed.viewBox, sha256: asset.sha256, source_path: asset.path, package_path: packagePath,
        provenance_path: candidate.provenance_path, source_bytes_preserved: true,
      },
      accessibility: {
        informative_alt: record.name, control_label: `Select ${record.semantics.spoken_label}`,
        decorative_hidden: true, iconify_default_hidden: true, color_inherits_current_color: true,
      },
      external_mappings: { ...EXTERNAL_MAPPINGS[record.id], smufl_glyph_name: null },
      code_points: { unicode: null, smufl: null, private_use: null },
    });
  }
  validateAliasPolicies(icons);

  const manifest = {
    schema_version: "0.1.0",
    package: {
      name: "asr-private-filter-icons", format_version: "0.1.0", visibility: "private-internal",
      canonical: false, published: false,
      license: { source_artwork: "CC0-1.0", package_output: null, publication_license_selected: false },
    },
    source: {
      registry_version: registryMetadata.artifacts.registry.version,
      registry_schema_version: registryMetadata.artifacts.schema.version,
      artwork_version: artworkMetadata.artwork_version,
      artwork_publication_status: artworkMetadata.publication_status,
      artwork_canonical_assets: artworkMetadata.canonical_assets,
      artwork_lock_id: lock.lock_id,
    },
    boundaries: {
      generated_outside_repository: true, source_geometry_authoritative: true, unicode_hold_changed: false,
      artwork_accepted: false, external_release_authorized: false, character_interchange_claimed: false,
    },
    icons,
  };
  const sprite = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true">\n${bodies.map(({ key, viewBox, pathMarkup }) => `  <symbol id="${key}" viewBox="${viewBox}">\n    ${pathMarkup}\n  </symbol>`).join("\n")}\n</svg>\n`;
  const iconify = {
    prefix: "asr-filter",
    icons: Object.fromEntries(bodies.map(({ key, pathMarkup }) => [key.slice("filter-".length), { body: pathMarkup }])),
    width: 24,
    height: 24,
  };
  const files = new Map([
    ["manifest.json", json(manifest)],
    ["schema/manifest.schema.json", schemaBytes],
    ["sprite/audio-filter-symbols.svg", sprite],
    ["iconify/asr-filter.json", json(iconify)],
    ["lookup/filter-symbols.mjs", buildLookup(icons)],
    ["lookup/filter-symbols.d.ts", buildTypes(icons)],
    ["examples/accessibility.html", buildAccessibilityExample(icons, bodies)],
    ["examples/css-mask.css", buildCss(icons)],
    ["README.md", "# Private internal filter icon package\n\nPRIVATE INTERNAL / UNPUBLISHED / NONCANONICAL. Generated from byte-locked draft artwork. This artifact assigns no Unicode, SMuFL, or Private Use Area code points, makes no character-interchange claim, selects no package-output publication license, and is not authorized for release or external use. Alias resolution is whole-label and audio-response-class-only. Its explicit index permits only the first attributive space/hyphen variant of an approved exact label; later separators cannot change. Explicit product documentation overrides generic lookup. Iconify components default to decorative and aria-hidden. Meaningful inline SVG use requires a consumer-owned unique title ID and matching aria-labelledby wrapper, as shown in the accessibility example.\n"],
  ]);
  for (const [relative, content] of files) {
    await mkdir(path.dirname(path.join(output, relative)), { recursive: true });
    await writeFile(path.join(output, relative), content);
  }
  const integrityFiles = [...files.keys(), ...icons.map(({ svg: { package_path: packagePath } }) => packagePath)].sort();
  const integrity = {};
  for (const relative of integrityFiles) integrity[relative] = sha256(await readFile(path.join(output, relative)));
  await writeFile(path.join(output, "package-integrity.json"), json({ algorithm: "sha256", files: integrity }));
  return { output, manifest, integrity };
}

async function main() {
  const [output] = process.argv.slice(2);
  const result = await buildPrivateIconPackage(DEFAULT_ROOT, output);
  console.log(`Private internal icon package built outside repository: ${result.output}`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
