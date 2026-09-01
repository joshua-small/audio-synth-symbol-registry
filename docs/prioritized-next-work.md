# Prioritized next work

Status as of 2026-08-31T22:46:13-07:00, after the six-record reassessment and D-021-delegated candidate transitions. This queue covers all six live records and separates agent-reviewed internal work from reserved Human Review gates. It does not authorize `registry-accepted` promotion, artwork acceptance, participant recruitment, publication, outreach, or a standards submission.

The current queue is aligned with registry metadata 0.3.2.

## Current dependency map

| Lane | State | Dependency or next action |
| --- | --- | --- |
| Provisional shelf records | 19/20 and `evidence-collecting` | Resolve shelving-term and isolated shelf/pass recognition questions without treating score alone as promotion authority. |
| Shelf topology and overlap | Incorporated through DA-019 and DA-021 | Preserve affected-side two-prong topology, semantic orientation, polarity/context exclusions, and exact-geometry boundary. |
| Shelf text-friction search | Completed in PR #66 | DA-010 preserves negative and excluded findings; both record-specific safeguards remain open. |
| Six-record reassessment | Implemented in assessment artifact 0.3.4; exact-head review pending | Verify 20/20 HP, 20/20 LP, unchanged 20/20 BP, 16/20 BS, and 19/20 shelves; preserve every DA-018 through DA-021 adverse boundary. |
| Six-member draft artwork | Geometry lock approved in [PR #61](https://github.com/joshua-small/audio-synth-symbol-registry/pull/61) | Preserve the exact lock-manifest hashes; internal `study-ready` evaluation proceeds through independent agent review, while any visible design change and all operational actions remain gated. |
| Study-stimulus infrastructure | Offline harness validation completed in [PR #77](https://github.com/joshua-small/audio-synth-symbol-registry/pull/77) | Preserve opaque packaging and exact hashes; park operational work unless the owner resumes empirical recognition work, then require real-browser validation before separate recruitment, data-plan, and launch gates. |
| Monoline-linear artwork | Retained draft comparator in [PR #49](https://github.com/joshua-small/audio-synth-symbol-registry/pull/49) | Do not infer selection, rejection, or lock. |

## Active queue

### 1. Resolve remaining shelf material questions

Run a dedicated adverse shelf/shelving terminology review and continue private isolated six-way shelf/pass recognition validation. Preserve DA-019's distinction between established topology and unproved isolated recognition. A negative result is valid and must not be upgraded to satisfy an attractive hypothesis.

Completion requires direct evidence sufficient to resolve both material questions, complete validation, timestamped Agent Reports, and independent adverse review. Any visible geometry change, participant operation, or candidate-to-accepted transition remains separately gated.

### 2. Maintain the six-record assessment lifecycle

Treat `registry/assessments/registry-0.3.1-2026-08-31.json` as the current immutable six-record snapshot after exact-head review. Create another snapshot only after material new evidence or a material record change lands, and compare it with this baseline.

The lifecycle covers `asr:filter.high-pass`, `asr:filter.low-pass`, `asr:filter.band-pass`, `asr:filter.band-stop`, `asr:filter.low-shelf`, and `asr:filter.high-shelf`.

Do not transfer Notch-only evidence to band-stop without explicit source-local mapping or contrast, infer unrestricted aliases from related terms, count derived analyses as independent evidence, or promote a shelf while its material questions remain open. Agents may manage reversible `registry-candidate` status after required independent review. Promotion to `registry-accepted` remains Human Review because it makes the identifier permanent, and should normally be batched into review of the complete external submission package.

### 3. Preserve the validated offline harness boundary

The six hashes in `artwork/study-locks/six-member-compact-a.json` are bound to opaque-token packaging and protocol inputs. PR #77 completed the private, offline, synthetic-only harness validation, including the rule that all six free-text responses are fixed before any class labels appear.

Keep operational study work parked. If the owner resumes empirical recognition work, perform the documented real-browser validation before requesting the separate recruitment, data-plan, and launch gates. The completed synthetic validation does not establish human recognition, participant safety, platform behavior, `study-ready` status, artwork acceptance, or authorization for real participant access, privacy or consent commitments, incentives, launch, publication, release, outreach, or any other external action.

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
