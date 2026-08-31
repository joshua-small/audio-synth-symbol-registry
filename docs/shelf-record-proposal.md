# Provisional Shelf Record Proposal

## Decision boundary

The project has approved low shelf and high shelf as sign-agnostic provisional research concepts. This document asks whether the evidence is sufficient to create two `evidence-collecting` registry records. It does not create those records, adopt identifiers, accept artwork, launch a study, change an existing record, or authorize an external claim.

The proposed records would document semantics and accessible interchange while the visual convention remains under study. Their identifiers would remain provisional until `registry-accepted` under D-009.

## Recommended record contract

| Field | Low-shelf proposal | High-shelf proposal |
| --- | --- | --- |
| Candidate provisional ID | `asr:filter.low-shelf` | `asr:filter.high-shelf` |
| Canonical name | `Low-shelf filter` | `High-shelf filter` |
| Category | `filter-response` | `filter-response` |
| Definition | A filter response that applies a signed gain difference to the low-frequency side of a transition region relative to the high-frequency side, with both sides approaching plateaus. | A filter response that applies a signed gain difference to the high-frequency side of a transition region relative to the low-frequency side, with both sides approaching plateaus. |
| Text fallback | `LOW SHELF` | `HIGH SHELF` |
| Spoken label | `low-shelf filter` | `high-shelf filter` |
| Representative glyph concept | `sign-agnostic-low-shelf-side` | `sign-agnostic-high-shelf-side` |
| Axis-bearing form | `illustrative-only` | `illustrative-only` |
| Initial status, if authorized | `evidence-collecting` | `evidence-collecting` |

### Why these definitions

The words `signed gain difference` preserve both boost and attenuation. `Relative to` avoids declaring either plateau to be zero dB. `Both sides approaching plateaus` separates a shelf response from a pass/cut response without specifying exact gain, slope, Q, overshoot, order, cutoff convention, or implementation.

The definitions describe the ideal semantic nucleus, not every product algorithm. Ableton's Channel EQ documents a high control that combines shelving and low-pass behavior under attenuation (EV-050). That hybrid is evidence that a product label may express user intent more broadly than a pure transfer-function family; it must not silently broaden the registry definition.

## Naming and terminology disposition

### Canonical names

Recommend `Low-shelf filter` and `High-shelf filter`.

- Current DAW and plug-in documentation repeatedly uses `Low Shelf` and `High Shelf` (EV-050, EV-052, EV-053, EV-054).
- Apple uses `low shelving filter` and `high shelving filter` (EV-051).
- W3C uses machine tokens `lowshelf` and `highshelf` (EV-057).
- Historical, educational, and trade sources use both `shelf` and `shelving` constructions (EV-060 through EV-064).

`Shelf` is the more compact and recurrent type label. Adding `filter` matches the existing registry's canonical and spoken naming pattern. The hyphen follows `High-pass filter`, `Low-pass filter`, and `Band-pass filter` as a compound modifier; it is orthographic presentation, not a semantic distinction.

### Text fallbacks

Recommend the full schema-compatible ASCII fallbacks `LOW SHELF` and `HIGH SHELF`, not `LS`, `HS`, `LSF`, or `HSF`.

The full terms are directly and independently used in product documentation, education, trade media, and community prose. The source set does not establish any abbreviation as a portable, unambiguous shelf-filter shorthand. In particular, `LS` and `HS` have broad unrelated expansions, while hardware commonly uses `LOW`, `HI`, `LO`, `H.F.`, or `L.F.` without proving equivalence to the proposed abstract records (EV-055, EV-056).

### Alias and related-term policy

If records are created, recommend an empty `aliases` array initially. Use the schema's `related_terms` field for `low shelving filter` / `low shelving` and `high shelving filter` / `high shelving`, respectively, without asserting that they are exact aliases. Keep exact-alias treatment as an open question:

| Term | Proposed disposition | Reason |
| --- | --- | --- |
| `low shelving filter` / `high shelving filter` | `related_terms`; exact-alias question open | Strong semantic correspondence, but canonical alias treatment has not received a dedicated corpus review. |
| `low shelving` / `high shelving` | `related_terms` | Often describes response or operation rather than serving as a standalone type name. |
| `bass shelf` / `treble shelf` | Do not adopt | Not established across the reviewed corpus and may imply musical bands rather than affected frequency side. |
| `LOW`, `LO`, `HI`, `L.F.`, `H.F.` | Product-context labels only | These can identify bands or controls without establishing portable aliases for shelf filters. |
| `LS`, `HS`, `LSF`, `HSF` | Do not adopt | Portable and unambiguous use is not established. |
| `low cut` / `high cut` | Explicitly not aliases | They ordinarily map toward high-pass / low-pass terminology and collide with the existing pass records. |
| `bass cut`, `bass boost`, `treble cut`, `treble boost` | Operations or parameterized states, not aliases | They add gain polarity and may describe controls with implementation-specific behavior. |

