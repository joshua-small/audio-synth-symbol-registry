# Four-record target-use evidence spike

## Scope

This bounded pass audits why the four original records remained at 14/20, 14/20, 13/20, and 10/20, then reinspects two primary implementation sources capable of closing target-use and visual-convergence gaps. It changes no record semantics, identifier, name, alias, related term, fallback, artwork, or status.

The pass applies the registry rubric's narrow definition of a target representation: a compact audio or synthesis representation used as such, not merely a circuit symbol, axis-bearing graph, generic curve, label, or interaction-state display.

## Why the scores were capped

| Record | Previous score | Binding evidence limits before this spike |
| --- | ---: | --- |
| High-pass | 14/20 | Semantic stability remained 2 because `Low Cut` was not proven universally exact; one qualifying axis-less target implementation held independent usage at 2 and visual convergence at 1. |
| Low-pass | 14/20 | Semantic stability remained 2 because `High Cut` was not proven universally exact; one qualifying axis-less target implementation held independent usage at 2 and visual convergence at 1. |
| Band-pass | 13/20 | Stable semantics and text treatment were strong, but no directly documented axis-less target implementation was counted; independent usage was 1 and visual convergence was 0. |
| Band-stop | 10/20 | The material Notch boundary held semantic stability at 2; no qualifying band-stop target use held independent usage at 1 and visual convergence at 0; `BSF` remained ungrounded and held text/accessibility at 1. |

Vendor, historical, education, community, journalism, standards, and plain-text-friction evidence already supported the concepts at different strengths. Those sectors could not close a visual rubric gap unless a source directly documented the target compact form. Additional prose would have multiplied URLs without supplying the missing fact.

## Method

1. Revisit the official Image-Line Fruity Parametric EQ 2 manual already represented by EV-054, but record the new pass/rejection observation as EV-100 instead of silently broadening the shelf-specific observation.
2. Inspect the DSSSP implementation at immutable Git commit `860b8918957668c07e1403c1658057bba3c200ec`, following the rendered component's application mapping through `FilterIcon.tsx`, `utils.ts`, `font.css`, and `font/dsssp.svg` rather than relying on one filename or metadata field.
3. Count publishers and implementations, not URLs. EV-054 and EV-100 remain one Image-Line independence group. EV-005 and EV-101 remain one DSSSP independence group.
4. Exclude the DSSSP `NOTCH` component from band-stop evidence. Preserve Image-Line's mixed `Notch`/`Band stop` treatment as one product-local observation rather than a universal equivalence claim.
5. Import no third-party artwork. The Image-Line image checksum and pinned DSSSP commit support reinspection without making either source project artwork.

## Direct findings

### Image-Line selector

EV-100 establishes one official product implementation in which:

- the manual identifies the upper row as Band Type shapes;
- high-pass, low-pass, band-pass, and a rejected-band shape are compact and axis-less;
- the open Type menu labels the selected rejected-band member `Band stop`;
- slope/order is a separate control, represented below the type shape and separately in the menu.

This qualifies as one target implementation for all four records. The same page also calls the rejected-band type `Notch` in prose, so it supports only product-local band-stop/Notch treatment. It does not settle D-011 or the DA-004 boundary.

### DSSSP icon component

EV-101 establishes an independent open-source implementation in which named HighPassIcon, LowPassIcon, and BandPassIcon components render axis-less custom-font forms. The components and utility mapping are operationally authoritative for the observed use. Some internal SVG glyph-name metadata disagrees with the application mapping, a divergence that must remain visible rather than being normalized away.

The implementation uses Private Use Area code points and a bundled font. It therefore demonstrates both compact target use and the nonportable custom-font workaround already identified in EV-005. Its separate `NOTCH` component is not counted for band-stop.

## Convergence and divergence

