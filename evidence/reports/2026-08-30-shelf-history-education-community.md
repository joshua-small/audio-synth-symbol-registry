# Shelf History, Education, Trade-Media, and Community Report

## Scope

This bounded pass tests whether low-shelf and high-shelf concepts are independently established outside current vendor UI documentation, how those concepts are represented, and whether either shelf name implies boost or cut polarity. It samples historical manuals and teaching material, current education, trade media, and practitioner discussion. It does not propose registry scope, names, identifiers, artwork, or encoding.

## Source matrix

| Evidence | Lane | What the source directly communicates | Representation treatment | Polarity treatment |
|---|---|---|---|---|
| [University of Iowa, 1996 assignment](https://theremin.music.uiowa.edu/EMS.Files/Assignments/1996/F.1996/EMS.F1996.Assignment5.pdf) (EV-060) | Historical education | A Sound Designer Parametric EQ has filter buttons ordered High Pass, Low-shelf, Band Pass/Reject, High-shelf, and Low-pass; students set a separate Boost/Cut value. | Product screenshot plus prose labels and ordered button positions. | Separate Boost/Cut control; shelf name does not imply polarity. |
| [Mackie CR1604-VLZ manual, 1997](https://archive.org/stream/manualsbase-id-223529/223529_djvu.txt) (EV-061) | Historical manual | LOW shelving at 80 Hz and HI shelving at 12 kHz each provide up to 15 dB boost or cut. The manual defines shelving by a response that rises or falls and then flattens. | Control labels, prose, specifications, and contextual axis-bearing frequency curves. No standalone shelf character is used in the sampled material. | Explicitly bidirectional: both low and high shelves boost or cut. |
| [Berklee Today, Fall 2004](https://www.berklee.edu/berklee-today/fall-2004/mastering) (EV-062) | Education/trade instruction | A mastering tutorial names low shelf and high shelf among EQ types and discusses using EQ to increase lows, add high-end energy, or remove muddiness. | Portable prose names; screenshots illustrate plug-in context but no compact shelf symbol is used in the article's text. | Operation and desired tonal change supply polarity; the type names do not. |
| [Indiana University electronic-music text](https://cmtext.com/synthesis/chapter4_filters.php) (EV-063) | Education | Low shelf and high shelf are described separately and shown in negative-gain and positive-gain forms. | Text labels plus four contextual response illustrations. | Explicit four-way treatment: low/high side crossed with negative/positive gain. |
| [Sound On Sound, "EQ: How & When To Use It"](https://www.soundonsound.com/techniques/eq-how-when-use-it) (EV-064) | Trade media | The article warns that the same broad curve family can be described as low-frequency shelving boost or, after reorientation, high-frequency cut. | Prose explanation with contextual response illustrations. | Material ambiguity: side and polarity must both be stated or shown. |
| [KVR Audio, "Low Shelf vs. High Pass EQing"](https://www.kvraudio.com/forum/viewtopic.php?t=544352) (EV-065) | Practitioner community | Participants ask when to use a low shelf versus a high-pass filter and answer in prose using attenuation, frequency, slope, and use-case distinctions. | Portable text terms and numeric parameters; no shelf glyph is used in the thread's interchange. | The discussion focuses on low-shelf attenuation, but explicitly treats attenuation as a chosen operation rather than the definition of low shelf. |

## Findings

### 1. The two shelf concepts are independently mature

The 1996 University of Iowa course assignment places Low-shelf and High-shelf alongside other familiar filter types in a production workflow (EV-060). The 1997 Mackie manual documents low and high shelving controls as ordinary mixer EQ features (EV-061). Berklee's 2004 mastering tutorial names both types without introductory qualification (EV-062). The later Indiana University text teaches both as a paired family and distinguishes their positive- and negative-gain cases (EV-063).

This establishes historical and educational depth for the semantic pair. It does not establish registry scope or Unicode suitability; those remain separate decisions.

### 2. "Low" and "high" identify the affected frequency side, not gain polarity

Every source that makes polarity explicit treats it as another dimension. The Iowa assignment supplies a separate Boost/Cut setting (EV-060). Mackie specifies `+/-15 dB` and describes shelves as rising or falling (EV-061). Indiana supplies all four low/high and negative/positive combinations (EV-063). Sound On Sound points out that a low-frequency shelving boost and a high-frequency cut can yield similarly shaped curves under reorientation (EV-064).

Therefore, a single shelf glyph that encodes only low-versus-high side must not silently promise boost or cut. A rendered curve above or below a baseline can communicate an instantiated gain state, but that is more specific than the semantic type alone. A future registry review should decide whether neutral shelf-type symbols and polarity-specific response illustrations are separate presentation layers.

### 3. Practitioners use prose and screenshots, not portable shelf characters

The sampled exchange methods are:

- portable text labels such as `low shelf`, `high shelf`, or a shelf name plus gain/frequency;
- screenshots or contextual product curves when the exact shape matters;
- prose descriptions such as reducing bass by a stated amount below a stated frequency;
- named UI buttons whose meaning depends on their position in an EQ window.

The KVR thread resolves confusion through prose and numeric/use-case distinctions rather than a compact symbol (EV-065). Berklee likewise uses text names even while embedding screenshots elsewhere in the tutorial (EV-062). Historical sources combine labels, controls, and graphs (EV-060, EV-061).

No sampled source uses a shelf-response glyph as portable plain-text interchange, and no sampled source documents hand drawing as a conventional interchange method. This is a bounded negative result, not proof of absence. It supports the user's reported text-friction use case while preserving the objection that an unmet communication need is not itself evidence of an already encoded character-like convention.

### 4. Compact icon recognition appears contextual, not self-sufficient

The historical Iowa material identifies filter buttons by ordered position and product screenshot (EV-060). The Mackie manual communicates shelves through physical control labels, explanatory prose, specifications, and response curves (EV-061). The non-vendor education and trade sources label their response graphics (EV-063, EV-064). Across this pass, the graphics are interpretable because an axis, baseline, caption, neighboring controls, or prose supplies context.

That is compatible with developing neutral compact candidates for recognition testing, but it is counterevidence against claiming that a specific axis-less contour is already standardized in general text.

## Counterevidence and cautions

- The corpus supports the shelf semantic pair more strongly than it supports any one contour.
- Positive and negative shelf responses are both routine. Treating one orientation as the unqualified canonical semantic risks collapsing type and gain state.
- Historical mixer controls often say `HI`, `LOW`, `Bass`, or `Treble` rather than displaying a shelf symbol. Semantic continuity therefore does not prove glyph continuity.
- Current practitioners successfully communicate with prose plus numeric parameters. That weakens any claim that a glyph is necessary for all communication, while leaving a credible compact-text efficiency use case.
- The sample is English-language and bounded. It is not a census of textbooks, magazines, manuals, forums, messaging platforms, or hand-drawn production notes.
- No third-party artwork, scan, screenshot, contour, or typography is reproduced or traced in this report.

## Recommendation

Carry low shelf and high shelf into the project's scope-review evidence as a paired semantic family, not as adopted registry records. Before any scope decision:

1. reconcile this report with the current-vendor shelf matrix;
2. define whether candidates mean shelf type independent of gain, or a particular positive/negative response;
3. include both polarity directions in recognition testing or explicitly test a neutral convention;
4. continue a bounded search for independently authored, portable shelf-glyph text use;
5. keep contextual, axis-bearing shelf curves available as expanded illustrations rather than assuming they are equivalent to standalone character candidates.

## Reproducibility and rights

The report links source pages and gives page/section locators in the evidence ledger. The Iowa PDF and Internet Archive OCR are stable public acquisition routes; the other web sources are mutable and are retained as metadata-only links. All graphics remain third-party reference evidence only.
