# Current Evidence Status

Status as of 2026-08-31T21:38:59-07:00. This synthesis supersedes the historical [0.2.11 status synthesis](current-evidence-status-0.2.11.md). It preserves the private unencoded font-proof validation and incorporates the evidence-only Band-stop/Notch adverse dossier without changing an assessment, live record, artwork, study state, or external position.

## Current artifacts

| Artifact | Version | Current authority |
| --- | --- | --- |
| Registry and evidence ledger | 0.2.10 | `registry/registry-metadata.json` and `evidence/ledger.json` |
| Schema | 0.4.0 | `registry/registry-metadata.json` |
| Assessments | 0.3.3, format 0.2.0 | `registry/assessments/registry-0.2.9-2026-08-31.json`; independent adverse review passed |
| Derived analyses | 0.2.12, format 0.1.0 | `evidence/derived-analyses.json` |
| Tooling | 0.8.0 | `package.json` |

## Current records

Band-pass is `registry-candidate`; the other five records remain `evidence-collecting`:

| ID | Score | Principal blockers |
| --- | ---: | --- |
| `asr:filter.high-pass` | 18/20 | Material `Low Cut` alias boundary |
| `asr:filter.low-pass` | 18/20 | Material `High Cut` alias boundary |
| `asr:filter.band-pass` | 20/20 | `registry-candidate`; no candidate blocker or material question remains |
| `asr:filter.band-stop` | 15/20 | Current snapshot retains the material Notch boundary; DA-020 recommends resolving it by controlled-polysemy policy in a separate reassessment |
| `asr:filter.low-shelf` | 17/20 | Visual convergence, six-way recognition, and shelving-term disposition; bounded friction threshold now met |
| `asr:filter.high-shelf` | 17/20 | Visual convergence, six-way recognition, shelving-term disposition, and open friction safeguard |

Scores remain those of the immutable 0.3.3 assessment snapshot. DA-020 does not preempt the next assessment. It finds that the broad Band-stop/Band-reject semantic nucleus is stable even though `Notch` varies among narrow subtype, exact product/API synonym, response feature, and implementation-local mode. The stable containment rule is to keep Band-stop canonical, treat Notch as context-dependent and commonly narrower, and exclude Notch-only evidence unless its own source explicitly maps or contrasts the broad concept.

## New evidence and recommendation

- EV-180 and EV-181 show SciPy separately implementing a narrow center-plus-Q Notch and a general two-edge Band-stop.
- EV-182 and EV-184 support the broad-class/narrow-subtype model in engineering education and user documentation.
- EV-183 directly calls a Q = 0.25 Twin-T response both Band-stop and Notch, defeating a universal high-Q naming rule.
- EV-185 documents practical Audacity user friction between a too-narrow Notch operation and a broader Band Stop workflow.
- EV-186 documents Adobe Audition treating Band Stop and Notch as alternate product labels for a two-cutoff response.
- EV-187 preserves producer-facing narrow/precise Notch usage.
- EV-188 shows formal ITU practice specifying application-specific notch width rather than a universal lexical threshold.
- EV-189 documents a general two-edge MathWorks Band-stop implementation.

DA-020 recommends that the next mechanical Band-stop reassessment raise semantic stability from 2 to 3 and close the material Notch blocker by policy, while preserving contradictory naming as non-material interoperability caution. `Notch` should remain outside exact aliases, and no Notch-only implementation, glyph, or usage should transfer without an explicit source-local mapping or contrast.

The remaining gaps are unaffected:

- text/accessibility remains 2 because no common portable glyph interchange or independent audio-chat shorthand corpus was established;
- visual convergence remains 2 because no third independent explicit axis-less Band-stop/Band-reject implementation was established;
- Notch-only drawings remain excluded, and apparent trough width cannot encode a portable Q threshold without axes and measurement conventions.

The [private unencoded font proof](private-unencoded-font-proof-2026-08-31.md) remains internal technical validation. It allocates no code point or PUA value, adds no independent usage evidence, and does not alter the dossier's semantic or Unicode conclusions.

## Current position

- Registry and ASCII interchange work: `GO`.
- Six-member evidence and private recognition research: `GO` within existing gates.
- Private unencoded font feasibility: completed internally; generated artifacts remain private and unpublished.
- Accepted artwork, participant recruitment, external outreach, publication, and release: not authorized.
- Formal Unicode proposal: `HOLD`. No submission has been made.

## Next evidence work

1. Mechanically reassess `asr:filter.band-stop` against DA-020 without adding a Notch alias, borrowing Notch-only evidence, or presuming lifecycle movement.
2. Resolve the `Low Cut`/high-pass and `High Cut`/low-pass alias boundaries without presuming universal exactness.
3. Seek a third independent explicit axis-less Band-stop/Band-reject implementation and independently published portable text-friction evidence.
4. Continue private six-way recognition validation without treating original study artwork as industry adoption.
5. Preserve the private proof findings without treating font feasibility as a substitute for independent character use or Unicode eligibility.

## Agent Report - 2026-08-31T21:38:59-07:00

- Report status: completed
- Scope: EV-180 through EV-189 and DA-020, limited to the Band-stop/Notch semantic boundary and the current 15/20 gap analysis.
- Sequential integration: rebased after the private unencoded font proof; tooling 0.8.0 and DA-006 v0.2.11 are preserved, with this synthesis published as DA-006 v0.2.12 and consuming DA-006 v0.2.11.
- Result: recommend resolving the semantic blocker through a controlled-polysemy source-transfer rule in a separate reassessment; text and visual gaps remain open.
- Exclusions: no semantic, alias, identifier, artwork, assessment, status, study, Unicode, release, or outreach change; Notch-only evidence remains excluded.
- Validation: exact-head results are recorded after sequential rebase, digest reconciliation, and independent adverse re-review.
