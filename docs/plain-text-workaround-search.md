# Bounded plain-text workaround search

Status as of 2026-08-29. This report addresses prioritized next work item 2 in [the current evidence-status synthesis](current-evidence-status.md). It does not change any record status, semantic scope, artwork policy, or external-standards position.

## Question

Can the current corpus show at least three independent cases where communication about compact audio-filter response symbols is ambiguous, lossy, image-dependent, or custom-font-dependent?

This is narrower than asking whether a portable response glyph is already used in plain text. A positive workaround case can demonstrate communication friction without demonstrating an encoded-character convention.

## Method and bounds

The pass searched the following sectors:

- journalism and manufacturer documentation;
- education and explanatory material;
- audio, production, and manufacturer-user forums;
- open-source icon fonts and source code;
- issue trackers and programming Q&A.

Queries combined terms such as `high pass`, `low pass`, `low cut`, `filter symbol`, `EQ symbols`, `icon`, `ASCII`, `font`, and `what does this mean`. The search reviewed the existing ledger and a bounded set of public web results on 2026-08-29.

A result counted only when the artifact itself exposed a communication workaround or failure mode. Mere use of `HPF`, `LPF`, `BPF`, a full text label, a graph in a manual, or a product UI icon did not count as compact-glyph interchange.

## Positive workaround cases

