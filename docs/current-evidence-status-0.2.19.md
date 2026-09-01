# Current Evidence Status

Status as of 2026-09-01T00:53:06-07:00. This synthesis supersedes the historical [0.2.18 status synthesis](current-evidence-status-0.2.18.md). It preserves the merged six-record reassessment, shelf/shelving terminology dossier, and Band-stop text/render dossier, then adds the evidence-only portable-text and interchange-need corpus from DA-024 without changing any live semantic record, assessment, score, or status.

## Current artifacts

| Artifact | Version | Current authority |
| --- | --- | --- |
| Registry and evidence ledger | 0.3.4 | `registry/registry-metadata.json` and `evidence/ledger.json` |
| Schema | 0.4.0 | `registry/registry-metadata.json` |
| Assessments | 0.3.4, format 0.2.0 | `registry/assessments/registry-0.3.1-2026-08-31.json` |
| Derived analyses | 0.2.19, format 0.1.0 | `evidence/derived-analyses.json` |
| Tooling | 0.8.0 | `package.json` |

## Current records

High-pass, low-pass, band-pass, and band-stop are reversible `registry-candidate` records. Both shelves remain `evidence-collecting`:

| ID | Score | Status and principal boundary |
| --- | ---: | --- |
| `asr:filter.high-pass` | 20/20 | `registry-candidate`; `Low Cut` is a bounded response-class alias, not implementation equivalence |
| `asr:filter.low-pass` | 20/20 | `registry-candidate`; `High Cut` is a bounded response-class alias, not implementation equivalence |
| `asr:filter.band-pass` | 20/20 | `registry-candidate`; unchanged score and status |
| `asr:filter.band-stop` | 16/20 | `registry-candidate`; Notch remains related-only under controlled polysemy and source-local transfer |
| `asr:filter.low-shelf` | 19/20 | `evidence-collecting`; shelving-term disposition and isolated distinction from high pass remain material |
| `asr:filter.high-shelf` | 19/20 | `evidence-collecting`; shelving-term disposition and isolated distinction from low pass remain material |

Scores are readiness diagnostics, not Unicode eligibility. Candidate status is reversible, and every `asr:` identifier remains provisional. Promotion to `registry-accepted` remains a Human Review gate and is not implied by a high score.

## Assessment and evidence disposition

DA-018 through DA-021 remain controlling for the live pass/cut, Band-stop/Notch, and shelf-form semantic boundaries. DA-022 supports the two full `low shelving filter` and `high shelving filter` phrases only at response-class level and changes no live alias or question. DA-023 recommends but does not apply later Band-stop text/accessibility 2 -> 3, visual convergence 2 -> 3, and total 16 -> 18. The immutable current Band-stop assessment remains 16/20 and `registry-candidate` pending separate reassessment.

DA-024 finds no independently used portable target response glyph for any of the six concepts. It preserves direct public friction in EV-021, EV-023, EV-121, EV-140, and EV-141, with low shelf still the only DA-016 threshold-positive record. It also preserves adverse evidence:

- Equalizer APO EV-205 successfully exchanges five exact concepts plus Notch through documented ASCII tokens while warning that `BP` changes meaning across protocols.
- EasyEffects EV-206 loses `LS` and `HS` during import even though the portable ASCII source already carries those identities; this is parser-support failure rather than proof of a missing character.
- EasyEffects EV-207 loses numeric precision under one locale; it is a real round-trip defect but not identity or glyph loss.
- REAPER Accessibility Wiki EV-208 explains five exact concepts plus Notch through ordinary accessible prose. Notch-only text does not transfer to broad Band-stop.
- Immutable FFmpeg documentation EV-209 exposes ordinary word-based machine names covering all six concepts, including broad `bandreject` and `asuperstop`.
- Web Audio EV-150 independently carries all six semantic classes as structured enum values under its source-local Notch mapping.
- FontAudio EV-025 and Iconify EV-122 form one derivative asset-name lineage, not separate character-use evidence. Ardour EV-120 and DSSSP EV-101 remain incompatible project-local font mappings rather than shared portable text.

No public cross-system target-glyph copy/paste, shared PUA or local-slot mapping, stable cross-community ASCII response-curve notation, independent LLM/agent target-glyph demand, or broad Band-stop drawing-required failure was found. A Unicode scalar is not necessarily one model token; token efficiency remains a model- and tokenizer-specific hypothesis requiring controlled testing.

Derived analyses organize direct ledger evidence but are not counted as additional independent sources. The new adverse corpus does not weaken the registry's semantic or implementation findings; it narrows the claim that those findings establish character use or encoding necessity.

## Current position

- Registry and ASCII interchange work: `GO`.
- Internal six-member evidence and recognition preparation: `GO` within existing gates.
- Named icon assets and registry adapters remain viable non-Unicode interoperability lanes.
- Artwork remains unpublished and noncanonical; the exact locked SVG bytes and geometry are unchanged.
- Participant recruitment, external outreach, publication, release, and external submission: not authorized.
- Formal Unicode proposal: `HOLD`. No submission has been made.

## Next work

1. Complete exact-head independent adverse review of DA-024, including source digests, direct/adverse classifications, Notch non-transfer, derivative-lineage collapse, LLM caveat, and record-level negative findings.
2. After separate approval, perform the already scoped Band-stop reassessment from DA-023 without mutating fallbacks, aliases, semantics, or Notch transfer rules.
3. Perform the separately scoped shelf terminology semantic disposition, then reassess only the affected blocker without conflating lexical support with isolated recognition.
4. Continue private isolated six-way recognition validation; lexical, icon-namespace, and machine-interchange evidence do not satisfy that blocker.
5. Continue seeking independently authored portable character use or irreducible public interchange failures while retaining successful prose, IDs, accessibility text, and parser-fix counterexamples.
6. Keep Unicode `HOLD` until every formal non-go condition is cleared and the owner separately authorizes external action.

## Agent Report - 2026-09-01T00:53:06-07:00

- Report status: portable-text/interchange-need evidence dossier serialized for exact-head independent adverse review.
- Scope: add EV-205 through EV-209 and DA-024, refresh the current synthesis and proposal blocker map, and preserve all semantic and lifecycle state.
- Direct result: no independently used portable target glyph for any record; low shelf retains the strongest public communication-friction evidence, while Band-stop retains zero accepted compact-glyph communication failures.
- Adverse result: public ASCII protocols, structured enums, accessible prose, word-based commands, parser-specific failures, and named icon assets provide successful or causally narrower alternatives.
- Preserved state: scores remain 20, 20, 20, 16, 19, and 19; statuses, records, aliases, questions, fallbacks, speech, artwork, geometry, font, PUA, schema, tooling, Unicode `HOLD`, and external posture remain unchanged.
- Versions: registry/evidence 0.3.4 and derived analyses 0.2.19; assessments remain 0.3.4 with format 0.2.0, schema 0.4.0, and tooling 0.8.0.
- Validation: `npm test` passed 118/118 after validating six records, eight assessment sets, 124 evidence sources, registry/evidence 0.3.4, assessments 0.3.4, schema 0.4.0, tooling 0.8.0, registered source and derived-artifact digests, documentation drift, protected study/font boundaries, and Agent Report hygiene. JSON parsing, source digest re-fetches, straight-quote enforcement, protected-path review, and `git diff --check` passed before the exact-head approval recorded below.
- Independent review: `APPROVE` with no blocker at exact substantive head `826746603eaceb0b3c03145e9de997787b67078c`; the approval-only annotation changes no reviewed substance.
