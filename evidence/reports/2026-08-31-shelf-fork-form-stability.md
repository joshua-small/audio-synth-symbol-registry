# Shelf fork form-stability spike

## Agent Report

- Produced: `2026-08-31T21:44:53-07:00`
- Decision authority: D-021
- Evidence reservation: EV-170 through EV-176
- Derived artifact reservation: DA-019
- Starting point: `0174fde2ab6df5967f8a59e3e129114604cf4853`

## Question and boundary

This spike asks whether the locked low-shelf and high-shelf drawings' axis-free, sign-agnostic, two-prong fork topology is independently established, or whether the topology remains a project synthesis. It compares topology only. It does not copy, trace, or import third-party artwork; establish portable text use; authorize Unicode work; or alter the locked drawings.

The exact locked paths, proportions, curve tension, endpoints, and stroke treatment remain original project implementation. Any future visible change remains a Human Review stop.

## Method

Sources qualified for the positive form count only when a publisher exposed both low-shelf and high-shelf compact selectors, the selectors were independently inspectable, the shelf type was mapped by adjacent documentation or stable UI order, and signed gain was represented separately from filter type. Manufacturer, DAW, open-source, education, and historical material were inspected. Static pages that named shelf types but did not reproducibly map a visible glyph were excluded from the positive count.

The project compared:

- exact contour versus shared topology;
- neutral fork versus polarity-specific stepped response;
- two-prong fork/convergence versus a single response trace;
- local axes or baselines versus an axis-free selector;
- affected-side orientation; and
- type identity versus signed gain state.

## Comparison matrix

| Evidence | Publisher and date | Form | Gain polarity | Local axis | Affected-side orientation | Disposition |
| --- | --- | --- | --- | --- | --- | --- |
| EV-170 | Apple, current Logic Pro for iPad | Mirrored two-prong fork selectors | Sign-agnostic; gain is separate | None in selector | Low forks left; high forks right | Positive topology evidence |
| EV-171 | Ableton, Live 8.1 manual | Mirrored two-prong fork selectors | Sign-agnostic; gain is separate | None in selector | Low forks left; high forks right | Positive historical topology evidence |
| EV-172 | Avid, 2023.3 EQ III guide | Mirrored two-prong fork selectors | Sign-agnostic; gain is separate | None in selector | Low forks left; high forks right | Positive topology evidence |
| EV-173 | University of Iowa, 1996 assignment | Single stepped response traces | Polarity-bearing single states; dynamic switching unproved | No local drawn axis, but a reference-like step | Low/high identified by labeled order | Negative form evidence |
| EV-174 | DSSSP, pinned open-source commit | Single curve plus detached reference segment | Icon flips with gain sign | Detached reference segment | Product-local and polarity-dependent | Negative form evidence |
| EV-175 | Image-Line, current EQ 2 page | Compact colored curve states | Mapping cannot be pinned from the static capture | Display context | Not reproducibly attributable | Excluded from exact-form count |
| EV-176 | FabFilter, current Pro-Q page | Shape menu documented; cited static image shows Bell | Shelf state not visible | Display context | Not reproducibly attributable | Excluded from exact-form count |

## Findings

### Independently established topology

Apple, Ableton, and Avid are independent publisher and product groups. Each exposes a low/high shelf pair as compact, axis-free, mirrored two-prong selectors. Each treats boost or cut as a separate signed gain state. Their common primitive is therefore not an invention unique to this project.

The orientation also converges. The low-shelf selector forks on the low-frequency, left side and converges toward the unaffected right side. The high-shelf selector mirrors it, forking on the high-frequency, right side and converging toward the unaffected left side.

Under the acceptance rubric, these three independent target implementations support a future visual-convergence score 3 at the topology level. A later mechanical assessment must still verify and explicitly document the record-level exclusions for axes, parameter values, slope, color, orientation changes, interaction state, and exact proportions before awarding that score.

### What remains project-original

None of the sources independently establishes the exact locked SVG path. The locked Fork A proportions, smooth curvature, whitespace, line weight, and endpoint placement remain project-authored choices. The sources support an established design grammar, not identical artwork or a reusable standardized master.

### Divergence is real and informative

EV-173 and EV-174 show a different visual lineage: a polarity-specific response trace, sometimes with a reference segment, which changes or implies direction with signed gain. These are valid product representations but do not contradict the existence of the neutral fork convention. They demonstrate that the convention is convergent rather than universal.

EV-175 and EV-176 are excluded because their pinned static captures do not map a visible shelf glyph strongly enough for exact-form counting. Naming a menu option or showing an unrelated active shape is not target-form evidence.

## Adverse interpretation

The strongest adverse reading is that the three positive icons are only product-local controls embedded in EQ interfaces. Users may rely on selector order, graph context, tooltips, or familiarity, so convergence does not prove that either glyph is recognized correctly when isolated, distinguishes shelf from pass in a six-way blind task, functions in plain text, or qualifies for encoding. Historical and open-source counterexamples also prevent a claim of universal form.

That adverse reading limits the conclusion but does not erase it: the same neutral two-prong topology appears in three independent implementations, including a 2009 manual and current product documentation. The remaining uncertainty is recognition and interchange, not whether the topology exists outside this project.

## Disposition

- Reclassify the neutral two-prong affected-side topology from project synthesis to independently established cross-vendor design grammar.
- Preserve the locked artwork byte-for-byte. No redraw or geometry adjustment is proposed.
- Preserve both shelf records as `evidence-collecting`. Six-way isolated recognition, exact shelving-term disposition, and portable-text evidence remain unresolved.
- Preserve Unicode status at `HOLD`.
- Treat all vendor artwork as reference-only; no reuse right is claimed.

## Reproduction notes

Each source is pinned in the evidence ledger with an exact locator and SHA-256 digest. Positive observations were made from the cited screenshots or manual pages rather than search-result thumbnails. Negative and excluded results are retained to prevent selection bias.
