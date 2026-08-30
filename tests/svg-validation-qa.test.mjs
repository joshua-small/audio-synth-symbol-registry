import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { tmpdir } from "node:os";
import sharp from "sharp";
import { validateStudySvgBytes } from "../tooling/validate-study-svg.mjs";
import { QA_SIZES, QA_THEMES, renderSvgQa } from "../tooling/render-svg-qa.mjs";

const syntheticSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-labelledby="title desc" fill="none" stroke="currentColor" stroke-width="2"><title id="title">Synthetic QA fixture</title><desc id="desc">Non-candidate crossed lines used only to test rendering infrastructure.</desc><line x1="4" y1="4" x2="20" y2="20"/><line x1="20" y1="4" x2="4" y2="20"/></svg>\n`;

test("accepts a constrained accessible synthetic SVG", () => {
  assert.deepEqual(validateStudySvgBytes(syntheticSvg), {
    geometry_count: 2,
    title: "Synthetic QA fixture",
    description: "Non-candidate crossed lines used only to test rendering infrastructure.",
  });
});

for (const [name, mutation, expected] of [
  ["script", '<script>alert(1)</script>', /element <script> is prohibited/],
  ["event handler", ' onload="alert(1)"', /event-handler attribute onload is prohibited/],
  ["external href", '<image href="https://example.com/x.png"/>', /element <image> is prohibited/],
  ["raster data", '<image href="data:image/png;base64,AA=="/>', /element <image> is prohibited/],
  ["foreignObject", '<foreignObject/>', /element <foreignObject> is prohibited/],
  ["external use", '<use href="https://example.com/s.svg#x"/>', /element <use> is prohibited/],
  ["animation", '<animate attributeName="x"/>', /element <animate> is prohibited/],
  ["style", '<style>path{stroke:red}</style>', /element <style> is prohibited/],
  ["transform", ' transform="scale(2)"', /attribute transform .* is not allowed/],
  ["literal color", ' stroke="#f00"', /stroke must be currentColor or none/],
  ["DOCTYPE", '<!DOCTYPE svg>', /DOCTYPE declarations are prohibited/],
  ["comment", '<!-- hidden metadata -->', /XML comments are prohibited/],
]) {
  test(`rejects prohibited ${name}`, () => {
    const mutated = name === "DOCTYPE"
      ? `${mutation}${syntheticSvg}`
      : name === "literal color"
        ? syntheticSvg.replace('stroke="currentColor"', 'stroke="#f00"')
        : mutation.startsWith("<")
          ? syntheticSvg.replace("</svg>", `${mutation}</svg>`)
          : syntheticSvg.replace("<svg ", `<svg${mutation} `);
    assert.throws(() => validateStudySvgBytes(mutated), expected);
  });
}

test("rejects malformed XML and visible text", () => {
  assert.throws(() => validateStudySvgBytes(syntheticSvg.replace("</svg>", "oops</svg>")), /visible or stray text is prohibited/);
  assert.throws(() => validateStudySvgBytes(syntheticSvg.replace("</svg>", "")), /malformed XML/);
});

test("rejects incorrect accessibility wiring and a non-square viewBox", () => {
  assert.throws(
    () => validateStudySvgBytes(syntheticSvg.replace('aria-labelledby="title desc"', 'aria-labelledby="desc title"')),
    /aria-labelledby must reference title then description IDs/,
  );
  assert.throws(
    () => validateStudySvgBytes(syntheticSvg.replace('viewBox="0 0 24 24"', 'viewBox="0 0 24 20"')),
    /viewBox must have equal positive width and height/,
  );
  assert.throws(
    () => validateStudySvgBytes(syntheticSvg.replace('viewBox="0 0 24 24"', 'viewBox="0 0 0x18 0x18"')),
    /viewBox must contain four finite SVG numbers/,
  );
  assert.throws(
    () => validateStudySvgBytes(syntheticSvg.replace('viewBox="0 0 24 24"', 'viewBox="0 0 1e309 1e309"')),
    /viewBox must contain four finite SVG numbers/,
  );
});

test("rejects nested SVG and absent host-controlled color", () => {
  assert.throws(
    () => validateStudySvgBytes(syntheticSvg.replace("</svg>", '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"/></svg>')),
    /nested or multiple <svg> elements are prohibited/,
  );
  assert.throws(
    () => validateStudySvgBytes(syntheticSvg.replace('stroke="currentColor"', 'stroke="none"')),
    /at least one fill or stroke must use currentColor/,
  );
});

test("rejects geometry in text and children inside geometry primitives", () => {
  assert.throws(
    () => validateStudySvgBytes(syntheticSvg.replace("Synthetic QA fixture", 'Synthetic QA fixture<path d="M0 0L1 1"/>')),
    /<path> is not permitted inside <title>/,
  );
  assert.throws(
    () => validateStudySvgBytes(syntheticSvg.replace('<line x1="4" y1="4" x2="20" y2="20"/>', '<path d="M0 0"><line x1="0" y1="0" x2="1" y2="1"/></path>')),
    /<line> is not permitted inside <path>/,
  );
});

test("rejects invalid numeric, points, and path geometry", () => {
  assert.throws(() => validateStudySvgBytes(syntheticSvg.replace('stroke-width="2"', 'stroke-width="-2"')), /stroke-width must be greater than zero/);
  assert.throws(() => validateStudySvgBytes(syntheticSvg.replace('x1="4"', 'x1="NaN"')), /x1 must be one finite number/);
  assert.throws(
    () => validateStudySvgBytes(syntheticSvg.replace('<line x1="4" y1="4" x2="20" y2="20"/>', '<polyline points="0,0 1"/>')),
    /points must contain at least 2 finite coordinate pairs/,
  );
  assert.throws(
    () => validateStudySvgBytes(syntheticSvg.replace('<line x1="4" y1="4" x2="20" y2="20"/>', '<path d="not a path"/>')),
    /d must use valid SVG path syntax/,
  );
  assert.throws(
    () => validateStudySvgBytes(syntheticSvg.replace('<line x1="4" y1="4" x2="20" y2="20"/>', '<polyline points="0,0 1e309,1"/>')),
    /points must contain at least 2 finite coordinate pairs/,
  );
});

test("renders deterministic synthetic QA artifacts at every required size and theme", async () => {
  const root = await mkdtemp(join(tmpdir(), "asr-svg-qa-"));
  const source = join(root, "synthetic.svg");
  await writeFile(source, syntheticSvg);
  const first = await renderSvgQa(source, join(root, "first"));
  const second = await renderSvgQa(source, join(root, "second"));
  assert.deepEqual(first, second);
  assert.equal(first.outputs.length, QA_SIZES.length * Object.keys(QA_THEMES).length);
  for (const output of first.outputs) {
    const bytes = await readFile(join(root, "first", output.filename));
    const metadata = await sharp(bytes).metadata();
    assert.equal(metadata.width, output.size_px);
    assert.equal(metadata.height, output.size_px);
    assert.ok(output.ink_pixels > 0 && output.ink_pixels < output.size_px ** 2);
    assert.equal(createHash("sha256").update(bytes).digest("hex"), output.sha256);
  }
});

test("refuses to overwrite an existing QA directory", async () => {
  const root = await mkdtemp(join(tmpdir(), "asr-svg-qa-"));
  const source = join(root, "synthetic.svg");
  const output = join(root, "qa");
  await writeFile(source, syntheticSvg);
  await renderSvgQa(source, output);
  await assert.rejects(renderSvgQa(source, output));
});
