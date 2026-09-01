# Current Evidence Status

Status as of 2026-08-31T18:24:06-07:00. This synthesis supersedes the historical [0.2.2 status synthesis](current-evidence-status-0.2.2.md). It reports repository state; it does not promote records, accept artwork, authorize a study, or change the project's external-standards position.

## Current artifacts

| Artifact | Version | Current authority |
| --- | --- | --- |
| Registry and evidence ledger | 0.2.2 | `registry/registry-metadata.json` and `evidence/ledger.json` |
| Schema | 0.4.0 | `registry/registry-metadata.json` |
| Assessments | 0.3.1, format 0.2.0 | `registry/assessments/registry-0.2.2-2026-08-31.json` |
| Derived analyses | 0.2.3, format 0.1.0 | `evidence/derived-analyses.json` |
| Tooling | 0.5.0 | `package.json` |

## Current records

All six records remain `evidence-collecting`:

| ID | Score | Principal blockers |
| --- | ---: | --- |
| `asr:filter.high-pass` | 14/20 | Alias boundary and visual convergence |
| `asr:filter.low-pass` | 14/20 | Alias boundary and visual convergence |
| `asr:filter.band-pass` | 13/20 | Independent target use and visual convergence |
| `asr:filter.band-stop` | 10/20 | Notch boundary, fallback support, and visual convergence |
| `asr:filter.low-shelf` | 17/20 | Visual convergence, six-way recognition, shelving-term disposition, and open friction safeguard |
| `asr:filter.high-shelf` | 17/20 | Visual convergence, six-way recognition, shelving-term disposition, and open friction safeguard |

Scores are readiness diagnostics, not status promotion. DA-009 mechanically raises each shelf overlap-audit dimension from 0 to 3 and each total from 14 to 17. Both shelf records still fail the visual-convergence floor and retain material research questions. DA-010 does not change the text/accessibility score: it preserves one qualifying new friction artifact per shelf and adequate-prose counterevidence, leaving the project's three-independent-source safeguard open. The four earlier records are reproduced unchanged in the new six-record snapshot.

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

1. Prepare a blinded six-way recognition comparison using original candidates, without recruitment until separately authorized.
2. Continue the bounded search for independently authored, record-specific plain-text friction and portable shelf-symbol use.
3. Test shelf/pass confusability and whether the two-prong topology communicates affected side without gain-sign priming.
4. Run a dedicated terminology review before moving shelving forms from related terms into aliases.
5. Continue searching for independently authored portable shelf-glyph use and real-world text-friction workarounds.

## Agent Report - 2026-08-31T18:24:06-07:00

- Report status: completed
- Scope: patch-level reassessment synthesis for all six live records after the shelf overlap audit and shelf text-friction search.
- Evidence: EV-001 through EV-084 as represented in the current ledger, including the overlap inputs EV-070 through EV-073 and friction inputs EV-080 through EV-084.
- Derived inputs: DA-001 through DA-005 and DA-007 through DA-010; none is counted as independent evidence.
- Result: DA-009 raises each shelf overlap score from 0 to 3 and total from 14 to 17; DA-010 leaves the three-source friction safeguard open. All six statuses remain `evidence-collecting`.
- Limitations: no semantic, alias, identifier, artwork, study, status, outreach, release, or external-position change.
- Validation: `npm test` passed 86/86 tests; registry validation reported six records, five assessment sets, and 62 evidence sources at registry 0.2.2; `git diff --check` passed.
- Independent review: passed after adverse review removed stale overlap-audit-absent blockers and added a regression guard against their recurrence.
