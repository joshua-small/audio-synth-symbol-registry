import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { access, mkdir, readFile, realpath, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";
import { buildPropertySimulation } from "./simulate-filter-symbol-properties.mjs";

const execFileAsync = promisify(execFile);
const SIZES = [16, 20, 24, 32, 64];
const THEMES = {
  light: { foreground: "#000000", background: "#ffffff", backgroundByte: 255 },
  dark: { foreground: "#ffffff", background: "#000000", backgroundByte: 0 },
};
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");

async function ensurePrivateRoot(root, output) {
  const repository = await realpath(root);
  const parent = await realpath(path.dirname(output));
  const resolved = path.join(parent, path.basename(output));
  if (resolved === repository || resolved.startsWith(`${repository}${path.sep}`)) {
    throw new Error("private proof-validation output must be outside the repository");
  }
  await access(resolved).then(
    () => { throw new Error("private proof-validation output already exists"); },
    (error) => { if (error.code !== "ENOENT") throw error; },
  );
  await mkdir(resolved);
  return resolved;
}

async function render(svg, size, { foreground, background }) {
  const themed = svg.replace(/<svg\b/, `<svg color="${foreground}"`);
  return sharp(Buffer.from(themed), { density: 288 })
    .resize(size, size, { fit: "fill" })
    .flatten({ background })
    .png({ compressionLevel: 9, adaptiveFiltering: false })
    .toBuffer();
}

async function comparePngs(sourcePng, proofPng, backgroundByte) {
  const source = await sharp(sourcePng).greyscale().raw().toBuffer();
  const proof = await sharp(proofPng).greyscale().raw().toBuffer();
  let absoluteDifference = 0;
  let maximumDifference = 0;
  let differencesOver32 = 0;
  let sourceInk = 0;
  let proofInk = 0;
  for (let index = 0; index < source.length; index += 1) {
    const difference = Math.abs(source[index] - proof[index]);
    absoluteDifference += difference;
    maximumDifference = Math.max(maximumDifference, difference);
    if (difference > 32) differencesOver32 += 1;
    if (source[index] !== backgroundByte) sourceInk += 1;
    if (proof[index] !== backgroundByte) proofInk += 1;
  }
  return {
    mean_absolute_difference: absoluteDifference / source.length,
    maximum_channel_difference: maximumDifference,
    pixels_differing_over_32: differencesOver32,
    source_ink_pixels: sourceInk,
    proof_ink_pixels: proofInk,
    ink_pixel_delta_ratio: Math.abs(sourceInk - proofInk) / sourceInk,
  };
}

export async function validatePrivateFontProof(root, output, { python = "python3" } = {}) {
  const resolvedOutput = await ensurePrivateRoot(root, output);
  const first = path.join(resolvedOutput, "build-a");
  const second = path.join(resolvedOutput, "build-b");
  const builder = path.join(root, "tooling/private-font-proof/build_private_font_proof.py");
  await execFileAsync(python, [builder, "--root", root, "--out", first]);
  await execFileAsync(python, [builder, "--root", root, "--out", second]);
  const [manifestA, manifestB] = await Promise.all([
    readFile(path.join(first, "manifest.json"), "utf8").then(JSON.parse),
    readFile(path.join(second, "manifest.json"), "utf8").then(JSON.parse),
  ]);
  if (manifestA.font.sha256 !== manifestB.font.sha256) throw new Error("font build is not deterministic");
  if (manifestA.font.ttx_sha256 !== manifestB.font.ttx_sha256) throw new Error("normalized TTX is not deterministic");
  if (manifestA.font.has_cmap || manifestA.font.code_points.length !== 0 || manifestA.font.tables.includes("cmap")) {
    throw new Error("proof font unexpectedly contains a character mapping");
  }
  if (manifestA.font.glyph_instructions_present || manifestA.font.maximum_instruction_bytes !== 0) {
    throw new Error("proof font unexpectedly contains hinting instructions");
  }
  if (manifestA.glyphs.length !== 6 || new Set(manifestA.glyphs.map(({ glyph_name: name }) => name)).size !== 6) {
    throw new Error("proof font does not contain exactly six distinct named glyphs");
  }

  const propertySimulation = await buildPropertySimulation(root, path.join(resolvedOutput, "property-simulation"));
  if (!propertySimulation.pass || propertySimulation.code_points.length !== 0) {
    throw new Error("abstract property simulation failed or allocated a code point");
  }

  const renderRoot = path.join(resolvedOutput, "rendering");
  await mkdir(renderRoot);
  const rendering = [];
  for (const glyph of manifestA.glyphs) {
    const glyphDirectory = path.join(renderRoot, glyph.glyph_name);
    await mkdir(glyphDirectory);
    const [sourceSvg, proofSvg] = await Promise.all([
      readFile(path.join(root, glyph.source_path), "utf8"),
      readFile(path.join(first, "glyphs", `${glyph.glyph_name}.svg`), "utf8"),
    ]);
    for (const size of SIZES) {
      for (const [themeName, theme] of Object.entries(THEMES)) {
        const [sourcePng, proofPng] = await Promise.all([
          render(sourceSvg, size, theme),
          render(proofSvg, size, theme),
        ]);
        const metrics = await comparePngs(sourcePng, proofPng, theme.backgroundByte);
        const pass = metrics.mean_absolute_difference <= 1
          && metrics.maximum_channel_difference <= 32
          && metrics.pixels_differing_over_32 === 0
          && metrics.ink_pixel_delta_ratio <= 0.03;
        const sourceName = `${size}-${themeName}-source.png`;
        const proofName = `${size}-${themeName}-proof.png`;
        await Promise.all([
          writeFile(path.join(glyphDirectory, sourceName), sourcePng),
          writeFile(path.join(glyphDirectory, proofName), proofPng),
        ]);
        rendering.push({
          record_id: glyph.record_id,
          glyph_name: glyph.glyph_name,
          size_px: size,
          theme: themeName,
          source_png_sha256: sha256(sourcePng),
          proof_png_sha256: sha256(proofPng),
          ...metrics,
          pass,
        });
      }
    }
  }
  if (rendering.some(({ pass }) => !pass)) throw new Error("proof outline diverges visibly from a locked SVG render");

  const serializedDirectGlyphInspection = manifestA.glyphs.map((glyph) => ({
    record_id: glyph.record_id,
    glyph_name: glyph.glyph_name,
    requested_gid: glyph.serialized_lookup.requested_gid,
    resolved_name: glyph.serialized_lookup.resolved_name,
    roundtrip_gid: glyph.serialized_lookup.roundtrip_gid,
    outline_recording_sha256: glyph.serialized_lookup.outline_recording_sha256,
    outline_operation_count: glyph.serialized_lookup.outline_operation_count,
    advance_width: glyph.serialized_lookup.advance_width,
    substitution_tables_present: manifestA.font.tables.some((table) => table === "GSUB" || table === "GPOS"),
    pass: glyph.serialized_lookup.requested_gid === glyph.glyph_id
      && glyph.serialized_lookup.resolved_name === glyph.glyph_name
      && glyph.serialized_lookup.roundtrip_gid === glyph.glyph_id
      && glyph.serialized_lookup.outline_operation_count > 0
      && glyph.serialized_lookup.advance_width === manifestA.font.units_per_em,
  }));
  if (serializedDirectGlyphInspection.some(({ pass, substitution_tables_present: layout }) => !pass || layout)) {
    throw new Error("direct-GID shaping/layout assumptions failed");
  }

  const report = {
    validation_schema_version: "0.1.0",
    status: "private-proof-validation-passed",
    source_commit: (await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root })).stdout.trim(),
    deterministic_build: {
      runs: 2,
      font_sha256: manifestA.font.sha256,
      ttx_sha256: manifestA.font.ttx_sha256,
      identical: true,
    },
    encoding_boundary: {
      cmap_present: false,
      code_points: [],
      glyph_access: "stable internal glyph name or glyph ID only",
    },
    property_simulation: {
      pass: propertySimulation.pass,
      profile: propertySimulation.symbols[0].profile,
      cases: propertySimulation.bidi_cases.length,
      line_break_cases: propertySimulation.line_break_cases.length,
      limitations: propertySimulation.limitations,
    },
    serialized_direct_glyph_inspection: serializedDirectGlyphInspection,
    rendering: {
      comparisons: rendering,
      all_pass: rendering.every(({ pass }) => pass),
      thresholds: {
        maximum_mean_absolute_difference: 1,
        maximum_channel_difference: 32,
        pixels_differing_over_32: 0,
        maximum_ink_pixel_delta_ratio: 0.03,
      },
    },
    licensing: manifestA.licensing,
    boundaries: manifestA.boundaries,
    limitations: [
      "Rendering compares deterministic outline-extraction SVGs with the locked SVG oracle through one librsvg/sharp stack; it is not multi-platform rasterizer evidence.",
      "Direct-GID inspection proves stable glyph order, equal advances, and absence of substitution/positioning tables; HarfBuzz direct-glyph rendering was not available in this environment.",
      "The proof establishes private font feasibility only, not Unicode eligibility, interchange need, artwork acceptance, publication readiness, or human recognition.",
    ],
  };
  await writeFile(path.join(resolvedOutput, "validation-report.json"), `${JSON.stringify(report, null, 2)}\n`);
  await rm(second, { recursive: true });
  return report;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length !== 2 || args[0] !== "--out") {
    throw new Error("usage: node tooling/private-font-proof/validate-private-font-proof.mjs --out NEW_PRIVATE_DIRECTORY");
  }
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
  const report = await validatePrivateFontProof(root, path.resolve(args[1]));
  console.log(JSON.stringify({
    status: report.status,
    font_sha256: report.deterministic_build.font_sha256,
    comparisons: report.rendering.comparisons.length,
  }));
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
