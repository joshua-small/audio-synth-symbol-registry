# Current Evidence Status

Status as of 2026-08-31T21:34:25-07:00. This synthesis supersedes the historical [0.2.10 status synthesis](current-evidence-status-0.2.10.md). It preserves the six-record reassessment and independently reviewed D-021 band-pass candidate transition, then records the private unencoded font-proof validation. No artwork, study, font publication, or external action is authorized.

## Current artifacts

| Artifact | Version | Current authority |
| --- | --- | --- |
| Registry and evidence ledger | 0.2.9 | `registry/registry-metadata.json` and `evidence/ledger.json` |
| Schema | 0.4.0 | `registry/registry-metadata.json` |
| Assessments | 0.3.3, format 0.2.0 | `registry/assessments/registry-0.2.9-2026-08-31.json`; independent adverse review passed |
| Derived analyses | 0.2.11, format 0.1.0 | `evidence/derived-analyses.json` |
| Tooling | 0.8.0 | `package.json` |

## Current records

Band-pass is now the first `registry-candidate`; the other five records remain `evidence-collecting`:

| ID | Score | Principal blockers |
| --- | ---: | --- |
| `asr:filter.high-pass` | 18/20 | Material `Low Cut` alias boundary |
| `asr:filter.low-pass` | 18/20 | Material `High Cut` alias boundary |
| `asr:filter.band-pass` | 20/20 | `registry-candidate`; no candidate blocker or material question remains |
| `asr:filter.band-stop` | 15/20 | Material Notch boundary; Notch-only evidence remains excluded |
| `asr:filter.low-shelf` | 17/20 | Visual convergence, six-way recognition, and shelving-term disposition; bounded friction threshold now met |
| `asr:filter.high-shelf` | 17/20 | Visual convergence, six-way recognition, shelving-term disposition, and open friction safeguard |

The reassessment reproduces each score from direct ledger sources and counts publisher or implementation groups rather than URLs. High-pass and low-pass remain 18/20 because Ardour adds another implementation and DA-017 strengthens the stable semantic nuclei without resolving `Low Cut` or `High Cut` as unrestricted exact aliases. Band-pass rises to 20/20: DA-017 supports maximal semantic stability after adverse review, and Ardour joins Image-Line and DSSSP as the third direct axis-less implementation required for visual score 3. With every candidate floor satisfied and no hard blocker or material question, independent adverse review approved its reversible `registry-candidate` transition under D-021. Band-stop rises to 15/20 because Image-Line and Ardour establish two independent broad rejected-band renderings, while EV-130 and EV-131 ground `BSF`; its semantic score and hard blocker remain because Notch treatments still conflict. Both shelves stay 17/20: Ardour establishes another direct compact implementation, but its single-polarity stepped outlines do not establish the registry's sign-agnostic affected-side primitive. DA-016 closes only low shelf's bounded three-case friction threshold.

## Evidence synthesis

