import test from "node:test";
import assert from "node:assert/strict";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { checkAgentReports } from "../tooling/check-agent-reports.mjs";

async function fixture(markdown) {
  const root = await mkdtemp(join(tmpdir(), "asr-reports-"));
  await mkdir(join(root, "docs"));
  await writeFile(join(root, "docs", "report.md"), markdown);
  return root;
}

test("accepts a completed historical pre-merge requirement", async () => {
  const root = await fixture(`## Agent Report - 2026-08-29T12:00:00-07:00

- Validation: tests and independent review are required before merge.
- Completion annotation: superseded by [PR #1](https://github.com/example/project/pull/1); review and tests passed, merged as \`0123456789abcdef0123456789abcdef01234567\`.
`);
  await assert.doesNotReject(checkAgentReports(root));
});

test("rejects an unresolved historical pre-merge requirement", async () => {
  const root = await fixture(`## Agent Report - 2026-08-29T12:00:00-07:00

- Validation: tests and independent review are required before merge.
`);
  await assert.rejects(checkAgentReports(root), /stale pre-merge requirement lacks a completion annotation/);
});

test("does not require annotations for reports that record completed validation", async () => {
  const root = await fixture(`## Agent Report - 2026-08-29T12:00:00-07:00

- Validation: 12\/12 tests passed.
- Independent review: passed with no blockers.
`);
  await assert.doesNotReject(checkAgentReports(root));
});
