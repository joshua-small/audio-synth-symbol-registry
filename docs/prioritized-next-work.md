# Prioritized next work

Status as of 2026-08-31T19:27:18-07:00, after the post-evidence six-record reassessment and D-021 standing delegation. This queue covers all six live records and separates agent-reviewed internal work from reserved Human Review gates. It does not authorize `registry-accepted` promotion, artwork acceptance, participant recruitment, publication, outreach, or a standards submission.

The current queue is aligned with registry metadata 0.2.2.

## Current dependency map

| Lane | State | Dependency or next action |
| --- | --- | --- |
| Provisional shelf records | Completed in [PR #62](https://github.com/joshua-small/audio-synth-symbol-registry/pull/62) | Preserve six `evidence-collecting` records and D-017 boundaries. |
| Shelf overlap audit | Completed in [PR #63](https://github.com/joshua-small/audio-synth-symbol-registry/pull/63) | Carry EV-070 through EV-073 and DA-009 into the next assessment without presuming score movement. |
| Shelf text-friction search | Completed in PR #66 | DA-010 preserves negative and excluded findings; both record-specific safeguards remain open. |
| Six-record reassessment | Completed in Issue #64 | Preserve the 17/20 shelf diagnostics and all six `evidence-collecting` statuses until new evidence warrants another assessment. |
| Six-member draft artwork | Geometry lock approved in [PR #61](https://github.com/joshua-small/audio-synth-symbol-registry/pull/61) | Preserve the exact lock-manifest hashes; internal `study-ready` evaluation proceeds through independent agent review, while any visible design change and all operational actions remain gated. |
| Study-stimulus infrastructure | Construction validation completed in [PR #74](https://github.com/joshua-small/audio-synth-symbol-registry/pull/74) | Build and validate the D-022 private offline synthetic-response harness; preserve opaque packaging and exact hashes. |
| Monoline-linear artwork | Retained draft comparator in [PR #49](https://github.com/joshua-small/audio-synth-symbol-registry/pull/49) | Do not infer selection, rejection, or lock. |

## Active queue

### 1. Continue shelf text-friction evidence collection

Search for additional independently sourced record-specific cases while preserving DA-010's exclusions. A negative result is valid and must not be upgraded to satisfy an attractive hypothesis.

Completion requires the lane to be based on the current six-record registry and merged shelf overlap evidence, pass the complete repository test suite, carry timestamped Agent Reports, and merge without changing semantics, aliases, identifiers, statuses, artwork, or external positions.

### 2. Maintain the six-record assessment lifecycle

Create another immutable assessment only after material new evidence lands. Apply the adopted rubric to all six records and compare it with the current snapshot.

The lifecycle covers `asr:filter.high-pass`, `asr:filter.low-pass`, `asr:filter.band-pass`, `asr:filter.band-stop`, `asr:filter.low-shelf`, and `asr:filter.high-shelf`.

This is mechanical assessment work only. Do not transfer notch evidence to band-stop, infer aliases from related terms, count derived analyses as independent evidence, or promote a record without satisfying the rubric. If a score reaches a threshold, report the unmet floors and blockers. Agents may promote to `registry-candidate` after the required independent review. Promotion to `registry-accepted` remains Human Review because it makes the identifier permanent, but that question should normally be batched into review of the complete external submission package instead of interrupting earlier work.

### 3. Validate the private offline participant harness

The six hashes in `artwork/study-locks/six-member-compact-a.json` are bound to opaque-token packaging and protocol inputs. D-022 authorizes a private, offline, non-operational harness using synthetic responses only. The harness must collect all six free-text responses before exposing class labels and must exercise leakage, rendering, accessibility, keyboard, zoom, validation-error, resume, and submission behavior.

After independent adverse review and passing validation, agents may record an internal `study-ready` decision under D-021. This does not authorize recruitment, real participant access, privacy or consent commitments, incentives, launch, artwork acceptance, publication, release, outreach, or any other external action.

### 4. Maintain adjacent-path research without outreach

Keep the registry as the shared semantic source for later AES, ISO/IEC, SMuFL, Unicode, font, emoji, and future-family decisions. Refresh mutable primary guidance only when a bounded internal decision needs it. Continue to treat Unicode as `HOLD` and emoji as out of the active path on current evidence.

No external contact, submission, endorsement request, fork publication, new semantic family, or project position is authorized by this lane.

## Completed or superseded queue items

- Six-record interchange workflow exercise: completed in Issue #69 with repository-owned fixtures, deterministic tests, character counts, and explicit discovery and unknown-ID limitations; no token count was claimed without a pinned model/tokenizer.
- Four-record reassessment and evidence lifecycle: completed through PRs #47 and #62; the current six-record snapshot is authoritative.
- Recognition-study infrastructure: completed through PRs #31 and #40, with SVG validation/render QA completed in PR #46.
- Earlier representation, historical, terminology, vendor, education, journalism, and community spikes: incorporated through PRs #24, #42, #44, #47, and #51 through #54.
- Synergistic application mapping: completed in [PR #32](https://github.com/joshua-small/audio-synth-symbol-registry/pull/32); future external action remains gated.
- The obsolete four-record evidence-status [PR #15](https://github.com/joshua-small/audio-synth-symbol-registry/pull/15) was closed without merge as superseded by `docs/current-evidence-status.md`.

## Human Review boundaries

The summary below highlights project-specific gates and does not replace or narrow the complete gate list in [AGENTS.md](../AGENTS.md). Pause when work reaches any AGENTS.md gate, including:

- any intentional change to visible glyph geometry or family design;
- activating a new semantic family or expanding the active six-concept repertoire;
- marking artwork `accepted` or promoting a record to `registry-accepted`;
- authorizing participant recruitment, incentives, privacy/consent terms, study launch, or publication;
- making a materially ambiguous semantic, canonical-name, alias, identifier, or status decision that independent agent review cannot resolve safely;
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