- EV-050 through EV-057 and EV-060 through EV-065 support a sign-agnostic low/high affected-side shelf pair across products, implementation documentation, historical material, education, trade media, and community discussion.
- Compact shelf selectors exist in EV-052 and EV-054, but they do not establish shared geometry, portable character use, or reuse rights.
- EV-064 demonstrates that curve orientation alone can reverse under an equivalent description, so gain sign is excluded from shelf identity.
- EV-065 preserves practical low-shelf versus high-pass distinction and a prose workaround.
- The two-prong fork is original research geometry. It is not accepted artwork or evidence of an established portable glyph convention.
- No sampled source establishes `LS`, `HS`, `LSF`, or `HSF` as a portable fallback. Full `LOW SHELF` and `HIGH SHELF` fallbacks avoid that overclaim.
- EV-070 through EV-073 and DA-009 establish a bounded, reproducible shelf-specific Unicode and standards overlap audit. It found no semantic equivalent, while identifying phonetic `SHELF` false positives and representative fork, routing, mathematical, bracket, and OCR near-miss families.
- EV-080 through EV-084 document the earlier bounded shelf search. DA-016 later combines independent EV-121, EV-140, and EV-141 cases to meet its conservative recurrence threshold for low shelf only; high shelf has two qualifying cases.
- EV-100 directly documents Image-Line's axis-less high-pass, low-pass, band-pass, and `Band stop` type selectors while keeping filter order separate.
- EV-101 directly documents DSSSP's high-pass, low-pass, and band-pass custom-font components at an immutable commit. Its separate Notch component is excluded from band-stop evidence.
- EV-120 directly documents Ardour's project-local Toolkit font mappings for all six active concepts, including separate Band Reject and Notch members. The raw ASCII slots are meaningless without the bundled font and stylesheet, so this is not portable text.
- EV-121 documents one image-dependent request that required prose labels for five active concepts. It is communication-friction evidence, not standalone character use, and its separate Notch label is excluded from band-stop.
- EV-122 documents versioned Iconify packaging of FontAudio. It is source-dependent ecosystem evidence and is not counted as another independent implementation.
- EV-130 explicitly expands band-stop filter to `BSF` and calls it band reject, while internally contradicting itself about whether the response is necessarily an extremely narrow Notch or the broader wide response.
- EV-131 independently expands Band-Stop Filter to `BSF` in a university course and supplies an axis-bearing teaching diagram; it is terminology support, not an axis-less target implementation or portable-text case.
- EV-140 documents a public low-shelf and high-shelf identification failure in which missing vendor documentation forced cross-product visual comparison.
- EV-141 documents a current vendor-manual copy-and-label defect that calls low-shelf choices and controls high-shelf items.
- EV-150 pins the Web Audio API's six relevant semantic neighborhoods, including separate signed shelf gain and product-local treatment of notch as band-stop/band-rejection.
- EV-151 pins JUCE APIs that independently preserve the pass, notch, and shelf neighborhoods without defining a glyph vocabulary.
- EV-054/EV-100 count as one Image-Line independence group, and EV-005/EV-101 count as one DSSSP group. URLs and revisits do not multiply independent sources.
- Image-Line's mixed `Notch` and `Band stop` wording is product-local and does not resolve the cross-domain D-011/DA-004 boundary.
- EV-110 through EV-118 and DA-013 map the current SEW proposal path. They confirm that independent character usage, community-level stability, and public plain-text interchange need remain the controlling Unicode blockers even if downstream technical proposal artifacts are completed.
- DA-017 finds that the six concepts form a durable, coherent semantic response taxonomy across manufacturers, decades, education, standards-adjacent APIs, and open-source implementation. It explicitly does not establish universal standalone drawing identity or character use.
- The [private unencoded font proof](private-unencoded-font-proof-2026-08-31.md) demonstrates deterministic cmap-free construction from the six exact locked source hashes, registry-derived glyph names/GIDs, bounded property simulation, and 60 threshold-bounded rendering comparisons. It is internal validation rather than independent usage evidence and allocates no code point or PUA value.

Derived reports DA-001 through DA-010 and DA-012 through DA-017 organize and constrain the direct evidence. DA-011 remains reserved and unused. Derived reports are not additional independent sources and are not double-counted in assessment scores. DA-014 establishes Ardour's direct project-local implementation while finding no portable independent text use. DA-015 closes the band-stop second-render and BSF-provenance gaps while preserving Notch exclusion. DA-016 finds bounded recurring public communication friction only for low shelf. DA-017 establishes semantic-taxonomy coherence but not universal form stability. The private proof report is internal technical validation and likewise adds no independent usage source. Unicode remains `HOLD`.

## Current position

- Registry and ASCII interchange work: `GO`.
- Six-member evidence and recognition research: `GO` within existing study and artwork gates.
- Private unencoded font feasibility: completed internally; generated artifacts remain private and unpublished.
- Accepted artwork, `study-ready` designation, and recruitment: not authorized.
- Formal Unicode proposal: `HOLD`. No submission has been made.

## Next evidence work

1. Resolve the `Low Cut`/high-pass and `High Cut`/low-pass alias boundaries without presuming universal exactness.
2. Preserve band-pass candidate evidence while seeking the remaining public-use and community-support evidence; do not infer `registry-accepted` or Unicode readiness.
3. Continue the bounded search for independently published, record-specific plain-text friction and portable symbol use, especially high shelf and band-stop.
4. Use internal recognition validation to test six-way discrimination; do not infer industry adoption from original study artwork.
5. Prepare a rights inventory for independently authored usage images.
6. Preserve the provisional property and private proof findings while completing names, ordering, and cross-references. Add HarfBuzz and independent platform-rasterizer checks only if they materially support a later external package; do not treat font feasibility as a substitute for usage evidence.

