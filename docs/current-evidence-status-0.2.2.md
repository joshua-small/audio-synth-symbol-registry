# Current Evidence Status

Status as of 2026-08-31T16:20:00-07:00. This synthesis supersedes the historical [0.2.1 status synthesis](current-evidence-status-0.2.1.md), which in turn superseded the [0.2.0 synthesis](current-evidence-status-0.2.0.md). It reports repository state; it does not promote records, accept artwork, authorize a study, or change the project's external-standards position.

## Current artifacts

| Artifact | Version | Current authority |
| --- | --- | --- |
| Registry and evidence ledger | 0.2.2 | `registry/registry-metadata.json` and `evidence/ledger.json` |
| Schema | 0.4.0 | `registry/registry-metadata.json` |
| Assessments | 0.3.0, format 0.2.0 | `registry/assessments/registry-0.2.0-2026-08-31.json` |
| Derived analyses | 0.2.2, format 0.1.0 | `evidence/derived-analyses.json` |
| Tooling | 0.5.0 | `package.json` |

## Current records

All six records remain `evidence-collecting`:

| ID | Score | Principal blockers |
| --- | ---: | --- |
| `asr:filter.high-pass` | 14/20 | Alias boundary and visual convergence |
| `asr:filter.low-pass` | 14/20 | Alias boundary and visual convergence |
| `asr:filter.band-pass` | 13/20 | Independent target use and visual convergence |
| `asr:filter.band-stop` | 10/20 | Notch boundary, fallback support, and visual convergence |
| `asr:filter.low-shelf` | 14/20 | Visual convergence, six-way recognition, and shelving alias disposition |
| `asr:filter.high-shelf` | 14/20 | Visual convergence, six-way recognition, and shelving alias disposition |

Scores are readiness diagnostics, not status promotion. The shelf records meet the numerical candidate threshold but fail required dimension floors and retain material blockers. The scores come from the registry 0.2.0 assessment and predate DA-009 and DA-010; no score movement is inferred from completing either analysis. The four earlier records retain their independently reviewed 0.1.4 assessment conclusions inside the six-record snapshot.

## Evidence synthesis

- EV-050 through EV-057 and EV-060 through EV-065 support a sign-agnostic low/high affected-side shelf pair across products, implementation documentation, historical material, education, trade media, and community discussion.
- Compact shelf selectors exist in EV-052 and EV-054, but they do not establish shared geometry, portable character use, or reuse rights.
- EV-064 demonstrates that curve orientation alone can reverse under an equivalent description, so gain sign is excluded from shelf identity.
- EV-065 preserves practical low-shelf versus high-pass distinction and a prose workaround.
- The two-prong fork is original research geometry. It is not accepted artwork or evidence of an established portable glyph convention.
- No sampled source establishes `LS`, `HS`, `LSF`, or `HSF` as a portable fallback. Full `LOW SHELF` and `HIGH SHELF` fallbacks avoid that overclaim.
- EV-070 through EV-073 and DA-009 establish a bounded, reproducible shelf-specific Unicode and standards overlap audit. It found no semantic equivalent, while identifying phonetic `SHELF` false positives and representative fork, routing, mathematical, bracket, and OCR near-miss families.
- EV-080 through EV-084 document additional shelf communication cases, but only EV-083 qualifies under the project's existing record-specific friction rule; neither shelf record reaches three independent examples.

Derived reports DA-001 through DA-010 organize and constrain the direct evidence. They are not additional independent sources and are not double-counted in assessment scores.

## Current position

- Registry and ASCII interchange work: `GO`.
- Six-member evidence and recognition research: `GO` within existing study and artwork gates.
- Accepted artwork, `study-ready` designation, and recruitment: not authorized.
- Formal Unicode proposal: `HOLD`. No submission has been made.

## Next evidence work

1. Reassess the shelf overlap and text-friction dimensions against DA-009 and DA-010 in a new immutable assessment without assuming score or status movement.
2. Prepare a blinded six-way recognition comparison using original candidates, without recruitment until separately authorized.
3. Test shelf/pass confusability and whether the two-prong topology communicates affected side without gain-sign priming.
4. Run a dedicated terminology review before moving shelving forms from related terms into aliases.
5. Continue searching for independently authored portable shelf-glyph use and real-world text-friction workarounds.

## Agent Report - 2026-08-31T16:20:00-07:00

- Report status: completed
- Scope: patch-level update of the six-record evidence-status synthesis for registry 0.2.2 after the shelf overlap audit and shelf text-friction search.
- Evidence: EV-001 through EV-084 as represented in the current ledger, including the overlap inputs EV-070 through EV-073 and friction inputs EV-080 through EV-084.
- Derived inputs: DA-001 through DA-005 and DA-007 through DA-010; none is counted as independent evidence.
- Result: only EV-083 qualifies as a new workaround case for each shelf record, so both per-record three-source safeguards remain open and all six record statuses remain unchanged.
- Limitations: no reassessment, recognition result, artwork decision, status promotion, outreach, or external-position change.
- Validation: `npm test` passed 85/85 tests; registry validation reported six records, four assessment sets, and 62 evidence sources at registry 0.2.2; `git diff --check` passed.
- Independent review: passed after adverse review corrected qualification inflation, source locators, query reproducibility, immutable derived-analysis provenance, documentation drift, and report metadata.