| Record | Qualifying implementation groups after spike | Shared primitive | Preserved divergence |
| --- | --- | --- | --- |
| High-pass | Ableton EV-002; Image-Line EV-100; DSSSP EV-101 | Monotonic transition from attenuated low side to passing high side, without axes | Curvature, plateau length, stroke weight, and DSSSP continuation segmentation vary; `Low Cut` alias scope remains open. |
| Low-pass | Ableton EV-002; Image-Line EV-100; DSSSP EV-101 | Passing low side transitioning to attenuated high side, without axes | Curvature, plateau length, stroke weight, and DSSSP continuation segmentation vary; `High Cut` alias scope remains open. |
| Band-pass | Image-Line EV-100; DSSSP EV-101 | Centered passing region with both outer sides attenuated | Shoulder width, curvature, baseline/continuation treatment, and stroke weight vary. |
| Band-stop | Image-Line EV-100 only | Centered rejected region with both outer sides passing | No second qualifying band-stop implementation; Notch sources remain excluded unless they explicitly bind the broader band-stop concept. |

The pass, low-pass, and band-pass implementations converge at the primitive level required by the rubric without proving identical outlines or permission to copy any implementation. Axes, parameter values, slope/order, color, and interaction state remain excluded from semantic identity.

## Conservative reassessment recommendation

The new evidence supports the following mechanical score changes while leaving statuses unchanged:

| Record | Semantic | Usage | Text | Visual | Overlap | Provenance | Recommended total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| High-pass | 2 | 4 | 3 | 3 | 3 | 3 | 18/20 |
| Low-pass | 2 | 4 | 3 | 3 | 3 | 3 | 18/20 |
| Band-pass | 3 | 4 | 3 | 2 | 3 | 3 | 18/20 |
| Band-stop | 2 | 2 | 1 | 1 | 3 | 3 | 12/20 |

High-pass and low-pass remain ineligible for `registry-candidate` because semantic stability is below the required floor and the cut-name boundaries remain material. Band-stop remains below the total, semantic, text, and visual floors. Band-pass clears the numeric and dimension floors under this evidence pass, but this spike intentionally makes no status change; any lifecycle action must be separately recorded and reviewed under current governance.

## What this does not establish

- No source demonstrates portable Unicode use of these forms.
- No source authorizes copying or tracing its artwork.
- No source resolves `Low Cut`/high-pass or `High Cut`/low-pass as universally exact aliases.
- No DSSSP Notch observation is transferred to band-stop.
- Image-Line's product-local wording does not collapse band-stop and Notch across the intended corpus.
- The evidence does not establish Unicode suitability, external support, community endorsement, artwork acceptance, or release readiness.

## Agent Report - 2026-08-31T19:42:19-07:00

- Report status: completed.
- Scope: audited the four original assessment caps and performed a two-implementation target-use spike against EV-100 and EV-101.
- Direct evidence: official Image-Line documentation and image bytes observed through the ordinary public manual path; DSSSP source inspected at immutable commit `860b8918957668c07e1403c1658057bba3c200ec`.
- Independence: Image-Line counts once across EV-054/EV-100; DSSSP counts once across EV-005/EV-101; source URLs and derived analyses are not multiplied into publishers.
- Boundary protection: DSSSP Notch is excluded from band-stop; Image-Line's mixed wording is treated as product-local; D-011 and DA-004 remain unchanged.
- Rights boundary: no third-party page, screenshot, font, source file, outline, or artwork is stored in the repository, copied, traced, or claimed reusable.
- Result: recorded the mechanical 18/18/18/12 reassessment while retaining all four live `evidence-collecting` statuses and all existing semantics and aliases. Band-pass is candidate-eligible and recommended for that lifecycle status by the assessment, but this spike does not perform the status change.
- Validation: post-rebase `npm test` passed 111/111 tests; validation reported six records, six assessment sets, and 64 evidence sources at registry 0.2.3; Agent Report hygiene and `git diff --check` passed.
- Independent review: APPROVE at exact head `779ad90`. The adverse reviewer independently re-fetched the Image-Line image and reproduced its checksum, inspected DSSSP at the pinned commit, verified Ableton EV-002, confirmed source grouping and every score, checked derived hashes and SemVer, and found no blocker or required correction.
