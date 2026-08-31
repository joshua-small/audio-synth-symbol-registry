# Pilot Instrument and Data Contract

## Status and use

This is the versionable instrument specification for the formative recognition pilot. Before launch, instantiate it with opaque stimulus tokens, lock the instrument version and commit, and obtain Human Review. Do not expose the token-to-record mapping in the participant-facing form.

The prompts and order below implement [`../recognition-study-protocol.md`](../recognition-study-protocol.md). Any substantive wording or task-order change must be recorded in the preregistration.

## Participant flow

### 1. Consent

Display the approved instance of [`pilot-consent-and-data-plan-template.md`](pilot-consent-and-data-plan-template.md).

- `I consent`
- `I do not consent`

End immediately on non-consent without collecting eligibility or study-item responses. Apply the approved platform-specific rule for a refusal event and unavoidable request logs; do not imply those records do not exist unless verified. Do not retain a participant-table row for non-consent unless the Human Review-approved data plan expressly requires it.

### 2. Eligibility and cohort description

1. `Are you 18 years old or older?` (`Yes`; `No`). End as ineligible on `No`. Retain an ineligible event only if the approved data plan specifies its fields and retention.
2. `Which best describes your recent audio or synthesis experience?` (`Audio production or live sound`; `Audio or synthesis education or learning`; `Plugin, DAW, hardware, or music-technology work`; `Another audio or synthesis role`; `No recent audio or synthesis experience`). Permit more than one role only if the platform can export each selection unambiguously. End as ineligible for the target-audience pilot if only the last choice applies.
3. `How long have you worked with or studied audio or synthesis?` (`Less than 1 year`; `1 to 2 years`; `3 to 5 years`; `6 to 10 years`; `More than 10 years`).
4. `How familiar are you with filter terms such as high-pass and low-pass?` (`Not at all familiar`; `Slightly familiar`; `Moderately familiar`; `Very familiar`; `Extremely familiar`).
5. Optional: `Which broad region are you in?` Use only a preregistered coarse list with `Prefer not to answer`; omit if no geographic analysis is planned.

Do not collect employer, job title, account handle, or precise location.

### 3. Randomized stimulus loop

For each opaque token, once, in a randomized order:

1. Display only the locked monochrome stimulus.
2. Ask: `In an audio or synthesis context, what do you think this symbol means?`
   - Free-text response.
   - Separate choice: `I do not know`.
3. Ask: `Which response is the best match for this symbol?`
   - `High-pass filter`
   - `Low-pass filter`
   - `Band-pass filter`
   - `Band-stop filter`
   - `Low-shelf filter`
   - `High-shelf filter`
   - `None of these`
   - `I do not know`
   - Randomize all eight choices and record their displayed order.
4. Ask: `How confident are you in your answer?`
   - Integers 1 through 5, with endpoints `not at all confident` and `very confident`.
5. Optional: `What visual feature led you to that answer?`
   - Free text.

Do not reveal correctness or show another participant's response.

### 4. Contamination and completion

After every stimulus:

1. `Before this study, did you recognize any symbol from a specific product or interface?` (`Yes`; `No`; `Not sure`).
2. If `Yes`, optional: `Which symbol or product? Do not include personal information.`

Then show a neutral completion message with the project contact and withdrawal deadline. Do not claim that a candidate was accepted or that the participant's answers were correct.

## Row-level response contract

Store one participant table and one item-response table. Use UTF-8 CSV, JSON Lines, or another open tabular serialization fixed in the preregistration. Empty optional values are null, not empty strings; booleans use true/false; timestamps use ISO 8601 with numeric offsets.

### Participant table

| Field | Type | Constraint |
| --- | --- | --- |
| `response_id` | string | Opaque, unique, not derived from contact or account data |
| `instrument_version` | SemVer string | Exact locked instrument version |
| `consented` | boolean | Must be true for retained eligible response |
| `age_18_or_over` | boolean | Must be true for target-audience eligibility |
| `role_groups` | array of enum strings or null | Required only if this question was reached; locked option identifiers, not displayed labels |
| `experience_band` | enum string or null | Required only for target-audience participants who reach this question |
| `filter_term_familiarity` | integer or null | Required only for target-audience participants who reach this question; otherwise null; 1 through 5 |
| `broad_region` | enum string or null | Optional, coarse, suppress small cells |
| `started_at` | datetime or null | Collect only if justified in approved data plan |
| `completed_at` | datetime or null | Collect only if justified in approved data plan |
| `completion_status` | enum | `complete`, `partial`, `ineligible`, `withdrawn`, `technical-failure` |
| `contamination_flag` | enum or null | `yes`, `no`, `unsure` |
| `contamination_note` | string or null | Redact volunteered identifiers before scorer access |
| `exclusion_code` | enum or null | One preregistered code; never correctness-based |

