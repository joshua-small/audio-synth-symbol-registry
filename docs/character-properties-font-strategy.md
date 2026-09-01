# Character-properties and internal font-proof strategy

Status as of 2026-08-31T19:42:57-07:00. This is an internal technical research note for the current six filter concepts. It is not a Unicode proposal, code-point request, font release, SMuFL extension, Private Use Area mapping, or change to the repository's `HOLD` position on Unicode.

## Executive recommendation

Treat all six concepts consistently as standalone, spacing, monochrome technical symbols. The strongest current property hypothesis is `General_Category=So`, `Canonical_Combining_Class=0`, `Bidi_Class=ON`, `Bidi_Mirrored=N`, and `Line_Break=AL`, with no case, numeric value, decomposition, joining, combining, math-operator, emoji, or identifier behavior. These are research hypotheses for a possible later proposal, not assignments adopted by Unicode.

If a font proof becomes useful, build a private, purpose-built, minimally encoded proof from the six hash-locked original SVGs. Keep the six semantic IDs and source SVG hashes authoritative; keep the six font glyphs unencoded and address them by glyph name or glyph ID. Do not use PUA values, clone a third-party font, publish the font, or imply SMuFL compliance. Validate contours, metrics, monochrome rendering, directionality, and size behavior before any human-facing font decision.

The current Unicode blocker is still usage and plain-text interchange evidence, not lack of a property table or font-build technique. Unicode's current submission guidance requires usage, stability, and public plain-text interchange need, in addition to suggested properties and an appropriately licensed font. Completing this note does not clear those criteria.

## Source and decision boundary

The six current concepts are:

| Registry ID | Working character description |
| --- | --- |
| `asr:filter.high-pass` | High-pass filter response symbol |
| `asr:filter.low-pass` | Low-pass filter response symbol |
| `asr:filter.band-pass` | Band-pass filter response symbol |
| `asr:filter.band-stop` | Band-stop filter response symbol |
| `asr:filter.low-shelf` | Low-shelf filter response symbol |
| `asr:filter.high-shelf` | High-shelf filter response symbol |

