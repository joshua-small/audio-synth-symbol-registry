import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const root = new URL(".", import.meta.url).pathname;
const records = [
  ["filter.high-pass", "High-pass"],
  ["filter.low-pass", "Low-pass"],
  ["filter.band-pass", "Band-pass"],
  ["filter.band-stop", "Band-stop"],
  ["filter.low-shelf", "Low shelf"],
  ["filter.high-shelf", "High shelf"],
];
const sizes = [16, 20, 24, 32, 64];
const themes = ["light", "dark"];
const width = 1120;
const height = 844;
const left = 200;
const top = 110;
const cellWidth = 88;
const cellHeight = 112;

const escapeXml = (text) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const labels = [
  `<text x="24" y="38" font-size="22" font-weight="700">Compact response silhouette A - six-member draft</text>`,
  `<text x="24" y="66" font-size="14">Exact-size QA rasters; L = light, D = dark</text>`,
];

for (let sizeIndex = 0; sizeIndex < sizes.length; sizeIndex += 1) {
  for (let themeIndex = 0; themeIndex < themes.length; themeIndex += 1) {
    const column = sizeIndex * 2 + themeIndex;
    const x = left + column * cellWidth + cellWidth / 2;
    labels.push(`<text x="${x}" y="94" text-anchor="middle" font-size="13" font-weight="700">${sizes[sizeIndex]} ${themeIndex === 0 ? "L" : "D"}</text>`);
  }
}

const composites = [];
for (let row = 0; row < records.length; row += 1) {
  const [record, label] = records[row];
  const y = top + row * cellHeight;
  labels.push(`<text x="24" y="${y + 48}" font-size="16" font-weight="700">${escapeXml(label)}</text>`);
  labels.push(`<text x="24" y="${y + 70}" font-size="12">${escapeXml(record)}</text>`);
  for (let sizeIndex = 0; sizeIndex < sizes.length; sizeIndex += 1) {
    for (let themeIndex = 0; themeIndex < themes.length; themeIndex += 1) {
      const size = sizes[sizeIndex];
      const theme = themes[themeIndex];
      const column = sizeIndex * 2 + themeIndex;
      const cellX = left + column * cellWidth + 8;
      const cellY = y + 8;
      const background = theme === "light" ? "#ffffff" : "#000000";
      labels.push(`<rect x="${cellX}" y="${cellY}" width="72" height="72" rx="4" fill="${background}" stroke="#888888"/>`);
      const png = await readFile(join(root, "review", record, `${record}-${size}-${theme}.png`));
      composites.push({ input: png, left: cellX + Math.floor((72 - size) / 2), top: cellY + Math.floor((72 - size) / 2) });
    }
  }
}

const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="#e8e8e8"/><g font-family="sans-serif" fill="#111111">${labels.join("")}</g></svg>`);
const output = await sharp(overlay).composite(composites).png({ compressionLevel: 9, adaptiveFiltering: false }).toBuffer();
await writeFile(join(root, "review", "contact-sheet.png"), output);
console.log(`Wrote ${join(root, "review", "contact-sheet.png")}`);
