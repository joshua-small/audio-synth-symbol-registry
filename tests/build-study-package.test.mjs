import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { buildStudyPackage } from "../tooling/build-study-package.mjs";

const svg = (shape) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${shape}"/></svg>\n`;
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const execFileAsync = promisify(execFile);
const repositoryRoot = fileURLToPath(new URL("..", import.meta.url));

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

async function lockedFixture() {
  const root = await mkdtemp(join(tmpdir(), "asr-locked-study-"));
  const templatePath = join(repositoryRoot, "docs/studies/six-way-construction-plan.template.json");
  const plan = JSON.parse(await readFile(templatePath, "utf8"));
  plan.study_id = "fixture-six-way-v1";
  plan.randomization_seed = "fixture-only-cryptographic-seed-00000001";
  plan.binding_manifest_path = join(repositoryRoot, "docs/studies/six-member-compact-a-binding.json");
  const planPath = join(root, "plan.json");
  await writeFile(planPath, JSON.stringify(plan));
  return { root, plan, planPath };
}

async function recursiveFiles(root) {
  const paths = [];
  async function visit(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) await visit(path);
      else paths.push(path);
    }
  }
  await visit(root);
  return paths.sort();
}

test("binds the exact six locked drafts into a blinded construction package", async () => {
  const { root, planPath } = await lockedFixture();
  const { publicInstrument, privateKey } = await buildStudyPackage(planPath, join(root, "out"));
  assert.equal(publicInstrument.package_schema_version, "0.2.0");
  assert.equal(publicInstrument.construction_status, "construction-only");
  assert.equal(publicInstrument.stimuli.length, 6);
  assert.equal(publicInstrument.forced_choices.length, 8);
  assert.equal(privateKey.source_commit, "4ad8ec92477a938355df06bc943a57372c7f3438");
  assert.equal(privateKey.stimuli.length, 6);
  assert.equal(privateKey.directed_negative_controls.length, 6);
  assert.equal(privateKey.shelf_semantic_target, "affected-frequency-side");
  assert.equal(privateKey.gain_sign_priming, false);
  for (const stimulus of privateKey.stimuli) {
    assert.match(stimulus.source_sha256, /^[0-9a-f]{64}$/);
    assert.match(stimulus.output_sha256, /^[0-9a-f]{64}$/);
    assert.notEqual(stimulus.source_sha256, stimulus.output_sha256);
    const publicStimulus = publicInstrument.stimuli.find(({ token }) => token === stimulus.token);
    assert.equal(publicStimulus.sha256, stimulus.output_sha256);
    const text = await readFile(join(root, "out/public", publicStimulus.asset), "utf8");
    assert.doesNotMatch(text, /title|desc|aria|filter|shelf|pass|stop|band|asr|compact/i);
    assert.match(text, /<path /);
  }
  for (const form of publicInstrument.forms) {
    assert.equal(new Set(form.stimulus_order).size, 6);
    assert.deepEqual(new Set(form.stimulus_order), new Set(publicInstrument.stimuli.map(({ token }) => token)));
    for (const order of Object.values(form.choice_order_by_stimulus)) {
      assert.deepEqual(new Set(order), new Set(publicInstrument.forced_choices.map(({ id }) => id)));
    }
  }
});

test("keeps semantic mappings and source provenance out of public stimulus material", async () => {
  const { root, planPath } = await lockedFixture();
  await buildStudyPackage(planPath, join(root, "out"));
  const assetFiles = await recursiveFiles(join(root, "out/public/assets"));
  for (const path of assetFiles) {
    assert.match(path.split("/").at(-1), /^[0-9a-f]{20}\.svg$/);
    const text = await readFile(path, "utf8");
    assert.doesNotMatch(text, /asr|compact|filter|shelf|pass|stop|band|4ad8ec|fixture-only|source_sha|asset_id/i);
  }
  const instrument = JSON.parse(await readFile(join(root, "out/public/instrument.json"), "utf8"));
  assert.ok(instrument.forced_choices.some(({ label }) => label === "Low-shelf filter"));
  assert.doesNotMatch(JSON.stringify(instrument.stimuli), /filter|shelf|pass|stop|band|asr|compact|source/i);
});

