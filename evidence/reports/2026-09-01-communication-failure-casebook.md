# Six-concept communication-failure casebook

## Agent Report - 2026-08-31T20:21:58-07:00

### Decision question

Do public, reproducible real-world cases show that communication about any of the six active filter-response concepts failed or became materially indirect because a portable symbol was unavailable?

This is a bounded casebook, not a prevalence estimate. It changes no identifier, name, alias, semantic boundary, assessment, lifecycle status, or artwork. Unicode proposal work remains on HOLD.

### Qualification and threshold rules

A case qualifies only when the public artifact shows both:

1. an exact active concept, with band-stop kept distinct from Notch; and
2. an observable communication failure or workaround: an image attachment, hand drawing, verbose shape explanation, ambiguity, mislabeled or undocumented control, explicit request for labels, or a failed text exchange.

Ordinary concept-learning, illustrated tutorials, generic UI screenshots, product feature lists, API identifiers, and attachments used only for troubleshooting were excluded. An image is not a failure merely because it depicts an EQ. A forum thread counts once even when it mentions several concepts, and repeated comments or mirrors from the same publisher do not create independent cases.

The conservative recurrence threshold for an individual record is:

- at least three qualifying cases;
- three independent publisher/author pairings;
- at least two failure classes; and
- no more than one vendor-controlled documentation case.

Meeting this bounded threshold supports only the statement "recurring public communication friction found." It does not establish market prevalence, independent character use, encoding necessity, stable glyph form, or Unicode eligibility.

### Reproducible query log

Searches were run on 2026-08-31 PDT. Queries were repeated without personalization where the search interface permitted it, and candidate pages were reinspected at exact post, section, or comment locators.

| Query group | Reproducible queries | Disposition |
| --- | --- | --- |
| Explicit labeling requests | `"provide labels" "EQ" filter types`; `"labels for" "EQ Types" audio`; `audio forum "what are these symbols" EQ` | Existing EV-121 accepted without creating a duplicate ledger entry. Most other results were unrelated symbol questions or tutorials. |
| Symbol/manual gaps | `"not listed in the manual" "low shelf"`; `"use the same symbol" "low shelf" audio`; `"high shelf" "symbol" audio forum`; `"low shelf" "symbol" audio forum` | EV-140 accepted. Product manuals that already supplied correct text labels were excluded. |
| Mislabeling | `"low shelf" "wrong label" audio`; `"high shelf" "wrong label" audio`; `"low shelf" "mislabeled" EQ`; `"high shelf" "mislabeled" EQ` | Search results were mostly unrelated or frequency-value errors. Direct inspection of the current Universal Audio manual found EV-141. |
| Image and drawing workarounds | `audio forum "see attached" "low shelf" EQ`; `audio forum "I drew" "low shelf" EQ`; `audio forum "picture" "band pass" "what is this" EQ`; `audio "filter shape" "what is this called" EQ forum` | One ASR engineering exchange used attached response drawings to resolve high-shelf versus low-pass and signed-shelf ambiguity. It shares the publisher represented by EV-140 and does not change a threshold, so it is preserved under inspected exclusions rather than added as another ledger entry. Circuit schematics, measurement plots, and ordinary troubleshooting screenshots were otherwise excluded. |
| Pass/reject forms | `site:reddit.com audio "drew" "high pass filter" symbol`; `site:gearspace.com "high pass" "draw" filter symbol`; `"what does this symbol mean" audio EQ filter`; `"which symbol" "high pass" "low pass"` | Results were circuit questions, explanations, or unrelated symbols. No hand-drawn compact glyph used as a substitute for plain-text exchange was recovered. |
| Accessibility and issue trackers | `site:github.com/issues EQ filter icons labels highpass lowpass`; `site:github.com "filter type" "low shelf" accessibility icon`; `site:github.com "high pass" "tooltip" EQ icon issue`; `site:github.com audio EQ "labels" "highpass"` | No inspectable issue demonstrated a target communication failure. Repositories listing text labels or tooltips were counterevidence, not failures. |

### Qualifying cases

#### EV-121 - image-only EQ family needed a prose label key

A VoiceMeeter user posted an image of seven unlabeled EQ forms and asked for labels. A different user supplied a numbered text key naming Band-pass, High-cut / Low-pass, Low-cut / High-pass, Low shelf, and High shelf among the forms; the requester confirmed that the response solved the request.

- Failure class: image attachment plus explicit label request.
- Applies to: high-pass, low-pass, band-pass, low shelf, high shelf.
- Does not apply to: band-stop. The answer labels the separate rejected-band form as Notch, and the project does not silently broaden Notch to band-stop.
- Independence unit: Reddit r/VoiceMeeter + Square-Dig-8804/gormagion, counted once.
- Limitation: the exchange proves identification friction in one UI, not a need for encoded characters.

#### EV-140 - undocumented symbols required cross-product lookup

