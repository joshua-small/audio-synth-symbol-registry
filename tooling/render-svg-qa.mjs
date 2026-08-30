import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";
import { validateStudySvgBytes } from "./validate-study-svg.mjs";

export const QA_SIZES = [16, 20, 24, 32, 64];
export const QA_THEMES = {
  light: { foreground: "#000000", background: "#ffffff" },
  dark: { foreground: "#ffffff", background: "#000000" },
};

const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");

export async function renderSvgQa(svgPath, outputPath) {
  const source = await readFile(svgPath);
  validateStudySvgBytes(source);
  const sourceText = source.toString("utf8");
  const outputDirectory = resolve(outputPath);
  await mkdir(outputDirectory, { recursive: false });
  const outputs = [];

  for (const size of QA_SIZES) {
    for (const [theme, colors] of Object.entries(QA_THEMES)) {
      const themed = sourceText.replace(/<svg\b/, `<svg color="${colors.foreground}"`);
      const filename = `${basename(svgPath, ".svg")}-${size}-${theme}.png`;
      const png = await sharp(Buffer.from(themed), { density: 288 })
        .resize(size, size, { fit: "contain" })
        .flatten({ background: colors.background })
        .png({ compressionLevel: 9, adaptiveFiltering: false })
        .toBuffer();
      const metadata = await sharp(png).metadata();
      if (metadata.width !== size || metadata.height !== size) throw new Error(`rendered ${filename} has unexpected dimensions`);
      const { data, info } = await sharp(png).removeAlpha().raw().toBuffer({ resolveWithObject: true });
      const background = theme === "light" ? 255 : 0;
      let inkPixels = 0;
      for (let pixel = 0; pixel < info.width * info.height; pixel += 1) {
        const offset = pixel * info.channels;
        if (data[offset] !== background || data[offset + 1] !== background || data[offset + 2] !== background) inkPixels += 1;
      }
      if (inkPixels === 0 || inkPixels === size * size) throw new Error(`rendered ${filename} has no distinguishable bounded geometry`);
      await writeFile(join(outputDirectory, filename), png);
      outputs.push({ filename, size_px: size, theme, ink_pixels: inkPixels, sha256: sha256(png) });
    }
  }

  const manifest = {
    qa_schema_version: "0.1.0",
    source_file: basename(svgPath),
    source_sha256: sha256(source),
    renderer: { name: "sharp", version: sharp.versions.sharp, vips: sharp.versions.vips, rsvg: sharp.versions.rsvg },
    outputs,
    limitation: "Automated rendering proves reproducibility and dimensions, not human legibility or artwork acceptance.",
  };
  await writeFile(join(outputDirectory, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  return manifest;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length !== 4 || args[0] !== "--svg" || args[2] !== "--out") {
    throw new Error("usage: npm run svg:qa -- --svg FILE.svg --out NEW_DIRECTORY");
  }
  const manifest = await renderSvgQa(args[1], args[3]);
  console.log(`Rendered ${manifest.outputs.length} QA artifact(s) to ${resolve(args[3])}.`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
