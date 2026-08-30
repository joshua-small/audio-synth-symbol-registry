# Pilot Consent and Data Plan Template

## Boundary

This template is preparatory. Its completion does not authorize recruitment or collection. Human Review must approve the completed, platform-specific version before launch. If the study involves minors, incentives, sensitive data, an institution, a vendor, or a claim of formal research status, stop for additional authorization and applicable ethics review.

This project is not promising anonymous collection unless the configured platform and server logs make that statement true. Prefer the narrower claim that the response dataset excludes direct identifiers.

## Participant-facing consent notice

Replace every bracketed field before review.

> You are invited to take part in a short formative test of original visual symbols for audio and synthesis concepts. The purpose is to find unclear instructions and confusing candidate designs before a larger study.
>
> Participation is voluntary. You must be at least 18 years old. The study takes about [duration]. You will view [count] symbols, describe their meaning, choose among response classes, rate confidence, and optionally explain your reasoning.
>
> There is no direct benefit to you. A possible inconvenience is uncertainty or frustration when interpreting unfamiliar symbols. You may skip optional explanations or stop before submitting.
>
> If you consent, the response dataset will collect [list exact fields]. It will not include names, email addresses, employer names, precise location, or IP addresses. [Accurately describe whether a refusal or ineligibility event is retained, and describe unavoidable platform logs, cookies, duplicate controls, retention, and who can access them.] Do not include personal information in free-text responses.
>
> De-identified responses may be analyzed and [aggregate results / short de-identified excerpts / no response text] may be published in the project's public repository. Data will be retained until [ISO 8601 date or rule], then [deletion or archival action]. Once responses have been irreversibly anonymized or published only in aggregate, removing one participant's response may no longer be possible.
>
> Questions or withdrawal requests before anonymization can be sent to [contact method]. [State whether there is compensation; for the initial unpaid pilot, say there is none.]
>
> By selecting `I consent`, you confirm that you are at least 18, have read this notice, and voluntarily agree to participate.

Required choices: `I consent` and `I do not consent`. A non-consenting response must end before eligibility or study-item responses are collected. The approved notice MUST truthfully state whether the platform retains a refusal event or unavoidable request logs. Do not place a refusal in the participant response dataset unless Human Review approves a specific audit need, field, and retention period.

## Data inventory

| Field | Purpose | Required? | Sensitivity | Published form | Retention |
| --- | --- | --- | --- | --- | --- |
| Opaque response ID | Join item rows; detect platform retries | Yes | Low if unlinkable | Not published | |
| Consent status | Route the form; retain consent only for submitted participant records unless a refusal audit is specifically approved | Conditional | Low | Aggregate count | |
| Age eligibility | Eligibility audit after consent | Yes | Low | Aggregate count | |
| Role group | Target-audience description | Yes | Low | Aggregate | |
| Broad experience band | Exploratory description | Yes | Low | Aggregate | |
| Filter-term familiarity | Exploratory description | Yes | Low | Aggregate | |
| Optional broad region | Geographic context | No | Moderate in small cells | Coarsened aggregate or suppressed | |
| Opaque stimulus token | Link response to locked stimulus | Yes | Low | Aggregate mapping after collection | |
| Free-text meaning | Primary recognition measure | Yes | May contain volunteered identifiers | Coded aggregate; excerpt only if approved | |
| Forced choice | Recognition measure | Yes | Low | Aggregate | |
| Confidence | Confidence distribution | Yes | Low | Aggregate | |
| Optional visual explanation | Qualitative diagnostic | No | May contain volunteered identifiers | Themes; excerpt only if approved | |
| Product-recognition flag | Contamination sensitivity analysis | Yes | Low | Aggregate | |
| Timing or device fields | Technical QA only if justified | [Yes/No] | Potentially fingerprinting | Aggregate or not published | |

Do not collect names, email addresses, employer names, precise location, IP addresses, advertising identifiers, or unrelated account-profile data in the response dataset. Disable analytics and platform metadata collection where practical. Document anything the platform retains outside the response dataset.

## Access, storage, and deletion

| Data stage | Location | People/roles with access | Encryption/access control | Retention/deletion action |
| --- | --- | --- | --- | --- |
| Collection platform | | | | |
| Restricted raw export | | | | |
| Scoring copy | | Blinded scorers | | |
| De-identified analysis data | | | | |
| Public aggregate output | Repository | Public | Repository controls | Indefinite unless withdrawn by governance decision |

- Store the participant-code-to-contact mapping nowhere unless withdrawal handling makes one necessary and Human Review approves it.
- Scan free text for volunteered identifiers before sharing it with scorers or publishing excerpts.
- Use minimum cell-size suppression of [locked value] for optional region and subgroup reporting.
- Record deletion completion without preserving deleted participant content.

## Incident and withdrawal handling

- Pause collection for unauthorized data capture, exposed raw data, misleading consent text, or platform behavior inconsistent with this plan.
- Preserve only the minimum incident facts needed for review.
- Notify the project owner and seek authorization before resuming.
- Honor a verifiable withdrawal request received before the stated anonymization cutoff using the opaque response ID or approved process. If the ID is the verification method, display it to the participant at submission and explain that they must retain it.
- Do not promise deletion after data can no longer be linked to a participant.

## Human Review launch checklist

- [ ] Exact recruitment channel and wording reviewed.
- [ ] Platform behavior and server/log metadata verified.
- [ ] Consent language matches actual collection and publication.
- [ ] Retention dates and responsible person recorded.
- [ ] Incentive status recorded.
- [ ] Minor, institution, vendor, sensitive-data, and formal-research boundaries checked.
- [ ] Human Review decision recorded before collection.