| Case | Independent source | Observed communication behavior | Workaround class | What it supports | What it does not support |
| --- | --- | --- | --- | --- | --- |
| 1 | [r/audio: "I need help figuring out what this symbol means"](https://www.reddit.com/r/audio/comments/hsa33u/i_need_help_figuring_out_what_this_symbol_means/) (EV-021) | A user supplied an image to ask what an audio-control symbol meant. Replies identified it with several prose formulations, including low-frequency roll-off, low-frequency cut, and high-pass filter. | Image-dependent identification plus terminology expansion | A response-curve control can be difficult to identify or discuss without attaching its image. | The thread does not show the symbol used as plain text, nor does it establish one canonical name or contour. |
| 2 | [Allen & Heath Community: "EQ symbols"](https://forums.allen-heath.com/t/eq-symbols/13319) (EV-022) | A user tried to identify console EQ symbols using fragments such as "TOP AN Y going to left" and "line with diamond shape"; another participant had to request clarification and point to an illustrated reference guide. | Lossy prose approximation and documentation fallback | Existing text vocabulary can be inadequate for referring to a particular compact UI shape efficiently. | The improvised wording is not stable ASCII art or a reusable glyph convention. |
| 3 | [DSSSP icon-font mapping](https://github.com/NumberOneBot/dsssp/blob/main/src/icons/font.css) (EV-005) | Source code maps `bandpass`, `high-pass`, `low-pass`, `notch`, `peak`, and shelf icons to custom-font code points `U+E900` through `U+E908`. Correct rendering requires the bundled `dsssp` font. | Custom-font and Private Use Area dependency | Software authors have implemented a compact filter-response family through font-shaped text machinery. | The mappings are project-local and nonportable; they are not evidence of interoperable Unicode text. |

These are three independent publishers and three different workaround classes at the family level. The acceptance rubric's formal non-go condition applies to each proposed record, however, so family-level diversity cannot be substituted for three qualifying examples attached to one record. DSSSP is also stronger as UI implementation evidence than as communication evidence: its CSS class names carry portable textual semantics even though rendering the compact shapes requires the bundled font.

## Corroborating but non-counted findings

- [r/musicproduction: "I keep mixing up low pass and high pass"](https://www.reddit.com/r/musicproduction/comments/1ck9iwi/i_keep_mixing_up_low_pass_and_high_pass/) (EV-023) documents persistent label confusion. One reply describes HPF and LPF through textual slash and backslash "knee" approximations. This corroborates the utility of a visual mnemonic, but it is not counted separately because it does not demonstrate an established compact-glyph interchange practice.
- [FontAudio](https://github.com/fefanto/fontaudio) (EV-025) explicitly says mainstream icon sets lack audio-specific filters and offers fonts, SVGs, and JUCE drawing support. It corroborates an implementation gap, but it is not counted as an additional plain-text case because its stated use is software UI artwork.
- [Harmony Central: "High-Pass and Low-Pass Filters"](https://www.harmonycentral.com/articles/recording/high-pass-and-low-pass-filters-r783/) (EV-019) calls the controls "bent-line icons", then explains them with prose and images. This supports recognizability and educational dependence on illustrations, not text-glyph use.
- [Overclockers UK microphone discussion](https://forums.overclockers.co.uk/threads/microphone-battle-blue-yeti-vs-editors-keys-sl600.18677863/) reports that product documentation called a control a low-pass filter while a participant interpreted the printed shape as a low-cut symbol. This is potentially valuable counterevidence about semantic mismatch, but it is not entered in the ledger or counted here because the underlying manufacturer artifact was not independently recovered during this pass.
- Manufacturer manuals that say "click the low cut symbol" or similar identify graphical controls by prose. They show product-icon use, not the transmission of those icons as standalone text.

## Negative findings

The bounded pass did not find:

- an independently used Unicode character or character sequence with the target filter-response meaning;
- a response symbol copied and pasted between unrelated text systems while retaining meaning;
- a stable ASCII-art convention shared across independent communities;
- a custom-font mapping adopted by multiple independent projects as an interchange agreement;
- journalism, education, or product documentation using an axis-less response symbol inline as ordinary searchable text;
- evidence that labels such as `HPF`, `LPF`, `low cut`, and `high cut` have been displaced by a compact glyph in prose communication.

Labels and abbreviations remain the dominant portable text forms in the reviewed material.

## Finding

The bounded search is positive for communication friction and workaround use, but negative for an established portable compact-glyph practice.

At the family level, the corpus supplies three independent workaround classes:

1. image-dependent identification (EV-021), specifically supporting high-pass/low-cut discussion;
2. lossy prose approximation (EV-022), ambiguously referring to several EQ shapes without reliably mapping each target record;
3. custom-font implementation (EV-005), covering high-pass, low-pass, band-pass, notch, peak, and shelves, but carrying semantics separately in CSS class names.

This does not establish three qualifying examples for any single registry record. In particular, EV-005's notch mapping cannot be counted as band-stop under the project's provisional related-term treatment. The per-record three-example formal non-go condition therefore remains open for high-pass, low-pass, band-pass, and band-stop.

The other formal Unicode non-go conditions also remain active: no current record is `registry-accepted`, the overlap/confusability audit is incomplete, visual convergence remains under study, community adoption of a portable form is not established, and no external action is authorized.

## Recommended disposition

- Record this family-level bounded pass as completed while leaving the per-record three-example safeguard open.
- Retain all four records at `evidence-collecting`.
- Use the three cases as design inputs for registry-first pilots: canonical ASCII IDs, accessible fallbacks, speech labels, SVG assets, and optional font mappings.
- In later pilots, measure whether users actually place the compact forms in messages, issue reports, documentation, or machine prompts when a portable mechanism exists.
- Reopen the search if a pilot, contributor, vendor, or community supplies a reproducible positive plain-text artifact.

## Agent Report - 2026-08-29T21:22:26-07:00

- Scope: performed a bounded positive search for ambiguous, lossy, image-dependent, ASCII-dependent, or custom-font-dependent communication about audio-filter response symbols.
- Evidence: evaluated EV-005, EV-019, EV-021 through EV-023, and EV-025 against direct public artifacts; recorded corroborating and negative findings separately.
- Result: identified three independent family-level workaround classes, but not three qualifying examples for any single record; found no established portable glyph interchange.
- Validation: checked every counted case against the source currently linked by the evidence ledger and checked that no counted case was merely a label, abbreviation, graph, or UI icon.
- Guardrails: changed no semantics, status, score, artwork, license, outreach, or standards claim; added no unverified source to the evidence ledger.
- Limitation: this was a bounded public-web pass, not an exhaustive corpus study. Some forum artifacts can change or disappear, and the underlying manufacturer source for the Overclockers counterexample was not recovered.