## Agent Report - 2026-08-31T20:00:07-07:00

- Report status: completed
- Scope: patch-level evidence and reassessment synthesis for all six live records after the four-record target-use spike.
- Evidence: EV-001 through EV-101 as represented in the sparse ledger ID ranges, especially EV-100 and EV-101 for direct target use.
- Derived inputs: DA-001 through DA-012 as applicable; none is counted as independent evidence.
- Result: high-pass 18/20, low-pass 18/20, band-pass 18/20, band-stop 12/20, and both shelves 17/20. All six statuses remain `evidence-collecting`.
- Limitations: no semantic, alias, identifier, artwork, study, status, outreach, release, or external-position change.
- Validation: post-rebase `npm test` passed 111/111 tests; validation reported six records, six assessment sets, and 64 evidence sources at registry 0.2.3; Agent Report hygiene and `git diff --check` passed.
- Independent review: APPROVE at exact head `779ad90`; the reviewer independently reproduced the Image-Line checksum, inspected DSSSP and Ableton at the cited locators, verified independence and score arithmetic, and found no blocker or required correction.

## Agent Report - 2026-08-31T20:15:37-07:00

- Report status: completed
- Scope: post-rebase Unicode proposal critical-path audit integrated with the four-record target-use evidence, reassessment, and the merged band-pass readiness package; no record movement.
- Evidence: all current ledger sources, including EV-100/EV-101 and official current guidance EV-110 through EV-118.
- Derived inputs: DA-001 through DA-010, DA-012, and DA-013; DA-011 is reserved and unused; none is counted as independent evidence.
- Result: the four-record score changes remain intact and all six live statuses remain unchanged; Unicode remains `HOLD` because independent character use, community-level stability, and public plain-text interchange need remain open.
- Limitations: no semantic, alias, identifier, artwork, study, status, outreach, release, or external-position change.
- Validation: exact-current-main `npm test` passed 112/112 tests; validation reported six records, six assessment sets, and 73 evidence sources at registry 0.2.4; Agent Report hygiene and `git diff --check` passed. GitHub Actions remain pending.
- Independent review: exact substantive head `cce30890e8da55b735899d9a273fabce9929607e` passed adverse re-review after sequential provenance, evidence-count, and queue corrections; this approval-report-only delta is pending confirmation.

## Agent Report - 2026-08-31T20:20:26-07:00

- Report status: completed
- Scope: patch-level independent character-like use and public plain-text need spike across all six live records; assessments remain unchanged.
- Evidence: EV-120 through EV-122, with EV-120 and EV-121 independent and EV-122 explicitly derivative.
- Derived inputs: DA-001, DA-010, DA-012, and DA-014; none is counted as independent evidence.
- Result: one complete project-local icon-font implementation, one image/prose communication-friction artifact for five concepts, one derivative package-distribution artifact, and no portable independent character use.
- Limitations: no semantic, alias, identifier, artwork, study, status, outreach, release, or external-position change; Unicode remains `HOLD`.
- Validation: exact substantive head `8f8fc3b93104f1cd8be604ddbca0b6070d3cea05` passed `npm test` 112/112 and `git diff --check`; validation reported six records, six assessment sets, and 76 evidence sources at registry 0.2.5.
- Independent review: APPROVE at exact substantive head `8f8fc3b93104f1cd8be604ddbca0b6070d3cea05`; the reviewer independently reproduced all three Ardour digests, the Reddit exchange and date, and the Iconify metadata and digest, then verified source-independence bounds, Notch exclusion, negative results, SemVer history, and Unicode HOLD.

## Agent Report - 2026-08-31T20:35:06-07:00