## Gain-sign and response-shape exclusions

Both proposed records must explicitly exclude all of the following from semantic identity:

- boost versus attenuation;
- gain sign and gain amount;
- which plateau is drawn above or below a baseline;
- zero-dB placement and vertical translation;
- exact transition frequency or cutoff convention;
- exact slope, order, bandwidth, Q, resonance, overshoot, or undershoot;
- static versus dynamic behavior;
- implementation algorithm, topology, or hybrid product behavior;
- axes, labels, color, handles, analyzer traces, selection state, and other UI context.

A positive-gain or negative-gain response may be an illustrative state of a shelf record. It is not a separate alias, first-class record, or neutral definition. A flat zero-gain response is a valid parameter state but does not visually identify the selected type.

The approved two-prong fork candidate is a study treatment for affected side. It is not part of this proposed record contract and would remain unaccepted artwork.

The proposed `representative_glyph_concept` strings are not yet members of the filter-response schema enum. Record creation therefore also requires a backwards-compatible enum extension adding `sign-agnostic-low-shelf-side` and `sign-agnostic-high-shelf-side`. That mechanical schema extension would permit the records to validate; it would not select, accept, or publish the two-prong artwork. This proposal changes no schema itself.

## Collision analysis

### Low shelf versus low cut / high pass

These concepts affect an overlapping frequency side but do not have overlapping registry semantics:

- A low shelf applies a finite signed level difference and approaches plateaus on both sides of a transition.
- A high-pass filter attenuates the low-frequency side while passing the high-frequency side; the pass record does not define a finite low-side shelf plateau.
- `Low cut` is already an unresolved possible alias of `high-pass filter`. Assigning it to low shelf would create a direct naming collision and contradict practitioner discussion that treats low shelf and high pass as different choices (EV-065).

A low-shelf attenuation can serve a similar production goal to a gentle low cut, and extreme or hybrid implementations can reduce the acoustic distinction. Similar use does not make the filter types aliases.

### High shelf versus high cut / low pass

The mirror distinction applies:

- A high shelf applies a finite signed level difference and approaches plateaus on both sides.
- A low-pass filter attenuates the high-frequency side while passing the low-frequency side; the pass record does not define a finite high-side shelf plateau.
- `High cut` remains associated with the existing low-pass alias question and must not become a high-shelf alias.

### Adversarial naming outcomes

| Candidate wording | Failure mode | Disposition |
| --- | --- | --- |
| `Low-frequency shelf` | May sound like a physical shelf or an exact spectral band; less common in the reviewed type labels. | Reject as canonical name. |
| `Bass shelf` | Can collapse affected side into a culturally variable bass range. | Reject as canonical name and alias. |
| `Low shelving EQ` | Describes an EQ operation or band and weakens consistency with filter records. | Retain only as a possible related term. |
| `Low-cut shelf` | Conflates pass/cut and shelf semantics. | Reject. |
| `Shelf low` / `filter.shelf-low` | Machine-friendly but reverses ordinary English naming. | Reject unless an implementation constraint later requires it. |
| `Low shelf boost/cut` | Encodes gain state into the base name. | Reject for the sign-agnostic record. |

## Candidate provisional identifier options

| Option | Low | High | Assessment |
| --- | --- | --- | --- |
| A | `asr:filter.low-shelf` | `asr:filter.high-shelf` | Recommended. Mirrors ordinary names and the existing `filter.high-pass` pattern. |
| B | `asr:filter.low-shelving` | `asr:filter.high-shelving` | Semantically defensible but less consistent with the dominant product type labels and more awkward as a noun. |
| C | `asr:filter.shelf-low` | `asr:filter.shelf-high` | Groups the pair lexically, but reverses natural language and diverges from existing IDs. |
| D | `asr:eq.low-shelf` | `asr:eq.high-shelf` | Too narrow: shelves are filter responses used beyond a product category named EQ. It would also create a new top-level namespace distinction without need. |