test("is byte-deterministic and changes opaque tokens with a changed seed", async () => {
  const { root, plan, planPath } = await lockedFixture();
  await buildStudyPackage(planPath, join(root, "a"));
  await buildStudyPackage(planPath, join(root, "b"));
  for (const relative of ["public/instrument.json", "private/answer-key.json"]) {
    assert.deepEqual(await readFile(join(root, "a", relative)), await readFile(join(root, "b", relative)));
  }
  const firstAssets = await recursiveFiles(join(root, "a/public/assets"));
  const secondAssets = await recursiveFiles(join(root, "b/public/assets"));
  assert.deepEqual(firstAssets.map((path) => path.split("/").at(-1)), secondAssets.map((path) => path.split("/").at(-1)));
  plan.randomization_seed = "fixture-only-cryptographic-seed-00000002";
  const changedPlan = join(root, "changed-plan.json");
  await writeFile(changedPlan, JSON.stringify(plan));
  await buildStudyPackage(changedPlan, join(root, "changed"));
  const changedAssets = await recursiveFiles(join(root, "changed/public/assets"));
  assert.notDeepEqual(firstAssets.map((path) => path.split("/").at(-1)), changedAssets.map((path) => path.split("/").at(-1)));
  const digestSets = async (paths) => Promise.all(paths.map(async (path) => sha256(await readFile(path))));
  assert.deepEqual((await digestSets(firstAssets)).sort(), (await digestSets(changedAssets)).sort());
});

test("fails closed before output on hash, asset, commit, choice, control, and priming mutations", async () => {
  const mutations = [
    (plan) => { plan.stimuli[0].expected_source_sha256 = "0".repeat(64); },
    (plan) => { plan.stimuli[0].expected_asset_id = "asr-art:compact-a.wrong"; },
    (plan) => { plan.source_commit = "0".repeat(40); },
    (plan) => { plan.forced_choices[0].label = "Wrong label"; },
    (plan) => { plan.directed_negative_controls[0].confused_with_choice_id = "low-pass"; },
    (plan) => { plan.participant_instructions.push("Decide whether it is boost or cut around 0 dB."); },
  ];
  for (const [index, mutate] of mutations.entries()) {
    const { root, plan } = await lockedFixture();
    mutate(plan);
    const planPath = join(root, "mutated.json");
    const output = join(root, "out");
    await writeFile(planPath, JSON.stringify(plan));
    await assert.rejects(buildStudyPackage(planPath, output), `mutation ${index}`);
    await assert.rejects(stat(output), `mutation ${index} left output`);
  }
});

test("pins every locked digest to the authoritative geometry-lock commit", async (context) => {
  const binding = JSON.parse(await readFile(join(repositoryRoot, "docs/studies/six-member-compact-a-binding.json"), "utf8"));
  assert.equal(binding.source_commit, "4ad8ec92477a938355df06bc943a57372c7f3438");
  for (const asset of binding.assets) {
    const current = await readFile(join(repositoryRoot, asset.source_path));
    assert.equal(sha256(current), asset.source_sha256, asset.record_id);
    let historical = null;
    try {
      ({ stdout: historical } = await execFileAsync("git", ["show", `${binding.source_commit}:${asset.source_path}`], {
        cwd: repositoryRoot,
        encoding: "buffer",
        maxBuffer: 1024 * 1024,
      }));
    } catch (error) {
      // GitHub's pull-request checkout may be shallow and omit the base commit's
      // tree objects. Runtime authority still fails closed on the exact commit,
      // lock, metadata, provenance, QA manifest, and current source digest.
      context.diagnostic(`historical git object unavailable for ${asset.record_id}: ${error.code ?? "unknown"}`);
    }
    if (historical) assert.equal(sha256(historical), asset.source_sha256, asset.record_id);
  }
});

