# Current Representation Matrix

## Purpose and scope

This matrix compares how the current vendor sources already recorded as EV-006 through EV-013 represent the four initial filter-response semantics. It separates terminology from visual treatment so that cross-vendor semantic convergence is not mistaken for convergence on a standalone glyph.

This is an observation aid, not a market census or artwork specification. It does not reproduce vendor artwork, select contours, change registry records, or establish portable plain-text use.

## Observation method

The matrix was compiled on 2026-08-29 by revisiting each official source URL and its ledger location. Record a compact response curve as present only when the cited documentation exposes a response-form selector, graph, or explicitly captioned response illustration. A product screenshot alone does not establish that a curve is axis-free, standalone, or used outside its interface.

The mutually exclusive values for **Compact response-curve evidence** are:

- **Selector/control**: the documentation identifies a visual response-form chooser or shape control used to select the filter type. This does not mean the graphic is standalone or axis-free.
- **Contextual response graph**: the documentation establishes a response graph or response display, but not a response-form graphic used as the type selector.
- **Not established**: the source establishes names or abbreviations, but the reviewed page does not establish a compact response curve.

The **Axes or context** column is descriptive rather than a second presence classification. It identifies the satisfying artifact and records whether axes are present, absent, or not established. `N/A` means no response curve is established; other contextual visuals may still be noted without counting them as response-curve evidence.

Axes values are:

- **Axes not established**: the source establishes a graph or illustration, but the reviewed text and captions do not establish whether visible axes are present.
- **N/A**: no curve is established, so an axes classification would add no information.

To reproduce the pass, open the source linked in the first column, navigate to the location named in `evidence/ledger.json`, and verify the visible labels, abbreviations, image captions, and display descriptions against the row. Documentation is mutable; a future recheck should add its date rather than silently replacing this snapshot.

## Matrix

