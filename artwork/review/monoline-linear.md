# Draft monoline-linear candidate family

## Non-approval boundary

Joshua authorized draft candidate creation in chat on 2026-08-30 but did not authorize candidate selection, artwork acceptance, study-ready status, recruitment, or study launch.

Every asset remains `draft`. These candidates are original repository-authored geometry, not copied or traced from vendor, standards-body, or other third-party artwork. No recognition claim is made.

## Construction system

All four candidates use a 24-unit square, a single continuous open path, a 2-unit `currentColor` stroke, round caps and joins, endpoints at x=3 and x=21, and response levels at y=7 and y=17. High-pass and low-pass use one cubic transition. Band-pass and band-stop use two mirrored cubic transitions centered at x=12. Only response-class topology and direction vary.

The system intentionally omits axes, labels, gain baselines, parameter values, cutoff markers, resonance, slope order, bandwidth, center frequency, interaction state, and product context.

## Contact sheets

- [`monoline-linear-light.png`](monoline-linear-light.png): rows are 16, 20, 24, 32, and 64 px; columns are high-pass, low-pass, band-pass, and band-stop.
- [`monoline-linear-dark.png`](monoline-linear-dark.png): the same ordering on a dark background.

The contact sheets enlarge each source render with nearest-neighbor sampling for inspection. The exact unscaled PNGs and hash-bearing manifests are under `artwork/qa/`.

## Author recommendation

Use this family as a strong systematic baseline in visual comparison, but revise or reject it if the 16 px band-pass or band-stop forms feel too narrow, or if the cubic transitions appear to encode an unintended slope. Selection is a Human Review decision.