This note intentionally does not recommend Unicode character names or code points. The [Unicode proposal-properties guidance](https://www.unicode.org/pending/properties.html) says code points are typically assigned by UTC and WG2 and do not need to be selected by a proposer. It also says property reasoning should begin with the character's behavior in context and with comparable encoded characters.

The current visual inputs are the exact files in `artwork/study-locks/six-member-compact-a.json`. They are original CC0 SVGs, remain draft and noncanonical, and are locked only for internal study-package construction. Any future font proof must verify those six SHA-256 values before conversion. No font conversion may silently turn the two-prong shelves into a baseline-bearing or three-prong form.

## Provisional character-property matrix

These values apply uniformly to the six current concepts unless later usage evidence demonstrates a real behavioral difference.

| Property or behavior | Provisional recommendation | Reasoning and limitation |
| --- | --- | --- |
| `General_Category` | `So` (Symbol, Other) | Each item is an uncased, nonnumeric, standalone technical symbol. Comparable encoded interface and technical symbols such as U+23FB POWER SYMBOL and U+232D CYLINDRICITY are `So` in [UnicodeData.txt 17.0.0](https://www.unicode.org/Public/17.0.0/ucd/UnicodeData.txt). These filter concepts are not mathematical operators, so `Sm` is not warranted. |
| `Canonical_Combining_Class` | `0` | Each item is a spacing base, not a mark attached above, below, or through another character. Unicode's [properties guidance](https://www.unicode.org/pending/properties.html) identifies class 0 for spacing characters. |
| `Bidi_Class` | `ON` (Other Neutral) | These are script-independent symbols. U+23FB and U+232D use `ON`; the [Unicode Bidirectional Algorithm](https://www.unicode.org/reports/tr9/) resolves neutrals from context. The embedded low-frequency-left/high-frequency-right convention is graphical semantics, not text direction. |
| `Bidi_Mirrored` | `N` | Mirroring would exchange low- and high-frequency sides for four asymmetric members and corrupt meaning. The glyphs must keep the conventional frequency orientation in both LTR and RTL text. This requires explicit mixed-direction tests because `ON` affects placement while `Bidi_Mirrored=N` preserves internal geometry. |
| `Line_Break` | `AL` (Alphabetic) | Unicode 17's [LineBreak.txt](https://www.unicode.org/Public/17.0.0/ucd/LineBreak.txt) assigns ordinary technical symbols such as U+232B..U+237B and U+23F4..U+23FF to `AL`; [UAX #14](https://www.unicode.org/reports/tr14/) defines the algorithm. Each proposed symbol is atomic: there is no internal break, no opener/closer behavior, and no requirement to bind to a following number. Breaks around adjacent spaces remain ordinary. |
| `Script` | `Common` | The symbols are not part of one writing system. A later proposal should verify the exact UCD default and whether any `Script_Extensions` entry is needed; current evidence supplies no such need. |
| `East_Asian_Width` | `N` (Neutral) | Comparable technical symbols U+232B..U+237B and U+23F4..U+23FF are Neutral in [EastAsianWidth.txt 17.0.0](https://www.unicode.org/Public/17.0.0/ucd/EastAsianWidth.txt). No established East Asian fullwidth convention was found for this set. |
| Case and numeric fields | None | The symbols have no uppercase, lowercase, titlecase, decimal, digit, or numeric value. |
| Decomposition and normalization | None | None is a compatibility presentation of an existing character, and none has a canonical decomposition. They should remain stable single code points under NFC, NFD, NFKC, and NFKD if ever encoded. This is a hypothesis contingent on clearing the existing-character/sequence objection. |
| Combining and joining | Standalone spacing bases; no joining | They do not attach to letters, stack, change form by neighboring character, or participate in cursive joining. No mark anchors, joining type, ZWJ behavior, or combining sequence is proposed. |
| Math behavior | `Math=No`; no operator stretching | The shapes depict response classes; they do not perform unary, binary, relational, or n-ary operations. They must not stretch to surrounding content or inherit mathematical spacing. |
| Identifier behavior | Not recommended | Symbols are not letters, marks, or numbers. They should not be promoted as identifier characters; the ASCII `asr:` IDs remain the machine-interchange form. |
| Emoji properties | None | The set is technical, monochrome, and should not acquire platform-dependent color or pictorial presentation. The project remains outside the emoji path. |
| Collation | No linguistic ordering requirement | A proposal may list the repertoire in the registry's documented conceptual order, but the symbols have no dictionary order. Applications needing semantic ordering should sort by registry metadata, not binary code-point order. |

### Why `ON`, not `L`

The main counterargument is that a response curve conventionally runs from low frequency on the left to high frequency on the right, so the character could be treated as strongly left-to-right. That would overstate the symbol's role in text: the glyph has a fixed internal orientation, but it does not start an LTR run or carry a language-script direction. Comparable general technical and interface symbols use `ON`. Musical-notation symbols often use `L`, but those belong to a left-to-right notation system and are weaker behavioral analogues for freestanding audio-response shorthand.

Before reusing `ON` in any proposal draft, test all six characters in representative strings containing Arabic or Hebrew letters, Latin letters, European and Arabic-Indic numbers, paired punctuation, and isolates. The required result is stable internal orientation with context-appropriate placement. Any surprising run behavior is evidence to revisit the property, not a reason to mirror the glyph.

## Sequences, combining marks, and variation

### Do not construct the six from existing characters

The overlap audits already show that ASCII sketches and mathematical near-misses carry the wrong semantics. Encoding an improvised sequence such as `>-`, `/\`, or an intersection symbol plus modifiers would inherit unrelated character properties, font spacing, normalization, and accessibility names. OpenType ligatures over those strings would also make ordinary punctuation display as filter symbols and would not establish interoperable semantics.

### Do not model filter parameters as combining marks

Cutoff frequency, slope, resonance, gain, bandwidth, boost/cut sign, and axes remain parameters or explanatory context, not parts of the current character identity. Combining marks for those properties would explode the repertoire, create fragile normalization and cursor behavior, and contradict the current semantic records. Applications should carry those values in structured data or adjacent text.

### No standardized variation sequence is currently warranted

[Unicode 17 Chapter 23](https://unicode.org/versions/Unicode17.0.0/core-spec/chapter-23/) limits sanctioned variation-sequence use and says unsupported selectors are default-ignorable. A variation sequence restricts the acceptable glyphic subset for one encoded character; it does not fix an uncertain semantic repertoire.

The current axis-free form should be the only reference form considered for a hypothetical base character. An axis-bearing explanatory drawing, if future research warrants one, adds context rather than merely selecting a typographic style. Keep it as a separately named illustration or font-specific alternate, not a standardized variation sequence. Likewise, do not use emoji text/presentation selectors, ZWJ sequences, or user-defined selector conventions.

Minor font-style changes such as stroke weight, optical correction, or round-cap implementation belong to normal font design. They do not need Unicode variation sequences. If a private proof needs to compare a source-faithful outline with an optical-size alternative, keep both under explicit internal glyph names and do not expose either as character interchange.

## Monochrome reference-glyph implications

The source SVGs are 24-by-24, axis-free, `currentColor` strokes with width 2.25 and round caps and joins. A conventional TrueType or CFF outline cannot preserve an SVG centerline stroke as a stroke instruction; conversion must expand each stroke to closed contours. That creates four technical risks:

1. cap and join expansion can change the locked silhouette;
2. TrueType cubic-to-quadratic conversion can move curve extrema, while a CFF proof can retain cubic curves but still changes the stroked source into contours;
3. coordinate rounding can alter the two shelf junctions;
4. font hinting or rasterization can make members appear to have different weights.

The SVG remains the source of truth. A font proof must record the source hash, converter version, transform, units-per-em, advance width, side bearings, contour direction, overlap-removal policy, curve tolerance, and output hash. It must compare rasterized font glyphs with SVG renders at the existing 16, 20, 24, 32, and 64 pixel sizes on light and dark backgrounds.

Recommended proof defaults, subject to measured rendering rather than status:

- monochrome outlines only; no `COLR`, `CPAL`, bitmap, or SVG-in-OpenType tables;
- one upright regular style; no synthetic bold/italic claim;
- equal advances and optical centering across all six members;
- a documented UPM and affine transform shared by all six;
- `.notdef`, a minimally valid encoded control glyph such as space if required by the builder, and six unencoded named glyphs;
- no kerning, GSUB ligatures, GPOS positioning, variation axes, or language-system behavior in the first proof;
- no semantic text in the outlines; canonical and spoken labels stay in registry metadata and specimens;
- no claim that an outline conversion is rendering-invariant until raster comparison passes.

A 2048 UPM is a reasonable first proof parameter because the 24-unit source grid can be scaled consistently and leaves room for bearings, but it is not a semantic or publication decision. Metrics should be tested against Latin cap height, x-height, baseline, and common technical symbols at multiple sizes. A later proposal font needs a legible, publication-appropriate reference glyph, not necessarily the exact UI sizing of the 24-pixel SVG.

## Purpose-built proof versus fork

| Option | Internal value | Risk | Disposition |
| --- | --- | --- | --- |
| Purpose-built minimal font | Isolates these six outlines, metrics, naming, and provenance | Does not test fallback inside a broad text family; still needs a valid OpenType structure | Recommended for a private proof |
| Fork an OFL font | Supplies surrounding text metrics and a real fallback environment | Reserved Font Names, derivative-license obligations, attribution, upstream drift, imported outline provenance, and apparent endorsement | Do not fork for the first proof |
| SMuFL extension or SMuFL-coded font | Supplies a mature glyph-name and metadata model | SMuFL is music-notation infrastructure, generally uses PUA mappings for its repertoire, and currently has no reviewed equivalent for these six concepts | Use only as process precedent; make no compliance or extension claim |
| PUA-mapped icon font | Easy to type locally | Mapping is nonportable, collision-prone, and easily mistaken for standard encoding | Prohibited for this lane |
| SVG-only specimens | Preserves current source exactly | Does not exercise OpenType metrics or font renderers | Retain as the visual oracle, not the font proof |

[SMuFL's glyph-name metadata](https://w3c-cg.github.io/smufl/latest/specification/glyphnames.html), [font-specific metadata](https://w3c-cg.github.io/smufl/latest/specification/font-specific-metadata.html), and [alternate-glyph metadata](https://w3c-cg.github.io/smufl/latest/specification/glyphswithalternates.html) are useful architectural precedents: identity, glyph metadata, metrics, and alternates are separate. The registry should preserve that separation without copying SMuFL schemas, PUA assignments, glyph names, fonts, or artwork.

## Tooling strategy

The first private proof should be deterministic and generated, not hand-edited in a binary font editor.

1. Verify the six source hashes against the study lock.
2. Parse only the local, original SVG paths and expand the 2.25-unit round strokes deterministically.
3. Apply one recorded transform and metric template to all six glyphs.
4. Build a minimal TrueType-outline OpenType font with [fontTools `fontBuilder`](https://fonttools.readthedocs.io/) or an equivalently inspectable open-source builder.
5. Give unencoded glyphs stable internal names derived from registry IDs, for example `asr.filter.high_pass`; keep names ASCII and under OpenType's length constraints.
6. Inspect the binary through TTX and reject unexpected tables, mappings, names, timestamps, or nondeterministic bytes.
7. Address and draw the six by glyph name or glyph ID using [HarfBuzz's glyph APIs](https://harfbuzz.github.io/harfbuzz-hb-font.html), avoiding a Unicode or PUA `cmap` entry.
8. Validate OpenType structure with an established checker such as FontBakery's OpenType/universal profiles, while documenting checks that assume a public language font and are inapplicable to a private symbol proof.
9. Render with at least FreeType/HarfBuzz and two independent platform rasterizers when available. Compare bounding boxes, advances, contour counts, and pixels against the SVG oracle.
10. Keep generated font bytes and specimens private until publication and licensing gates are separately resolved. Public git may contain a design note, but not the proof font or a mapping that implies assignment.

The [OpenType `cmap` specification](https://learn.microsoft.com/en-us/typography/opentype/spec/cmap) defines character-to-glyph mapping and requires missing character codes to resolve to glyph 0. Direct glyph-ID rendering is therefore the clean way to test unencoded outlines without inventing a PUA contract. A later proposal font can add committee-appropriate mappings only after the encoding path and code points are legitimately known.

## Licensing and reuse controls

The current repository decision licenses original artwork under CC0 and identifies OFL-1.1 as the preferred font-publication license; `LICENSES.md` also permits another explicitly documented font license. Selecting either remains a reserved owner decision. For the private proof:

- import only the six repository-authored SVGs whose hashes and provenance are recorded;
- do not import outlines, hinting programs, metrics, names, or tables from vendor, IEC, ISO, AES, SMuFL, FontAudio, DSSSP, or other fonts;
- prefer a font built from scratch so no derivative-font license is triggered;
- record all tool licenses separately from output-font licensing;
- do not state that using MIT-licensed fontTools determines the license of the generated font;
- do not publish a font until the owner selects a license and the binary contains required ownership, copyright, and license metadata.

Unicode's [Font Submission Policy](https://www.unicode.org/policies/font_policy.html) prefers OFL 1.0/1.1 and also accepts MIT, Apache-2.0, the Unicode Font License, or a qualifying CLA. It requires provenance and ownership in OpenType name IDs 0, 8, and 9 and license information in IDs 13 and 14. The [OFL 1.1 text](https://openfontlicense.org/open-font-license-official-text/) allows modification and redistribution but carries conditions for derivatives, including Reserved Font Names when declared. Those conditions matter only if the project later chooses OFL or modifies an OFL font; this note does not make that legal or publication decision.

## Required private proof artifacts

When the proof is authorized and built, retain privately:

- source manifest with the six record IDs, paths, and exact SVG hashes;
- build-lock file with tool versions and dependency hashes;
- deterministic build command and environment description;
- transform and metric manifest;
- glyph-order and internal-name manifest with no PUA or proposed code points;
- TTX table inventory and normalized dump;
- contour, bounds, advance, and overlap report;
- light/dark raster specimens at 16, 20, 24, 32, and 64 pixels;
- mixed-direction, adjacent-number, punctuation, and line-wrap test cases using a simulation layer rather than invented character mappings;
- accessibility note showing that glyph rendering alone has no accessible name and must remain paired with registry text/spoken labels;
- license/provenance checklist;
- reproducibility result and output SHA-256.

The public repository can later record cryptographic commitments and aggregate validation findings without publishing the font, just as the private study-construction validation records commitments without exposing private answer-bearing material.

## Stop conditions and implementation sequence

### Phase 1: property simulation

Create a table-driven simulator for the proposed `So/0/ON/N/AL` behavior and exercise line breaking, bidi ordering, normalization expectations, and accessibility fallbacks without allocating code points. Stop if the six concepts require different properties or if fixed internal orientation cannot be represented safely with `ON` and no mirroring.

### Phase 2: private unencoded outline proof

Build the minimal proof described above from the locked SVGs. Stop if outline expansion materially changes geometry, if a reproducible no-PUA build is not possible, or if platform rendering makes any member unrecognizable at the target sizes. Any intentional visible redesign returns to Human Review.

### Phase 3: internal evidence package

Record private artifacts, public commitments if useful, adverse-review findings, and unresolved questions. Do not call the proof a proposal font, release candidate, canonical font, or encoding implementation.

### Phase 4: deferred external-package work

Only after the repository's Unicode non-go conditions clear, prepare a complete owner-review package containing current usage/interchange evidence, overlap audit, stable repertoire, properties, original reference glyphs, font license/provenance, and the ISO/IEC 10646 summary material. Code points, external outreach, submission, font publication, and the complete external package remain outside this lane.

## Findings

The private implementation and commitment-only results are recorded in [Private unencoded font-proof validation](private-unencoded-font-proof-2026-08-31.md). That proof preserves this note's unencoded, private, registry-ID-first boundary and does not change the Unicode `HOLD`.

- Observed fact: current Unicode guidance requires usage, repertoire stability, and public plain-text interchange need, plus proposed properties and an appropriately licensed font before recommendation.
- Observed fact: authoritative UCD analogues support `So/0/ON/N` and `AL` as the best current technical-symbol baseline.
- Interpretation: the six concepts should share one simple property profile; their visual direction does not require bidi mirroring or strong LTR behavior.
- Interpretation: an unencoded, purpose-built proof font is technically feasible without PUA assignment and is safer than a font fork.
- Counterevidence: font feasibility does not prove character eligibility, usage, or interchange need. Adequate prose and ASCII abbreviations remain material objections in the current evidence base.
- Open question: mixed-direction simulation may expose placement behavior that requires revisiting `Bidi_Class=ON`.
- Open question: font outline expansion and rasterization may require optical adjustments, which would trigger visual review before any external or canonical use.
- Recommendation: complete property simulation first, then a private unencoded proof only if it materially supports the internal evidence package.

## References

- [Unicode SEW submission guidelines](https://sew.unicode.org/guidelines)
- [Unicode properties in character proposals](https://www.unicode.org/pending/properties.html)
- [Unicode Standard 17.0, Chapter 4: Character Properties](https://unicode.org/versions/Unicode17.0.0/core-spec/chapter-4/)
- [UAX #44: Unicode Character Database](https://www.unicode.org/reports/tr44/)
- [UnicodeData.txt 17.0.0](https://www.unicode.org/Public/17.0.0/ucd/UnicodeData.txt)
- [UAX #9: Unicode Bidirectional Algorithm](https://www.unicode.org/reports/tr9/)
- [UAX #14: Unicode Line Breaking Algorithm](https://www.unicode.org/reports/tr14/)
- [Unicode Standard 17.0, Chapter 23: Variation Selectors](https://unicode.org/versions/Unicode17.0.0/core-spec/chapter-23/)
- [Unicode Font Submission Policy](https://www.unicode.org/policies/font_policy.html)
- [OpenType 1.9.1 specification](https://learn.microsoft.com/en-us/typography/opentype/spec/)
- [OpenType `cmap` table](https://learn.microsoft.com/en-us/typography/opentype/spec/cmap)
- [SMuFL specification](https://w3c-cg.github.io/smufl/latest/)
- [fontTools documentation](https://fonttools.readthedocs.io/)
- [HarfBuzz font API](https://harfbuzz.github.io/harfbuzz-hb-font.html)
- [FontBakery usage and profiles](https://github.com/googlefonts/fontbakery/blob/main/docs/source/user/USAGE.md)
- [SIL Open Font License 1.1](https://openfontlicense.org/open-font-license-official-text/)

## Agent Report - 2026-08-31T19:50:19-07:00

- Report status: completed and independently approved.
- Scope: audited character-property hypotheses, bidi, line breaking, combining, normalization, variation, monochrome outline conversion, OpenType proof construction, SMuFL precedent, and licensing boundaries for the existing six concepts.
- Evidence: current Unicode SEW guidance; Unicode 17.0 UCD, UAX #9, UAX #14, and Chapters 4 and 23; Unicode Font Submission Policy; OpenType 1.9.1; current SMuFL metadata specifications; fontTools, HarfBuzz, FontBakery, and OFL primary documentation; exact repository lock manifest and decision log.
- Recommendation: use a uniform provisional `So/0/ON/N/AL` profile, simulate properties without code points, and use a private purpose-built unencoded font proof addressed by glyph ID or name. Do not use PUA, sequences, standardized variation selectors, a third-party font fork, or a SMuFL-compliance claim.
- Preserved objections: current plain-text evidence remains insufficient; a font proves renderability rather than encoding need; `ON` requires mixed-direction testing; outline conversion may alter geometry; publication and license selection remain gated.
- Excluded actions: no code-point choice, PUA assignment, font bytes, font fork, external outreach, submission, public release, visible geometry change, artwork acceptance, new semantic family, registry score/status change, or project-position change.
- Validation: after rebasing onto exact main `b01468f289356838c3c0fc7873b201cdb4a496b4`, the full repository suite passed 111/111, Agent Report hygiene passed, `git diff --check` passed, and prohibited smart-quote scanning found no additions.
- Independent review: an adverse reviewer approved the post-rebase change with no blocker after checking the Unicode 17 analogues, Line Break and East Asian Width ranges, SEW criteria, OpenType/HarfBuzz architecture, normalization/variation boundaries, SMuFL characterization, licensing boundary, scope exclusions, and targeted tests. The reviewer requested five nonblocking clarifications; all five are incorporated in this revision.
