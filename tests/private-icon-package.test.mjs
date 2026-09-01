import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, symlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";
import { promisify } from "node:util";
import { buildPrivateIconPackage } from "../tooling/private-icon-package/build-private-icon-package.mjs";
import { validatePrivateIconPackage } from "../tooling/private-icon-package/validate-private-icon-package.mjs";

const root = process.cwd();
const execFileAsync = promisify(execFile);
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");

test("private package is deterministic, schema-valid, byte-preserving, and unencoded", async (context) => {
  const parent = await mkdtemp(path.join(tmpdir(), "asr-private-icon-test-"));
  context.after(() => rm(parent, { recursive: true, force: true }));
  const report = await validatePrivateIconPackage(root, parent);
  assert.equal(report.status, "private-icon-package-validation-passed");
  assert.equal(report.deterministic_build.identical, true);
  assert.equal(report.deterministic_build.file_count, 16);
  assert.equal(report.icon_count, 6);
  assert.equal(report.source_svg_bytes_preserved, true);
  assert.deepEqual(report.code_points, { unicode: [], smufl: [], private_use: [] });
  assert.deepEqual(report.boundaries, {
    generated_outside_repository: true,
    source_geometry_authoritative: true,
    unicode_hold_changed: false,
    artwork_accepted: false,
    external_release_authorized: false,
    character_interchange_claimed: false,
  });

  const manifest = JSON.parse(await readFile(path.join(report.output, "manifest.json"), "utf8"));
  const expectedIds = ["asr:filter.high-pass", "asr:filter.low-pass", "asr:filter.band-pass", "asr:filter.band-stop", "asr:filter.low-shelf", "asr:filter.high-shelf"];
  assert.deepEqual(manifest.icons.map(({ semantic_id: id }) => id), expectedIds);
  assert.deepEqual(manifest.icons.map(({ package_key: key }) => key), expectedIds.map((id) => id.slice(4).replace(".", "-")));
  assert.ok(manifest.icons.every(({ code_points: points }) => Object.values(points).every((value) => value === null)));
  assert.ok(manifest.icons.every(({ artwork }) => artwork.source_asset_status === "draft" && artwork.registry_asset_status === "not-yet-drawn"));
  assert.ok(manifest.icons.every(({ accessibility }) => accessibility.decorative_hidden && accessibility.iconify_default_hidden && accessibility.control_label.startsWith("Select ")));
  assert.ok(manifest.icons.every((icon) => icon.alias_policy.match_scope === "whole-label-audio-filter-response-class-only"
    && icon.alias_policy.normalization.morphological_inference === false
    && icon.alias_policy.normalization.attributive_separator_variants === "first-internal-space-or-hyphen-only"
    && icon.alias_policy.normalization.other_separator_changes === false
    && icon.alias_policy.explicit_product_documentation === "overrides-and-disables-generic-lookup"
    && JSON.stringify(icon.alias_policy.exact_labels) === JSON.stringify([icon.name, ...icon.aliases])
    && JSON.stringify(icon.alias_policy.related_only_labels) === JSON.stringify(icon.related_terms)));
  assert.equal(manifest.package.license.package_output, null);

  for (const icon of manifest.icons) {
    const [source, packaged] = await Promise.all([readFile(path.join(root, icon.svg.source_path)), readFile(path.join(report.output, icon.svg.package_path))]);
    assert.deepEqual(packaged, source);
    assert.equal(hash(packaged), icon.svg.sha256);
  }
});

