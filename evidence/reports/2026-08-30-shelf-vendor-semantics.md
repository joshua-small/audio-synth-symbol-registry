# Low-shelf and high-shelf vendor semantics

## Scope and question

This spike tests whether low shelf and high shelf are plausible future registry semantics. It reviews current DAWs and EQ plug-ins, a hardware production workstation, hardware-derived equalizers, and one web-platform specification draft. It asks:

1. Is the low/high side semantic independent of boost versus cut?
2. Does a product keep one filter-type identity while gain changes?
3. Are axes or a baseline required to identify the type?
4. How do products label or abbreviate the types?
5. Are compact selectors used, or only contextual response curves?

This report adds evidence and a recommendation only. It does not add registry records, adopt identifiers, select artwork, or authorize external outreach.

## Method

The sources were inspected on 2026-08-30 through their official public documentation routes. Each ledger entry records the exact section, a metadata-only capture note, and the rights limitation. No vendor image, interface, icon, curve, or source page was copied, retained, traced, or used as project artwork.

Representation classifications are conservative:

- **Compact shape selector established** means the official text identifies a small shape-based control used to select the filter type. It does not mean the shape is portable, standardized, axis-free, or suitable to copy.
- **Contextual response display established** means a graph, curve, shaded response, or draggable EQ display is documented in a larger interface.
- **Text/control labeling established** means the filter identity is communicated by words, abbreviations, band names, or fixed controls without the reviewed source establishing a shape selector.
- **Not established** is limited to the reviewed source. It does not claim that no such representation exists anywhere in the product.

## Reproducible source matrix

