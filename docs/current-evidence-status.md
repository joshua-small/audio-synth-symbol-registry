# Current evidence-status synthesis

Status as of 2026-08-29. This document summarizes the evidence corpus; it does not change any record status, semantic scope, artwork policy, or external-outreach position.

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

## Current four-record assessment

The only checked-in assessment is dated 2026-08-29 against ledger version 0.1.0. The ledger has since expanded to 0.1.1, so these scores are the current recorded scores, not a claim that the new evidence has already been rescored.

| Record | Score | Main recorded gaps | Status |
| --- | ---: | --- | --- |
| `asr:filter.high-pass` | 10/20 | Alias boundary; independent plain-text use; second compact rendering; reproducible overlap/confusability audit | evidence-collecting |
| `asr:filter.low-pass` | 10/20 | Alias boundary; independent plain-text use; second compact rendering; reproducible overlap/confusability audit | evidence-collecting |
| `asr:filter.band-pass` | 8/20 | More independent usage; plain-text use; compact-rendering convergence; overlap/confusability audit | evidence-collecting |
| `asr:filter.band-stop` | 8/20 | Same gaps as band-pass, plus the open band-stop/notch semantic boundary | evidence-collecting |

The acceptance rubric requires at least 13/20 with dimension floors and no material question for `registry-candidate`; `registry-accepted` requires at least 18/20, stronger floors, public review, independent review, and human authorization. A numerical increase cannot override a blocker.

## Prioritized next work

1. **Reassess against ledger 0.1.1.** Score the four records using EV-006 through EV-025, keeping implementation, semantic, visual, and plain-text evidence distinct.
2. **Run a bounded positive plain-text search.** Seek at least three independent cases where text communication is ambiguous, lossy, image-dependent, or custom-font-dependent. Record a negative result if no positive artifacts are found.
3. **Close the historical visual gaps.** Review primary 1980s and 1990s manufacturer manuals at page level, with at least two sources per decade, to test compact-glyph lineage rather than infer it.
4. **Build a representation matrix.** Record vendor, product/version, semantic label, abbreviation, compact curve presence, axes/context, and divergence without copying artwork. This should test convergence and identify false equivalences.
5. **Resolve band-stop versus notch.** Collect engineering, educational, vendor, and community usage that explicitly distinguishes or equates bandwidth/scope. Keep "notch" as a provisional related term meanwhile.
6. **Complete a reproducible overlap audit.** Check Unicode semantic candidates, visual confusables, character sequences, and adjacent standards terminology for each record.
7. **Pilot original neutral artwork and recognition testing.** Use the adopted artwork criteria and study protocol. Treat recognition results as registry evidence, not proof of Unicode eligibility.
8. **Prototype registry-first interchange.** Test canonical ASCII IDs, fallbacks, speech labels, SVG assets, and optional font mappings in documentation or tooling. Measure whether the prototype creates genuine text workflows and community adoption.

## Decision rule

Continue the registry while the evidence improves documentation, accessibility, interoperability, or research value. Revisit Unicode only when at least one record is `registry-accepted`, the plain-text-workaround threshold is met, overlap has been audited, neutral artwork and character-property rationale are supportable, and separate human authorization permits external standards action.

## Source pointers

- [Evidence ledger](../evidence/ledger.json), especially EV-004 through EV-025
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
