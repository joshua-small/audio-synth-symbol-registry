# Independent character-like use and plain-text need spike

## Agent Report - 2026-08-31T20:13:41-07:00

### Decision question

Does public evidence show that any of the six active filter-response concepts is already used as an independent character, or that users need a portable plain-text character rather than an icon, image, label, or prose workaround?

This bounded spike applies the project's strict distinction between a shape implemented in character-like machinery and a character used independently in plain text. It changes no semantics, aliases, identifiers, artwork, assessment, or status. Unicode work remains on HOLD.

### Method and bounds

The search covered public source repositories, package metadata, issue and forum search results, documentation, and image-identification discussions. Queries sought custom fonts, Private Use Area mappings, ASCII approximations, copy/paste conventions, markup or icon names, image-dependent exchanges, and explicit requests for labels. Results were accepted only when the public artifact and its relevant context could be reinspected. Ordinary product screenshots, response plots, prose terminology, and API identifiers were not treated as character use.

Searches were run on 2026-08-31 PDT. GitHub search endpoints returned an internal error during this run, so immutable shallow clones and public package tarballs were used where possible.

| Query group | Representative reproducible queries | Result |
| --- | --- | --- |
| Character and ASCII conventions | `"filter symbol" "ASCII" audio high pass low pass`; `"EQ symbols" "band-pass" "low shelf" forum`; `"symbols mean" "low shelf" audio` | No portable character or stable cross-community ASCII convention recovered. |
| Icon fonts and PUA | `"high pass" "low pass" "icon font" audio`; `"audio filter" "private use" font icon`; `"low shelf" "high shelf" symbol icon font` | Ardour's bundled Toolkit font was recovered; other useful hits were existing or derivative icon packages. |
| Band-reject naming | `"filter-bandreject" icon`; `"band reject" "icon font" audio`; `"bandreject" icon audio font`; `"Band Reject" "glyph" audio` | Ardour directly implements a named `bandreject` glyph. Notch-only results were excluded from band-stop. |
| Image and labeling friction | `"provide labels" "EQ Types" filter icons`; `"what are these" "EQ" "low shelf" "high shelf" icons`; `site:reddit.com audio "what do these symbols mean" EQ filter` | One inspectable public request required an image and received prose labels for five active concepts. |
| Community and documentation sweep | `site:gearspace.com "EQ symbols" filter`; `site:forum.* "filter symbols" "low shelf" audio`; `"filter icons" "high-cut" "low-cut" "low shelf"` | Results were prose, images, UI assets, inaccessible posts, or already represented evidence. |

### Counted evidence

#### EV-120: Ardour Toolkit icon font

At immutable Ardour commit `ab29bbbe64050732f3f71145a99b607942d094f6`, `Toolkit.css` maps semantic CSS classes to ordinary ASCII slots in a bundled font: `highpass` to `t`, `lowpass` to `u`, `highshelf` to `v`, `lowshelf` to `w`, `bandpass` to `x`, `bandreject` to `y`, and `notch` to `z`. The companion SVG contains named outlines for all seven forms.

This is strong evidence that one separately published open-source project implementation finds a compact, font-rendered family useful across all six active concepts, including an explicit Band Reject member distinct from Notch. It is not portable text: the raw letters have unrelated meanings without Ardour's stylesheet and bundled font, and no evidence was found that users exchange those letters as filter symbols. The pinned snapshot does not establish original outline authorship or derivation history.

Reinspection digests:

- `Toolkit.css`: SHA-256 `2263a00e221e3fd64cf800495b03451a5d916ca05fbdf59fa594235a84a993d3`
- `Toolkit.html`: SHA-256 `b6ea1ea3a419bd1aee3821b88abf9ffb3d9b1e422a92ae4aef2dad4344664c42`
- `Toolkit.svg`: SHA-256 `22a112784823c965b991197e6915eb3dd75d4b6cc8d0dc0cba8cf8f11bc108e3`

#### EV-121: image-dependent EQ-type identification request

A public VoiceMeeter discussion titled "Can someone please provide labels for the EQ Types?" consists of an image-only initial request. A reply supplies a numbered prose key including Band-pass, High-cut / Low-pass, Low-cut / High-pass, Low shelf, and High shelf; the requester confirms that the answer solved the question.

This is direct public evidence that an image plus prose labeling was needed to identify five active concepts. It does not show a standalone glyph in ordinary text. The reply's separate Notch label is not transferred to band-stop because the project preserves that semantic boundary.

### Inspected but non-independent ecosystem evidence

EV-122 records Iconify's versioned JSON packaging of FontAudio names including `filter-bandpass`, `filter-highpass`, `filter-lowpass`, `filter-notch`, `filter-shelving-hi`, and `filter-shelving-lo`. The package demonstrates machine-readable semantic icon naming and cross-tool asset distribution. It remains derivative of FontAudio (already EV-025), is not an independent usage source, and does not provide text interchange. Its Notch member is not band-stop evidence.

### Per-record result

| Active concept | Character-like implementation | Public image/text friction | Portable independent text use found | Result |
| --- | --- | --- | --- | --- |
| High-pass | EV-120 | EV-121 | No | Evidence improved; threshold not met. |
| Low-pass | EV-120 | EV-121 | No | Evidence improved; threshold not met. |
| Band-pass | EV-120 | EV-121 | No | Evidence improved; threshold not met. |
| Band-stop | EV-120 `bandreject` only | None accepted | No | One direct implementation; Notch excluded. |
| Low shelf | EV-120 | EV-121 | No | Evidence improved; threshold not met. |
| High shelf | EV-120 | EV-121 | No | Evidence improved; threshold not met. |

### Negative and excluded results

- No ordinary Unicode character or sequence was recovered with any target semantic.
- No target glyph was shown copied between unrelated text systems while retaining meaning.
- No stable ASCII-art convention or shared PUA mapping was found across independent communities.
- No inspectable public hand-drawn exchange was recovered. The project owner's first-person example remains motivation, not independent public evidence.
- Public code results overwhelmingly used words, API enum names, or UI assets rather than characters.
- A Facebook result about Ableton glyph meanings was authentication-gated and could not be reproduced; it was excluded.
- A FiiO Reddit result and an Audio Science Review redirect did not yield decisive, reproducible target evidence; both were excluded.
- General education plots and product screenshots were excluded because an illustrated response curve is not independent character use.
- Icon aggregators derived from FontAudio were not counted as independent implementations.
- Ardour's ASCII slots are a counterexample to portability: outside the bundled font, `t` through `z` do not carry the intended semantics.

### Source independence and adverse interpretation

EV-120 and EV-121 are independent at the publisher/project and artifact-class level; original outline authorship for EV-120 was not established. EV-122 is explicitly source-dependent on FontAudio and is not counted as another adoption. EV-121 is one discussion, not five independent examples merely because its reply names five concepts.

The strongest adverse reading is that existing UI icons plus ordinary names already solve the observed tasks: Ardour needs CSS class names to make its font meaningful, while the VoiceMeeter exchange succeeds with an image and a prose key. The evidence therefore supports continued research into compact symbols and communication friction, but it does not establish that encoding is necessary, that a glyph is used independently, or that any record satisfies the project's three-source threshold.

### Disposition

Retain the Unicode HOLD. Add EV-120 through EV-122 as auditable evidence, treat only EV-120 and EV-121 as independent sources for this analysis, and preserve the absence result for portable text use. No outreach, code-point allocation, PUA convention, font publication, semantic change, alias change, artwork change, or lifecycle movement is authorized by this spike.
