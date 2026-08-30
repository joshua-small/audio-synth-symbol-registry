# Prioritized next work

Status as of 2026-08-29, after work merged through PR #24. This queue converts remaining evidence and prototype gaps into bounded work packages. It does not authorize status promotion, artwork selection, participant recruitment, publication, outreach, or a standards submission.

## Queue

### 1. Reassess against evidence ledger 0.1.3

**Question:** How do the band-stop/notch boundary evidence, historical manual sample, and completed overlap audit affect the four records under the adopted rubric?

**Deliverables:**

- One immutable assessment snapshot keyed to evidence ledger 0.1.3.
- Per-dimension citations and explicit dispositions for new evidence.
- A comparison with the 0.1.1 snapshot that distinguishes score movement from status movement.

**Bounds and completion test:**

- Do not change semantics, names, aliases, IDs, or record status in the assessment PR.
- Do not transfer notch evidence to band-stop unless an existing durable decision permits the exact claim.
- Complete when all citations validate, arithmetic is reproducible, and an independent reviewer verifies the rubric application.
- If a score reaches a promotion threshold, report it as a separate possible Human Review item; do not promote within this package.

### 2. Prepare recognition-study infrastructure

**Question:** Can the adopted protocol be made reproducible before any visual stimulus or participant decision is requested?

**Deliverables:**

- Versioned study-instrument text using opaque stimulus tokens.
- Machine-readable response, exclusion, scoring-key, and aggregate-result schemas or templates.
- Analysis tooling and synthetic fixtures for Wilson intervals, confusion matrices, scorer agreement, exclusions, and threshold classification.
- A preregistration checklist that identifies the exact later Human Review inputs.

**Bounds and completion test:**

- Use synthetic data only.
- Do not create, select, lock, or describe canonical geometry in this package.
- Do not recruit participants, publish a participant call, choose incentives, or launch a study.
- Complete when deterministic fixtures cover strong-support, revise, inconclusive, and invalid-input paths and an independent reviewer can reproduce the results.

This package is routine preparation. The existing Human Review gate remains at artwork/stimulus approval and study recruitment or launch.

### 3. Run a per-record text-friction follow-up

**Question:** Can band-pass and band-stop each obtain record-specific examples of ambiguous, lossy, image-dependent, or custom-font-dependent text communication?

**Deliverables:**

- A bounded query log covering manufacturer support, education, journalism, issue trackers, and user communities.
- Direct artifacts assigned to a record only when the artifact supports that record's semantics.
- Negative findings and excluded false matches, especially notch-only artifacts that cannot be assigned to band-stop.

**Bounds and completion test:**

- Time-box the pass and report a negative result honestly.
- Do not count UI presence, ordinary abbreviations, or a graph alone as a workaround.
- Complete when each candidate is reproducible and independently reviewed, whether or not the three-example threshold is met.

### 4. Exercise the interchange prototype

**Question:** Does the experimental `asr:`-ID resolver reduce ambiguity in realistic repository-owned text workflows?

**Deliverables:**

- Small examples for a mix-note exchange, an issue report, structured metadata, and accessible rendering.
- Tests for round-trip ID preservation and fallback behavior.
- A failure log covering verbosity, discoverability, unknown IDs, asset absence, and speech/text mismatch.

**Bounds and completion test:**

- Keep the prototype experimental and repository-local.
- Do not declare its JSON shape, asset references, CLI, or output formats stable.
- Do not add PUA assignments, a font, canonical artwork, telemetry, or external deployment.
- Complete when examples are executable, tests pass, and findings are separated from adoption claims.

### 5. Map synergistic future paths

**Question:** Which adjacent paths could reuse the registry's evidence without conflating their acceptance rules?

**Deliverables:**

- A comparison of Unicode symbol encoding, ISO/IEC or AES industry standardization, emoji suitability, SMuFL or icon-community collaboration, open-source font work, and expansion to other industry-specific glyph families.
- For each path: governing body or community, current authoritative guidance, required evidence, likely contribution artifact, rights constraints, outreach gate, and stop condition.
- A recommended sequencing map that preserves the registry as the shared semantic source.

**Bounds and completion test:**

- Research only: no contact, submission, endorsement request, fork publication, or project position.
- Prefer current primary guidance and date every mutable source check.
- Keep future symbol families outside the initial four-record scope.
- Complete when each path has a source-backed entry, explicit non-equivalences, and independent review.

## Deferred Human Review inputs

No current queue item needs an immediate owner decision. Pause later when work reaches one of these existing gates:

- selecting or locking study geometry;
- authorizing participant recruitment, incentives, privacy/consent terms, or study launch;
- changing semantics, aliases, identifiers, status, or accepted artwork;
- adopting an external position or contacting a standards body, vendor, font project, or community;
- publishing a release or declaring a protocol stable.

## Agent Report - 2026-08-29T23:21:04-07:00

- Scope: converted the post-PR-24 gaps into five ordered, independently reviewable work packages.
- Prioritization: placed evidence-corpus reassessment first, non-gated study infrastructure second, record-specific text-friction research third, prototype exercises fourth, and broader opportunity mapping fifth.
- Guardrails: separated routine preparation from later artwork, recruitment, outreach, promotion, compatibility, and publication gates.
- References: [current evidence status](current-evidence-status.md), [acceptance rubric](acceptance-rubric.md), [artwork criteria](artwork-criteria.md), [recognition-study protocol](recognition-study-protocol.md), [plain-text workaround search](plain-text-workaround-search.md), [Unicode overlap audit](unicode-overlap-audit.md), and [interchange prototype](interchange-prototype.md).
- Validation: repository tests and independent review are required before merge.
- Completion annotation: superseded by the [PR #29 independent review](https://github.com/joshua-small/audio-synth-symbol-registry/pull/29#issuecomment-5467138402); review passed on the merge head with 24/24 tests and GitHub Actions run 64 passing, and the work merged as `e7d8eb164fae0d70f2c470ce52063ee8f5510d15`.