Option A is the only recommended option. The ID segment must not include `boost`, `cut`, `positive`, `negative`, `bass`, `treble`, or an abbreviation.

## Evidence mapping for hypothetical records

The same source set supports both records unless a claim says otherwise.

| Proposed claim | Evidence | What it proves | What it does not prove |
| --- | --- | --- | --- |
| Low/high side remains semantic across gain sign | EV-050 through EV-057; EV-060, EV-061, EV-063, EV-064 | Independent product, implementation, historical, education, and media convergence on side-plus-signed-gain semantics | A canonical glyph, portable character, or exact alias set |
| Canonical full names are established | EV-050 through EV-054; EV-057; EV-060, EV-062, EV-063, EV-065 | Recurrent `low shelf` / `high shelf` terminology in multiple sectors | Universal abbreviations or a settled `shelf` versus `shelving` alias policy |
| Full text fallbacks work outside one product UI | EV-062, EV-063, EV-064, EV-065 | Independent education, trade-media, and community prose uses the names meaningfully | Demand for a new encoded character |
| Compact type selection is implemented | EV-052, EV-054 | Two independent products document compact shape selectors for shelf types | Shared geometry, axis independence, reuse rights, or standalone recognition |
| Contextual and nonvisual alternatives remain common | EV-050, EV-051, EV-053, EV-055, EV-056, EV-060 through EV-065 | Products and people can communicate through labels, controls, graphs, parameters, and prose | That compact glyphs are useless or cannot improve terse interchange |
| Shelf/pass confusion is real and resolvable in prose | EV-065 | Practitioners explicitly distinguish low shelf from high pass by operation and response | A universal visual separation or a threshold between them |
| Curve orientation alone is ambiguous | EV-064, supported by EV-050 through EV-057 and EV-060, EV-061, EV-063 | Gain sign and affected side are separate; contextual curves can reverse orientation | Recognition performance of the project's two-prong fork candidate |

## Conservative hypothetical acceptance assessment

This is a planning estimate, not an immutable assessment and not a status action. Both proposed records receive the same estimate.

| Dimension | Score | Basis and limitation |
| --- | ---: | --- |
| Semantic stability and scope | 3/4 | The sign-agnostic affected-side definition, names, fallbacks, exclusions, and shelf/pass separation are strongly source-supported. Score 4 is withheld pending independent adverse review of live records and resolution of `shelf` versus `shelving` alias treatment. |
| Independent usage evidence | 4/4 | At least five independent sources span vendor documentation, implementation/standards, education, trade media, historical documentation, and community use, with multiple independent implemented uses. |
| Text fallback and accessibility | 3/3 | Full names are used unambiguously in non-UI education, trade-media, and community prose. Unsupported abbreviations are excluded. |
| Visual convergence and divergence | 1/3 | EV-052 and EV-054 establish compact selectors, but the retained evidence does not establish convergence on one independently reproducible target primitive. Contextual and axis-bearing forms are not substitutes. |
| Existing-standard and Unicode overlap audit | 0/3 | The existing overlap audit covers the original four records, not the shelf pair. A shelf-specific reproducible audit is required. |
| Legal provenance for reference artwork | 3/3 | Source rights are recorded, no third-party artwork is imported, and this proposal publishes or claims no reference artwork. |
| **Total** | **14/20** | Numerically above 13, but dimension floors and material questions prevent `registry-candidate`. |

### Initial blockers and open questions

The records would be eligible only for `evidence-collecting`. They must not be promoted while any of these remain:

1. No shelf-specific Unicode, character-sequence, visual-confusable, and adjacent-standard overlap audit exists.
2. Cross-vendor convergence on a target compact primitive is not established.
3. Six-way recognition and shelf/pass confusability have not been tested.
4. The two-prong fork is original study geometry, not evidence that an established portable target representation exists.
5. `Low shelving filter` and `high shelving filter` have not been dispositioned as exact aliases versus related terms through dedicated review.
6. No sampled source establishes `LS`, `HS`, `LSF`, or `HSF` as portable fallbacks.
7. No sampled source uses a shelf glyph in ordinary portable plain text; the formal Unicode non-go condition therefore remains active.
8. Hybrid and extreme product responses require a maintained boundary between the ideal shelf definition and product control labels.

Recommended record-level open questions:

- Does a dedicated terminology review support `low shelving filter` / `high shelving filter` as exact aliases?
- Do at least two independent compact implementations converge on a sign-agnostic affected-side primitive that can be documented without copying artwork?
- Can participants distinguish low shelf, high shelf, high pass, low pass, band pass, and band stop without gain-sign priming?
- Which Unicode characters, sequences, technical symbols, and adjacent-standard terms are semantic or visual confusables for each shelf concept?
- Is there independently authored evidence of shelf-glyph use in portable text, improvised drawings, screenshots required by text limitations, or custom fonts?
- How should hybrid product controls be classified when their response changes family with gain sign?

## Recommendation

Authorize creation of two provisional `evidence-collecting` records using Option A and the exact contract above, plus the backwards-compatible enum extension required for their proposed representation concepts. This is warranted because the semantic and accessible text layers are mature enough to document, while `evidence-collecting` is expressly designed to preserve unresolved visual, overlap, and interchange questions.

Do not adopt abbreviations, signed shelf records, accepted artwork, `registry-candidate` status, or any Unicode position. After record creation, run a shelf-specific overlap audit and a six-way recognition pilot as separate work, each under its existing gates.

## Human Review

### HR-001: Create provisional low-shelf and high-shelf records

- **Decision needed:** Should the project create two `evidence-collecting` records using IDs `asr:filter.low-shelf` and `asr:filter.high-shelf`, canonical names `Low-shelf filter` and `High-shelf filter`, schema-compatible full text fallbacks `LOW SHELF` and `HIGH SHELF`, spoken labels `low-shelf filter` and `high-shelf filter`, and the sign-agnostic definitions and exclusions in this document? This includes adding the two proposed `representative_glyph_concept` strings to the filter-response schema enum as a backwards-compatible extension.
- **Recommendation:** Approve.
- **Approve:** Authorizes the two records, their initial evidence mappings, and only the enum extension required for validation. IDs remain provisional; aliases remain empty; no artwork or status promotion is authorized.
- **Revise:** Specify changes to the ID, canonical name, fallback, speech label, definition, exclusions, or evidence mapping before record creation.
- **Defer:** Keep the concepts in research scope without registry records until a named missing evidence class is completed.
- **Reject:** Retain the evidence but do not create shelf records.
- **Merge status:** This proposal may merge as a review document, but record creation is blocked pending authorization.

### HR-002: Initial alias restraint

- **Decision needed:** Should the initial records keep `aliases` empty, place the applicable `low/high shelving filter` and `low/high shelving` forms in `related_terms`, keep exact-alias treatment open, and explicitly reject `low cut`, `high cut`, `LS`, `HS`, `LSF`, and `HSF` as initial aliases?
- **Recommendation:** Approve. It preserves evidence-backed names without creating ambiguity or colliding with the pass records.
- **Approve:** Uses the conservative terminology disposition above.
- **Revise:** Name an alias to adopt and the evidence basis for exact semantic equivalence.
- **Merge status:** Record creation is blocked pending authorization; the proposal itself may merge.

## Agent Report - 2026-08-30T16:06:43-07:00

- Report status: completed
- Scope: next-gate proposal for possible provisional low-shelf and high-shelf `evidence-collecting` records following approval of the six-concept research scope.
- Evidence: EV-050 through EV-057 and EV-060 through EV-065, plus the merged shelf semantic-model, vendor-semantics, history/education/community, and scope-decision analyses.
- Recommendation: create two sign-agnostic records with Option A IDs and full-name text fallbacks; adopt no abbreviations or gain-polarity aliases.
- Adverse findings preserved: shelf/pass naming collisions, curve-orientation ambiguity, hybrid product behavior, absent portable glyph interchange, absent shelf-specific overlap audit, and unproven cross-vendor compact-primitive convergence.
- Deliberate omissions: no record, ID, alias, assessment, schema, status, artwork, study, or external-position change. The proposal identifies a future backwards-compatible enum extension as a prerequisite if HR-001 is approved.
- Validation: `npm test` passed 84/84 tests; `git diff --check` passed.
- Independent review: first pass REQUEST CHANGES because lowercase fallbacks and the proposed glyph-concept enum values could not validate under the current schema. The proposal was corrected to use `LOW SHELF` / `HIGH SHELF`, to use the existing `related_terms` field, and to place the narrow backwards-compatible enum extension inside HR-001. Re-review APPROVED with no substantive blockers.