- Report status: completed.
- Scope: patch-level band-stop render and terminology evidence spike; assessments and all six live records remain unchanged.
- Evidence: EV-130 and EV-131, with EV-030, EV-100, and EV-120 reinspected as independent comparators.
- Derived inputs: DA-004, DA-014, and DA-015; none is counted as independent evidence.
- Result: Image-Line EV-100 and Ardour EV-120 close the specifically named second-render gap, while EV-130 and EV-131 independently ground `BSF` as engineering terminology and EV-030, EV-120, and EV-130 ground `band reject` as an established term.
- Counterevidence: EV-130 internally presents both an extremely narrow Notch equation and a broader band-stop/band-reject distinction, so it cannot settle the semantic boundary; Ardour's separately labeled Notch member remains excluded.
- Limitations: no semantic, alias, identifier, artwork, assessment, score, study, status, outreach, release, or external-position change; terminology provenance does not prove common audio-chat use or portable interchange.
- Validation: exact current substantive worktree passed `npm test` 112/112, registry validation for six records, six assessment sets, and 78 evidence sources at registry 0.2.6, Agent Report hygiene, digest reconciliation, and `git diff --check`.
- Independent review: APPROVE on exact current substantive worktree based on `01b5c1f266a21724a96dbee39b674c8fd8e2ab2`; the reviewer independently reproduced all Ardour and AAST digests, confirmed source independence and temporal provenance, verified the EV-130 contradiction and roadmap/version history, and found no Notch transfer or lifecycle change. The approval-report-only annotation is permitted by that verdict.

## Agent Report - 2026-08-31T20:45:43-07:00

- Report status: in progress pending exact-head validation and re-review.
- Scope: bounded public communication-failure casebook across all six live records; assessments and all six live records remain unchanged.
- Evidence: EV-140 and EV-141, reusing EV-121 without duplication; one additional response-drawing exchange is preserved as inspected exclusion rather than registered evidence.
- Derived inputs: DA-010, DA-013, and DA-016; none is counted as independent evidence.
- Result: low shelf alone meets the casebook's conservative recurrence threshold with three publisher/author-independent cases and multiple failure classes; high shelf has two cases, high-pass, low-pass, and band-pass one each, and band-stop zero because Notch remains excluded.
- Limitations: the casebook is not a prevalence estimate and establishes neither portable character use nor Unicode eligibility; no semantic, alias, identifier, artwork, assessment, score, study, status, outreach, release, or external-position change is implied; Unicode remains `HOLD`.
- Validation: exact current substantive worktree passed `npm test` 112/112 and `git diff --check`; registry validation reported six records, six assessment sets, and 80 evidence sources at registry 0.2.7, and Agent Report hygiene passed.
- Independent review: APPROVE at exact substantive head `10c6bee29f94de25a3b8f940c6b39fe64ca5d660` on base `694f015dcf2cf96e754306078fa253320a5d4d0c`; the reviewer verified sequential versions, immutable status hashes and dependencies, DA-016 and EV inputs, threshold arithmetic, source independence, exclusions, Unicode HOLD, unchanged live records, and 112/112 tests. This approval-report-only annotation is permitted by that verdict.

## Agent Report - 2026-08-31T20:55:21-07:00

- Report status: completed after sequential-lane rebase and exact-head adverse re-review.
- Scope: six-concept repertoire stability and semantic-boundary synthesis; assessments and all six live records remain unchanged.
- Evidence: EV-150 and EV-151, synthesizing the existing manufacturer, historical, education, engineering, standards-adjacent, open-source, and terminology corpus without double-counting derived reports.
- Derived inputs: DA-002, DA-003, DA-004, DA-007, DA-008, DA-009, DA-012, DA-013, and DA-017; none is counted as independent evidence.
- Result: the six active concepts form a coherent and durable semantic response taxonomy. Universal drawing identity, portable character use, and Unicode eligibility remain unestablished.
- Boundaries: notch remains a related, commonly narrower or context-dependent term for band-stop; low/high cut relationships remain unresolved as unrestricted exact aliases; shelf gain sign remains separate state.
- Limitations: no semantic, alias, identifier, artwork, assessment, score, study, status, outreach, release, or external-position change; Unicode remains `HOLD`.
- Validation: exact head `214b9df2b6b3c4aa8bf9a0f4a42a30b249d91fc2` passed `npm test` 112/112 and `git diff --check`; validation reported six records, six assessment sets, and 82 evidence sources at registry 0.2.8, and Agent Report hygiene passed.
- Independent review: APPROVE at exact substantive head `214b9df2b6b3c4aa8bf9a0f4a42a30b249d91fc2` on base `33fe0279887a31ffc2623759fab8c4b05f766f05`; the reviewer independently verified preservation of EV-120 through EV-141 and DA-014 through DA-016, all 26 derived-artifact hashes, sequential versions, source digests and rights, semantic boundaries, Unicode `HOLD`, and the exact full suite. This approval-report-only annotation is permitted by that verdict.

