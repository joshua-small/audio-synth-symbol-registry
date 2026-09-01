# Private offline participant-surface validation

## Agent Report - 2026-08-31T19:33:55-07:00

### Scope and authorization

HR-003 authorized a private, offline, non-operational participant-surface harness using synthetic responses only. The validation began from exact `main` commit `7d6c8ebe99eef89d55e421704fa36ebc28330136`. It did not recruit or expose a participant, open a network listener, collect real responses, choose privacy or retention terms, spend money, launch or publish a study, accept artwork, create a release, contact an outside party, or take standards action.

The private construction plan, random seed, answer key, token-to-record mappings, scoring key, generated harnesses, synthetic exports, and answer-bearing validation files remain outside git and GitHub. This report records only non-sensitive commitments and aggregate results.

### Participant-surface contract

The harness builder creates one self-contained `file://` HTML page from one public construction-package form. It:

- labels itself prominently as private, offline, and synthetic-only;
- uses a restrictive Content Security Policy with `default-src 'none'`, `connect-src 'none'`, `form-action 'none'`, data-only images, and exact inline style/script hashes;
- embeds only the public opaque tokens, blind stimulus bytes, form order, and forced-choice table;
- contains no record IDs, source paths, private seed, answer key, scoring key, network API, listener, analytics, cookie, IndexedDB, service worker, local storage, or session storage;
- retains the current synthetic run only in JavaScript memory and states that reload clears it;
- presents all six free-text or separate `I do not know` responses before rendering any forced-choice control;
- then presents all six independently ordered forced-choice tasks with required confidence values;
- asks the contamination question once, after every stimulus task;
- simulates submission locally and shows a read-only synthetic JSON export plus an optional local SHA-256 receipt;
- uses native forms, fieldsets, legends, labels, radio buttons, a checkbox, textareas, and buttons; explicit visible focus; an assertive error region; focus movement to each phase heading; responsive layout; forced-colors handling; and a single-column confidence fallback at narrow widths.

`tooling/offline-harness-state.mjs` is the authoritative phase state machine. The UI cannot invoke forced choice during the free-text phase, skip confidence, answer contamination early or more than once, or export an incomplete run. The same state machine is exercised directly in automated tests.

### Exact-instance validation

A cryptographically random private 48-byte seed generated a new 12-form package against the six hash-locked `compact-a` drafts. All 12 forms were separately built into owner-only local harness directories.

| Check | Result |
| --- | --- |
| Public manifest and embedded stimulus hashes | Pass for 12/12 forms |
| Private seed absent from every HTML surface | Pass for 12/12 forms |
| Registry IDs and source paths absent from every HTML surface | Pass for 12/12 forms |
| Harness HTML SHA-256 equals its manifest | Pass for 12/12 forms |
| Six free-text answers precede the forced-choice phase | Pass for 12/12 synthetic runs |
| Six forced choices and confidence values precede contamination | Pass for 12/12 synthetic runs |
| Contamination appears once at the end | Pass for 12/12 synthetic runs |
| Private export joins exactly to the six answer-key tokens | Pass for 12/12 synthetic runs |
| Exact synthetic free-text scoring | 72/72 expected correct |
| Synthetic forced-choice scoring | 72/72 expected correct |
| Private scoring-key commitment | `sha256:27646f17787b12f26f8177e203ebcfbe955b8d2ab29fb4fdbe74e136306aa32a` |
| Repository validation and tests | Pass, 110/110 |

The private scoring key is derived from the answer key plus the protocol's predeclared exact-answer lists. The validator reports only aggregate synthetic results and the scoring-key commitment. It fails closed for an unknown record, token mismatch, non-synthetic export, wrong study ID, incomplete phase, invalid choice, or invalid confidence.

### Error, recovery, submission, and accessibility inspection

Automated state tests exercised early forced-choice rejection, mutually exclusive text/unknown validation, invalid confidence rejection, incomplete-export rejection, single contamination enforcement, exact six-plus-six export structure, and private scoring joins. Static inspection verified native keyboard controls, label associations, focus targets, visible focus CSS, an assertive error region, responsive sizing, forced-colors handling, restart wiring, the completion receipt, and the lack of persistent or network APIs.

No browser executable was available in the validation environment. Consequently, browser-native Tab/Shift+Tab order, Enter/Space activation, actual focus paint, 200% and 400% rendered reflow, browser accessibility-tree output, screenshot comparison, and Content Security Policy enforcement were not directly exercised. These remain browser-validation items if the optional study lane is resumed. The prior construction validation already rendered the exact blind stimulus geometry; that does not substitute for rendering this surrounding interface.

### Findings and recommendation

No implementation blocker was found within HR-003's boundary. The harness enforces the important anti-priming correction: every unprompted answer is fixed before any category labels are shown on the participant surface. Exact form construction, local synthetic submission, private scoring, and analysis joins are reproducible.

This evidence does not establish human recognition, participant safety, platform behavior, artwork acceptance, or `study-ready` status. The recognition study is useful optional QA but is not the critical path for continuing the registry, interchange, font, or standards-readiness work. Park operational study work after this validation. Resume only if the owner wants empirical recognition evidence and then perform real-browser validation before requesting the separate recruitment, data-plan, and launch gates.

### Independent review

An independent adverse reviewer initially blocked the work after demonstrating two material failures: a matching-hash traversal path could embed private bytes, and malformed export choices/confidence/contamination could pass aggregate validation. The implementation now requires the exact `assets/<opaque-token>.svg` path, a regular file, realpath containment, constrained blind-SVG structure, and exact response/form domains. Traversal, intermediate-directory symlink escape, and malformed-response regressions were added.

The reviewer approved exact rebased commit `e4f1b30a7d255d37d3ee813e0b1cb7608dc3fa72` after independently reproducing 110/110 passing tests, all 12 exact harness hashes, and all 12 synthetic validations. The reviewer then approved the complete two-file hardening delta at `2d83ab00a12b82c1b0a98ddfed4d23115e63edd0`, which additionally requires exact eight-choice sets/order length and exact six-record answer-key coverage. No blocker remains within HR-003's authorized scope.
