# Formative Recognition Pilot Preregistration Template

## Status and boundary

Complete and lock this document before recruiting or viewing pilot responses. It operationalizes the formative pilot described in [`../recognition-study-protocol.md`](../recognition-study-protocol.md); that protocol remains authoritative if the documents conflict.

Completing this template does not authorize recruitment, outreach, incentives, launch, artwork acceptance, or publication. Those actions require the applicable Human Review authorization. A formative pilot diagnoses the instrument and candidate geometry; its results MUST NOT be pooled with a confirmatory study or represented as registry, Unicode, ISO, or artwork acceptance.

## Administrative record

| Field | Locked value |
| --- | --- |
| Preregistration ID | `asr-study:` |
| Protocol version | |
| Instrument version | |
| Instrument path and SHA-256 | |
| Scoring-rubric version | |
| Scoring-key path and SHA-256 | |
| Platform configuration export path and SHA-256 | |
| Planned recruitment start | |
| Planned collection end | |
| Study owner | |
| Analysis owner | |
| Human Review decision | Decision-log ID and URL |
| Repository commit | Full commit hash |

## Research purpose

- Primary purpose: identify unclear instructions, technical failures, scoring ambiguity, and candidate-geometry confusion before a confirmatory study.
- Tested records: list only existing registry record IDs.
- Explicit non-claims: no test of Unicode eligibility, general-population recognition, formal-standard status, real-world plain-text use, or artwork acceptance.

## Locked stimuli

Record one row per stimulus in a restricted mapping that participants and blinded scorers cannot access. Use an opaque presentation token and a static derivative with neutral metadata. Preserve the source SVG separately.

| Opaque token | Registry record ID | Candidate asset ID | Asset status | Source SVG SHA-256 | Derivative SHA-256 | Render size/background |
| --- | --- | --- | --- | --- | --- | --- |
| | | | `study-ready` | | | |

| Blinding field | Locked value |
| --- | --- |
| Restricted token-mapping path and SHA-256 | |
| Roles permitted to access mapping before coding lock | |
| Public sealed manifest path and SHA-256, if used | Hashes only; no token-to-record mapping |
| Mapping disclosure point | After collection closes and initial blinded coding is locked |

Do not commit or publish the completed token-to-record mapping while participants can be recruited or respond. A public preregistration may publish a hash of the restricted mapping so later disclosure can be verified, but MUST NOT pair tokens, filenames, URLs, or derivative hashes with semantic records in a way recruits can reverse. Delay the full mapping until collection is closed and initial blinded scoring is locked.

Any geometry, rendering, prompt, answer-choice, or scoring-key change creates a new protocol/instrument version and new hashes. Data collected before and after a change MUST remain separate.

## Exposure and randomization lock

Complete every field before launch:

| Design field | Locked value |
| --- | --- |
| Candidate allocation | `one candidate per record per participant` or a fully specified alternative |
| Candidate assignment | Algorithm and balancing rule |
| Stimulus order | Algorithm and randomization unit |
| Forced-choice order | Algorithm and randomization unit |
| Seed or randomization audit | Generation method and restricted audit-record path |
| Persisted fields | Presentation index, opaque token, and displayed choice order |

Default recommendation for the first pilot: each participant sees exactly one candidate for each tested record, each candidate receives approximately balanced exposure, stimulus order is independently randomized per participant, and the four response-class choices are independently randomized per item. `None of these` and `I do not know` remain after the randomized class choices. This limits learning from repeated same-class candidates.

If the pilot tests more than one candidate for a record, either use balanced assignment so each participant sees only one candidate for that record, or preregister a repeated-measures design with carryover controls and separate candidate-level analysis. Never silently treat repeated responses from one participant as independent participants.

The collection system MUST persist the actual opaque token, presentation index, and displayed choice order for each item. Record enough restricted randomization audit information to reproduce or verify assignment without placing semantic mappings in participant-facing assets. Do not use response accuracy to alter assignment.

## Sampling plan

- Planned sample: choose one integer from 12 through 18 before recruitment.
- Population: adults age 18 or older with recent audio or synthesis experience who can access the visual stimuli.
- Recruitment channels: list each channel and the audience it reaches.
- Group coverage goal: practitioners; educators or learners; plugin, DAW, hardware, or music-technology practitioners. A formative sample need not support group comparisons.
- Duplicate prevention: use a privacy-preserving method documented here; do not store IP addresses in the response dataset.
- Optional non-domain cohort: excluded from this pilot unless separately authorized and preregistered.

Recruitment wording MUST avoid canonical names, expected answers, vendor comparisons, and claims that the glyphs are standardized or proposed for Unicode.

## Eligibility and exclusions

Apply exclusions without looking at whether an answer is correct.

### Include

- Age 18 or older.
- Self-reports recent audio or synthesis experience under the locked eligibility question.
- Completes consent and at least one full stimulus item.

### Exclude from primary analysis

