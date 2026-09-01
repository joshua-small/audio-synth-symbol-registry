# Current Evidence Status

Status as of 2026-09-01T01:44:51-07:00. This synthesis supersedes the historical [0.2.20 status synthesis](current-evidence-status-0.2.20.md). It applies the evidence-triggered six-record reassessment after DA-023 and DA-025 without changing any live semantic record, alias, lifecycle status, artwork, or external posture.

## Current artifacts

| Artifact | Version | Current authority |
| --- | --- | --- |
| Registry and evidence ledger | 0.4.1 | `registry/registry-metadata.json` and `evidence/ledger.json` |
| Schema | 0.4.0 | `registry/registry-metadata.json` |
| Assessments | 0.3.5, format 0.2.0 | `registry/assessments/registry-0.4.1-2026-09-01.json` |
| Derived analyses | 0.2.21, format 0.1.0 | `evidence/derived-analyses.json` |
| Tooling | 0.8.0 | `package.json` |

## Current records

High-pass, low-pass, band-pass, and band-stop remain reversible `registry-candidate` records. Both shelves remain `evidence-collecting`:

| ID | Score | Status and principal boundary |
| --- | ---: | --- |
| `asr:filter.high-pass` | 20/20 | `registry-candidate`; unchanged bounded `Low Cut` response-class alias |
| `asr:filter.low-pass` | 20/20 | `registry-candidate`; unchanged bounded `High Cut` response-class alias |
| `asr:filter.band-pass` | 20/20 | `registry-candidate`; unchanged score and status |
| `asr:filter.band-stop` | 18/20 | `registry-candidate`; text/accessibility and visual convergence are now 3, while DA-020 Notch non-transfer remains controlling |
| `asr:filter.low-shelf` | 19/20 | `evidence-collecting`; `low shelving filter` is resolved as bounded alias and isolated distinction from high pass is the sole material blocker |
| `asr:filter.high-shelf` | 19/20 | `evidence-collecting`; `high shelving filter` is resolved as bounded alias and isolated distinction from low pass is the sole material blocker |

Scores are registry-readiness diagnostics, not Unicode eligibility. Candidate status is reversible, every `asr:` identifier remains provisional, and promotion to `registry-accepted` remains a Human Review gate.

## Reassessment disposition

DA-023 supplies the third independent explicit axis-less broad-class Band-reject rendering through Bitwig EV-200, alongside Image-Line EV-100 and Ardour EV-120. Enriched KVR EV-032 and EV-201, independent Sound On Sound EV-202 and EV-203, and Apple EV-204 establish non-UI broad-class terminology and contextual BR. Band-stop text/accessibility rises from 2 to 3, visual convergence rises from 2 to 3, and total score rises from 16 to 18. Lifecycle status remains `registry-candidate`.

The increase does not create unrestricted BR, BRF, or Notch aliases. DA-020 and DA-021 remain controlling: Band-stop and Band-reject are the broad class; Notch stays related-only and commonly narrower; Notch-only evidence transfers only when a source explicitly maps or contrasts it. DA-023 found no portable response-glyph text use, common audio-chat BSF corpus, independent drawing-required Band-stop case, or qualifying SIR/EasyEffects third form.

DA-022 and DA-025 resolve `low shelving filter` and `high shelving filter` as exact aliases only at response-class level. Shelf/shelving is an explicit morphological relationship, while whole-label ASCII case and one internal space/hyphen are orthographic normalization. Short fragments, product-local pass enums, pass-shelf compounds, bass/treble, abbreviations, signed operations, parameters, topology, implementation, and glyph identity remain excluded; explicit product documentation overrides generic alias lookup.

That terminology disposition does not establish isolated recognition. Each shelf remains 19/20 because semantic stability remains 3 while its isolated shelf/pass distinction is material. Low shelf versus high pass and high shelf versus low pass are now the sole material question and hard blocker for those records. DA-019's affected-side two-prong topology, orientation, divergence, and exact-geometry exclusions remain controlling.

DA-024 still finds no independently used portable target response glyph for any record. Successful prose, ASCII protocols, structured IDs, accessibility text, named icon assets, and parser- or locale-caused failures remain adverse to claims of character necessity. A Unicode scalar is not necessarily one model token; token efficiency remains model- and tokenizer-specific.

## Current position

- Registry and ASCII interchange work: `GO`.
- Internal six-member evidence and recognition preparation: `GO` within existing gates.
- Artwork remains unpublished and noncanonical; exact locked SVG bytes and geometry are unchanged.
- Participant recruitment, external outreach, publication, release, and submission remain unauthorized.
- Formal Unicode proposal: `HOLD`. No submission has been made.

## Next work

1. Complete exact-head independent adverse review of the new immutable assessment, arithmetic, source grouping, DA-020 transfer boundary, shelf blocker reduction, digests, and protected trees.
2. Continue private isolated six-way recognition validation; lexical equivalence and topology convergence do not satisfy the two shelf blockers.
3. Continue seeking independently authored portable character use or irreducible public interchange failures while preserving successful prose, IDs, accessibility text, and parser-fix counterexamples.
4. Preserve the `registry-accepted` Human Review gate and batch it with a complete external-package review if that stage is reached.
5. Keep Unicode `HOLD` until every formal non-go condition is cleared and the owner separately authorizes external action.

## Agent Report - 2026-09-01T01:55:03-07:00

- Report status: evidence-triggered six-record reassessment implemented and frozen for exact-head independent adverse review; publication remains pending.
- Scores: 20, 20, 20, 18, 19, and 19 in registry order; lifecycle statuses are unchanged.
- Band-stop: DA-023 raises only text/accessibility and visual convergence from 2 to 3; DA-020 Notch non-transfer and every contextual-abbreviation limitation remain visible.
- Shelves: DA-022 and DA-025 resolve only the full shelving-filter terms; isolated shelf/pass recognition remains the sole material blocker for each shelf.
- Versions: registry/evidence 0.4.1, assessments 0.3.5 with format 0.2.0, and derived analyses 0.2.21; schema 0.4.0 and tooling 0.8.0 remain unchanged.
- Protected state: live records and aliases, canonical fields, status values, artwork, geometry, schema, tooling, font, PUA, registry-accepted gate, Unicode `HOLD`, and external posture remain unchanged.
- Validation: all 119 tests pass. Registry validation confirms six records, nine assessment sets, 124 evidence sources, registry 0.4.1, assessments 0.3.5, schema 0.4.0, and tooling 0.8.0. Arithmetic, evidence-to-artifact provenance, candidate status, sole-blocker reduction, registered digests, immutable predecessors, and protected live-record, assessment-history, artwork, schema, tooling, package, font, and PUA trees pass exact checks. Exact-head adverse review disposition follows.
- Independent adverse review - 2026-09-01T02:00:25-07:00: APPROVED exact substantive head `be3304cb37e4247065b2dbb94b4f86f23b248189` with no blocker.
