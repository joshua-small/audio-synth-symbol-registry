# Blind Recognition Study Protocol

## Status

Draft protocol. Human Review is required before participant recruitment, a public participant call, incentives, or study launch.

## Purpose and limits

This protocol evaluates whether an original neutral reference glyph communicates its intended audio or synthesis semantic identity to its intended audience without explanatory text.

It does not establish Unicode eligibility, worldwide recognition, a formal standard, real-world use, or artwork acceptance. It does not replace the registry's text fallback and spoken label.

The protocol is informed by [ISO 9186-1:2014](https://www.iso.org/standard/59226.html), which specifies a method for testing graphical-symbol comprehensibility. This is an adapted, open protocol. The project MUST NOT claim ISO 9186 conformance unless a future study follows the complete applicable standard under qualified oversight.

## Research questions

For each glyph:

1. Can target-audience participants identify the intended response class from the glyph alone?
2. Which wrong meanings are systematically inferred?
3. Do participants distinguish high-pass from low-pass and band-pass from band-stop?
4. Does an axis-less treatment communicate the documented semantic identity without importing an undocumented parameter?
5. Does the geometry need revision, supplementary text, or rejection?

## Preconditions

Before launch, all of the following MUST exist:

- A linked registry semantic record.
- Original SVG geometry and complete provenance declaration.
- A locked `study-ready` rendering with a recorded cryptographic hash.
- A scoring key and accepted aliases written before responses are reviewed.
- Human Review authorization recorded in the PR and decision log.
- A privacy and consent notice appropriate to the recruitment method and jurisdiction.
- A repository location for anonymized data, instrument text, analysis code, exclusions, and results.

If a study includes incentives, a vendor, an institution, minors, sensitive data, or a claim of formal research status, stop for additional human authorization and applicable ethics review.

## Participants

### Target-audience cohort

The confirmatory target is at least 60 adults who can view the study graphics and have recent audio or synthesis experience. Recruit across at least three self-described groups where practical:

- Audio-production or live-sound practitioners.
- Audio or synthesis educators and learners.
- Plugin, DAW, hardware, or music-technology practitioners.

Collect only role group, broad experience band, self-reported familiarity with filter terminology, and optional region. Do not collect names, email addresses, IP addresses, employer names, or precise location in the response dataset.

This cohort evaluates usefulness in the intended domain. It does not claim representation of all audio users or the general public.

### Optional exploratory cohort

An optional separate cohort of at least 30 adults without regular audio or synthesis experience may assess first-impression intuitiveness. Analyze it separately. It does not veto domain-specific usefulness.

### Formative pilot

A 12 to 18 participant pilot may identify unclear instructions, technical failures, or scoring ambiguity. Do not pool pilot data with confirmatory results. Changes to geometry, prompts, response choices, scoring key, or eligibility require a versioned protocol and new locked stimulus hash.

## Study design

### Blinding

Participants MUST NOT see canonical names, aliases, semantic IDs, filenames, source paths, record URLs, vendor comparison material, other responses, or correctness feedback before completing every item.

Serve each stimulus under an opaque random token. The blind study MAY use a static derivative with identical visible geometry and neutral metadata. The production SVG remains the accessible published asset; a blind stimulus does not replace it.

### Stimuli

The initial study may test:

- High-pass filter
- Low-pass filter
- Band-pass filter
- Band-stop filter

Present monochrome, axis-less glyphs without axes, labels, numbers, color coding, surrounding controls, or product context.

Each participant sees every tested glyph once in randomized order. Do not provide feedback between items. Randomize forced-choice order.

### Tasks

For each stimulus, in this order:

1. **Unprompted meaning**
   - Prompt: "In an audio or synthesis context, what do you think this symbol means?"
   - Response: Free text plus "I do not know."

2. **Forced recognition**
   - Prompt: "Which response is the best match for this symbol?"
   - Choices: High-pass filter, low-pass filter, band-pass filter, band-stop filter, none of these, I do not know.
   - Randomize choice order.

3. **Confidence**
   - Prompt: "How confident are you in your answer?"
   - Scale: 1 "not at all confident" through 5 "very confident."

4. **Optional explanation**
   - Prompt: "What visual feature led you to that answer?"
   - Response: Free text.

After all items, ask whether the participant recognized a stimulus from a specific product. Treat this only as a contamination flag.

## Scoring

Two independent scorers MUST classify free-text responses using a preregistered rubric while blinded to participant identity.

A free-text response is correct only if it identifies the intended response class or an approved exact semantic equivalent.

| Record | Correct initial responses | Not automatically correct |
| --- | --- | --- |
| High-pass | high-pass, high pass, low cut, HPF | "cuts highs", "low-pass" |
| Low-pass | low-pass, low pass, high cut, LPF | "cuts lows", "high-pass" |
| Band-pass | band-pass, band pass, BPF | "notch", "band-stop" |
| Band-stop | band-stop, band stop, band-reject | "notch" until an approved record decision establishes exact equivalence |

Do not broaden correct responses after viewing results. Preserve ambiguous and uncategorizable responses. Report scorer agreement and resolve disagreement by a third blinded scorer or documented consensus.

For every glyph and cohort, report:

- Exact free-text recognition rate with 95% Wilson confidence interval.
- Forced-recognition accuracy with 95% Wilson confidence interval.
- "I do not know" rate.
- Confusion matrix.
- Most common free-text themes.
- Confidence distribution.
- Completion and exclusion counts.
- Contamination flags.
- Experience-band results, marked exploratory when underpowered.

## Interpretation thresholds

The thresholds guide a recommendation. They do not accept or reject artwork automatically.

| Outcome | Target-audience evidence | Recommended action |
| --- | --- | --- |
| Strong support | At least 70% exact free-text recognition, lower 95% Wilson bound at least 55%; at least 85% forced-recognition accuracy, lower bound at least 70%; no directed confusion with another initial-core record exceeds 15% | Consider retaining geometry, subject to full artwork review. |
| Revise | Fewer than 50% exact free-text recognition, any directed core-record confusion exceeds 25%, or responses reveal an undocumented parameter or opposite direction | Revise or reject geometry before further study. |
| Inconclusive | Results fall between the bands, sample quality is inadequate, or qualitative findings materially contradict numeric results | Gather more evidence or test a versioned alternative. |

A high forced-choice result paired with poor free-text recognition is not strong evidence of standalone comprehensibility.

## Analysis safeguards

- Lock protocol, scoring key, stimulus hashes, and thresholds before confirmatory recruitment.
- Do not delete responses except for preregistered technical or eligibility exclusions.
- State every exclusion and reason.
- Do not change geometry while confirmatory collection is active.
- Do not combine artwork versions without separate reporting.
- Do not describe an adapted study as ISO-certified or ISO-conformant.
- Publish anonymized aggregate data, questionnaire text, scoring rubric, and analysis code where consent and law permit.
- Separate observed results, interpretation, limitations, and recommendation.

## Accessibility and inclusion boundary

A visual-recognition study cannot test visual glyph recognition with participants who cannot access visual stimuli. Do not treat that exclusion as evidence about their competence or about accessibility.

Published meaningful artwork must still have a canonical text alternative and spoken label. A broader accessibility evaluation should test those text and speech alternatives directly, not infer their adequacy from this visual study.

Relevant references:

- [ISO 9186-1:2014](https://www.iso.org/standard/59226.html)
- [ISO 9241-210:2019, Human-centred design](https://www.iso.org/standard/77520.html)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)

## Human Review questions before launch

The study PR MUST ask:

1. Is the target audience and recruitment channel appropriate?
2. Is the purpose limited to comprehension of original registry artwork?
3. Are privacy, consent, incentive, and retention practices acceptable?
4. Is the locked stimulus set within approved semantic scope?
5. Are the scoring rubric and thresholds acceptable before data collection?
6. Should resulting evidence be published as a pilot, a confirmatory registry study, or both?

Each question MUST include an agent recommendation, alternatives, and consequences as required by `AGENTS.md`.
