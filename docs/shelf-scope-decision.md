# Shelf Scope Decision

## Decision boundary

Issue [#50](https://github.com/joshua-small/audio-synth-symbol-registry/issues/50) asks whether the project's active research repertoire should expand from four response concepts to six by adding low shelf and high shelf. This decision is narrower than registry adoption.

Approval would establish two **sign-agnostic provisional research concepts** only. It would not add registry records, choose identifiers or aliases, change a record's status, accept artwork, launch a study, or assert Unicode eligibility.

## Recommendation

Expand the active research repertoire from four to six provisional concepts: high-pass, low-pass, band-pass, band-stop, low shelf, and high shelf.

For the shelf pair, define the research hypothesis by affected frequency side:

- low shelf: the low-frequency side is affected relative to the high-frequency side;
- high shelf: the high-frequency side is affected relative to the low-frequency side.

Gain sign, gain amount, exact slope, Q, overshoot, dynamic behavior, and implementation algorithm remain parameters or presentation state. Do not create four first-class boost/cut shelf concepts.

This recommendation is strong at the semantic and practical-scope layers, provisional at the glyph layer, and neutral at the Unicode layer.

## Why inclusion is warranted

1. **The semantics converge across independent source types.** Eight vendor and engineering sources keep low/high side stable while gain changes sign (EV-050 through EV-057). Historical, educational, trade-media, and community sources show the same separation (EV-060 through EV-065). W3C and JUCE model shelf type separately from signed gain; product sources expose the same distinction through controls and documentation.
2. **The pair has historical and educational depth.** The corpus includes a 1996 course assignment, a 1997 mixer manual, a 2004 mastering article, and current teaching material. Shelves are not a newly invented completion device for this project.
3. **They improve practical family coverage.** Current DAWs, plug-ins, hardware-derived EQs, and production education treat shelves as ordinary peer filter choices. Joshua's report that all six forms recur in production and mixing is relevant expert-user evidence of practical importance, while remaining separate from the documentary corpus.
4. **Compact selection is a real use case.** FabFilter and Image-Line document compact shape selectors, while other products use graph context, labels, or hardware controls. This supports researching a character-like treatment without claiming that one contour is already standardized.
5. **The semantic model scales cleanly.** Two side concepts plus a gain parameter mirrors engineering practice and avoids an arbitrary four-record boost/cut split. The same separation can later support compositional interchange experiments.

## Strongest case for exclusion or deferral

1. **An axis-less stroke is underdetermined.** A descending two-plateau curve can depict low-shelf boost or high-shelf cut depending on which plateau is the unaffected baseline. Its ascending complement has the inverse ambiguity. A literal curve cannot simultaneously be sign-agnostic and self-identifying merely by vertical direction.
2. **The rendered response is not invariant.** Zero gain is flat. Slope, Q, overshoot, dynamics, and product-specific hybrid behavior alter the curve. Ableton Channel EQ even combines high shelving with low-pass behavior under attenuation.
3. **Cross-vendor contour convergence is not established.** Some products provide shape selectors; others depend on labels, axes, control position, or full response displays. The corpus supports the concepts more strongly than any standalone glyph.
4. **Existing text communication is adequate in many cases.** Practitioners use `low shelf`, `high shelf`, numeric parameters, prose, and screenshots. The bounded corpus found no portable shelf character convention. A useful new shorthand is not automatically an existing encoded character.
5. **Six-way testing increases confusability risk.** Shelf candidates must be distinguished from pass/cut concepts and must not train participants to mistake a signed illustration for the sign-agnostic type.

These objections defeat immediate record or artwork adoption. They do not defeat research-scope inclusion because the next work is specifically designed to test the unresolved representation questions.

## Layered assessment

| Layer | Current finding | Consequence |
| --- | --- | --- |
| Semantic stability | Strong for two side-based concepts independent of gain sign | Suitable for provisional research scope |
| Practical relevance | Strong across software, hardware, education, and owner practice | Six-concept study coverage is warranted |
| Standalone glyph feasibility | Plausible but unresolved; axis-less ambiguity is material | Compare neutral, signed illustrative, and baseline-bearing treatments |
| Registry eligibility | Not assessed under the acceptance rubric | Do not create or promote records through this decision |
| Unicode eligibility | Not established; no portable character convention or encoding evidence | Maintain Unicode HOLD and make no proposal claim |

## Consequences of the recommended choice

Approval authorizes the project to:

- treat low shelf and high shelf as provisional concepts in research plans and six-way confusability analysis;
- develop original, non-traced study candidates that preserve the sign-agnostic semantic nucleus;
- compare axis-free forms with expanded axis/baseline-bearing alternatives;
- include separately labeled signed boost/cut illustrations as presentation variants, not peer concepts;
- test shelf/pass and low/high confusions before any registry proposal.

Approval does **not** authorize:

- adding live registry records or canonical identifiers, names, aliases, or fallbacks;
- accepting candidate artwork or declaring any contour canonical;
- changing the initial four records' statuses;
- recruiting participants or launching a recognition study;
- making Unicode, emoji, font, AES, IEC, ISO, SMuFL, vendor, or community submissions or claims.

Each of those actions retains its existing Human Review boundary.

## Human Review

### HR-001: Active research repertoire

- **Decision needed:** Should the active research repertoire expand from four to six provisional concepts by adding sign-agnostic low shelf and high shelf?
- **Recommendation:** Choose A.
- **A - Approve six-concept research scope:** Authorizes the bounded consequences above. No record, identifier, alias, status, artwork, study-launch, or external-position adoption occurs.
- **B - Keep four primary concepts and park shelves:** Preserve this corpus as future-scope evidence, but do not include shelves in the current candidate or recognition work. This reduces current complexity but postpones testing a practically important and semantically mature pair.
- **C - Require additional evidence before deciding:** Keep Issue #50 open and specify the missing evidence class. This avoids commitment but should be used only if the existing vendor, engineering, historical, education, media, and community sample leaves a concrete unanswered scope question.
- **D - Exclude shelves from this project:** Close Issue #50 as not planned while retaining the reports. This produces the narrowest registry but leaves a routine EQ family outside the project's intended practical coverage.
- **Merge status:** Blocked pending project-owner authorization. Issue #50 should remain open until the decision is recorded and any approved implementation work is tracked.

## Evidence basis

- [Shelf semantic-model review](../evidence/reports/2026-08-30-shelf-semantic-model.md)
- [Shelf history, education, trade-media, and community report](../evidence/reports/2026-08-30-shelf-history-education-community.md)
- [Shelf vendor-semantics report](../evidence/reports/2026-08-30-shelf-vendor-semantics.md)

## Limitations

- The source sets are purposive and English-language, not market-weighted censuses.
- No recognition study has tested neutral shelf candidates or six-way confusability.
- No independently established portable shelf character convention was found.
- This synthesis does not score hypothetical shelf records under the registry acceptance rubric.
- No third-party artwork was copied, retained, traced, or adopted.

## Agent Report - 2026-08-30T15:08:49-07:00

- Report status: completed
- Scope: synthesis of the merged semantic model, history/education/community corpus, and vendor corpus for Issue #50.
- Result: recommends expanding research scope from four to six using two sign-agnostic provisional shelf concepts while maintaining separate glyph-feasibility, registry-eligibility, and Unicode-eligibility gates.
- Evidence: EV-050 through EV-057 and EV-060 through EV-065, plus the three linked derived analyses.
- Changes deliberately omitted: no registry record, identifier, name, alias, fallback, status, assessment, artwork, study launch, or external position.
- Validation: `npm test` passed 84/84 tests and `git diff --check` passed.
- Independent review: pending.