## Agent Report - 2026-08-31T21:21:44-07:00

- Report status: in progress pending exact-transition-head confirmation.
- Scope: mechanical reassessment of all six records against EV-120 through EV-151 and DA-014 through DA-017 under D-021.
- Reproduced scores: high-pass 18/20; low-pass 18/20; band-pass 20/20; band-stop 15/20; low shelf 17/20; high shelf 17/20.
- Independence: Ardour is one implementation group; Image-Line EV-054/EV-100 and DSSSP EV-005/EV-101 are each one group; derived analyses create no group. Band-stop counts Image-Line Band stop and Ardour Band Reject but excludes Ardour and DSSSP Notch members.
- Threshold effects: low shelf meets DA-016's bounded three-case communication-friction threshold; high shelf does not. This does not establish portable character use, encoding necessity, or Unicode eligibility.
- Result: independent adverse review approved the six scores and exact source grouping; `asr:filter.band-pass` moved to reversible `registry-candidate` under D-021, while the other five live statuses remain unchanged.
- Boundaries: the candidate identifier remains provisional. No semantic field, identifier, alias, fallback, speech label, visible geometry, artwork status, study authority, outreach, release, or external-position change. Unicode remains `HOLD`.
- Validation: the exact transitioned worktree passed `npm test` 113/113, registry validation for six records, seven assessment sets, and 82 evidence sources at registry 0.2.9, Agent Report hygiene, all 27 derived-artifact digests, proposal-skeleton drift coverage, and `git diff --check`. Exact committed-head confirmation is pending.
- Independent review: APPROVE at exact pre-transition head `18c328037dcd0e1342398613ffae411ed7c6bc7e`; the reviewer independently fetched Ardour and DSSSP, reproduced all six scores and source groups, verified Notch exclusion and shelf conservatism, reconciled every derived digest, and confirmed the D-021 candidate boundary. Exact-final-head confirmation is pending.

## Agent Report - 2026-08-31T21:34:25-07:00

- Report status: internal validation and adverse review complete; PR CI pending.
- Scope: sequential status synthesis after the private unencoded six-glyph font proof, preserving the merged PR #88 scores and band-pass candidate status.
- Internal inputs: the exact six hashes in lock `six-member-compact-a-2026-08-30`, the provisional property profile, and private deterministic font/raster/TTX outputs; no generated output is committed or counted as independent evidence.
- Result: a deterministic cmap-free font proof addressed only by six registry-derived glyph names/GIDs passed private construction, serialized lookup/draw/metric inspection, bounded property simulation, and 60 target-size/theme similarity comparisons. Tooling advances to 0.8.0; record semantics, scores, statuses, and Unicode `HOLD` do not change.
- Boundaries: no code point or PUA value, accepted/canonical artwork, proposal font, font publication/license selection, participant action, outreach, submission, release, or external commitment.
- Preserved objections: one librsvg/sharp rendering stack; no HarfBuzz runtime or independent platform rasterizer; font feasibility establishes neither character usage nor encoding need.
- Validation: the integrated worktree passed `npm test` 117/117, two byte-identical private builds, 60/60 rendering comparisons, six serialized direct-glyph inspections, six bounded bidi-neutral cases, six executable line-break cases, registry validation, Agent Report hygiene, and `git diff --check`.
- Independent review: APPROVE at exact substantive head `2b2c992ad37a07d3f5812868416f2a79b49d6f2b`; the reviewer independently passed 117/117 tests, confirmed all 24 bounded abstract normalization checks, reproduced the font and TTX commitments and 60/60 comparisons, verified non-tautological serialized glyph inspection and exact table/instruction enforcement, and found no geometry, publication, status, or Unicode-boundary change. This approval-report-only annotation does not alter the reviewed implementation.
