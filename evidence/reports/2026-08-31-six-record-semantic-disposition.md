# Six-record semantic disposition

## Decision target

This review applies the bounded semantic findings already established by DA-018,
DA-019, and DA-020 to the five affected live records. It does not reassess a
score, promote a lifecycle status, alter an identifier, accept artwork, change a
locked drawing, or authorize Unicode or other external work.

Decision authority is D-021. The change remains internal, reversible, and inside
the authorized six-concept repertoire. Exact-head independent adverse review is
required before merge.

## Pass and cut aliases

`low cut` remains an alias of `asr:filter.high-pass`, and `high cut` remains an
alias of `asr:filter.low-pass`, only when the phrase names an audio EQ or filter
type or control with the corresponding one-sided response class.

The aliases identify the passed and attenuated sides. They do not assert equal
order, slope, rolloff, Q, resonance, phase behavior, cutoff convention,
parameters, presets, algorithms, or product features. Product documentation
overrides the registry alias when it explicitly assigns another behavior.

Arbitrary phrases do not transfer. Examples excluded from alias lookup include
`cut the lows`, `cut the highs`, `low-frequency cut`, `high-frequency cut`,
`low cut amount`, and `low cut-off frequency`. Such phrases may describe a
shelf, bell, damping or gain control, cutoff value, or a nonclassic operation.

Case differences and an ASCII space versus hyphen are orthographic variants
after whole-label tokenization. They are not additional aliases. Normalization
must not collapse `low cutoff` into `low cut` or infer an alias from a substring.

This bounded rule resolves each record's open alias question without changing
the existing alias arrays, canonical names, definitions, fallbacks, or speech
labels. EV-160 through EV-166 support the rule; Apple EV-161 and Steinberg
HALion EV-162 are retained as direct adverse boundaries.

## Band-stop and Notch

`Band-stop`/`Band-reject` remains the broad rejected-band response class.
`Notch` remains a context-dependent related term, commonly a narrow or high-Q
member but sometimes an exact product, API, standards, or teaching synonym.
No portable numeric Q or bandwidth boundary is asserted.

Notch is not an unconditional alias. A Notch-only source supplies no Band-stop
glyph, implementation, or usage evidence unless that source itself explicitly
maps or contrasts the terms. When it does, only the mapped or contrasted claim
transfers. Unrelated Notch evidence remains excluded.

This controlled-polysemy rule resolves the former universal-equivalence question
without erasing the contradictory terminology documented by EV-180 through
EV-189 and existing EV-026 through EV-032, EV-120, EV-130, EV-150, and EV-151.
It changes neither the canonical name nor the existing related-term treatment.

## Shelf topology and affected side

Apple EV-170, Ableton EV-171, and Avid EV-172 independently establish a mirrored,
axis-free, sign-agnostic two-prong shelf-selector topology. Low shelf forks on
the low-frequency left side and converges toward the unaffected right side. High
shelf forks on the high-frequency right side and converges toward the unaffected
left side. Signed gain is a separate parameter.

Affected-side orientation is semantic. Arbitrary rotation or mirroring that
changes which frequency side forks is not an equivalent rendering.

This resolves the question of whether the topology and affected-side orientation
exist outside the project. It does not establish the exact locked path,
proportions, curvature, whitespace, line weight, endpoints, slope, color,
parameter values, interaction state, or a reusable standard master. The locked
SVG bytes remain unchanged and project-authored.

EV-173 and EV-174 preserve a polarity-specific alternative lineage. EV-175 and
EV-176 remain excluded from exact-form counting because their pinned static
captures do not map a visible shelf state. The convention is convergent, not
universal.

The following material questions remain open for both shelf records:

- whether `low/high shelving filter` should become an exact alias rather than a
  related term; and
- whether isolated use reliably distinguishes each shelf from the adjacent pass
  response in the six-member family.

The shelf-specific Unicode and adjacent-standard overlap question is already
resolved by DA-009. Resolving that stale record question does not change the
Unicode `HOLD` position.

## Record-level disposition

| Record | Applied semantic change | Preserved boundary |
| --- | --- | --- |
| `asr:filter.high-pass` | Resolve `low cut` as a bounded response-class alias | No implementation or arbitrary-phrase equivalence |
| `asr:filter.low-pass` | Resolve `high cut` as a bounded response-class alias | No implementation or arbitrary-phrase equivalence |
| `asr:filter.band-stop` | Resolve Notch conflict through controlled polysemy | Notch remains related-only and non-transferable by default |
| `asr:filter.low-shelf` | Resolve cross-vendor topology, left-side orientation, and overlap question | Shelving alias and isolated recognition remain open |
| `asr:filter.high-shelf` | Resolve cross-vendor topology, right-side orientation, and overlap question | Shelving alias and isolated recognition remain open |

Band-pass requires no semantic mutation.

## Explicit non-actions

- No current assessment is changed. Its recorded scores and blockers remain an
  immutable historical snapshot until a separate mechanical reassessment.
- No record status is promoted or demoted.
- No alias is added or removed.
- No canonical name, definition, fallback, speech label, schema, tooling,
  identifier, or Unicode field changes.
- No SVG, font, artwork metadata, lock manifest, study material, or visible
  geometry changes.
- No release, publication, outreach, submission, participant activity, or
  external authority is implied.

## Agent Report - 2026-08-31T22:23:49-07:00

- Report status: substantive implementation complete; exact-head independent
  adverse review and CI remain pending.
- Scope: apply DA-018, DA-019, and DA-020 to bounded record semantics without
  reassessment or lifecycle movement.
- Evidence: EV-160 through EV-176 and EV-180 through EV-189, with the adverse and
  earlier inputs pinned by the three source analyses.
- Result: inverse cut aliases are response-class aliases only; Notch is
  controlled related-term polysemy; the shelf two-prong topology and affected-side
  orientation are independently established while exact form and isolated
  recognition remain unresolved.
- Versions: registry 0.3.0 and derived analyses 0.2.15; assessments remain 0.3.3,
  schema 0.4.0, tooling 0.8.0, and artwork unpublished.
- Boundaries: Unicode remains `HOLD`; no status, score, alias-array, artwork,
  geometry, font, study, release, outreach, or external-position change.
- Validation: `npm test` passed 117/117 after validating six records, seven
  assessment sets, 106 evidence sources, registry 0.3.0, assessments 0.3.3,
  schema 0.4.0, tooling 0.8.0, every registered derived digest, documentation
  drift, and Agent Report hygiene. `git diff --check` passed.

## Agent Report - 2026-08-31T22:37:23-07:00

- Report status: approved for publication and merge after approval-only annotation.
- Independent adverse review: APPROVE on exact corrected head
  `97971f8d804c0169a7dffedb38c2a2db1979a561`, based on original main
  `cf711c1e147dced320ff8df47c5fc108b72d45b6`.
- Corrections verified: affected-side orientation is semantic and arbitrary
  rotation or mirroring that changes the forked side is non-equivalent; explicit
  nonclassic product documentation overrides pass/cut alias lookup.
- Protected boundaries: immutable DA-019, assessments, statuses, alias arrays,
  canonical fields, Unicode fields, artwork, schema, and tooling remain unchanged.
- Annotation boundary: this section and the matching current-status annotation
  are review metadata only; registered DA-021 and DA-006 hashes are reconciled
  afterward. No substantive record or decision text changes.
