# Low-Shelf and High-Shelf Semantic-Model Review

## Scope

This adverse review tests five possible registry treatments for shelving filters: two sign-agnostic concepts, four signed concepts, a compositional side-plus-gain model, illustrative variants only, and exclusion from the initial family. It addresses semantics and representation only. It does not add records, enact identifiers or aliases, accept artwork, change status, or authorize external outreach.

## Executive finding

`Low shelf` and `high shelf` are stable engineering filter-type names, but neither name determines boost or cut. The strongest engineering sources model **shelf side** and **signed gain** as separate dimensions. Therefore:

- two sign-agnostic shelf concepts are the best semantic model;
- boost/cut should remain a parameter or modifier, not become four first-class filter types;
- a bare axis-less response stroke cannot always communicate both shelf side and gain sign;
- candidate artwork may show signed illustrative states, but a specific drawn orientation must not silently narrow the underlying concept;
- expansion is promising, but record adoption should wait for cross-context representation and recognition evidence.

## Primary-source findings

### Engineering specifications separate type from signed gain

The [W3C Web Audio API 1.1 specification](https://www.w3.org/TR/webaudio-1.1/#BiquadFilterNode) enumerates `lowshelf` and `highshelf` as filter types. For each, it defines a separate gain parameter: positive values boost and negative values attenuate. The type selects which side of the frequency range is affected; gain selects direction and amount.

The [W3C Audio EQ Cookbook](https://www.w3.org/TR/audio-eq-cookbook/) follows the same model mathematically. It gives one `lowShelf` transfer-function family and one `highShelf` family, while signed `dBgain` determines the amplitude factor `A`. It also makes shelf slope depend on both `A` and the shelf-slope parameter. From those parameterized formulas, this review infers that a small glyph cannot be presumed to specify gain magnitude, slope, Q convention, or overshoot.

The [JUCE IIR coefficient API](https://docs.juce.com/master/structjuce_1_1dsp_1_1IIR_1_1Coefficients.html) independently exposes `makeLowShelf` and `makeHighShelf`, each with a gain factor. Values greater than 1 boost the affected side; values below 1 attenuate it. This is implementation evidence for the same two-types-plus-gain model.

### Product documentation uses shelves in both directions

The [Ableton Live 12 manual](https://www.ableton.com/en/manual/live-audio-effect-reference/) states that low-shelf and high-shelf filters can boost or attenuate the frequencies on their respective sides of cutoff. In its EQ Eight description it lists low shelf as boosting or cutting lower frequencies and high shelf as boosting or cutting higher frequencies. The same manual also shows why product controls are not pure semantic definitions: one Channel EQ high control combines a shelving filter with a low-pass filter while attenuating.

The [Avid audio equalizer overview](https://www.avid.com/resource-center/what-is-an-audio-equalizer) likewise describes a low shelf as affecting frequencies below a cutoff and as usable to boost or cut bass. A historical [Avid Xpress Pro HD guide supplement](https://resources.avid.com/SupportFiles/attach/XpressSupplement_v5_0.pdf) separates the selected EQ type (`Low-Shelf` or `High-Shelf`) from a gain control that cuts or boosts those types.

These sources support practical completeness arguments for shelves, but they contradict a model in which `low-shelf boost`, `low-shelf cut`, `high-shelf boost`, and `high-shelf cut` are four peer filter types.

## The axis-less ambiguity

An axis-less curve has no explicit zero-dB reference. This matters more for shelves than for pass filters.

Consider a descending two-plateau stroke:

- with the right plateau understood as 0 dB, it can depict a **low-shelf boost**;
- with the left plateau understood as 0 dB, it can depict a **high-shelf cut**.

The two readings differ by which plateau is the unaffected baseline. Vertical translation of the same stroke erases that fact. The complementary ambiguity also applies to an ascending stroke: it can depict a low-shelf cut or a high-shelf boost.

This is not a claim that professionals cannot recognize shelf graphics in context. Product UIs provide axes, labels, handles, color, neighboring filter choices, or a gain value. The claim is narrower: **the response stroke alone is underdetermined if the intended character must convey both affected side and gain polarity**.

An axis-less design can avoid the problem only by doing at least one of the following:

1. encode shelf side through an additional convention that is not merely vertical curve direction;
2. include a baseline or axis extension;
3. compose a sign or boost/cut modifier with a shelf-side glyph;
4. define the base glyph as sign-agnostic and treat the drawn orientation as illustrative rather than exhaustive.

Each solution requires recognition testing. A visual convention cannot be assumed interoperable merely because it is internally systematic.

## Terminology collision

`Low shelf` does not mean `low cut`. The reviewed Ableton manual lists low cut and low shelf as separate filter choices: low cut removes or rolls off frequencies below a cutoff, while low shelf changes the level of the lower region and then levels out at a finite gain. Likewise, high shelf and high cut are distinct.

This creates a naming and speech risk:

- `low cut` commonly denotes a high-pass response;
- `low-shelf cut` denotes finite attenuation of the low-frequency region;
- shortening either phrase to `low cut` collapses different responses.

Therefore any future speech label or fallback must preserve the word `shelf`. `Low shelf, cut` is semantically safer than `low cut shelf`, and plain `low cut` must not be accepted as a shelf alias.

## Decision matrix

Here `Projected interchange complexity` is a relative comparison of how many semantic elements an interchange mechanism would have to represent; it is not an implemented feature, benchmark, or cost estimate.

| Model | Semantic fidelity | Axis-less glyph burden | Projected interchange complexity | Main failure mode | Assessment |
|---|---|---|---|---|---|
| Two sign-agnostic concepts: low shelf, high shelf | High; matches W3C, JUCE, Ableton, and Avid type models | High unless side is conveyed independently of vertical direction | Low; gain remains a parameter/modifier | A concrete stroke may be read as a signed state or the opposite shelf | **Recommended semantic core** |
| Four signed concepts: low/high x boost/cut | Medium; describes useful states but promotes parameter values into types | Lower for each signed drawing if baseline is understood | High; record count expands and magnitude remains unresolved | False categorical split; zero gain and continuous automation expose arbitrary boundaries | Reject as first-class record model |
| Compositional shelf side + gain sign | High and explicit | Moderate; requires a legible composition convention | Moderate; extensible to other boost/cut EQ families | Combining mark or modifier behavior may be typographically fragile | Recommended future interchange experiment |
| Two concepts with signed illustrative variants | High if variants are clearly nonsemantic | Moderate | Low | Users may infer the displayed variant is the canonical signed meaning | Useful for study stimuli, not sufficient by itself |
| Exclude shelves from initial family | Avoids premature ambiguity | None | None now | Leaves a routinely used and well-defined filter family unrepresented | Defensible staging choice, not the preferred long-term outcome |

## Adverse case against expansion

The strongest objection is not that shelves lack stable names. They do not. The objection is that the project's initial four response concepts can be sketched as affected-versus-passed regions without a gain-sign parameter, whereas shelves are explicitly two-dimensional: side plus signed gain. Adding them may weaken a claim that each standalone glyph directly depicts a determinate response.

Further objections are:

- zero gain makes either shelf transfer function visually flat, so the type is not recoverable from response alone;
- shelf slope and resonant overshoot differ across implementations and parameters;
- a product may hybridize a shelf with another filter, as Ableton Channel EQ does during high attenuation;
- a two-plateau stroke without a reference line has the complementary-reading problem described above;
- four signed records would not solve gain magnitude, slope, or hybrid behavior and would create precedent for splitting peaking EQ into boost and cut records.

These objections defeat immediate adoption based only on practitioner familiarity or attractive artwork. They do not defeat evidence collection or candidate testing.

## Recommendation

Proceed with the shelf expansion as an evidence-gated research track, using **two sign-agnostic semantic concepts** as the working hypothesis: low shelf and high shelf. Do not create four signed first-class records.

For representation research, test at least three treatments:

1. a sign-agnostic shelf-side convention that does not depend solely on curve direction;
2. explicit signed variants labeled as illustrations of a base concept;
3. an expanded axis/baseline form that reveals the unaffected plateau.

Also test a compositional text or glyph model in which shelf side and gain sign are separately expressible. As a working naming hypothesis, a future base record's canonical and spoken labels would be `low shelf filter` or `high shelf filter`. Its text fallback remains an open design question. Signed use would add `boost` or `cut` without converting those states into aliases.

Promotion into the registry should require evidence that participants can distinguish:

- low shelf from high shelf;
- shelf from low-pass/high-pass or low-cut/high-cut;
- base filter type from a particular signed illustration;
- signed state when a sign or baseline extension is present.

## Limitations

- This pass establishes the engineering model, not cross-vendor glyph convergence.
- It does not inventory education, journalism, or community representations; sibling Issue #50 work should cover those angles.
- It does not test actual recognition or confusability.
- W3C's Cookbook is a Working Group Note rather than a W3C Recommendation. The reviewed Web Audio API 1.1 publication is a First Public Working Draft, although the earlier [Web Audio API 1.0 Recommendation](https://www.w3.org/TR/2021/REC-webaudio-20210617/) and current implementations use the same type-plus-gain structure.
- Product behavior may intentionally depart from ideal biquad shelves.
