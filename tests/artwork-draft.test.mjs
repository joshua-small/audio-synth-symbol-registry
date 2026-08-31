import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const sha256 = (bytes) => createHash("sha256").update(bytes).digest("hex");
const sourceHashes = {
  "filter.high-pass": "7c24850dec29378b65b98e773843fe9f0a2cf1c63bea951acc0bec087e7eabc4",
  "filter.low-pass": "e80d153a3f5bcaac016663579fef4bc93ea4d8659e4637ef445655710aa4ce2f",
  "filter.band-pass": "30422a1bf1ba4e6fd44a88f8449839c2e84846087d27c54bb7d3805c8d1d44d9",
  "filter.band-stop": "a3a95dd236fc30544548a33c87da5323c2a142057c9bd0cb8c3552d366013292",
  "filter.low-shelf": "0bb19d4a3a75aa219059897166c6bd02163255ced11709c86703b3edf444eabc",
  "filter.high-shelf": "d7ddb71527ed3f655d9e146f227986977a92c4894fdb5112a9820d56e58544bf",
};

test("indexes one unpublished six-member compact-a draft family", async () => {
  const metadata = JSON.parse(await readFile(join(root, "artwork/metadata.json"), "utf8"));
  assert.equal(metadata.artwork_version, "0.0.0");
  assert.equal(metadata.publication_status, "unpublished");
  assert.deepEqual(metadata.canonical_assets, []);
  assert.equal(metadata.draft_candidates.length, 6);
  assert.deepEqual(new Set(metadata.draft_candidates.map((entry) => entry.candidate_family_id)), new Set(["compact-a"]));
  assert.ok(metadata.draft_candidates.every((entry) => entry.asset_status === "draft"));
  assert.ok(metadata.draft_candidates.every((entry) => !entry.candidate_path.includes("experiments")));
  for (const entry of metadata.draft_candidates) {
    await access(join(root, entry.candidate_path));
    await access(join(root, entry.provenance_path));
  }
  for (const artifact of metadata.review_artifacts) {
    const bytes = await readFile(join(root, artifact.path));
    assert.equal(sha256(bytes), artifact.sha256);
  }
});

test("preserves the original four sources and pins all six source hashes", async () => {
  for (const [record, expectedHash] of Object.entries(sourceHashes)) {
    const source = await readFile(join(root, "artwork/candidates/compact-a/svg", `${record}.svg`));
    assert.equal(sha256(source), expectedHash, record);
    const provenance = await readFile(join(root, "artwork/candidates/compact-a/provenance", `${record}.yaml`), "utf8");
    assert.match(provenance, new RegExp(`source_sha256: "${expectedHash}"`));
  }
});

test("pins complete light and dark QA renders for every member", async () => {
  for (const [record, expectedHash] of Object.entries(sourceHashes)) {
    const manifestPath = join(root, "artwork/candidates/compact-a/review", record, "manifest.json");
    const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
    assert.equal(manifest.source_file, `${record}.svg`);
    assert.equal(manifest.source_sha256, expectedHash);
    assert.equal(manifest.outputs.length, 10);
    assert.deepEqual(new Set(manifest.outputs.map((output) => output.size_px)), new Set([16, 20, 24, 32, 64]));
    assert.deepEqual(new Set(manifest.outputs.map((output) => output.theme)), new Set(["light", "dark"]));
    for (const output of manifest.outputs) {
      const png = await readFile(join(root, "artwork/candidates/compact-a/review", record, output.filename));
      assert.equal(sha256(png), output.sha256);
    }
  }
});

test("excludes rejected variant assets from the active tree", async () => {
  await assert.rejects(access(join(root, "artwork/experiments/six-member-forks")));
  const trackedText = [
    await readFile(join(root, "artwork/metadata.json"), "utf8"),
    await readFile(join(root, "artwork/candidates/compact-a/README.md"), "utf8"),
  ].join("\n");
  assert.doesNotMatch(trackedText, /artwork\/(?:candidates|experiments)\/.*(?:fork-b|three-prong|baseline-bearing|shelf-baseline).*\.(?:svg|png|ya?ml)/i);
});

test("locks the exact six draft hashes for study-package construction only", async () => {
  const lock = JSON.parse(await readFile(join(root, "artwork/study-locks/six-member-compact-a.json"), "utf8"));
  assert.equal(lock.purpose, "blinded-study-package-construction");
  assert.equal(lock.asset_status, "draft");
  assert.equal(lock.assets.length, 6);
  assert.equal(new Set(lock.assets.map((asset) => asset.record_id)).size, 6);
  const expectedPaths = Object.fromEntries(Object.keys(sourceHashes).map((record) => [
    `asr:${record}`,
    `artwork/candidates/compact-a/svg/${record}.svg`,
  ]));
  assert.deepEqual(Object.fromEntries(lock.assets.map((asset) => [asset.record_id, asset.path])), expectedPaths);
  for (const asset of lock.assets) {
    assert.equal(asset.sha256, sourceHashes[asset.record_id.slice("asr:".length)]);
    assert.equal(sha256(await readFile(join(root, asset.path))), asset.sha256, asset.path);
  }
  assert.equal(lock.selected_shelf_topology, "smooth-two-prong-fork-a");
  assert.deepEqual(new Set(lock.excluded_from_lock), new Set(["fork-b-shouldered", "three-prong shelf", "baseline-bearing shelf"]));
  for (const boundary of ["study-ready status", "artwork acceptance", "participant recruitment", "participant incentives", "study launch", "publication", "release", "external outreach"]) {
    assert.ok(lock.does_not_authorize.includes(boundary), boundary);
  }
});
