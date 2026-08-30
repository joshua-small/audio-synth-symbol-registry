# Neutral Candidate Artwork Briefs

## Purpose and non-approval boundary

These briefs constrain preparation of original candidate geometry for a formative recognition pilot. They do not supply geometry, choose a visual style, make an asset `study-ready`, accept artwork, or change a registry record. [`../artwork-criteria.md`](../artwork-criteria.md) remains authoritative.

An author may create multiple independently identified `draft` candidates from a brief. Candidate comparison must not imply that any vendor or standards-body design is the source. Do not display third-party glyphs on the authoring canvas or derive coordinates, proportions, control points, or paths from them.

## Shared visual brief

Every candidate should:

- Use a square viewBox and a single continuous visual weight suitable for monochrome `currentColor` rendering.
- Express only relative passage and attenuation across increasing frequency from left to right.
- Remain axis-less and omit labels, numbers, arrows, gridlines, baselines, control handles, UI containers, color, animation, and product context.
- Avoid implying a particular cutoff frequency, slope order, resonance, bandwidth, gain amount, or interaction state.
- Use enough endpoint separation and interior clearance to remain distinguishable at 16, 20, 24, 32, and 64 CSS pixels.
- Be evaluated as a four-member family so direction, vertical level, curvature, and stroke treatment are internally consistent.

The left-to-right frequency convention is a presentation convention for the pilot, not an encoded numeric axis or a new semantic property.

## Record briefs

| Record | Required qualitative topology | Principal opposite-class risk | Prohibited additions |
| --- | --- | --- | --- |
| `asr:filter.high-pass` | A low-frequency attenuated region transitioning to a high-frequency passed region | Low-pass reversal | Cutoff marker, slope value, resonance peak, axes |
| `asr:filter.low-pass` | A low-frequency passed region transitioning to a high-frequency attenuated region | High-pass reversal | Cutoff marker, slope value, resonance peak, axes |
| `asr:filter.band-pass` | Low- and high-frequency attenuated regions with one bounded passed region between them | Band-stop inversion | Center-frequency marker, bandwidth/Q, peak gain, axes |
| `asr:filter.band-stop` | Low- and high-frequency passed regions with one bounded attenuated region between them | Band-pass inversion or an undocumented narrow-notch subtype | Center-frequency marker, bandwidth/Q, notch-depth value, axes |

For band-stop, do not optimize specifically for the word `notch`; the current record treats `notch filter` as a related term rather than an exact accepted alias.

## Candidate preparation record

Before geometry review, record for each candidate:

- Candidate asset ID and linked record ID.
- Original author and tool.
- A plain-language construction description written without vendor references.
- Which shared parameters are held constant across the four-member family.
- Any intentional visual difference and the registry semantic constraint that permits it.
- Provenance declaration and confirmation that prohibited source geometry was not used.
- Rendering contact sheet at every required size on light and dark backgrounds.
- Hash of the exact candidate SVG and each blind-study derivative.

An independent reviewer should be able to reproduce the construction from repository-authored primitives without consulting external artwork. Moving a candidate from `draft` to `study-ready` locks it only for the named study and requires protocol review; it does not accept the artwork.