test("fails closed on correlated authority-tree and locked-source mutations", async () => {
  const cases = [
    {
      suffix: "six-member-compact-a-binding.json",
      mutate: (text) => text.replace(/4ad8ec92477a938355df06bc943a57372c7f3438/g, "0".repeat(40)),
      mutatePlan: (plan) => { plan.source_commit = "0".repeat(40); },
    },
    {
      suffix: "six-member-compact-a-binding.json",
      mutate: (text) => text.replace('"candidate_family_id": "compact-a"', '"candidate_family_id": "wrong"'),
    },
    {
      suffix: "six-member-compact-a-binding.json",
      mutate: (text) => text.replace('"record_id": "asr:filter.high-pass"', '"record_id": "asr:filter.wrong"'),
    },
    {
      suffix: "six-member-compact-a-binding.json",
      mutate: (text) => text.replace("artwork/candidates/compact-a/svg/filter.high-pass.svg", "artwork/candidates/compact-a/svg/filter.low-pass.svg"),
    },
    {
      suffix: "artwork/metadata.json",
      mutate: (text) => text.replace('"asset_status": "draft"', '"asset_status": "study-ready"'),
    },
    {
      suffix: "artwork/metadata.json",
      mutate: (text) => text.replace('"publication_status": "unpublished"', '"publication_status": "published"'),
    },
    {
      suffix: "artwork/study-locks/six-member-compact-a.json",
      mutate: (text) => text.replace('"asset_status": "draft"', '"asset_status": "accepted"'),
    },
    {
      suffix: "provenance/filter.high-pass.yaml",
      mutate: (text) => text.replace(/source_sha256: "[0-9a-f]{64}"/, `source_sha256: "${"0".repeat(64)}"`),
    },
    {
      suffix: "review/filter.high-pass/manifest.json",
      mutate: (text) => text.replace(/"source_sha256": "[0-9a-f]{64}"/, `"source_sha256": "${"0".repeat(64)}"`),
    },
    {
      suffix: "svg/filter.high-pass.svg",
      mutate: (bytes) => Buffer.concat([Buffer.from(bytes), Buffer.from("\n")]),
    },
  ];

  for (const [index, entry] of cases.entries()) {
    const { root, plan } = await lockedFixture();
    entry.mutatePlan?.(plan);
    const planPath = join(root, "plan.json");
    const output = join(root, "out");
    await writeFile(planPath, JSON.stringify(plan));
    const reader = async (path, encoding) => {
      const value = await readFile(path, encoding);
      return String(path).endsWith(entry.suffix) ? entry.mutate(value) : value;
    };
    await assert.rejects(buildStudyPackage(planPath, output, { readFile: reader }), `authority mutation ${index}`);
    await assert.rejects(stat(output), `authority mutation ${index} left output`);
  }
});

test("reads each locked SVG once and writes derivatives from retained buffers", async () => {
  const { root, planPath } = await lockedFixture();
  const counts = new Map();
  const reader = async (path, encoding) => {
    const key = String(path);
    if (key.includes("/artwork/candidates/compact-a/svg/")) {
      const count = (counts.get(key) ?? 0) + 1;
      counts.set(key, count);
      const original = await readFile(path, encoding);
      // Model a source replacement immediately after the authorized read. Any
      // second read would observe mutated bytes and either alter or fail output.
      return count === 1 ? original : Buffer.concat([Buffer.from(original), Buffer.from("<!-- replaced -->")]);
    }
    return readFile(path, encoding);
  };
  const { privateKey } = await buildStudyPackage(planPath, join(root, "out"), { readFile: reader });
  assert.equal(counts.size, 6);
  assert.ok([...counts.values()].every((count) => count === 1));
  for (const stimulus of privateKey.stimuli) {
    const output = await readFile(join(root, "out/public/assets", `${stimulus.token}.svg`));
    assert.equal(sha256(output), stimulus.output_sha256);
  }
});
