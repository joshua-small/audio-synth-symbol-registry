# Current evidence-status synthesis

Status as of 2026-08-29, including repository work merged through PR #24. This document summarizes the evidence corpus; it does not change any record status, semantic scope, artwork policy, or external-outreach position.

## Executive finding

The project has credible evidence for a durable audio-filter semantic family and for widespread visual response-curve conventions in products, education, and explanatory material. It does not yet have evidence of an established portable plain-text glyph practice or enough evidence to begin a formal Unicode proposal.

Accordingly:

- **Open registry program: GO.** Continue documenting semantics, representations, counterexamples, accessible fallbacks, and original study artwork.
- **Formal Unicode proposal: HOLD.** The project's Unicode non-go conditions remain active.
- **Current records:** all four remain `evidence-collecting`. No promotion is implied here.

## Supported findings

1. **The four response semantics are established and cross-sector.** Current vendor documentation covers filters and EQ response modes across Ableton (EV-006), FabFilter (EV-007), Native Instruments (EV-008), Yamaha (EV-009), Apple (EV-010), Steinberg (EV-011), Moog (EV-012), and Noise Engineering (EV-013). Yamaha's parameter manual directly illustrates LPF, HPF, BPF, and BEF response behavior (EV-018). These sources support the semantic family, not a mandatory glyph contour.
2. **The semantics have historical depth.** ARP documentation records low-pass response material in 1971 (EV-014); Roland documents the Jupiter-8's 1981 low-pass and high-pass filters retrospectively (EV-016); FabFilter's 2009 Pro-Q announcement names bell, shelf, and cut forms (EV-017). The corpus does not yet establish an unbroken compact-glyph lineage across those decades.
3. **Practitioners encounter a recognizable visual convention.** Harmony Central calls filter controls "bent-line icons" (EV-019), while education sources explain response forms visually (EV-020). Community questions show recognition and terminology friction (EV-021 through EV-024).
4. **There is a real implementation gap.** DSSSP maps filter-response icons through a custom font (EV-005), and FontAudio supplies audio UI icons (EV-025). Both demonstrate that software can need such graphics; neither mapping is portable Unicode interchange.
5. **IEC material is adjacent, not equivalent.** The IEC 60617 portal is retained as terminology and circuit-symbol context (EV-004). It is not evidence for the compact audio-community response forms, and its artwork must not be copied.

## Claims not currently supported

The evidence does not establish that:

- practitioners already use a shared response glyph as portable plain text;
- one exact axis-less contour has converged across vendors and decades;
- the four graphics are semantically interchangeable with IEC circuit symbols;
- a custom-font or Private Use Area mapping creates interoperable character usage;
- band-stop and notch are exact aliases in every audio context;
- product popularity, UI familiarity, or educational use alone satisfies Unicode encoding criteria;
- a formal Unicode, ISO, IEC, AES, SMuFL, vendor, or community position has been adopted.

These are evidence gaps and counterevidence, not reasons to close the registry effort.

## Completed evidence and prototype work

Five evidence packages from the initial queue are complete, and an initial bounded registry-first interchange prototype has been implemented. Original neutral artwork and recognition testing remain unperformed; the next queue separates non-gated study infrastructure from the later artwork, stimulus-locking, recruitment, and launch gates.

| Work package | Result | Durable artifact |
| --- | --- | --- |
| Bounded positive plain-text search | Found three independent family-level workaround classes, but no record has the three qualifying examples required by the project's formal Unicode safeguard. | [Plain-text workaround search](plain-text-workaround-search.md) |
| 1980s and 1990s manufacturer-manual sample | Verified semantic and contextual response-graph use, but did not establish an unbroken standalone axis-less glyph lineage. | [Historical visual-gap report](../evidence/reports/2026-08-29-1980s-1990s-visual-gap.md) |
| Current-vendor representation matrix | Found recurring semantics and abbreviations alongside heterogeneous contextual graphics; no row establishes portable standalone character use. | [Current representation matrix](current-representation-matrix.md) |
| Band-stop versus notch boundary | Found concurrent narrow-subtype, exact-synonym, and contextual/product-mode usages; no universal Q or bandwidth threshold was established. | [Band-stop/notch boundary report](../evidence/reports/2026-08-29-band-stop-notch-boundary.md) |
| Unicode and adjacent-standards overlap audit | Found no Unicode 17 semantic equivalent; documented visual near-misses, lossy sequences, and IEC 60617 terminology as adjacent rather than equivalent. | [Unicode overlap audit](unicode-overlap-audit.md) |
| Initial registry-first interchange prototype | Demonstrated registry-derived text and speech resolution from canonical ASCII IDs, with optional application-owned asset references and no PUA, font, or artwork dependency. Community adoption, optional font experiments, and stable-protocol work were not performed. | [Interchange prototype](interchange-prototype.md) |

These results strengthen the registry's research foundation without clearing the Unicode `HOLD` or promoting a record.

## Recorded four-record assessment

The latest immutable assessment snapshot is dated 2026-08-29 against ledger version 0.1.1. It supersedes the bootstrap snapshot for assessment selection while preserving that earlier assessment as history.

The registry and evidence ledger are now version 0.1.3 after the band-stop/notch and historical-manual additions. The 0.1.1 scores below are therefore the latest recorded scores, not a reassessment of every source now in the corpus. A new immutable 0.1.3 assessment is the next mechanical evidence-maintenance task. Until it exists, do not describe these numbers as current corpus scores or infer promotion from later evidence.

