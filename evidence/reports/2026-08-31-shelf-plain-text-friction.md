# Low-shelf and high-shelf plain-text-friction search

## Scope and method

This bounded follow-up asks whether low-shelf and high-shelf communication is ambiguous, lossy, image-dependent, or otherwise workaround-dependent in direct public artifacts. It does not ask whether shelf controls or response curves are common in product interfaces; UI familiarity alone is not evidence of a plain-text need.

The pass reviewed five lanes on 2026-08-31: manufacturer support, education, journalism, public issue/support trackers, and user communities. Candidates counted toward the project's safeguard only when the artifact itself exposed ambiguous or lossy communication about the record concept that required an image or improvised workaround. Ordinary names, abbreviation expansion, parameter lists, UI presence, concept-learning resolved by adequate prose, and graphs whose target was more specific than the record were excluded from the count.

## Query log

| Lane | Exact bounded query groups | Disposition |
|---|---|---|
| Cross-lane discovery | `"low shelf" "symbol" audio forum`; `"high shelf" "symbol" EQ forum`; `"low shelf" screenshot describe EQ forum`; `site:github.com/issues "low shelf" icon EQ` | Located forum, support, and issue candidates; no GitHub issue supplied a qualifying shelf-character workaround. |
| Community and product support | `"high shelf" "screenshot" EQ forum`; `"low shelf" "screenshot" EQ forum -site:facebook.com`; `"high shelf symbol" audio EQ`; `"low shelving symbol" EQ` | Located EV-080 through EV-083 and multiple nonqualifying screenshot/tutorial cases. |
| Record-specific ambiguity | `"high shelf" "what does this symbol" audio`; `"high shelf" "attached image" EQ help`; `"high shelf" "graph" "screenshot" forum EQ`; `"high shelf" "image" "high pass" forum` | Located EV-082 through EV-084 and support/education counterexamples. |
| Manufacturer and engineering support candidates | Results were followed into [Eventide SplitEQ support](https://www.eventideaudio.com/forums/topic/split-eq-reporting-ui-issue/), [TI TAS5805M support](https://e2e.ti.com/support/audio-group/audio/f/audio-forum/987192/tas5805m-config), and [Image-Line EQ support](https://forum.image-line.com/viewtopic.php?t=260806). | Excluded for implementation-specific state, adequate textual identification, or inaccessible decisive replies. |
| Education and journalism candidates | Results were followed into [Icon Collective](https://www.iconcollective.edu/types-of-eq), [Blue Cat Audio documentation](https://www.bluecataudio.com/Doc/Product_TripleEQ/), and the already-ledgered EV-062 through EV-064. | Clear labels and explanatory illustrations; no compact-character workaround. |

## Candidate artifacts and qualification disposition

| Evidence | Record assignment | Observed friction or workaround | Safeguard disposition | Limitation |
|---|---|---|---|---|
| [HifiGuides IEM discussion](https://forum.hifiguides.com/t/iem-discussion-thread-part-1/14641?page=415) (EV-080) | Low shelf | A participant asks whether `LSQ` means low shelf while exchanging EQ profiles through screenshots; another participant confirms the expansion and supplies a screenshot-led guide. | Excluded: ordinary product abbreviation plus general parameter instruction | This concerns a product/profile notation, not a compact shelf-response character. |
| [WiiM: How to PEQ from graph to filter](https://forum.wiimhome.com/threads/how-to-peq-from-graph-to-filter.6669/) (EV-081) | Low shelf | A participant supplies a graph and tries `HS/LS/PK`, dB, and Q without finding a textual parameterization that reproduces it. Replies suggest a low shelf only as an approximation and note visual-Q limitations. | Excluded: target response is more specific than, and not exactly representable by, the low-shelf record | The case is useful counterevidence that a type glyph would be insufficient for the intended response. |
| [Logic Pro Help: high-pass and high-shelf](https://www.logicprohelp.com/forums/topic/33587-definition-high-pass-and-high-shelf/) (EV-082) | High shelf | A participant asks for the semantic difference in text. A reply explains it in prose and with two images; the participant says they will save the explanation and screenshot the images. | Excluded: concept-learning is resolved adequately in prose; images illustrate rather than substitute for the record name | This is useful comprehension evidence, not a compact-character workaround. |
| [HomeRecording.com: EQ confused](https://homerecording.com/bbs/threads/eq-confused.429200/) (EV-083) | Low shelf and high shelf | Text explanations repeatedly fail to resolve what the two shelves affect. Participants add response images and a hardware screenshot before the user arrives at the low-below/high-above distinction. | Qualifies: sustained lossy prose plus reciprocal image dependence | One publisher/artifact counts once for each applicable record, not as multiple independent examples. |
| [r/WeAreTheMusicMakers: what does high shelf or low shelf mean](https://www.reddit.com/r/WeAreTheMusicMakers/comments/3xwb2c/what_does_it_mean_to_high_shelf_or_low_shelf/) (EV-084) | Low shelf and high shelf | A participant reports that videos use both terms without explaining them. Replies give parameterized prose; a follow-up comment says a picture helps and links an illustrated response example. | Excluded: ordinary prose communicates the record concepts; the image supports a more specific reciprocal response | The thread is material counterevidence to a claim that a compact glyph is required for the basic concepts. |

## Per-record disposition

### Low shelf

The new pass supplies one qualifying artifact, EV-083. The earlier shelf corpus also includes EV-065, where practitioners resolve low-shelf versus high-pass uncertainty through attenuation, frequency, slope, and use-case prose. Treating EV-065 as a successful prose workaround yields two independent low-shelf examples; treating it only as concept-learning yields one. Either interpretation remains below three.

The project's numerical three-source friction safeguard therefore remains open for low shelf. The mixed evidence shows both real communication difficulty and successful use of `low shelf` plus numeric parameters.

### High shelf

The new pass supplies one qualifying artifact, EV-083. EV-082 and EV-084 remain useful comprehension and counterevidence, but their ordinary prose explanations are adequate and their images are illustrative or more specific than the basic record.

The project's numerical three-source friction safeguard remains open for high shelf. No artifact shows a high-shelf response symbol used as portable plain text, and the pass does not establish that a type-only character would carry enough gain, corner-frequency, Q, or product-state information.

## Negative and excluded findings

- Manufacturer documentation in EV-050 through EV-057 and historical/education sources in EV-060 through EV-064 use full text labels, named controls, numeric parameters, and contextual graphs. They support shelf semantics, but none qualifies as a communication failure or portable glyph.
- The Image-Line thread `How To Add More EQ Points?` relies on an inaccessible attachment and truncated replies. It shows UI-symbol reference at family level, but the public artifact does not reproducibly assign the target to low shelf or high shelf, so it was excluded.
- An Image-Line support thread about imprecise EQ points was indexed with a low-shelf versus low-cut correction, but the decisive reply was unavailable without authentication during this pass. It was excluded rather than treating a search snippet as sufficient direct evidence.
- The Eventide SplitEQ support report includes screenshots and machine support data. The data already names `low shelf`, and the screenshots document a rendering/state defect rather than difficulty communicating the shelf concept, so it was excluded.
- A Texas Instruments support case uses images to identify unavailable high- and low-shelf configurations, but the problem is implementation-specific and the prose plus filter numbers already identify the relevant types. It was excluded from the friction count.
- Education and journalism searches mostly returned clear prose definitions paired with illustrations. Those artifacts show that labels and prose work, not that a compact portable character is already used.
- No qualifying custom-font or PUA implementation specific to either shelf record was found. No hand-drawn shelf exchange was found. No portable shelf-response character was found. These are bounded negative results, not proof of absence.

## Family-level versus record-level result

EV-083 and EV-084 directly discuss both shelf sides, but only EV-083 qualifies for the safeguard. EV-080 and EV-081 apply only to low shelf; EV-082 applies only to high shelf. Family-level UI and graph familiarity was not inherited by either record as text-friction evidence.

The practical conclusion is deliberately asymmetric:

- the per-record numerical safeguard remains open for both provisional shelf records;
- established portable compact-glyph practice remains unobserved;
- adequate text labels and numeric parameters are material counterevidence;
- passing this one project safeguard does not imply Unicode eligibility or proposal readiness.

## Reproducibility and rights

All qualifying sources are linked public discussions. Exact posts and dates are recorded in the evidence ledger. No screenshot, attachment, user avatar, forum typography, or third-party response curve is copied or retained. Mutable discussions are metadata-only references and may change.

## Agent Report - 2026-08-31T16:20:00-07:00

- Scope: ran a bounded record-specific plain-text-friction search for low shelf and high shelf across five source lanes.
- Evidence: added EV-080 through EV-084 for reproducible abbreviation ambiguity, semantic confusion, lossy prose, and image/graph dependence.
- Counterevidence: preserved adequate prose, numeric-parameter communication, inaccessible candidates, implementation-only screenshots, and the absence of observed shelf PUA/custom-font, hand-drawn, or portable-character use.
- Result: both provisional shelf records remain below the project's three-independent-source friction safeguard after applying the existing exclusion rule consistently.
- Rights: linked metadata only; no third-party visual asset was copied, retained, or traced.
- Validation: `npm test` passed 85/85 tests; registry validation reported six records, four assessment sets, and 62 evidence sources at registry 0.2.2; `git diff --check` passed.
- Independent review: passed after the qualification rule was narrowed, EV-084's locator was corrected, a reproducible query log was added, and versioned status-synthesis drift was resolved.
- Report status: completed
