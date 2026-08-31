# Current Evidence Status

Status as of 2026-08-30T17:37:18-07:00. This synthesis supersedes the historical [0.1.0 status synthesis](current-evidence-status-0.1.0.md). It reports repository state; it does not promote records, accept artwork, authorize a study, or change the project's external-standards position.

## Current artifacts

| Artifact | Version | Current authority |
| --- | --- | --- |
| Registry and evidence ledger | 0.2.0 | `registry/registry-metadata.json` and `evidence/ledger.json` |
| Schema | 0.4.0 | `registry/registry-metadata.json` |
| Assessments | 0.3.0, format 0.2.0 | `registry/assessments/registry-0.2.0-2026-08-31.json` |
| Derived analyses | 0.2.0, format 0.1.0 | `evidence/derived-analyses.json` |
| Tooling | 0.5.0 | `package.json` |

## Current records

All six records remain `evidence-collecting`:

| ID | Score | Principal blockers |
| --- | ---: | --- |
| `asr:filter.high-pass` | 14/20 | Alias boundary and visual convergence |
| `asr:filter.low-pass` | 14/20 | Alias boundary and visual convergence |
| `asr:filter.band-pass` | 13/20 | Independent target use and visual convergence |
| `asr:filter.band-stop` | 10/20 | Notch boundary, fallback support, and visual convergence |
| `asr:filter.low-shelf` | 14/20 | Shelf-specific overlap audit, visual convergence, six-way recognition, and shelving alias disposition |
| `asr:filter.high-shelf` | 14/20 | Shelf-specific overlap audit, visual convergence, six-way recognition, and shelving alias disposition |

Scores are readiness diagnostics, not status promotion. The shelf records meet the numerical candidate threshold but fail required dimension floors and retain material blockers. The four earlier records retain their independently reviewed 0.1.4 assessment conclusions inside the new six-record snapshot.

## Evidence synthesis

- EV-050 through EV-057 and EV-060 through EV-065 support a sign-agnostic low/high affected-side shelf pair across products, implementation documentation, historical material, education, trade media, and community discussion.
- Compact shelf selectors exist in EV-052 and EV-054, but they do not establish shared geometry, portable character use, or reuse rights.
- EV-064 demonstrates that curve orientation alone can reverse under an equivalent description, so gain sign is excluded from shelf identity.
- EV-065 preserves practical low-shelf versus high-pass distinction and a prose workaround.
- The two-prong fork is original research geometry. It is not accepted artwork or evidence of an established portable glyph convention.
- No sampled source establishes `LS`, `HS`, `LSF`, or `HSF` as a portable fallback. Full `LOW SHELF` and `HIGH SHELF` fallbacks avoid that overclaim.

Derived reports DA-001 through DA-008 organize and constrain the direct evidence. They are not additional independent sources and are not double-counted in assessment scores.

## Current position

- Registry and ASCII interchange work: `GO`.
- Six-member evidence and recognition research: `GO` within existing study and artwork gates.
- Accepted artwork, `study-ready` designation, and recruitment: not authorized.
- Formal Unicode proposal: `HOLD`. No submission has been made.

## Next evidence work

1. Complete a shelf-specific Unicode, character-sequence, visual-confusable, and adjacent-standard overlap audit.
2. Prepare a blinded six-way recognition comparison using original candidates, without recruitment until separately authorized.
3. Test shelf/pass confusability and whether the two-prong topology communicates affected side without gain-sign priming.
4. Run a dedicated terminology review before moving shelving forms from related terms into aliases.
5. Continue searching for independently authored portable shelf-glyph use and real-world text-friction workarounds.

## Agent Report - 2026-08-30T17:48:00-07:00

- Report status: completed
- Scope: superseding six-record evidence-status synthesis for registry 0.2.0.
- Evidence: EV-001 through EV-065 as represented in the current ledger, with direct shelf findings concentrated in EV-050 through EV-057 and EV-060 through EV-065.
- Derived inputs: DA-001 through DA-005, DA-007, and DA-008; none is counted as independent evidence.
- Limitations: no new source search, overlap audit, recognition result, artwork decision, status promotion, or external position.
- Validation: version and record assertions are covered by `tests/documentation-drift.test.mjs`; complete repository test results are reported in PR #62.
- Independent review: requested on PR #62.
