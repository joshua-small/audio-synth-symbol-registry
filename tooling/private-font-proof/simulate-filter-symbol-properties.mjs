import { access, mkdir, readFile, realpath, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const PROPERTY_PROFILE = Object.freeze({
  general_category: "So",
  canonical_combining_class: 0,
  bidi_class: "ON",
  bidi_mirrored: false,
  line_break: "AL",
  script: "Common",
  east_asian_width: "N",
  normalization: "identity",
  joining: "none",
  math: false,
  emoji: false,
});

const RECORD_FILES = [
  "filter.high-pass.json",
  "filter.low-pass.json",
  "filter.band-pass.json",
  "filter.band-stop.json",
  "filter.low-shelf.json",
  "filter.high-shelf.json",
];

const strongForNeutralRule = (type) => type === "EN" || type === "AN" ? "R" : type;

export function resolveNeutral(left, right, paragraphDirection) {
  const before = strongForNeutralRule(left);
  const after = strongForNeutralRule(right);
  return before === after ? before : paragraphDirection;
}

export function resolveLineBreak(left, right) {
  if (right === "SP") return false;
  if (left === "SP") return true;
  const normalizedLeft = left === "ASR-AL" ? "AL" : left;
  const normalizedRight = right === "ASR-AL" ? "AL" : right;
  if (normalizedLeft === "AL" && normalizedRight === "AL") return false;
  if ((normalizedLeft === "AL" && normalizedRight === "NU")
    || (normalizedLeft === "NU" && normalizedRight === "AL")) return false;
  return null;
}

export function simulateNormalizationIdentity(abstractToken, form) {
  if (!["NFC", "NFD", "NFKC", "NFKD"].includes(form)) {
    throw new Error(`unsupported abstract normalization form: ${form}`);
  }
  return abstractToken;
}

export function simulateProperties(records) {
  const bidiCases = [
    { id: "latin-context", paragraph: "L", left: "L", right: "L", expected: "L" },
    { id: "rtl-context", paragraph: "R", left: "R", right: "R", expected: "R" },
    { id: "rtl-before-european-number", paragraph: "R", left: "R", right: "EN", expected: "R" },
    { id: "mixed-ltr-paragraph", paragraph: "L", left: "L", right: "R", expected: "L" },
    { id: "mixed-rtl-paragraph", paragraph: "R", left: "L", right: "R", expected: "R" },
    { id: "neutral-punctuation-run-ltr", paragraph: "L", left: "L", right: "L", neutral_run: ["ON-punctuation", "ASR-ON", "ON-punctuation"], expected: "L" },
  ].map((entry) => ({
    ...entry,
    actual: resolveNeutral(entry.left, entry.right, entry.paragraph),
    internal_orientation: "fixed-low-frequency-left",
    mirrored: false,
    pass: resolveNeutral(entry.left, entry.right, entry.paragraph) === entry.expected,
  }));

  const symbols = records.map((record) => {
    const abstractToken = `{${record.id}}`;
    const normalizationChecks = ["NFC", "NFD", "NFKC", "NFKD"].map((form) => {
      const actual = simulateNormalizationIdentity(abstractToken, form);
      return {
        form,
        input: abstractToken,
        expected: abstractToken,
        actual,
        pass: actual === abstractToken,
      };
    });
    return {
      record_id: record.id,
      abstract_token: abstractToken,
      profile: PROPERTY_PROFILE,
      normalization_checks: normalizationChecks,
      line_break: {
        atomic_internal_breaks: 0,
        between_symbol_and_adjacent_alphanumeric: "prohibited-by-AL-pair-expectation",
        after_explicit_space: "ordinary-space-opportunity",
      },
      accessibility: {
        glyph_has_intrinsic_accessible_name: false,
        text_fallback: record.semantics.text_fallback,
        spoken_label: record.semantics.spoken_label,
        registry_id_required_for_machine_identity: record.id,
      },
    };
  });

  const lineBreakCases = [
    { logical_pair: ["AL", "ASR-AL"], expected_break: false, basis: "atomic AL adjacency" },
    { logical_pair: ["ASR-AL", "AL"], expected_break: false, basis: "atomic AL adjacency" },
    { logical_pair: ["NU", "ASR-AL"], expected_break: false, basis: "adjacent-number expectation" },
    { logical_pair: ["ASR-AL", "NU"], expected_break: false, basis: "adjacent-number expectation" },
    { logical_pair: ["SP", "ASR-AL"], expected_break: true, basis: "ordinary break opportunity after spaces" },
    { logical_pair: ["ASR-AL", "SP"], expected_break: false, basis: "no break before a space" },
  ].map((entry) => {
    const actualBreak = resolveLineBreak(...entry.logical_pair);
    return { ...entry, actual_break: actualBreak, pass: actualBreak === entry.expected_break };
  });

  return {
    simulation_schema_version: "0.1.0",
    status: "abstract-property-simulation",
    code_points: [],
    scope: "The simulator exercises the proposed property profile over abstract registry tokens; it is not a UAX #9 or UAX #14 implementation.",
    symbols,
    bidi_cases: bidiCases,
    line_break_cases: lineBreakCases,
    shaping_and_layout_expectations: {
      glyph_selection: "direct glyph name or glyph ID only",
      substitution: "none",
      positioning: "equal advance; no kerning or mark attachment",
      mirroring: "never",
      internal_orientation: "fixed-low-frequency-left in LTR and RTL contexts",
      text_semantics: "supplied separately by registry ID, fallback, and spoken label",
    },
    pass: bidiCases.every(({ pass }) => pass)
      && lineBreakCases.every(({ pass }) => pass)
      && symbols.every(({ profile, normalization_checks: normalizationChecks, accessibility }) => profile.bidi_mirrored === false
        && profile.canonical_combining_class === 0
        && normalizationChecks.length === 4
        && normalizationChecks.every(({ input, expected, actual, pass }) => pass && input === expected && actual === expected)
        && accessibility.glyph_has_intrinsic_accessible_name === false),
    limitations: [
      "No code point is allocated, so a conformant Unicode implementation cannot be run over the proposed characters.",
      "Neutral resolution cases are bounded expectations derived from UAX #9 N1/N2, not a replacement for the full algorithm.",
      "Line-break cases assert atomic AL behavior only; they do not reimplement the full UAX #14 pair table.",
      "Normalization checks exercise an abstract identity expectation over registry tokens; they are not Unicode normalization conformance tests.",
      "Font glyphs have no intrinsic accessible name; applications must expose the registry spoken label or text fallback.",
    ],
  };
}

async function ensurePrivateOutput(root, output) {
  const resolvedRoot = await realpath(root);
  const resolvedParent = await realpath(path.dirname(output));
  const resolvedOutput = path.join(resolvedParent, path.basename(output));
  if (resolvedOutput === resolvedRoot || resolvedOutput.startsWith(`${resolvedRoot}${path.sep}`)) {
    throw new Error("private property-simulation output must be outside the repository");
  }
  await access(resolvedOutput).then(
    () => { throw new Error("private property-simulation output already exists"); },
    (error) => { if (error.code !== "ENOENT") throw error; },
  );
  await mkdir(resolvedOutput);
  return resolvedOutput;
}

export async function buildPropertySimulation(root, output) {
  const records = await Promise.all(RECORD_FILES.map(async (filename) =>
    JSON.parse(await readFile(path.join(root, "registry/symbols", filename), "utf8"))));
  const simulation = simulateProperties(records);
  const resolvedOutput = await ensurePrivateOutput(root, output);
  await writeFile(path.join(resolvedOutput, "property-simulation.json"), `${JSON.stringify(simulation, null, 2)}\n`);
  return simulation;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length !== 2 || args[0] !== "--out") {
    throw new Error("usage: node tooling/private-font-proof/simulate-filter-symbol-properties.mjs --out NEW_PRIVATE_DIRECTORY");
  }
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
  const result = await buildPropertySimulation(root, path.resolve(args[1]));
  console.log(JSON.stringify({ status: result.status, symbols: result.symbols.length, pass: result.pass }));
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
