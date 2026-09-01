# Private unencoded font-proof validation

Status as of 2026-08-31T21:10:31-07:00. This report records commitment-only findings from a private, offline proof built under D-021. Commit `48f688560dabe0363836de453c1de3bd346cc516` is the geometry-authority source for the locked six; the integrated implementation base is `0174fde2ab6df5967f8a59e3e129114604cf4853`, and the implementation and reproduction tooling is contained by this report's commit. It does not publish font bytes or specimens, allocate a Unicode or Private Use Area value, change locked glyph geometry, create a proposal font, accept artwork, or alter the repository's Unicode `HOLD`.

## Outcome

The six locked `compact-a` SVGs can be represented in one deterministic TrueType-outline proof without a `cmap`. The proof contains `.notdef` followed by six unencoded glyphs named from registry IDs:

| Registry ID | Internal glyph name | GID |
| --- | --- | ---: |
| `asr:filter.high-pass` | `asr.filter.high_pass` | 1 |
| `asr:filter.low-pass` | `asr.filter.low_pass` | 2 |
| `asr:filter.band-pass` | `asr.filter.band_pass` | 3 |
| `asr:filter.band-stop` | `asr.filter.band_stop` | 4 |
| `asr:filter.low-shelf` | `asr.filter.low_shelf` | 5 |
| `asr:filter.high-shelf` | `asr.filter.high_shelf` | 6 |

The binary has only `OS/2`, `glyf`, `head`, `hhea`, `hmtx`, `loca`, `maxp`, `name`, and `post` data plus fontTools' glyph-order representation. It has no `cmap`, `GSUB`, `GPOS`, `COLR`, `CPAL`, SVG-in-OpenType, variation, bitmap, or hinting tables. It cannot define portable text interchange: consumers must request a glyph by private proof name or GID while carrying the registry ID separately.

## Private construction

The checked-in generator:

1. refuses to write generated output inside the repository;
2. verifies every source byte against `artwork/study-locks/six-member-compact-a.json`;
3. after the exact-hash check, additionally verifies the current single-path 24-by-24 viewBox, 2.25-unit stroke, and round-cap/round-join fields used by the converter;
4. expands each centerline with one common 1536-UPM transform and deterministic polygonal round-stroke construction;
5. retains overlapping same-direction contours under nonzero fill rather than performing a geometry-changing union;
6. writes the font, normalized TTX, extracted glyph-outline SVGs, glyph/order/metrics manifest, provenance record, and SHA-256 values only to the private output directory; and
7. builds twice and rejects differing font or TTX hashes.

The proof was built with Python 3.12 and fontTools 4.61.1. The dependency is exact-version and wheel-hash pinned for CI. No third-party font, outline, metric, hinting program, glyph name, or PUA convention is imported.

## Commitment and rendering QA

Two independent builds produced identical private bytes:

- font SHA-256: `7e71c1679308f2ec27a7a6c8e79a40b3ae3e2964a49199cd1fe9593bcd444d99`;
- normalized TTX SHA-256: `f09e600a4e0e69ac90e9fa7f72a6b468e8628e351135bacd4b936cee919b3060`;
- source-lock manifest SHA-256: `8e55c7cd318fd03f5c5854423363bea3891ecef21ec75328bbe49567709be830`.

The validator extracted every font outline by glyph name and compared it with its locked SVG oracle at 16, 20, 24, 32, and 64 pixels on light and dark backgrounds. All 60 comparisons passed the tool-defined thresholds:

| Measure | Threshold | Worst observed |
| --- | ---: | ---: |
| Mean absolute channel difference | at most 1.0 | 0.87109375 |
| Maximum channel difference | at most 32 | 26 |
| Pixels differing by more than 32 | 0 | 0 |
| Ink-pixel delta ratio | at most 0.03 | 0.01020408163265306 |

This is automated, threshold-bounded similarity evidence for one rendering stack. It makes no new visual-design judgment and changes no locked SVG byte. The source SVG remains authoritative.

## Separate property and layout simulation

The property simulator uses abstract `{asr:...}` tokens and allocates no character values. It applies the provisional shared profile from the [character-properties strategy](character-properties-font-strategy.md): `So`, ccc 0, `ON`, not mirrored, `AL`, `Common`, and East Asian Width `N`, with identity normalization and no joining, math, or emoji behavior.

Six bounded neutral-resolution expectations passed, including Latin context, RTL context, European-number adjacency, a neutral punctuation run, and mixed strong types under LTR and RTL paragraph directions. Every case preserves low-frequency-left internal orientation and prohibits mirroring. A separate bounded AL/NU/space resolver evaluated all six atomic line-break and adjacent-number cases; all passed. Four abstract identity-normalization expectations per registry token and registry-provided text/spoken accessibility fallbacks also passed. These are abstract-token checks, not Unicode normalization conformance tests.