| Evidence | Vendor / product / documented version | Semantic labels observed | Abbreviations observed | Compact response-curve evidence | Axes or context | Notable divergence |
| --- | --- | --- | --- | --- | --- | --- |
| [EV-006](https://www.ableton.com/en/live-manual/12/live-audio-effect-reference/) | Ableton / Live / 12 | Low-pass, High-pass, Band-pass, Notch | No abbreviation is used for the four names in the Auto Filter type list | Selector/control | The documented artifact is the Filter Type chooser image. A separate contextual display shows the selected filter curve, modulated curves, and output spectrum; axes not established | Uses `Notch` for the rejected-band member and extends the family with Morph, DJ, Comb, Resampling, Notch + LP, and Vowel. The response display carries more state than a standalone semantic mark. |
| [EV-007](https://www.fabfilter.com/help/pro-q/using/bandcontrols) | FabFilter / Pro-Q / 4 | Low Cut, High Cut, Band Pass, Notch; also Bell, Low Shelf, High Shelf, Tilt Shelf, Flat Tilt, All Pass | None established on the cited page | Selector/control | The documented artifact is the shape button within the pictured floating band controls under the interactive EQ display; axes not established | Uses `Low Cut` for high-pass behavior and `High Cut` for low-pass behavior. It treats slope, Q, gain, dynamics, and channel placement as separate mutable properties, so the rendered curve is not purely a type token. |
| [EV-008](https://docs.native-instruments.com/ni-tech-manuals/kontakt-manual/en/filter-reference) | Native Instruments / Kontakt / version not stated on cited page | Lowpass, Highpass, Bandpass, Peak/Notch; `band rejection` appears as a broader category | LP, HP, BP with pole counts and design prefixes, for example SV LP1, SV HP1, and AR BP4 | Not established | N/A; module images are present, but the cited text does not establish a compact response-curve selector | The primary compact representation is compositional text: design family + semantic abbreviation + pole count. It says notch is sometimes called `band reject`, while also distinguishing narrow notch behavior from broader band rejection. |
| [EV-009](https://manual.yamaha.com/mi/synth/montage_m/en/om02screenparameters0090.html) | Yamaha / MONTAGE M / current online operation manual, version not stated on cited page | Low-Pass Filter, High-Pass Filter, Band-Pass Filter, Band-Eliminate Filter | LPF, HPF, BPF, BEF, further combined with slope/design suffixes such as LPF24D, BPF12D, and BEF12 | Contextual response graph | The documented artifacts are explanatory response images accompanying the type sections and results shown on screen; axes not established | Uses `Band-Eliminate` and `BEF`, not `band-stop` or `notch`, and models compound/dual types. This is strong evidence for semantic abbreviation but not for one shared glyph vocabulary. |
| [EV-010](https://support.apple.com/guide/logicpro-ipad/filters-lpip61dd6e42/ipados) | Apple / Logic Pro for iPad, ES2 / guide offers 3.3 and earlier selectors | lowpass, highpass, bandpass, band reject, Notch, peak | MMF, LPF, LP, HP, BP | Not established | N/A; the page includes an ES2 parameter figure, but the text establishes mode buttons and abbreviations rather than a standalone response curve | Uses `band reject` as a semantic label and `Notch` on the mode control. LP/HP/BP are compact text labels, while filter slope and routing remain separate parameters. |
| [EV-011](https://www.steinberg.help/r/cubase-pro/cubaseplugref/15.0/en/_shared/topics/plug_ref/multitap_delay/multitapdelay_effect_modules_r.html) | Steinberg / Cubase Pro / 15.0, MultiTap Delay effect modules | Low-pass, high-pass, band-pass, Notch | LP, HP, BP | Not established | N/A; contextual effect-module images are present, but the cited page describes the Type control using text labels and abbreviations | Pairs spelled-out names with parenthetical abbreviations for three types, but leaves `Notch` unabbreviated. The filter is embedded in a modulation-effect module rather than presented as a portable response symbol. |
| [EV-012](https://moogmusic-help.freshdesk.com/en/support/solutions/articles/69000877830-moog-matriarch-filter-modes) | Moog Music / Matriarch / version not stated | HIGH PASS, LOW PASS, Band Pass Filter, Notch Filter, band-stop filter | VCF, HP, LP; combined HP/LP modes | Not established | N/A; the page has signal-flow images in filter-routing context, but those do not establish a response curve | Band-pass and notch result from routing HP and LP filters in series or parallel. The source explicitly calls notch `also called a band-stop filter`, but describes a very narrow rejected range, preserving the width-boundary issue recorded elsewhere. |
| [EV-013](https://noiseengineering.us/blogs/loquelic-literitas-the-blog/getting-started-filters/) | Noise Engineering / educational manufacturer article / page version not stated | lowpass, highpass, bandpass, notch; the page's `Filters for mixing` section also uses low cut and high cut | LP, HP, BP in the page's Doepfer and Bastl module-list descriptions | Contextual response graph | The documented artifact is the captioned four-graph explanatory image for Lowpass, Highpass, Bandpass, and Notch; graph context is explicit, visible axes not established by the text | The page explicitly relates `low cut` to highpass and `high cut` to lowpass. The response forms are teaching graphs, while the same page's module list uses text abbreviations. |

## Synthesis

All eight sources can communicate at least part of the initial semantic family using names or abbreviations. The most consistent abbreviations are LP/LPF, HP/HPF, and BP/BPF. The rejected-band member varies materially among `Notch`, `band reject`, `band rejection`, `band-stop`, and Yamaha's `Band-Eliminate`/BEF.

The visual evidence is contextual and heterogeneous. Ableton and FabFilter expose response-form controls inside rich interactive displays; Yamaha, Moog, and Noise Engineering use explanatory or signal-flow context; the reviewed Native Instruments, Apple, and Steinberg pages establish compact textual labels more clearly than compact response curves. No row establishes a response curve used as a portable standalone text character.

The matrix therefore supports two claims at different strengths:

1. The response semantics and several compact textual abbreviations recur across independent products and vendors.
2. The current corpus does not yet establish one cross-vendor, context-free graphic vocabulary or ordinary plain-text glyph practice.

## Limitations and next checks

- The source set follows the existing ledger and is not weighted by sales, installed base, region, or user population.
- Mutable online manuals may change after the snapshot date.
- `Not established` is not a claim that the product has no icon; it means the cited page does not establish one under this method.
- Visual inspection of downloadable manuals or product builds could resolve some `axes not established` cells, but should be recorded as a new dated observation with product/build provenance.
- A later machine-readable format may be warranted after observation categories stabilize. Creating one now would turn provisional research vocabulary into a compatibility commitment without improving the underlying evidence.