| Evidence | Official source and exact location | Side and gain semantics | Representation established | Labels or abbreviations | Counterevidence / limitation |
| --- | --- | --- | --- | --- | --- |
| [EV-050](https://www.ableton.com/en/live-manual/12/live-audio-effect-reference/) | Ableton Live 12 Manual, `28.2.7 Sidechain Parameters` Type chooser and Shelf Gain descriptions; `28.7 Channel EQ` High parameter | One `low-shelf` type affects frequencies below cutoff and accepts positive boost or negative attenuation. One `high-shelf` type affects frequencies above cutoff and uses the same Shelf Gain control. | Textual Type chooser plus contextual response behavior. The reviewed section does not establish a standalone shelf icon. | `low-shelf`, `high-shelf`, `Shelf Gain` | Channel EQ is a counterexample to a perfectly invariant high-shelf algorithm: at negative High gain it combines shelving with a low-pass filter. A product label can therefore preserve user intent while the actual response family changes with sign. |
| [EV-051](https://support.apple.com/guide/logicpro-ipad/eq-parameters-lpip1816dc6e/ipados) | Apple Logic Pro for iPad User Guide, `Channel EQ parameters`, Band 2 and Band 7 | Band 2 remains a low shelving filter that cuts or boosts below the set frequency; Band 7 remains a high shelving filter that cuts or boosts above it. Gain is separately edited by vertical movement. | Contextual graphic display, shaded band area, curve, control point, and horizontal/vertical handles. The response is rendered in a graph-like editor. | `low shelving filter`, `high shelving filter`, Band 2, Band 7 | The curve carries frequency, gain, and Q state. A screenshot of its current response is not a pure type token, and the source does not establish an axis-free selector mark. |
| [EV-052](https://www.fabfilter.com/help/pro-q/using/bandcontrols) | FabFilter Pro-Q 4 Help, `Band controls`, shape button and gain control | `Low Shelf` and `High Shelf` are shape choices; the same shape accepts gain from -30 to +30 dB. Gain is a separate parameter used by shelving types. | Compact shape button inside floating band controls, under an interactive EQ display. | `Low Shelf`, `High Shelf`; no LS/HS abbreviation established on the cited page | The shape button exists only inside a rich product control. Slope, Q, gain, dynamics, and channel placement can change the rendered response, so one observed curve is not the semantic identity alone. |
| [EV-053](https://www.steinberg.help/r/cubase-pro/cubaseplugref/15.0/en/_shared/topics/plug_ref/frequency/frequency_r.html) | Steinberg Cubase Pro 15 Frequency 2, filter-type list and `Freq`, `Q`, `Gain`, `Invert Gain` | `Low Shelf` boosts or attenuates below cutoff; `High Shelf` boosts or attenuates above cutoff. `Invert Gain` changes positive to negative and vice versa without changing the selected filter type. | Contextual graphical editor and filter-type control. No portable standalone mark is established by the text. | `Low Shelf`, `High Shelf` | Q can add a drop or boost depending on gain, and dynamic filtering can make the displayed response time-varying. This is strong semantic evidence but weak evidence for any fixed contour. |
| [EV-054](https://www.image-line.com/fl-studio-learning/fl-studio-online-manual/html/plugins/Fruity%20Parametric%20EQ%202.htm) | Image-Line FL Studio Manual, Fruity Parametric EQ 2, `Parameters` items 1-4 | Low Shelf and High Shelf are band types; EQ faders separately adjust equalization level. The source's adaptive solo maps Low Shelf to low-pass audition and High Shelf to high-pass audition, corroborating the affected side. | Compact shape selector explicitly established: the upper section shows different shapes for Band Type. The main display also uses movable band tokens. | `Low Shelf`, `High Shelf`; no LS/HS abbreviation in this cited control | The small shapes are proprietary interface controls with filter-order dots and band state. Their existence supports compact recognizability, not a shared contour or reuse right. |
| [EV-055](https://cdn.roland.com/assets/media/pdf/MVWS14.pdf) | Roland MV-8000 workshop `Using EQ`, PDF/printed page 4, `The EQ Parameters` | The EQ High section boosts or cuts all high frequencies from the selected threshold; the EQ Low section boosts or cuts all low frequencies up to the selected threshold. The same section and frequency parameter serve both gain signs. | Text/control labeling in an EQ parameter strip. No shelf shape selector is established on the cited page. | `EQ High`, `EQ Low`, `Gain [dB]`, `Freq [Hz]`; the prose names each a `shelving` EQ | This hardware-production source communicates the semantics without response glyphs. It is direct counterevidence to axes or a compact curve being necessary for operation. It is also from 2006, so it is not evidence of a current flagship hardware UI. |
| [EV-056](https://help.uaudio.com/hc/en-us/articles/17475989779860-UA-610-Tube-Preamp-EQ-Collection-Manual) | Universal Audio 610 Tube Preamp & EQ Collection Manual, `EQ Controls`, 610-A and 610-B | Fixed low and high shelf bands can each be cut or boosted. Frequency selection and signed gain are separate controls; 0 dB makes the band inactive. | Hardware-derived rotary control labeling. No response graph or shape selector is needed or established. | `L.F.`, `H.F.`, `LO`, `HI`, `LO Frequency`, `LO Gain`, `HI Frequency`, `HI Gain` | The product does not primarily call its compact controls `LS` or `HS`, and the underlying analog behavior is represented through familiar bass/treble control groups rather than glyphs. |
| [EV-057](https://www.w3.org/TR/webaudio-1.1/) | W3C Web Audio API 1.1 First Public Working Draft, `BiquadFilterNode`, `BiquadFilterType`, and type-parameter table | The machine-readable types are `lowshelf` and `highshelf`. Each uses a separate signed `gain`; a negative value attenuates. Frequency is the upper limit for lowshelf and lower limit for highshelf. | Semantic API tokens and parameters only; no presentation or glyph is prescribed. | `lowshelf`, `highshelf`, `gain`, `frequency` | This is strong implementation-level evidence for separate type and sign, but it is work in progress, deliberately supplies no visual representation evidence, and does not imply character encoding need. |

## Findings

### 1. Shelf side is semantic independently of boost or cut

This is the strongest result. All eight sources keep the affected side conceptually stable while allowing gain direction to vary:

- low shelf affects the low-frequency side, with either positive or negative gain;
- high shelf affects the high-frequency side, with either positive or negative gain.

The clearest implementation-model evidence is the W3C draft's distinct `lowshelf` and `highshelf` enum values plus a separate signed gain parameter. Steinberg's separate `Invert Gain` control is an especially direct UI example: polarity changes while filter type remains selected. Apple, FabFilter, Ableton, Roland, and Universal Audio independently use the same separation.

This supports treating **side** as part of a shelf filter's identity and **boost/cut amount** as state. It does not yet settle how a neutral standalone graphic should abstract that state.

### 2. The rendered curve is not invariant

A low-shelf boost and low-shelf cut are vertically opposed when drawn against a zero-gain baseline; the same is true for high shelf. Q, slope, dynamic range, and implementation details can add overshoot, undershoot, interaction, or time variation. Ableton's Channel EQ supplies a stronger counterexample: its High control is a high shelf when boosting but combines the shelf with a low-pass filter while attenuating.

Therefore, a single literal response snapshot cannot safely define the semantic family. Any future neutral candidate needs to be tested as an abstraction of "affected side" rather than as a promise of gain direction, exact slope, Q, overshoot, or algorithm.

### 3. Axes are useful for response interpretation, not required for type identity

Apple and FabFilter use graph-like editors because the curve also communicates current frequency, gain, Q, dynamics, and analyzer state. By contrast, Roland and Universal Audio operate through labeled Low/High or LO/HI controls with no documented response plot at the point of use. W3C communicates the full distinction through API tokens and numeric parameters.

The evidence therefore refutes a strong claim that axes are semantically essential to low-shelf/high-shelf identity. It does not prove that an axis-free shelf glyph will be recognized reliably. That is an empirical artwork and recognition question.

### 4. Compact selectors exist, but the visual vocabulary is not standardized

Image-Line explicitly documents shape-based Band Type selectors. FabFilter documents a shape button inside its band controls. Other reviewed products rely on graph context, words, band numbers, or hardware-style Low/High controls. The source set does not establish one portable, cross-vendor shelf contour.

Compact visual selection is consequently credible as a use case, while Unicode readiness and canonical contour convergence remain unproven.

### 5. Terminology is stable; abbreviations are less convergent

`Low Shelf` and `High Shelf` recur strongly in the DAW and plug-in sources. W3C removes the space in API tokens. Hardware-derived controls often collapse the idea to `Low`/`High`, `LO`/`HI`, or `L.F.`/`H.F.` rather than `LS`/`HS`.

This supports the full names as research labels. It does not yet support `LS` and `HS` as universal aliases, nor does it resolve whether canonical future names should use `shelf` or `shelving`.

## Recommendation

Open a bounded future-scope candidate spike for two additional semantics: low shelf and high shelf. Do not yet add live registry records.

The next spike should:

1. define the semantic nucleus as affected frequency side independent of signed gain;
2. explicitly exclude gain sign, amount, exact slope, Q, overshoot, dynamic behavior, and algorithm from the neutral identity;
3. produce original, non-traced neutral candidates that do not imply boost or cut;
4. compare axis-free candidates with axis/baseline-bearing expanded alternatives;
5. test recognition for all six symbols together, including confusion between shelf and pass/cut types;
6. retain `Low Shelf` and `High Shelf` as provisional research names while separately investigating `shelving`, `LS`, and `HS` usage;
7. keep scope adoption, identifiers, registry record creation, artwork acceptance, study launch, and external outreach behind their existing Human Review gates.

Joshua's production experience is relevant expert-user input supporting practical importance, but this report does not count it as independent documentary evidence or use it to bypass the registry rubric.

## Limitations

- This is a purposive source sample, not a sales-weighted market census.
- Roland's MV-8000 document is valuable hardware-production evidence but not current flagship evidence.
- The source review did not run product builds or observe gain animations frame by frame.
- Text describing a shape selector cannot establish exact geometry, optical treatment, or whether every gain state changes the icon.
- Mutable web pages were recorded metadata-only; no source content was archived by the project.
- The report establishes semantic viability for further research, not Unicode suitability, interchange demand, artwork acceptance, or registry inclusion.

## Agent Report - 2026-08-30T14:53:30-07:00

- Report status: completed
- Scope: primary-source vendor and engineering review for proposed low-shelf/high-shelf future scope under Issue #50.
- Evidence: EV-050 through EV-057, covering four current DAW families, a flagship EQ plug-in, hardware-production documentation, hardware-derived EQ controls, and the W3C implementation model.
- Result: shelf side is consistently semantic independently of gain sign; compact selectors exist, but no standardized standalone contour is established.
- Recommendation: proceed to a bounded two-semantics candidate spike without adding registry records or adopting scope.
- Rights boundary: no third-party image, interface, curve, source page, or artwork was copied, retained, traced, or imported.
- Validation: `npm test` passed 84/84 tests and `git diff --check` passed after correcting the Ableton counterexample locator.
- Independent review: REQUEST CHANGES on the first pass because the Ableton Channel EQ counterexample was outside the recorded exact locator; corrected by adding `28.7 Channel EQ`. Re-review APPROVED with no remaining blockers.
- Limitations: no market weighting, product-build inspection, recognition testing, or Unicode-readiness claim.