- Ineligible age or experience response.
- No consent.
- Duplicate submission under the preregistered duplicate rule.
- Test, preview, or researcher submission.
- Technical failure that prevents stimulus display or response capture.
- Completion with no full stimulus item.

Partial eligible responses remain in item-level denominators for completed items. Do not exclude fast, low-confidence, incorrect, contaminated, or `I do not know` responses merely because they weaken results. Report every exclusion category and count.

## Stop rules

Collection stops at the earliest of:

1. The locked number of eligible completions is reached.
2. The locked collection-end timestamp is reached.
3. A privacy, consent, security, or data-integrity incident occurs.
4. A stimulus, randomization, or capture defect could materially invalidate responses.
5. Human authorization is withdrawn.

For rules 3 through 5, suspend collection, preserve an incident record without unnecessary personal data, and seek Human Review before resuming. Do not extend collection based on observed accuracy or confusion. Replacing excluded responses is permitted only until the locked eligible-completion target or end timestamp is reached.

## Measures and estimands

The unit of analysis is one eligible participant response to one stimulus.

| Measure | Operational definition | Denominator |
| --- | --- | --- |
| Exact free-text recognition | Both blinded scorers, or the preregistered adjudication process, classify the response as the intended class under the locked key | Eligible completed free-text items |
| Forced-recognition accuracy | Selected choice equals the intended class | Eligible completed forced-choice items |
| `I do not know` rate | Explicit `I do not know` selection in the applicable task | Eligible completed items for that task |
| Directed confusion | Response classified as one particular wrong initial-core record | Eligible completed items for the source stimulus |
| Confidence | Integer 1 through 5 following the participant's forced choice | Eligible completed confidence items |
| Contamination flag | Participant reports recognizing the stimulus from a specific product | Eligible participants answering the post-task item |
| Completion | Participant completes every required task for every presented stimulus | Eligible started participants |

For the pilot, all recognition estimates are descriptive. Report numerator, denominator, percentage, and 95% Wilson interval. Do not use the confirmatory interpretation thresholds as pass/fail rules.

## Scoring and adjudication

- Freeze the exact-response key, including normalization and alias rules, at the recorded path and hash before collection.
- Two scorers independently code normalized free text while blinded to participant identity and forced-choice response.
- Preserve raw response text separately from normalized text and coding.
- Calculate raw percent agreement and Cohen's kappa for the primary correct/incorrect classification. Report category-level agreement if a multiclass confusion code is used.
- Resolve disagreements using a third blinded scorer or the locked consensus procedure; record original codes and resolution.
- Do not add an alias or broaden correctness after inspecting responses. Novel wording is `ambiguous` or `other` unless already covered by a locked rule.

## Analysis plan

For each stimulus:

1. Produce completion and exclusion counts.
2. Report exact free-text recognition, forced accuracy, and `I do not know` rates with 95% Wilson intervals.
3. Produce free-text and forced-choice confusion matrices using counts and row percentages.
4. Report confidence as counts by scale point and median with interquartile range.
5. Summarize preregistered qualitative theme codes and list uncategorizable responses without inventing post-hoc correctness rules.
6. Repeat primary measures with contaminated responses retained and, as a labeled sensitivity analysis, omitted.
7. Report experience-band or role-group breakdowns only as exploratory counts and percentages.

Do not conduct significance tests or rank candidate glyphs unless a separate analysis was preregistered. Separate observations, interpretations, limitations, and recommendations.

## Pilot decision rules

The pilot can recommend only one of these actions per candidate:

- `instrument-ready`: no material instruction, scoring, rendering, or capture defect observed; proceed only after a separately locked confirmatory protocol and authorization.
- `revise-instrument`: prompts, choices, eligibility, capture, or scoring need revision without deciding artwork quality.
- `revise-candidate`: repeated opposite-class or undocumented-parameter interpretations indicate a geometry revision should be prepared and tested as a new candidate.
- `insufficient-pilot-data`: technical failure, sample shortfall, or unresolved scoring ambiguity prevents a useful recommendation.

No pilot outcome changes registry status or accepts artwork.

## Privacy, consent, and retention lock

Before Human Review, complete [`pilot-consent-and-data-plan-template.md`](pilot-consent-and-data-plan-template.md) and record:

- Collection platform and configured metadata collection.
- Data fields, access roles, storage locations, retention period, and deletion date.
- Aggregate publication plan and whether de-identified response text can be published.
- Contact and withdrawal process available before anonymization or aggregation.

## Deviations and closeout

Log every deviation with timestamp, reason, affected records, whether data collection paused, and disposition. At closeout, archive the locked instrument, hashes, scoring key, analysis code, exclusions, aggregate results, and limitations at the paths below. Do not commit direct identifiers or platform exports containing unapproved metadata.

| Closeout artifact | Repository path or documented restricted location |
| --- | --- |
| Locked instrument | |
| Scoring key | |
| Stimulus/hash manifest | |
| Randomization audit | |
| Analysis code | |
| Exclusion log | |
| Aggregate results and limitations | |