For each requested GID, fontTools reopened the serialized binary, resolved the font's glyph name, round-tripped that name to a GID, drew the resolved outline through the font glyph API, hashed the recorded operations, and read the serialized advance. All six names and GIDs round-tripped and all advances were 1536 units. The exact table allowlist and zero-instruction checks exclude `GSUB`, `GPOS`, kerning, marks, bitmap/color/SVG glyphs, variation data, and TrueType hint programs. This validates the intended minimal artifact structure; it is not a full Unicode shaping test because no character is encoded.

## Licensing and distribution boundary

- Locked source artwork: CC0-1.0 under D-004 and the six provenance records.
- Checked-in generator and validator: repository Apache-2.0 tooling.
- Third-party implementation dependency: [fontTools 4.61.1](https://github.com/fonttools/fonttools/blob/main/LICENSE), used under its MIT license as a build tool; its license does not determine the output-font license.
- Generated font: private validation artifact with no publication or redistribution license selected.
- Font publication, an OFL or other output-license choice, external reuse, font forking, SMuFL claims, and submission remain reserved actions.

No generated font, TTX, outline specimen, raster specimen, or property-simulation output is committed. The public repository contains only source tooling, tests, this commitment-only report, and reproducibility metadata.

## Limitations and preserved objections

- The raster comparison uses one librsvg/sharp rendering stack for both oracle and extracted outline. It is not evidence from FreeType plus two independent platform rasterizers.
- HarfBuzz direct-glyph rendering was unavailable. Stable glyph order, direct GID identity, advances, fixed-orientation expectations, and absence of shaping tables were inspected instead.
- The font is intentionally cmap-free and is not a normal install-and-type font. That is the point of this proof, but it limits ordinary font-checker applicability.
- Dense straight-segment contours approximate SVG round strokes. Passing target-size raster thresholds demonstrates no detected visible change in the tested stack; it does not make the generated outline the canonical artwork.
- A font proves renderability and metrics, not plain-text need, independent usage, interchange, Unicode eligibility, recognition, or accessibility by itself.
- The current usage/interchange objections and Unicode `HOLD` remain unchanged.

## Reproduction

Install the exact Python dependency, then choose a new private directory outside the repository:

```sh
python3 -m pip install --require-hashes -r tooling/private-font-proof/requirements.lock.txt
npm run font:private-proof -- --out /absolute/private/new-directory
```

The command fails closed if the output exists, is inside the repository, a locked SVG hash differs, the serialized table inventory differs from the exact minimal allowlist, any glyph is composite or contains instructions, a serialized glyph-name/GID/metric round trip fails, either build is nondeterministic, the executable abstract property checks fail, or any target-size raster comparison exceeds its threshold.

## Agent Report - 2026-08-31T21:10:31-07:00

- Report status: implementation and independent adverse review complete; PR CI pending.
- Scope: private cmap-free proof-font construction, stable registry-derived glyph names and GIDs, deterministic manifests/TTX, locked-source verification, private light/dark rendering QA, abstract property simulation, direct-GID layout inspection, provenance/licensing boundaries, and fail-closed tests.
- Exact input: repository base `0174fde2ab6df5967f8a59e3e129114604cf4853` and the six SHA-256 values in lock `six-member-compact-a-2026-08-30`.
- Validation: two builds were byte-identical; 60/60 rendering comparisons passed; six bounded bidi-neutral and six executable line-break cases passed; six serialized direct-GID lookup/draw/metric inspections passed; 117/117 repository tests passed; registry and Agent Report validation passed.
- Geometry: no locked SVG byte changed. No intentional visible redesign was performed. Automated threshold-bounded comparison found a worst mean absolute channel difference of 0.87109375 and worst ink-pixel delta ratio of 0.01020408163265306, both within the tool's conservative thresholds.
- Distribution: generated font bytes, TTX, extracted outlines, rasters, and simulation output remain private and outside git.
- Excluded actions: no PUA or code point, font publication, font fork, SMuFL claim, proposal-font claim, Unicode-readiness claim, artwork acceptance, registry status change, participant action, release, outreach, submission, or external commitment.
- Preserved objections: one rasterizer stack; no HarfBuzz direct-GID runtime or multi-platform rasterizer evidence; cmap-free proof is not ordinary text; font feasibility does not prove encoding need.
- Independent review: APPROVE at exact substantive head `2b2c992ad37a07d3f5812868416f2a79b49d6f2b` after independent 117/117 tests and confirmation of all 24 bounded abstract normalization checks, deterministic commitments, 60/60 render comparisons, exact serialized table and instruction constraints, unchanged geometry, private distribution, and Unicode `HOLD`. This approval-report-only annotation does not alter the reviewed implementation.
