import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { buildOfflineHarness } from "../tooling/build-offline-study-harness.mjs";
import { parseBrowserPreflightArguments, runBrowserPreflight } from "../tooling/browser-preflight.mjs";

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const records = ["high-pass", "low-pass", "band-pass", "band-stop", "low-shelf", "high-shelf"];
const choices = [...records, "none", "unknown"];

async function fixtureHarness() {
  const root = await mkdtemp(join(tmpdir(), "asr-browser-preflight-"));
  const publicDirectory = join(root, "public");
  const outputDirectory = join(root, "harness");
  await mkdir(join(publicDirectory, "assets"), { recursive: true });
  const tokens = records.map((_, index) => `opaque-token-${index + 1}`);
  const svg = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M8 32H56"/></svg>');
  const instrument = {
    package_schema_version: "0.2.0",
    construction_status: "construction-only",
    participant_prompt: "Which filter response is the best match?",
    study_id: "synthetic-browser-fixture",
    stimuli: tokens.map((token) => ({ token, asset: `assets/${token}.svg`, sha256: sha256(svg) })),
    forced_choices: choices.map((id) => ({ id, label: id.replaceAll("-", " ") })),
    forms: [{
      form: "001",
      stimulus_order: tokens,
      choice_order_by_stimulus: Object.fromEntries(tokens.map((token, index) => [token, [...choices.slice(index), ...choices.slice(0, index)]])),
    }],
  };
  for (const stimulus of instrument.stimuli) await writeFile(join(publicDirectory, stimulus.asset), svg);
  await writeFile(join(publicDirectory, "instrument.json"), `${JSON.stringify(instrument, null, 2)}\n`);
  await buildOfflineHarness(publicDirectory, outputDirectory, "001");
  return { html: join(outputDirectory, "index.html"), root };
}

test("browser preflight CLI arguments are explicit and fail closed", () => {
  assert.deepEqual(
    parseBrowserPreflightArguments(["--html", "input.html", "--executable", "/opt/chrome", "--out", "report.json"]),
    { html: "input.html", executable: "/opt/chrome", out: "report.json" },
  );
  assert.throws(() => parseBrowserPreflightArguments([]), /usage/);
  assert.throws(() => parseBrowserPreflightArguments(["--html", "input.html", "--executable", "/opt/chrome"]), /usage/);
  assert.throws(() => parseBrowserPreflightArguments(["--html", "input.html", "--browser", "/opt/chrome", "--out", "report.json"]), /unknown argument/);
  assert.throws(() => parseBrowserPreflightArguments(["--html", "one", "--html", "two", "--executable", "chrome", "--out", "report"]), /duplicate argument/);
});

test("browser preflight rejects a missing executable before launch", async () => {
  const { html } = await fixtureHarness();
  await assert.rejects(
    runBrowserPreflight({ html, executable: join(tmpdir(), "definitely-missing-asr-browser") }),
    /browser executable does not exist or is not executable/,
  );
});

test("system-Chromium integration emits aggregate-only browser evidence", {
  skip: !process.env.BROWSER_QA_EXECUTABLE,
  timeout: 120_000,
}, async () => {
  const { html } = await fixtureHarness();
  const report = await runBrowserPreflight({ html, executable: process.env.BROWSER_QA_EXECUTABLE });
  assert.equal(report.summary.passed, true);
  assert.equal(report.summary.scenario_count, 4);
  assert.equal(report.summary.phase_count, 16);
  assert.equal(report.summary.accessibility_tree_capture_count, 16);
  assert.equal(report.summary.forbidden_request_count, 0);
  assert.equal(report.response_data_in_report, false);
  assert.equal(report.opaque_tokens_in_report, false);
  assert.equal(report.svg_bytes_in_report, false);
  assert.equal(report.screenshots_captured, false);
  assert.equal(report.evidence_boundary.human_recognition_evidence, false);
  assert.equal(report.evidence_boundary.participant_evidence, false);
  for (const scenario of report.scenarios) {
    assert.equal(scenario.csp.runtime_executed, true);
    assert.equal(scenario.csp.denial_probe_observed, true);
    assert.ok(scenario.csp.directive_counts["connect-src"] >= 1);
    assert.equal(scenario.network.forbidden_request_count, 0);
    assert.equal(scenario.network.intercepted_forbidden_request_count, 0);
    assert.equal(scenario.phases.length, 4);
    for (const phase of scenario.phases) {
      const focus = phase.active_element_order_and_focus;
      assert.ok(focus.expected_forward.length > 0);
      assert.ok(focus.expected_reverse.length > 0);
      assert.equal(phase.accessibility_tree.unnamed_interactive_node_count, 0);
      assert.ok(phase.accessibility_tree.interactive_node_count >= phase.layout.control_count);
      assert.ok(phase.accessibility_tree.focusable_node_count >= phase.layout.control_count);
    }
  }
  const serialized = JSON.stringify(report);
  assert.doesNotMatch(serialized, /opaque-token|synthetic-browser-fixture|data:image|<svg|M8 32H56|answer-key|scoring-key/i);
  assert.match(report.input_commitment.html_sha256, /^[0-9a-f]{64}$/);
  assert.equal((await readFile(html, "utf8")).includes("opaque-token"), true);
});