test("Iconify data, sprite, lookup, and accessibility examples carry the six semantic keys without text-encoding claims", async (context) => {
  const parent = await mkdtemp(path.join(tmpdir(), "asr-private-icon-surfaces-"));
  context.after(() => rm(parent, { recursive: true, force: true }));
  const { output, manifest } = await buildPrivateIconPackage(root, path.join(parent, "package"));
  const [iconify, sprite, html, css, lookupSource] = await Promise.all([
    readFile(path.join(output, "iconify/asr-filter.json"), "utf8").then(JSON.parse),
    readFile(path.join(output, "sprite/audio-filter-symbols.svg"), "utf8"),
    readFile(path.join(output, "examples/accessibility.html"), "utf8"),
    readFile(path.join(output, "examples/css-mask.css"), "utf8"),
    readFile(path.join(output, "lookup/filter-symbols.mjs"), "utf8"),
  ]);
  assert.equal(iconify.prefix, "asr-filter");
  assert.deepEqual(Object.keys(iconify.icons), manifest.icons.map(({ package_key: key }) => key.slice(7)));
  assert.ok(Object.values(iconify.icons).every(({ body }) => /^<path /.test(body) && !/aria-|title|desc/.test(body)));
  assert.equal((sprite.match(/<symbol /g) ?? []).length, 6);
  assert.ok(manifest.icons.every(({ package_key: key }) => sprite.includes(`id="${key}"`) && css.includes(`filter-icon--${key}`)));
  assert.equal((html.match(/aria-hidden="true"/g) ?? []).length, 6);
  assert.equal((html.match(/aria-label="Select /g) ?? []).length, 6);
  assert.equal((html.match(/<img [^>]+ alt="/g) ?? []).length, 6);
  const inlineTitleIds = [...html.matchAll(/<title id="([^"]+)">/g)].map((match) => match[1]);
  const inlineLabelledBy = [...html.matchAll(/<svg role="img" aria-labelledby="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(inlineTitleIds.length, 6);
  assert.equal(new Set(inlineTitleIds).size, 6);
  assert.deepEqual(inlineLabelledBy, inlineTitleIds);
  assert.ok(Object.values(iconify.icons).every(({ body }) => html.includes(body)), "inline examples must reuse verified locked path markup");
  assert.match(html, /Iconify components default to decorative and aria-hidden/);
  assert.doesNotMatch(html + css, /https?:|data:|javascript:/i);
  assert.doesNotMatch(sprite.replace('xmlns="http://www.w3.org/2000/svg"', ""), /https?:|data:|javascript:/i);
  assert.doesNotMatch(lookupSource, /code_point[^\n]+(?:U\+|0x|[1-9][0-9]{3,})/i);

  const lookup = await import(`${pathToFileURL(path.join(output, "lookup/filter-symbols.mjs")).href}?test=1`);
  assert.deepEqual(lookup.FILTER_SYMBOL_KEYS, manifest.icons.map(({ package_key: key }) => key));
  assert.equal(lookup.getFilterSymbol("filter-high-pass").semantic_id, "asr:filter.high-pass");
  assert.equal(lookup.getFilterSymbol("not-a-key"), null);
  const aliasContext = { context: "audio-filter-response-class" };
  assert.equal(lookup.resolveFilterSymbolAlias("  LOW-CUT  ", aliasContext).semantic_id, "asr:filter.high-pass");
  assert.equal(lookup.resolveFilterSymbolAlias("high shelving filter", aliasContext).semantic_id, "asr:filter.high-shelf");
  assert.equal(lookup.resolveFilterSymbolAlias("low-shelving filter", aliasContext).semantic_id, "asr:filter.low-shelf");
  assert.equal(lookup.resolveFilterSymbolAlias("low shelf filter", aliasContext).semantic_id, "asr:filter.low-shelf");
  for (const label of ["notch filter", "low shelving", "high shelving", "cut the lows", "low-frequency cut", "low cut amount", "low cut-off frequency", "cut the highs", "LS", "HS"]) {
    assert.equal(lookup.resolveFilterSymbolAlias(label, aliasContext), null, `${label} must not become an exact alias`);
  }
  assert.equal(lookup.resolveFilterSymbolAlias("low cut"), null, "missing response-class context must fail closed");
  assert.equal(lookup.resolveFilterSymbolAlias("low cut", { ...aliasContext, explicitProductDocumentation: true }), null, "product documentation must override generic lookup");
  assert.equal(lookup.resolveFilterSymbolAlias("low--cut", aliasContext), null, "invented separator variants must fail closed");
  for (const label of ["low-shelving-filter", "high-shelving-filter", "low-shelf-filter", "band-pass-filter"]) {
    assert.equal(lookup.resolveFilterSymbolAlias(label, aliasContext), null, `${label} must not inherit a second separator change`);
  }
});

test("builder refuses repository output and an existing output directory", async (context) => {
  await assert.rejects(buildPrivateIconPackage(root, path.join(root, "private-icons-must-not-exist")), /outside the repository/);
  const parent = await mkdtemp(path.join(tmpdir(), "asr-private-icon-refusal-"));
  context.after(() => rm(parent, { recursive: true, force: true }));
  const output = path.join(parent, "package");
  await buildPrivateIconPackage(root, output);
  await assert.rejects(buildPrivateIconPackage(root, output), /EEXIST/);
  const alias = path.join(parent, "repository-alias");
  await symlink(root, alias, "dir");
  await assert.rejects(buildPrivateIconPackage(root, path.join(alias, "symlink-output-must-not-exist")), /outside the repository/);
});

test("repository tracks only generator, schema, tests, and readiness documentation", async () => {
  const [{ stdout }, packageJson, metadata, report] = await Promise.all([
    execFileAsync("git", ["ls-files"], { cwd: root }),
    readFile(path.join(root, "package.json"), "utf8").then(JSON.parse),
    readFile(path.join(root, "registry/registry-metadata.json"), "utf8").then(JSON.parse),
    readFile(path.join(root, "docs/private-icon-package-readiness-2026-09-01.md"), "utf8"),
  ]);
  const tracked = stdout.split("\n");
  assert.equal(packageJson.version, "0.9.0");
  assert.equal(metadata.artifacts.tooling.version, packageJson.version);
  assert.match(report, /PRIVATE INTERNAL/);
  assert.match(report, /no Unicode, SMuFL, or Private Use Area code point/);
  assert.match(report, /Unicode `HOLD` remains unchanged/);
  assert.ok(tracked.every((name) => !/(?:^|\/)(?:iconify|sprite|lookup|private-icon-package-output)(?:\/|$)/.test(name)));
});
