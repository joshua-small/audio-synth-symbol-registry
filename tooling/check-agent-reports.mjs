import { readdir, readFile } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const REPORT_HEADING = /^## Agent Report - .+$/gm;
const STALE_REQUIREMENT = /(?:validation|review)[^\n]*(?:is|are) required before merge/i;
const IN_PROGRESS = /^- Report status: in-progress$/m;
const COMPLETED = /^- Report status: completed$/m;
const COMPLETION_PR = /^- Completion PR: \[[^\]]+\]\(https:\/\/github\.com\/joshua-small\/audio-synth-symbol-registry\/pull\/\d+(?:#[^)]+)?\)$/m;
const MERGE_COMMIT = /^- Merge commit: \[`([0-9a-f]{40})`\]\(https:\/\/github\.com\/joshua-small\/audio-synth-symbol-registry\/commit\/([0-9a-f]{40})\)$/m;
const VALIDATION_PASSED = /^- Validation result: passed(?:[ ;.:].*)?$/m;
const REVIEW_PASSED = /^- Independent review result: passed(?:[ ;.:].*)?$/m;

async function markdownFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await markdownFiles(path));
    else if (entry.isFile() && entry.name.endsWith(".md")) files.push(path);
  }
  return files;
}

function reportBlocks(markdown) {
  const matches = [...markdown.matchAll(REPORT_HEADING)];
  return matches.map((match, index) => {
    const start = match.index;
    const nextHeading = markdown.indexOf("\n## ", start + match[0].length);
    const end = nextHeading === -1 ? markdown.length : nextHeading;
    return markdown.slice(start, end);
  });
}

export async function checkAgentReports(root = process.cwd()) {
  const absoluteRoot = resolve(root);
  const failures = [];
  for (const path of await markdownFiles(absoluteRoot)) {
    const markdown = await readFile(path, "utf8");
    for (const block of reportBlocks(markdown)) {
      if (!STALE_REQUIREMENT.test(block) || IN_PROGRESS.test(block)) continue;
      const merge = block.match(MERGE_COMMIT);
      const completionIsTraceable = COMPLETED.test(block)
        && COMPLETION_PR.test(block)
        && merge !== null
        && merge[1] === merge[2]
        && VALIDATION_PASSED.test(block)
        && REVIEW_PASSED.test(block);
      if (!completionIsTraceable) {
        failures.push(`${relative(absoluteRoot, path)}: stale pre-merge requirement needs an in-progress status or traceable completion fields`);
      }
    }
  }
  if (failures.length > 0) throw new Error(failures.join("\n"));
  return true;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  checkAgentReports().then(
    () => console.log("Agent Report hygiene passed."),
    (error) => {
      console.error(error.message);
      process.exitCode = 1;
    },
  );
}
