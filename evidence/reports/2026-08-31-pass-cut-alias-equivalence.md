# Pass/cut alias-equivalence dossier

This adverse review addresses the open questions on `asr:filter.high-pass` and `asr:filter.low-pass`: whether `low cut` and `high cut` are sufficiently established aliases, and where an alias would overstate equivalence. It does not change a record, alias, identifier, definition, status, assessment, artwork, or Unicode position.

## Decision model

An alias in this registry is a concept-retrieval label. It is not a promise that two products expose identical parameters or implement the same transfer function. Evidence was classified at three levels:

1. **Response-class equivalence:** both labels identify the same passed side and attenuated side.
2. **Implementation equivalence:** order, slope, Q or resonance, phase behavior, cutoff convention, and other parameters are identical.
3. **Unrestricted phrase equivalence:** every occurrence of words such as "low cut" or "cut highs" identifies the filter class.

The proposed aliases need level 1. The corpus directly defeats levels 2 and 3.

## Direct evidence

| Independence group | Evidence | Low Cut -> high-pass | High Cut -> low-pass | Adverse boundary |
| --- | --- | --- | --- | --- |
| Steinberg | EV-160, EV-162 | UltraShaper gives the explicit high-pass (low-cut) pairing. | UltraShaper gives the explicit low-pass (high-cut) pairing. | HALion's spectral `Low Cut` is energy-relative and explicitly not a classic fixed-cutoff filter. Both URLs count as one publisher group. |
| Apple | EV-161 | Both affect frequencies below the selected point. | Both affect frequencies above the selected point. | Logic exposes Cut and Pass as separate legacy families: Pass adds order and smoothing. Same response direction does not mean preset or parameter equivalence. |
| Icon Collective | EV-163 | Explicitly "also known as" high pass. | Explicitly "also known as" low pass. | Simplified teaching language about complete removal is not a practical transfer-function specification; shelf remains separate. |
| Stanford Exploration Project | EV-164 | The instructional implementation is called a lowcut filter (highpass filter). | No claim. | One algorithm does not establish a universal implementation. |
| Sound Devices | EV-165 | One recorder function is alternately labeled high-pass (low-cut), High-Pass, Low Cut, and low cut. | No claim. | Fixed device slope/frequency choices do not generalize to all high-pass filters. |
| ToneShiftEQ | EV-166 | Documentation and code bind Low Cut to HighPass. | Documentation and code bind High Cut to LowPass. | One open-source implementation's topology and Q do not define the alias globally. |
| W3C Audio Working Group | Existing EV-150 | Uses the canonical `highpass` token and transfer behavior, not the cut label. | Uses the canonical `lowpass` token and transfer behavior, not the cut label. | Standards-adjacent software taxonomy favors unambiguous pass names and supplies no unrestricted cut-name equivalence. |

At least four publisher-independent groups directly support Low Cut -> high-pass (Steinberg, Apple, Icon Collective, Stanford, Sound Devices, and ToneShiftEQ). At least four directly support High Cut -> low-pass (Steinberg, Apple, Icon Collective, and ToneShiftEQ). Repeated pages or files within a publisher are not counted as independent.

## What does and does not break equivalence

### Slope, order, and rolloff

Different finite slopes do not change a high-pass response into another semantic class; EV-165 labels multiple high-pass slope/frequency combinations as Low Cut, and practical pass filters are families rather than one ideal transfer function. Therefore slope variance does not defeat response-class aliasing.

It does defeat implementation interchangeability. A note saying only "use a low cut" cannot convey order, slope, Q, phase mode, resonance, or a product's cutoff definition. The alias must not be used to translate presets or parameter values without those fields.

### Product-specific operations

EV-162 is the strongest direct counterexample: a feature called Low Cut may be a spectral-energy operation rather than a classic fixed-cutoff high-pass filter. EV-161 separately shows semantically parallel Cut and Pass families with different controls. A parser or human reviewer must prefer documented product behavior over the alias table.

### Amount-of-cut and shelf ambiguity

The noun phrases `Low Cut` and `High Cut`, when used as filter-type or control labels in audio EQ/filter contexts, are well supported. Free prose such as "cut the lows", "a low-frequency cut", or "high cut amount" is broader: it can describe a shelf, bell, damping control, gain change, or a nonclassic spectral operation. Those phrases are not registry aliases.

The token sequence `low cut-off frequency` is also not `Low Cut`; `low` modifies the cutoff value. Tokenization must not infer an alias from that substring.

## Capitalization and hyphenation

No semantic distinction was found. The same Sound Devices function appears as `high-pass (low-cut)`, `High-Pass`, `Low Cut`, and `low cut`; other sources use title case, lower case, spaces, and hyphens for the same response mappings. These are orthographic variants, not separate concepts.

For lookup, case folding plus equivalence of an ASCII space and hyphen is appropriate after whole-label tokenization. The registry does not need redundant aliases such as `Low Cut`, `low-cut`, and `LOW-CUT`; display capitalization remains editorial. Normalization must not delete arbitrary punctuation or collapse `low cutoff` into `low cut`.

## Query and exclusion log

Searches combined the two inverse terms with `high-pass`, `low-pass`, manufacturer documentation, university domains, old manuals, and GitHub source. Candidate sources were then inspected at exact headings, PDF pages, or immutable paths.

