# Band-pass Registry-candidate Readiness Package

Status as of 2026-08-31T20:04:33-07:00. This package evaluates the existing
`asr:filter.band-pass` record against the internal `registry-candidate` gate. It
does not change the live record, its provisional identifier, semantics, aliases,
fallback, artwork, Unicode position, or external status.

## Decision boundary

D-021 explicitly delegates `registry-candidate` promotion within the authorized
six-concept repertoire to agents after documented independent review and passing
checks. Candidate status is therefore internally delegable. It remains a
reversible research status: the identifier stays provisional, artwork stays
draft and noncanonical, and no external action follows.

This package intentionally stops short of promotion. It is a reviewable input to
a later lifecycle change and avoids coupling readiness documentation to a live
status mutation. Promotion is safe only if an independent reviewer reproduces
the checks below at the exact proposed head and finds no material ambiguity.

## Frozen record identity

The package evaluates the record exactly as it exists on repository main at
`98f19566329a6f81eb22f6a0abf1f2cfe4b4e9dd`:

| Field | Evaluated value |
| --- | --- |
| Provisional ID | `asr:filter.band-pass` |
| Canonical name | `Band-pass filter` |
| Definition | Passes a bounded band and attenuates frequencies below and above it |
| Aliases | `band pass`, `BPF` |
| Text fallback | `BPF` |
| Spoken label | `band-pass filter` |
| Representation concept | `axis-less-band-pass-response` |
| Live status | `evidence-collecting` |

No bandwidth, slope, order, center frequency, axes, parameter values, color,
interaction state, shoulder width, curvature, continuation treatment, or exact
outline is semantic identity.

## Rubric reproduction

The current immutable assessment is
`registry/assessments/registry-0.2.3-2026-08-31.json`, assessment version 0.2.0,
assessed at `2026-08-31T20:00:03-07:00`.

| Dimension | Score | Candidate floor | Reproduced basis |
| --- | ---: | ---: | --- |
| Semantic stability | 3 | 3 | Independent education, vendor, manufacturer-education, and historical sources consistently define the same bounded pass-band response. No material semantic conflict is recorded. |
| Independent usage | 4 | 2 | EV-100 and EV-101 are two independent direct axis-less target implementations. The wider corpus exceeds five independent groups across education, products, manufacturer education, and historical documentation. |
| Text fallback and accessibility | 3 | 2 | `Band-pass filter` and `BPF` occur unambiguously outside a single product UI, supporting visible fallback and speech output without requiring a glyph. |
| Visual convergence | 2 | 2 | EV-100 and EV-101 converge on a centered passing region with both outer sides attenuated while differing in nonsemantic geometry. |
| Standards and Unicode overlap | 3 | 2 | DA-005 covers semantic candidates, visual confusables, sequences, adjacent standards, and explicit non-equivalence dispositions. |
| Legal provenance | 3 | 2 | Every cited source has a rights note; no third-party artwork is imported, copied, traced, or claimed as reusable; no reference artwork is published. |
| **Total** | **18/20** | **13/20** | All numeric and per-dimension floors pass. |

The assessment contains no hard blocker and no material open question. Its
arithmetic is `3 + 4 + 3 + 2 + 3 + 3 = 18`.

## Source-independence map

Source count is by independently authored implementation or publication group,
not by URL, page, revisit, or derived report.

| Independence group | Evidence | What it supports | Counting constraint |
| --- | --- | --- | --- |
| Image-Line | EV-100 | Direct compact axis-less band-pass selector; order is separate state | One implementation group; not multiplied by other Image-Line pages |
| DSSSP / NumberOneBot | EV-101 | Direct custom-font and PUA band-pass component at an immutable commit | One implementation group; EV-005 is the same project family and is not an additional implementation |
| Simon Fraser University | EV-003 | Stable educational semantics and terminology | Not counted as target artwork use |
| Ableton | EV-006 | Product representation context | Contextual selector evidence, not a qualifying standalone axis-less target implementation |
| FabFilter | EV-007 | Product representation context | Contextual control/graph evidence only |
| Native Instruments | EV-008 | Vendor terminology and category stability | Textual/category corroboration only |
| Yamaha | EV-009 and EV-018 | Current and manufacturer-education/historical treatment | One organizational group for conservative independence counting |
| Noise Engineering | EV-013 | Manufacturer-education semantics and graphs | Contextual teaching graph, not target artwork use |
| Roland | EV-036 | Independent historical embedded display and `BPF` support | Embedded context; not a qualifying standalone target use |
| Unicode Consortium | EV-037 and EV-038 | Code-chart and security/confusable audit inputs | One standards-body group; not usage evidence |
| IEC | EV-004 and EV-039 | Adjacent-standard audit and exclusions | One standards-body group; circuit symbols are not target glyphs |

DA-002, DA-003, DA-005, and DA-012 are project-authored derived analyses. They
organize and constrain their pinned ledger inputs but are never counted as new
independent sources.

## Adverse cases and dispositions

