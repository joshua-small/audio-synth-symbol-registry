import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

import { loadRegistry, resolveInterchange } from "../tooling/interchange-prototype.mjs";

const examplesDirectory = new URL("../examples/interchange-workflows/", import.meta.url);

async function readExample(name) {
  return JSON.parse(await readFile(new URL(name, examplesDirectory), "utf8"));
}

test("workflow examples preserve every canonical ID through JSON round trips", async () => {
  const registry = await loadRegistry();
  const names = (await readdir(examplesDirectory)).filter((name) => name.endsWith(".json") && name !== "partial-asset-map.json");
  const seen = new Set();

  for (const name of names) {
    const source = await readExample(name);
    const roundTripped = JSON.parse(JSON.stringify(source));
    assert.deepEqual(roundTripped.items.map(({ id }) => id), source.items.map(({ id }) => id));
    const resolved = resolveInterchange(roundTripped.items.map(({ id }) => id), registry);
    assert.deepEqual(resolved.map(({ id }) => id), source.items.map(({ id }) => id));
    resolved.forEach(({ id }) => seen.add(id));
  }

  assert.deepEqual([...seen].sort(), [...registry.keys()].sort());
});

test("accessible example exactly matches registry text and speech", async () => {
  const registry = await loadRegistry();
  const example = await readExample("accessible-output.json");
  const resolved = resolveInterchange(example.items.map(({ id }) => id), registry);
  assert.deepEqual(
    example.items,
    resolved.map(({ id, text, speech }) => ({ id, visible_text: text, speech })),
  );
  assert.ok(resolved.every(({ text, speech }) => text !== speech));
});

test("partial asset availability never removes identity, text, or speech", async () => {
  const registry = await loadRegistry();
  const assetMap = await readExample("partial-asset-map.json");
  const resolved = resolveInterchange([...registry.keys()], registry, assetMap);
  assert.equal(resolved.filter(({ asset_ref }) => asset_ref).length, 2);
  assert.ok(resolved.every(({ id, text, speech }) => id && text && speech));
});

test("shelf and pass examples remain distinct despite frequency-side adjacency", async () => {
  const registry = await loadRegistry();
  const ids = [
    "asr:filter.low-shelf",
    "asr:filter.high-pass",
    "asr:filter.high-shelf",
    "asr:filter.low-pass",
  ];
  const resolved = resolveInterchange(ids, registry);
  assert.equal(new Set(resolved.map(({ id }) => id)).size, 4);
  assert.equal(new Set(resolved.map(({ text }) => text)).size, 4);
  assert.equal(new Set(resolved.map(({ speech }) => speech)).size, 4);
});

test("application gain sign does not alter the low-shelf resolver identity", async () => {
  const registry = await loadRegistry();
  const example = await readExample("structured-metadata.json");
  const lowShelves = example.items.filter(({ id }) => id === "asr:filter.low-shelf");
  assert.deepEqual(lowShelves.map(({ gain_db }) => gain_db), [-2.5, 2.5]);
  const resolved = resolveInterchange(lowShelves.map(({ id }) => id), registry);
  assert.ok(resolved.every(({ id }) => id === "asr:filter.low-shelf"));
});

test("documented all-record character counts remain reproducible", async () => {
  const registry = await loadRegistry();
  const resolved = resolveInterchange([...registry.keys()].sort(), registry);
  assert.equal(resolved.map(({ id }) => id).join(" ").length, 125);
  assert.equal(resolved.map(({ text }) => text).join(" ").length, 36);
  assert.equal(resolved.map(({ speech }) => speech).join(", ").length, 106);
  assert.equal(JSON.stringify(resolved).length, 440);
});