The approved data plan MUST choose whether ineligible events are retained individually or counted only in a platform-level aggregate. If retained, store only fields reached before the exit plus `completion_status: ineligible` and the applicable exclusion code; all downstream fields are null. For example, an under-18 event has no role, experience, familiarity, region, contamination, or item-response data. A no-target-experience event may retain the reached role choice but has no later cohort fields or item rows. If individual ineligible events are not retained, report only an aggregate count and do not create participant rows for them.

### Item-response table

| Field | Type | Constraint |
| --- | --- | --- |
| `response_id` | string | Foreign key to participant table |
| `opaque_stimulus_token` | string | No semantic ID or revealing filename |
| `presentation_index` | integer | 1 through number of stimuli |
| `choice_order` | array of enum strings | Exact displayed order |
| `free_text_raw` | string or null | Restricted raw dataset only |
| `free_text_redacted` | string or null | Scorer and publication working value |
| `free_text_idk` | boolean | Explicit `I do not know` selection |
| `forced_choice` | enum string or null | Locked response identifier |
| `confidence` | integer or null | 1 through 5 |
| `visual_explanation_raw` | string or null | Restricted raw dataset only |
| `visual_explanation_redacted` | string or null | Scorer and publication working value |
| `item_complete` | boolean | Required tasks captured |
| `technical_failure_code` | enum or null | One preregistered technical code |
| `directed_confusion` | enum or null | `low-shelf__high-pass`, `high-shelf__low-pass`, `high-pass__low-shelf`, `low-pass__high-shelf`, `band-pass__band-stop`, or `band-stop__band-pass`; otherwise null |

Shelf recognition concerns affected frequency side only. Do not collect or derive boost/cut correctness from these items. The construction template fixes the ordered control pairs and excludes gain-sign and 0 dB-baseline prompting.

The private analysis key maps `opaque_stimulus_token` to registry record ID, candidate asset ID, asset hash, and derivative hash. Keep it in the preregistered restricted location, hidden from participants and blinded scorers until collection closes and initial coding is locked. A public manifest may contain only a cryptographic commitment that does not expose or reversibly associate token meanings. Freeze the instrument text, choice identifiers, branching, candidate-allocation rule, randomization implementation, and private key by path and SHA-256 in the preregistration.

## Scoring output contract

Keep each scorer's original code. Do not overwrite disagreement with adjudication.

| Field | Type | Constraint |
| --- | --- | --- |
| `response_id` | string | Participant join key |
| `opaque_stimulus_token` | string | Item join key |
| `scorer_id` | opaque enum | No scorer name in published data |
| `meaning_code` | enum | `high-pass`, `low-pass`, `band-pass`, `band-stop`, `low-shelf`, `high-shelf`, `other`, `ambiguous`, `idk` |
| `exact_correct` | boolean | Derived only from locked scoring key |
| `theme_codes` | array of enum strings | Preregistered themes; new themes remain labeled exploratory |
| `adjudication_status` | enum | `not-needed`, `pending`, `resolved` |
| `adjudicated_meaning_code` | enum or null | Preserve original scorer rows |
| `adjudication_note` | string or null | Method note without participant identity |

## Frozen exclusion codes

- `under-18`
- `no-target-experience`
- `no-consent`
- `duplicate`
- `researcher-test`
- `stimulus-display-failure`
- `capture-failure`
- `no-complete-item`
- `withdrawn`

Adding an exclusion code after collection begins is a protocol deviation. Incorrectness, low confidence, speed, contamination, `I do not know`, and unusual language are not exclusions.

## Export validation before analysis

- Participant `response_id` values are unique.
- Retained ineligible rows contain only fields reached before exit, and their downstream fields are null.
- Every item row joins to exactly one retained participant row.
- Each participant-token pair occurs no more than once.
- Tokens and choice identifiers belong to the locked instrument.
- Presentation indices and choice orders are complete and valid.
- Confidence values are integers from 1 through 5.
- No direct identifiers or unapproved platform metadata exist in analysis exports.
- Counts of consent, eligibility, completion, exclusion, and technical failure reconcile.
- File hashes and row counts are recorded before scoring and analysis.