| Record | Score | Main recorded gaps | Status |
| --- | ---: | --- | --- |
| `asr:filter.high-pass` | 12/20 | Alias boundary; portable glyph use; second compact rendering; reproducible overlap/confusability audit | evidence-collecting |
| `asr:filter.low-pass` | 12/20 | Alias boundary; portable glyph use; second compact rendering; reproducible overlap/confusability audit | evidence-collecting |
| `asr:filter.band-pass` | 10/20 | Target-specific implementation evidence; portable glyph use; compact-rendering convergence; overlap/confusability audit | evidence-collecting |
| `asr:filter.band-stop` | 8/20 | Same gaps as band-pass, plus the open band-stop/notch semantic boundary | evidence-collecting |

The increases for high-pass, low-pass, and band-pass reflect broader semantic, independent-usage, and source-grounded fallback evidence. They do not credit axis-bearing graphs as compact target renderings or UI evidence as plain-text interchange. Band-stop does not inherit Notch evidence while that semantic relationship remains unresolved.

The acceptance rubric requires at least 13/20 with dimension floors and no material question for `registry-candidate`; `registry-accepted` requires at least 18/20, stronger floors, public review, independent review, and human authorization. A numerical increase cannot override a blocker.

## Prioritized next work

The outdated initial list has been replaced by the bounded queue in [Prioritized next work](prioritized-next-work.md). It preserves the unfinished artwork/recognition and prototype-evaluation work while separating routine preparation from later Human Review gates. In order:

1. Reassess all four records against evidence ledger 0.1.3 without changing status.
2. Prepare reproducible recognition-study infrastructure without creating or selecting geometry, recruiting participants, or launching a study.
3. Run a per-record plain-text-friction follow-up focused on band-pass and band-stop.
4. Exercise the interchange prototype in repository-owned examples and record usability failures without declaring a stable protocol.
5. Map related standardization, font, emoji, and broader-industry opportunities as research-only paths, with no outreach or adopted external position.

## Decision rule

Continue the registry while the evidence improves documentation, accessibility, interoperability, or research value. Revisit Unicode only after all formal non-go conditions in the acceptance rubric are cleared, including at least one `registry-accepted` record, the plain-text-workaround threshold, a reproducible overlap audit, sufficient community use, review, and support under the current Unicode Symbol and Emoji Subcommittee guidance, supportable neutral artwork and character-property rationale, and separate human authorization for external standards action.

## Source pointers

- [Evidence ledger](../evidence/ledger.json), especially EV-004 through EV-036
- [Current ledger 0.1.1 assessment](../registry/assessments/ledger-0.1.1-2026-08-29.json)
- [Prioritized next work](prioritized-next-work.md)
- [Recorded bootstrap assessment](../registry/assessments/bootstrap-2026-08-29.json)
- [Registry acceptance rubric](acceptance-rubric.md)
- [Unicode Symbol and Emoji Subcommittee guidelines](https://sew.unicode.org/guidelines)
- [Unicode character proposal FAQ](https://www.unicode.org/faq/char_proposal.html)
- [Ableton Live 12 Audio Effect Reference](https://www.ableton.com/en/live-manual/12/live-audio-effect-reference/)
- [FabFilter Pro-Q Band Controls](https://www.fabfilter.com/help/pro-q/using/bandcontrols)
- [Yamaha Synthesizer Parameter Manual](https://usa.yamaha.com/files/download/other_assets/1/812531/synthesizer_en_pm_c0.pdf)
- [Harmony Central: High-Pass and Low-Pass Filters](https://www.harmonycentral.com/articles/recording/high-pass-and-low-pass-filters-r783/)
- [DSSSP custom icon-font mapping](https://github.com/NumberOneBot/dsssp/blob/main/src/icons/font.css)
- [FontAudio](https://github.com/fefanto/fontaudio)

## Agent Report - 2026-08-29T21:06:01-07:00

- Scope: synthesized current evidence, counterevidence, recorded scores, and next work into one reviewable status document.
- Evidence: cited the checked-in ledger IDs, bootstrap assessment, acceptance rubric, and direct authoritative or primary links.
- Guardrails: made no status, semantic, artwork, licensing, outreach, or external-standards change.
- Validation: document was checked for internal consistency against the repository's current assessment and evidence ledger.
- Limitation: the 0.1.0 assessment has not yet been recalculated against evidence ledger 0.1.1; this document identifies that as the next mechanical evidence task.

## Agent Report - 2026-08-29T21:21:01-07:00

- Scope: reassessed all four records against evidence ledger 0.1.1 and published an immutable dated snapshot as assessment artifact 0.1.1.
- Evidence handling: kept semantic, visual, implementation, plain-text, adjacent IEC, and legal-provenance evidence distinct; did not transfer Notch evidence to Band-stop.
- Outcome: high-pass 12/20, low-pass 12/20, band-pass 10/20, and band-stop 8/20; every record remains `evidence-collecting`.
- Lifecycle: preserved the bootstrap snapshot, separated assessment artifact SemVer from snapshot format version, and declared the current snapshot in registry metadata.
- Validation: full repository validation and tests are required before merge.
- Limitations: no new source was added, no independent review is encoded into the immutable snapshot, and no record, semantic ID, alias, artwork, or external position changed.

## Agent Report - 2026-08-29T23:21:04-07:00

- Scope: reconciled completed and unfinished work from the initial queue with work merged through PR #24, linked the durable artifacts, and added a new bounded work plan.
- Evidence: checked the merged plain-text search, historical-manual sample, representation matrix, band-stop/notch report, Unicode overlap audit, registry metadata, and interchange prototype.
- Outcome: distinguished the latest recorded 0.1.1 assessment from the current 0.1.3 evidence corpus; preserved every record at `evidence-collecting` and the formal Unicode proposal at `HOLD`.
- Validation: repository tests and independent review are required before merge.
- Guardrails: changed no registry semantics, score, status, alias, artwork, license, outreach authorization, or external position.