In Audio Science Review post 964155, a user reports that the low-shelf, peak, and high-shelf filters were absent from the RME manual and video, and explains that the shapes could instead be identified by comparing them with another application's symbols.

- Failure class: undocumented symbol-only control plus cross-product visual comparison.
- Applies to: low shelf and high shelf.
- Independence unit: Audio Science Review + Malaj, counted once.
- Limitation: the comparison does not establish universal geometry or portable text use.

#### EV-141 - current vendor manual mislabels the low-shelf control

Universal Audio's current Neve 1084 manual correctly opens its Low Frequency subsection by identifying a low shelving frequency, then calls the available low-band choices "high shelving frequencies" and points to a "high shelving symbol" at "high shelf knobs." The parallel High Frequency subsection uses the same high-shelf wording consistently for the actual high band.

- Failure class: vendor documentation copy-and-label defect.
- Applies to: low shelf only.
- Independence unit: Universal Audio, counted once.
- Limitation: this is documentation friction, not proof that encoding would prevent authoring errors.

### Per-record classification

| Active concept | Qualifying independent cases | Failure classes observed | Threshold | Classification |
| --- | ---: | --- | --- | --- |
| High-pass | 1 (EV-121) | image attachment; label request | Not met | Isolated public case. |
| Low-pass | 1 (EV-121) | image attachment; label request | Not met | Isolated public case. |
| Band-pass | 1 (EV-121) | image attachment; label request | Not met | Isolated public case. |
| Band-stop | 0 | none accepted | Not met | No qualifying case found; Notch evidence excluded. |
| Low shelf | 3 (EV-121, EV-140, EV-141) | image/label request; undocumented symbol; cross-product lookup; documentation mislabel | Met | Recurring public communication friction found in this bounded sample. |
| High shelf | 2 (EV-121, EV-140) | image/label request; undocumented symbol; cross-product lookup | Not met | Multiple public cases, below recurrence threshold. |

The low-shelf result is the only threshold-positive result. It remains deliberately narrower than "plain-text need established": every accepted case was ultimately resolved through an image, prose, another product, or corrected interpretation.

### Exclusions and adverse evidence

- Future Producers' "What is a two-pole EQ?" thread used several images and a `|_|` analogy while teaching slopes and Notch. It is ordinary concept-learning, and Notch cannot be imported as band-stop.
- Equalizer APO's setup thread attached screenshots for application configuration and room-correction troubleshooting. The attachment was not caused by inability to express an active filter shape in text.
- Audio Science Review and GroupDIY design threads attached response plots or circuit schematics to discuss transfer functions and components. Those graphics carried engineering data beyond the target semantic and were not substitutes for a missing character.
- Vendor manuals and open-source applications that provide ordinary text labels, dropdown names, abbreviations, alt text, or tooltips are counterevidence: prose and structured identifiers often communicate the concept adequately.
- No reproducible public hand-drawn compact glyph offered as a substitute for plain-text exchange was found. An inspected [Audio Science Review passive-filter thread](https://www.audiosciencereview.com/forum/index.php?threads/making-a-passive-high-shelf-filter.9053/) at posts 231318, 231323, 231426, 231446, 231460, and 231464 does include participant-drawn response curves; those full engineering drawings resolve high-shelf versus low-pass and signed-shelf ambiguity, share EV-140's publisher, and are not standalone compact glyph use. The project owner's first-person account remains important motivation but is not counted as independent public evidence.
- No failed exchange was found where both parties attempted ordinary text and could not resolve the target concept.
- No accepted source showed a target glyph copied between unrelated text systems while retaining its meaning.

### Source independence and overclaim controls

EV-121, EV-140, and EV-141 have different publishers and authoring contexts: a user-to-user labeling request, a separate user report about missing documentation, and vendor-authored product documentation. The inspected drawing exchange has independent participants but shares the Audio Science Review publisher with EV-140; it cannot supply a third publisher-independent high-shelf case and is not added as a ledger input. The VoiceMeeter post counts once across all named records. The RME post counts once across both shelves. Universal Audio contributes only one vendor-controlled case, satisfying the cap in the threshold rule. EV-121 is reused from the independent-character-use lane and is not duplicated or counted twice.

The strongest adverse interpretation is that the observed failures are documentation and interface-design defects that should be fixed with labels, accessible names, and better manuals. That interpretation is compatible with every accepted case. The casebook therefore supports continued registry and interchange research, especially for low shelf, while leaving the Unicode HOLD and all lifecycle states unchanged.

### Disposition

Record EV-140 through EV-141 and DA-016, reusing EV-121 for the VoiceMeeter case. Preserve the threshold-positive low-shelf finding and every zero or below-threshold result without promotion. Do not infer portable character use, commission outreach, contact publishers, alter artwork, allocate a PUA convention, or begin a Unicode proposal from this casebook.
