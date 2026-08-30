import assert from "node:assert/strict";
import test from "node:test";

import {
  formatInterchange,
  loadRegistry,
  resolveInterchange,
} from "../tooling/interchange-prototype.mjs";

const expectedIds = [
  "asr:filter.band-pass",
  "asr:filter.band-stop",
  "asr:filter.high-pass",
  "asr:filter.low-pass",
];

test("loads exactly the current four registry records", async () => {
  const registry = await loadRegistry();
  assert.deepEqual([...registry.keys()].sort(), expectedIds);
});

test("resolves canonical IDs to registry-owned text and speech", async () => {
  const registry = await loadRegistry();
  const resolved = resolveInterchange(
    ["asr:filter.low-pass", "asr:filter.high-pass"],
    registry,
  );

  assert.deepEqual(resolved, [
    {
      id: "asr:filter.low-pass",
      text: "LPF",
      speech: "low-pass filter",
    },
    {
      id: "asr:filter.high-pass",
      text: "HPF",
      speech: "high-pass filter",
    },
  ]);
  assert.equal(formatInterchange(resolved, "text"), "LPF HPF");
  assert.equal(formatInterchange(resolved, "speech"), "low-pass filter, high-pass filter");
});

test("keeps an optional asset reference separate from canonical identity", async () => {
  const registry = await loadRegistry();
  const resolved = resolveInterchange(
    ["asr:filter.band-pass"],
    registry,
    { "asr:filter.band-pass": "app://theme/filter-band-pass.svg" },
  );

  assert.deepEqual(resolved[0], {
    id: "asr:filter.band-pass",
    text: "BPF",
    speech: "band-pass filter",
    asset_ref: "app://theme/filter-band-pass.svg",
  });
});

test("rejects unknown IDs and unsupported output formats", async () => {
  const registry = await loadRegistry();
  assert.throws(
    () => resolveInterchange(["asr:filter.not-a-record"], registry),
    /Unknown registry ID/,
  );
  assert.throws(() => formatInterchange([], "glyph"), /Unsupported format/);
});
