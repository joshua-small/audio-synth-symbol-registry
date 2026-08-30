# Band-Stop and Notch Semantic Boundary Report

## Scope

This pass tests whether `notch filter` is an exact alias for `band-stop filter`, a narrower subtype, or a context-dependent related term. It reviews engineering references, audio-vendor documentation, education-oriented material, and community usage. It does not change any registry name, alias, record, artwork, or status.

## Findings

### Narrow-subtype usage

[Analog Devices' glossary](https://www.analog.com/en/resources/glossary/notch-filter.html) defines notch as a band-stop filter with a narrow stopband and high Q, where Q is center frequency divided by bandwidth (EV-026). [MathWorks](https://www.mathworks.com/discovery/notch-filter.html) likewise contrasts a wider band-stop response with a very narrow notch and relates higher Q to narrower rejection (EV-029).

This establishes a technically meaningful and common relationship:

- `band-stop` is the broader response family;
- `notch` is often the narrow or high-Q member of that family;
- the boundary cannot be inferred from the response direction alone because it depends on bandwidth and the convention used to measure it.

### Exact-alias usage

The distinction is not universal. [Analog Devices' Filter Primer](https://www.analog.com/en/resources/technical-articles/a-filter-primer.html) introduces the modeled response as a "notch, or bandstop, filter" (EV-027). [Apple's general Logic Pro filter overview](https://support.apple.com/guide/logicpro-ipad/filters-overview-lpipd3ece48e/ipados) says that band reject is also known as notch (EV-030). These sources use the terms as alternate names without requiring an explicit narrowness threshold.

This is not merely a vendor-versus-engineering split: Analog Devices publishes both the narrow-subtype definition and an interchangeable-name treatment. Terminology therefore varies by document purpose and model granularity.

### Response-region and product-mode usage

[Texas Instruments](https://www.ti.com/lit/pdf/slyt613) repeatedly pairs `bandstop` and `notch`, defines multiple bandwidth and attenuation quantities for the response, and then describes the deepest central rejection region as a notch (EV-028). The same document therefore exhibits both alias-like naming and feature-within-response usage.

Apple also varies by product context. Its [Step FX documentation](https://support.apple.com/guide/logicpro-ipad/step-fx-filter-types-lpip94d25257/ipados) makes a narrow rejected band central to the notch definition (EV-031), while its general overview gives the alias treatment above. Other audio products use `Notch` as a selectable UI mode without exposing a portable, cross-product numerical boundary.

### Community disagreement

A [KVR Audio discussion](https://www.kvraudio.com/forum/viewtopic.php?t=483762) contains explicit practitioner claims that notch and rejection filters behave differently (EV-032). The thread is not authoritative enough to define the distinction, but it is valid counterevidence to assuming users always understand the labels as exact equivalents.

## Engineering boundary variables

The sources identify several variables that a precise future model would need:

- center or notch frequency;
- bandwidth, including the attenuation threshold at which bandwidth is measured;
- quality factor, commonly expressed as center frequency divided by bandwidth;
- maximum or central attenuation;
- filter order and response topology;
- whether the label names the complete transfer-function family, a narrow subtype, a central feature, or a product mode.

No reviewed source supplies a cross-domain numerical Q or bandwidth threshold at which every band-stop filter becomes a notch filter. `Narrow` and `high Q` are relational descriptions here, not a universal classification value.

## Registry recommendation

Keep the existing policy unchanged: `notch filter` should remain a provisional related term for the band-stop record, not an exact alias. The evidence supports semantic proximity but contradicts exact equivalence across contexts.

If future scope adds a dedicated notch record, model it as an evidence-gated specialization of band-stop and require an explicit discriminant such as narrow/high-Q intent. Do not create that record until the project decides whether relative narrowness is sufficiently interoperable without a universal threshold.

## Unicode and glyph implication

A single downward rejection-curve glyph may be recognized as either `notch` or `band-stop` depending on its apparent width and the reader's domain. This ambiguity is relevant to glyph recognition studies and character naming. It does not establish a need for separate encoded characters, nor does it justify collapsing the terms into exact aliases.

## Limitations

- Product documentation often describes controls rather than a normalized transfer function.
- Q conventions can vary across EQ products, so numeric values are not automatically portable.
- Community evidence demonstrates disagreement but cannot adjudicate engineering definitions.
- This pass did not identify a standards-body definition that supplies a universal numerical notch/band-stop boundary.