| Adverse case | Disposition | Remaining effect |
| --- | --- | --- |
| Earlier samples showed selectors, graphs, abbreviations, and embedded displays rather than a standalone target glyph | EV-100 and EV-101 resolve target existence; the heterogeneous earlier evidence remains visible | Nonmaterial limitation; it prevents claiming one mandatory industry outline |
| `U+2229 INTERSECTION` and arc-like characters can resemble a band-pass hump | Semantic non-equivalence is documented by DA-005 | Do not substitute a mathematical or arc character for the record |
| IEC circuit symbols describe circuit functions rather than the target compact response glyph | Classified as adjacent, non-equivalent notation | Do not copy IEC artwork or claim IEC standardization of this glyph |
| DSSSP uses a custom font and Private Use Area code point | Counts as implementation and workaround evidence, not portable Unicode interchange | Do not treat the PUA assignment as interoperable or normative |
| Only two qualifying target implementations establish convergence | Enough for visual score 2, not score 3 | A third independent implementation would strengthen acceptance evidence but is not a candidate blocker |
| Original compact-a artwork is project research geometry | It may be linked only under the separate draft/study rules | It is not evidence of prior adoption and is not accepted or canonical artwork |
| Plain-text friction has not established three independent record-specific cases | The formal Unicode non-go remains active | Candidate status must not be represented as Unicode proposal readiness |
| Human recognition has not been established with real participants | Internal synthetic validation cannot establish comprehension | No recognition, adoption, or usability claim may be made |

No adverse case changes the stable semantic boundary between passing a bounded
band and attenuating both outer regions. No evidence is borrowed from Notch or
band-stop.

## Interoperability and accessibility checks

The record remains useful without a rendered glyph:

- `asr:filter.band-pass` resolves as the canonical machine identifier.
- `BPF` is the visible text fallback and survives missing-asset workflows.
- `band-pass filter` is the speech label in accessible output.
- The issue-report workflow preserves the ID and expected fallback when an asset
  is missing.
- Schema validation enforces the existing identifier, status vocabulary, and
  `axis-less-band-pass-response` representation concept.
- Artwork linkage is separate from semantic interchange; no artwork byte, hash,
  status, or canonical mapping is changed by this package.

The exercised examples are `examples/interchange-workflows/accessible-output.json`
and `examples/interchange-workflows/issue-report.json`; the registry-driven
prototype is documented in `docs/interchange-prototype.md` and
`docs/interchange-workflow-exercise.md`.

## Candidate-readiness conclusion

The existing record is internally ready for `registry-candidate`:

- all rubric floors pass;
- total score is 18/20;
- no hard blocker or material question is open;
- target-use independence is conservatively counted;
- adverse evidence and limitations remain visible;
- text and speech interoperability work without artwork; and
- D-021 makes candidate promotion delegable after exact-head independent review.

This conclusion does not itself promote the record. A subsequent focused change
may alter only the record's live status and necessary current-status/version
metadata after independent review. It must not alter identity, semantics,
aliases, fallback, artwork, or the external position.

## Remaining limitations

- Two implementations establish primitive convergence, not universal adoption
  or a mandatory contour.
- No portable glyph character exists, and project artwork cannot prove external
  usage.
- Candidate status does not satisfy the formal Unicode non-go conditions.
- Candidate status does not make the provisional identifier permanent.
- No public review period is recorded.
- No external community support, endorsement, submission, or standards-body
  position is claimed.
- No real-participant recognition evidence exists.
- No artwork is accepted, canonical, or published.

## Proposed batched owner decision

Defer the permanent-identifier question until Joshua reviews the complete
external submission package. Present one consolidated Human Review item:

> Approve the complete external submission package, including promotion of
> `asr:filter.band-pass` to `registry-accepted`; thereby make that identifier
> permanent; confirm its canonical name, definition, aliases, `BPF` fallback,
> spoken label, and separation from band-stop; approve the specifically presented
> reference artwork if included; and authorize the specifically named external
> submission or outreach action.

Recommendation: approve that batched item only after every `registry-accepted`
floor, the required public-review period, the complete submission review,
artwork acceptance review, legal/provenance checks, and the proposed external
action are each satisfied and explicitly shown. Until then, preserve the HOLD on
formal Unicode submission and all external action.

Alternatives at that review are to approve the registry identity but withhold
artwork or external action; request revisions; or retain the provisional
candidate. These alternatives must remain independently selectable so approval
of semantic identity never silently accepts artwork or authorizes outreach.

## Agent Report - 2026-08-31T20:04:33-07:00

- Report status: completed; no lifecycle mutation performed.
- Scope: reproduce `registry-candidate` readiness for
  `asr:filter.band-pass` against exact main `98f1956`.
- Evidence: EV-003, EV-004, EV-006 through EV-009, EV-013, EV-018, EV-036 through
  EV-039, EV-100, and EV-101; DA-002, DA-003, DA-005, and DA-012 are derived
  constraints, not independent sources.
- Result: 18/20; every candidate floor passes; zero hard blockers and zero
  material open questions in the current assessment.
- Governance: D-021 delegates candidate promotion after independent review, but
  this package intentionally leaves the live status unchanged.
- Limitations: no identity, semantic, alias, fallback, artwork, study,
  registry-accepted, outreach, release, submission, or external-position change.
- Validation: `npm test` passed 112/112 tests and `git diff --check` passed.
- Independent review: APPROVE at exact content head `657558d` after the sole
  initial blank-line-at-EOF blocker was corrected. The reviewer independently
  reproduced the 18/20 arithmetic, every floor, zero blockers/questions, source
  grouping, adverse cases, interoperability, governance boundary, and unchanged
  live status. This report-only update introduces no new readiness claim.
