# Shelf/shelving semantic disposition

## Decision target

This stage applies the independently reviewed DA-022 terminology finding to the
two live shelf records only. It moves the two complete shelving-filter phrases
from related terms into exact alias arrays and resolves those record questions
as bounded yes. It does not reassess either record or resolve isolated
recognition.

Decision authority is D-021. The live semantic mutation remains reversible,
internal, and inside the authorized six-concept repertoire. Exact-head
independent adverse review is required before merge.

## Applied aliases

The following complete phrases are exact aliases at response-class level:

- `low shelving filter` -> `asr:filter.low-shelf`
- `high shelving filter` -> `asr:filter.high-shelf`

Apple EV-190 and MathWorks EV-191 provide direct within-document mappings.
Steinberg EV-192 and immutable FFmpeg documentation EV-193 independently
corroborate the shelving-filter morphology. W3C EV-194 supports the underlying
parameterized lowShelf/highShelf taxonomy without independently proving the
morphology.

An exact alias identifies the same affected frequency side and plateau-to-
plateau shelf response class, independent of signed gain. It does not promise
equal gain sign or amount, plateau placement, slope, order, Q, resonance,
overshoot, phase, cutoff convention, topology, controls, parameterization,
algorithm, implementation, or glyph.

## Morphology and orthographic normalization

`Shelf` is the response-shape or filter-type noun. `Shelving` is a derived
modifier. The change between them is morphological, so the two full shelving-
filter phrases are recorded explicitly rather than inferred through punctuation
normalization.

After whole-label tokenization, lookup may fold ASCII case and normalize one
internal ASCII space or attributive hyphen. Those orthographic forms do not
multiply the alias array. Lookup must not infer concatenated or camel-case code
tokens merely by deleting separators, and must not infer an alias from a
substring or grammatical fragment.

`Low shelving` and `high shelving` remain related terms rather than exact
aliases. The side-less families `shelving filter` and `shelf filter` cannot
select one record.

## Adverse exclusions and product override

The following remain outside exact global aliases:

- `bass`, `treble`, and other broad region or tone-control terms;
- `lowpass` and `highpass`, including MathWorks EV-195's product-local shelf-
  side enums;
- `low-pass shelf filter` and `high-pass shelf filter`, including JUCE
  EV-196's collision-prone framework wording;
- plain `shelving filter`, plain `shelf filter`, and the shorter `low shelving`
  or `high shelving` fragments;
- `LS`, `HS`, `LSC`, `HSC`, and other unsupported abbreviations; and
- signed boost/cut names or controls.

Steinberg EV-197 preserves polarity- and topology-specific control behavior as
direct counterevidence to implementation equivalence. When product
documentation assigns a different, narrower, compound, polarity-specific, or
otherwise local operation, that documentation overrides generic alias lookup.

## Record-level disposition

| Record | Applied change | Preserved boundary |
| --- | --- | --- |
| `asr:filter.low-shelf` | Add exact alias `low shelving filter`; resolve the bounded alias question | `low shelving` remains related; isolated recognition remains open |
| `asr:filter.high-shelf` | Add exact alias `high shelving filter`; resolve the bounded alias question | `high shelving` remains related; isolated recognition remains open |

## Explicit non-actions

- Canonical names, identifiers, definitions, text fallbacks, and spoken labels
  are unchanged.
- The immutable current assessment remains 19/20 for each shelf and retains its
  historical terminology and isolated-recognition blockers. No score, result,
  eligibility, or lifecycle state changes in this stage.
- The isolated low-shelf/high-pass and high-shelf/low-pass recognition
  questions remain open in both live records and in the assessment.
- No SVG, artwork metadata, geometry lock, font, PUA mapping, schema, tooling,
  study operation, participant action, release, publication, outreach,
  submission, or external authority changes.
- Unicode remains `HOLD`.

## Agent Report - 2026-09-01T01:30:32-07:00

- Report status: substantive semantic disposition implemented and frozen for
  exact-head independent adverse review; no publication action is authorized.
- Scope: apply only DA-022's two full bounded shelving-filter aliases and leave
  isolated recognition untouched.
- Result: `low shelving filter` and `high shelving filter` are exact aliases at
  response-class level; shorter fragments and every adverse product or lexical
  collision remain excluded.
- Versioning: a live backwards-compatible alias addition is a pre-1.0 MINOR
  registry change, so registry/evidence advances from 0.3.4 to 0.4.0. Derived
  analyses advances sequentially from 0.2.19 to 0.2.20. Assessments, schema,
  tooling, and artwork versions remain unchanged.
- Protected boundaries: no assessment, score, status, canonical field, fallback,
  speech, isolated-recognition question, artwork, geometry, font, PUA, Unicode,
  release, outreach, submission, or external-posture change.
- Validation: all 119 tests pass; registry validation confirms six records,
  eight assessment sets, 124 evidence sources, registry 0.4.0, assessments
  0.3.4, schema 0.4.0, and tooling 0.8.0. Exact historical-synthesis digest,
  lifecycle-state equality, shelf protected-field equality, and unchanged
  assessment, artwork, schema, tooling, package, and lockfile trees were
  independently compared. Exact-head adverse review disposition follows.
- Independent adverse review - 2026-09-01T01:37:07-07:00: APPROVED exact
  substantive head `8fc5a70e9adbf38240339c363c6f26a8a695c265` with no blocker.
