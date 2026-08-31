# Prioritized next work

Status as of 2026-08-30T17:56:00-07:00, after work merged through PR #63. This queue covers all six live records and separates routine work from unresolved Human Review gates. It does not authorize status promotion, artwork lock or acceptance, participant recruitment, publication, outreach, or a standards submission.

## Current dependency map

| Lane | State | Dependency or next action |
| --- | --- | --- |
| Provisional shelf records | Completed in [PR #62](https://github.com/joshua-small/audio-synth-symbol-registry/pull/62) | Preserve six `evidence-collecting` records and D-017 boundaries. |
| Shelf overlap audit | Completed in [PR #63](https://github.com/joshua-small/audio-synth-symbol-registry/pull/63) | Carry EV-070 through EV-073 and DA-009 into the next assessment without presuming score movement. |
| Shelf text-friction search | In progress in [Issue #60](https://github.com/joshua-small/audio-synth-symbol-registry/issues/60) | Preserve negative and excluded findings; do not claim the threshold unless the record-specific evidence satisfies it. |
| Six-member draft artwork | Human Review blocked in [Issue #58](https://github.com/joshua-small/audio-synth-symbol-registry/issues/58) and draft [PR #61](https://github.com/joshua-small/audio-synth-symbol-registry/pull/61) | Await explicit geometry lock or revision; lock does not authorize study-ready status, recruitment, launch, acceptance, or publication. |
| Study-stimulus infrastructure | Routine infrastructure completed; umbrella [Issue #28](https://github.com/joshua-small/audio-synth-symbol-registry/issues/28) remains open | Preserve completed PR #31 and PR #46 work; remaining candidate and study actions follow the existing gates. |
| Monoline-linear artwork | Retained draft comparator in [PR #49](https://github.com/joshua-small/audio-synth-symbol-registry/pull/49) | Do not infer selection, rejection, or lock. |

## Active queue

### 1. Complete the shelf text-friction lane

Finish the bounded text-friction search with reproducible locators, explicit exclusions, direct-versus-derived evidence separation, and independent review. A negative text-friction result is valid and must not be upgraded to satisfy an attractive hypothesis.

Completion requires the lane to be based on the current six-record registry and merged shelf overlap evidence, pass the complete repository test suite, carry timestamped Agent Reports, and merge without changing semantics, aliases, identifiers, statuses, artwork, or external positions.

### 2. Reassess all six records after the evidence lanes merge

Create one immutable assessment snapshot against the resulting registry/evidence version. Apply the adopted rubric to `asr:filter.high-pass`, `asr:filter.low-pass`, `asr:filter.band-pass`, `asr:filter.band-stop`, `asr:filter.low-shelf`, and `asr:filter.high-shelf`; cite each new evidence disposition and compare it with the current snapshot.

This is mechanical assessment work only. Do not transfer notch evidence to band-stop, infer aliases from related terms, count derived analyses as independent evidence, or promote a record. If a score reaches a threshold, report the unmet floors and blockers and open a separate Human Review question only if promotion is actually recommended.

### 3. Exercise six-record interchange workflows

Extend repository-owned examples to cover a mix-note exchange, issue report, structured metadata, accessible output, and shelf/pass distinctions. Measure round-trip ID preservation, fallback behavior, verbosity, discoverability, unknown IDs, absent assets, speech/text mismatch, character count, and model-specific token count where reproducible.

Keep the resolver experimental and repository-local. Do not promise a stable payload, add PUA assignments, publish a font, deploy telemetry, or claim external adoption.

### 4. Prepare a blinded six-way study package after geometry lock

Once the owner explicitly locks the six geometries, bind the locked hashes to the existing opaque-token packaging and protocol inputs. If revisions are requested, implement, review, and obtain a later explicit lock before binding any revised hash. Verify shelf/pass negative controls and two-prong affected-side recognition without gain-sign priming.

Geometry lock is the dependency, not authorization for `study-ready`, recruitment, incentives, launch, artwork acceptance, or publication. Those remain separate gates.

### 5. Maintain adjacent-path research without outreach

Keep the registry as the shared semantic source for later AES, ISO/IEC, SMuFL, Unicode, font, emoji, and future-family decisions. Refresh mutable primary guidance only when a bounded internal decision needs it. Continue to treat Unicode as `HOLD` and emoji as out of the active path on current evidence.

No external contact, submission, endorsement request, fork publication, new semantic family, or project position is authorized by this lane.

## Completed or superseded queue items

- Four-record reassessment and evidence lifecycle: completed through PRs #47 and #62; the current six-record snapshot is authoritative.
- Recognition-study infrastructure: completed through PRs #31 and #40, with SVG validation/render QA completed in PR #46.
- Earlier representation, historical, terminology, vendor, education, journalism, and community spikes: incorporated through PRs #24, #42, #44, #47, and #51 through #54.
- Synergistic application mapping: completed in [PR #32](https://github.com/joshua-small/audio-synth-symbol-registry/pull/32); future external action remains gated.
- The obsolete four-record evidence-status [PR #15](https://github.com/joshua-small/audio-synth-symbol-registry/pull/15) was closed without merge as superseded by `docs/current-evidence-status.md`.

## Human Review boundaries

The summary below highlights project-specific gates and does not replace or narrow the complete gate list in [AGENTS.md](../AGENTS.md). Pause when work reaches any AGENTS.md gate, including:

- selecting, revising, or locking study geometry;
- marking artwork `study-ready` or `accepted`;
- authorizing participant recruitment, incentives, privacy/consent terms, study launch, or publication;
- changing scope, semantics, canonical names, aliases, identifiers, or record status;
- adopting an external position or contacting a standards body, vendor, font project, educator, journalist, or user community;
- publishing a release, declaring a protocol stable, or creating a compatibility promise.
- changing licensing, contributor agreements, copyright, trademarks, third-party reuse, governance, security boundaries, credentials, spending, destructive actions, or account access;
- resolving materially ambiguous, undocumented, contradicted, or unresolved behavior affecting semantics or interoperability.

After a gate is resolved, record the authorization and continue under D-014 until the next real gate.

## Agent Report - 2026-08-30T17:56:00-07:00

- Report status: in-progress
- Scope: replaced the post-PR-24 four-record queue with a six-record dependency map and current backlog.
- Evidence: reconciled `docs/current-evidence-status.md`, registry metadata 0.2.1, D-016, D-017, Issues #28 and #58 through #60, and PRs #15, #49, #61, #62, and #63.
- Hygiene: records PR #15 as superseded, preserves PR #49 as a retained draft comparator, preserves Issue #28 as the study-infrastructure umbrella, and leaves the shelf evidence and artwork lanes open at their actual dependencies.
- Limitations: this document does not complete the open research PRs, alter assessments, resolve geometry, or authorize any gated action.
- Validation: full repository tests, diff checks, and independent adverse review are required before merge.
