import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { createHash } from "node:crypto";
import { buildStudyPackage } from "../tooling/build-study-package.mjs";

const svg = (shape) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${shape}"/></svg>\n`;

async function fixture() {
  const root = await mkdtemp(join(tmpdir(), "asr-study-"));
  await mkdir(join(root, "input"));
  await writeFile(join(root, "input", "a.svg"), svg("M2 2 L22 22"));
  await writeFile(join(root, "input", "b.svg"), svg("M2 22 L22 2"));
  const plan = {
    study_id: "test-pilot-v1",
    randomization_seed: "fixture-only-seed-at-least-32-bytes",
    form_count: 3,
    stimuli: [
      { record_id: "asr:test.a", blind_svg_path: "input/a.svg", forbidden_terms: ["test a"] },
      { record_id: "asr:test.b", blind_svg_path: "input/b.svg", forbidden_terms: ["test b"] },
    ],
    forced_choices: [
      { id: "choice-a", label: "Choice A", private_note: "must not be copied" },
      { id: "choice-b", label: "Choice B" },
    ],
  };
  const planPath = join(root, "plan.json");
  await writeFile(planPath, JSON.stringify(plan));
  return { root, planPath };
}

test("creates separated public and private deterministic packages", async () => {
  const { root, planPath } = await fixture();
  const first = await buildStudyPackage(planPath, join(root, "out-a"));
  const second = await buildStudyPackage(planPath, join(root, "out-b"));
  assert.deepEqual(first, second);
  const publicText = await readFile(join(root, "out-a", "public", "instrument.json"), "utf8");
  assert.doesNotMatch(publicText, /asr:test|input\/|fixture-only-seed/);
  assert.doesNotMatch(publicText, /must not be copied/);
  const privateText = await readFile(join(root, "out-a", "private", "answer-key.json"), "utf8");
  assert.match(privateText, /asr:test\.a/);
  assert.equal((await stat(join(root, "out-a", "private"))).mode & 0o077, 0);
  assert.equal((await stat(join(root, "out-a", "private", "answer-key.json"))).mode & 0o077, 0);
  assert.equal(first.publicInstrument.forms.length, 3);
  assert.equal(first.publicInstrument.stimuli.length, 2);
});

test("locks each copied stimulus with a SHA-256 digest", async () => {
  const { root, planPath } = await fixture();
  const { publicInstrument } = await buildStudyPackage(planPath, join(root, "out"));
  for (const stimulus of publicInstrument.stimuli) {
    assert.match(stimulus.sha256, /^[0-9a-f]{64}$/);
    const asset = await readFile(join(root, "out", "public", stimulus.asset));
    assert.match(asset.toString("utf8"), /^<svg/);
    assert.equal(createHash("sha256").update(asset).digest("hex"), stimulus.sha256);
  }
});

test("rejects semantic leakage in a blind derivative", async () => {
  const { root, planPath } = await fixture();
  await writeFile(join(root, "input", "a.svg"), `${svg("M2 2 L22 22")}<!-- asr:test.a -->`);
  await assert.rejects(
    buildStudyPackage(planPath, join(root, "out")),
    /contains forbidden term: asr:test\.a/,
  );
});

test("refuses to overwrite an existing package directory", async () => {
  const { root, planPath } = await fixture();
  const output = join(root, "out");
  await buildStudyPackage(planPath, output);
  await assert.rejects(buildStudyPackage(planPath, output));
});

test("rejects a short randomization seed", async () => {
  const { root, planPath } = await fixture();
  const plan = JSON.parse(await readFile(planPath, "utf8"));
  plan.randomization_seed = "too-short";
  await writeFile(planPath, JSON.stringify(plan));
  await assert.rejects(
    buildStudyPackage(planPath, join(root, "out")),
    /at least 32 UTF-8 bytes/,
  );
});