- Excluded search snippets, unattributed glossary mirrors, Manuals+ copies, Scribd copies, social-media summaries, and SEO pages when a publisher-controlled or inspectable primary source was available.
- Excluded sources that only defined cutoff frequency; phrases such as `low cut-off frequency` do not name Low Cut.
- Excluded product controls that said only "reduces highs/lows" unless the source also established a filter mapping or supplied adverse evidence.
- Counted Steinberg EV-160 and EV-162 once for independence despite their opposite findings.
- Counted ToneShiftEQ's documentation and code once because they are one project and implementation.
- Reused W3C EV-150 as an existing standards-adjacent comparator rather than creating a duplicate ledger record.

No third-party bytes, text, diagrams, screenshots, or artwork are committed. EV-161 and EV-163 through EV-166 have reproducible raw-response or immutable-source digests; the two JavaScript-delivered Steinberg pages use metadata-only capture and state that limitation.

## Finding

`low cut` and `high cut` are established audio EQ/filter response-class aliases for high-pass and low-pass, respectively. They are not consistently synonymous at the implementation or arbitrary-phrase levels. The evidence therefore supports retaining the current aliases only with a documented contextual boundary.

Neither capitalization nor hyphenation carries a semantic distinction in the inspected corpus. Those variations should be handled by lookup normalization, not by multiplying registry aliases.

## Separate semantic-review recommendation

Under D-021, a follow-up semantic change may be reviewed independently with this exact scope:

1. Retain `low cut` in `asr:filter.high-pass` and `high cut` in `asr:filter.low-pass`.
2. Resolve each record's current alias open question as **bounded yes**: established when the phrase names an audio filter type or control with the corresponding one-sided response.
3. Add a shared note that aliases identify response classes, not identical order, slope, Q/resonance, phase, cutoff convention, parameters, or presets.
4. Exclude arbitrary low/high-frequency cuts, shelves, bells, damping or gain controls, `low/high cutoff` adjective phrases, and product operations explicitly documented as nonclassic.
5. Specify whole-label, ASCII-case-insensitive lookup with space/hyphen equivalence; do not add capitalization and hyphen variants as separate aliases.
6. Make no canonical-name, ID, fallback, spoken-label, definition, status, artwork, assessment, or Unicode change in that follow-up unless separately justified.

This dossier does not itself apply that recommendation.

## Agent Report - 2026-08-31T21:42:00-07:00

- Scope: investigated the two inverse cut-name blockers through manufacturer, education, standards-adjacent, historical, and open-source evidence, with explicit adverse tests.
- Evidence: EV-160 through EV-166; existing EV-150 is reused only as a standards-adjacent comparator.
- Independence: Steinberg, Apple, Icon Collective, Stanford Exploration Project, Sound Devices, ToneShiftEQ, and W3C are separate publisher or implementation groups. Multiple pages, documentation files, and code paths within one group count once.
- Adverse result: response-class aliasing is supported; unrestricted implementation and phrase equivalence are rejected by Apple EV-161 and HALion EV-162.
- Reproducibility: exact locators and LA-offset access timestamps are recorded. Five new records carry checksums; ToneShiftEQ is commit-pinned with per-file and combined digests. Two JavaScript-delivered Steinberg pages are explicitly metadata-only.
- Rights: no third-party source bytes, text, screenshots, diagrams, code, or artwork are committed, copied, traced, or claimed as reusable.
- Mutation boundary: no canonical name, alias, ID, semantic field, status, assessment, artwork, or Unicode position changes in this research lane. Unicode remains `HOLD`.
- Recommendation: retain the existing aliases with the bounded contextual and normalization rules above, subject to a separate D-021 semantic review.
- Validation: the exact substantive worktree passed `npm test` 113/113, registry validation for six records, seven assessment sets, and 89 evidence sources at registry 0.2.10, Agent Report hygiene, derived-artifact digest reconciliation, JSON parsing, and `git diff --check`. Independent adverse review and CI remain pending.

## Agent Report - 2026-08-31T22:08:00-07:00

- Report status: completed after sequential integration and exact-head adverse re-review; CI and merge remain pending.
- Substantive review: APPROVE on exact pre-integration tree `802aecb7693968ce78339e38edb5b4aabb7fe8e2`; the reviewer independently reproduced Apple, Icon Collective, Stanford, Sound Devices, and all ToneShiftEQ file and combined digests, confirmed the source claims and adverse boundaries, verified no protected mutation, and passed 113/113 tests plus `git diff --check`.
- Sequential integration: rebased after the private font proof and Band-stop/Notch dossier. Tooling 0.8.0 and DA-006 v0.2.11/v0.2.12 remain immutable; registry/evidence 0.2.11 and derived analyses 0.2.13 are allocated for this lane.
- Mutation boundary: no live semantic field, alias, canonical name, identifier, assessment, status, artwork, study, Unicode, release, outreach, or external-position change. Unicode remains `HOLD`.
- Validation: exact remote substantive head `899268cf1fc0395a93f8b99878f9d30621c0cae4` and its identical local tree passed `npm test` 117/117, registry validation for six records, seven assessment sets, and 99 evidence sources at registry 0.2.11 with tooling 0.8.0, Agent Report hygiene, historical and current derived-artifact hash reconciliation, JSON parsing, and `git diff --check`.
- Independent review: APPROVE on exact remote substantive head `899268cf1fc0395a93f8b99878f9d30621c0cae4`, base `cd5481edc62b1c95ede38fcb14b546f99c608b89`, and tree `cb1b5ec64715e6e7a4f6c8f63d8dc3a7da79565e`. The reviewer verified sequential versions and immutable synthesis hashes, tooling and proof preservation, the merged DA-020 boundary, unchanged protected trees and Unicode `HOLD`, byte-identical EV-160 through EV-166 evidence, and all 117 tests. This approval-report-only annotation is permitted by that verdict.
