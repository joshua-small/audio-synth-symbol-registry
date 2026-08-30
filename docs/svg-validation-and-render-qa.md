# SVG Validation and Synthetic Render QA

## Scope

This tooling implements the mechanical portion of the neutral-artwork checks without creating, selecting, locking, or accepting glyph geometry. The test corpus is generated at test time and consists only of non-candidate crossed lines. It is not registry artwork, a study stimulus, a design recommendation, or a source for later geometry.

The validator and renderer apply to future original SVGs only after the applicable artwork and stimulus decisions. Passing them does not change an asset status or satisfy Human Review.

## Validation

Run:

```sh
npm run svg:validate -- path/to/original.svg
```

The strict XML and SVG profile requires:

- one SVG root with the SVG namespace and a square positive `viewBox`;
- `role="img"`, exactly two `aria-labelledby` references, and non-empty linked title and description elements;
- at least one allowed editable vector primitive;
- monochrome host-controlled `currentColor`; and
- only the small element and attribute allowlist implemented by the validator;
- title and description as text-only direct root children, groups containing only groups or geometry, and empty geometry primitives; and
- finite, range-checked numeric values plus constrained points and parsed SVG path data.

It rejects malformed XML, DOCTYPE, processing instructions, comments, scripts, event handlers, raster images, embedded data, `foreignObject`, external or local `use`, animation, styles, network or executable values, visible text, gradients, filters, masks, clipping, opacity, transforms, literal colors, unknown elements, and unknown attributes.

This intentionally conservative profile is narrower than SVG 2. A future original asset that needs an otherwise valid feature must document the reason and change the allowlist through review; the validator must not silently permit it.

## Render QA

Run into a directory that does not yet exist:

```sh
npm run svg:qa -- --svg path/to/original.svg --out path/to/new-qa-directory
```

The renderer first runs the validator, then produces ten PNGs: 16, 20, 24, 32, and 64 pixels on light and dark backgrounds. `manifest.json` records the source hash, renderer versions, dimensions, themes, filenames, and PNG hashes. Repeating the same input with the pinned renderer produces the same manifest and bytes in the tested environment.

Automated QA establishes that constrained SVG bytes parse and rasterize reproducibly at the required dimensions. Accessibility checks establish only structural presence and wiring; they cannot determine whether a title or description matches the linked record's canonical name or spoken label. The pipeline also cannot determine whether a glyph is legible, semantically neutral, recognizable, confusable, aesthetically appropriate, original, or acceptable. A reviewer must still inspect the rendered artifacts, and the project must still satisfy provenance, study-locking, and Human Review requirements in [Neutral Reference Artwork Criteria](artwork-criteria.md) and [Blind Recognition Study Protocol](recognition-study-protocol.md).

## Security boundary

The allowlist reduces the attack and portability surface, but processing untrusted graphics is still a security-sensitive operation. Run validation and rendering in a current, isolated environment; retain dependency updates; do not treat this tool as a general SVG sanitizer; and never publish its output as proof that arbitrary input is safe.

## Remaining Issue #28 gate

Infrastructure can be completed with synthetic fixtures. Applying it to real candidates requires original geometry and provenance. Selecting or locking that geometry remains a Human Review gate, followed later by the separate recruitment and study-launch gates. Until then, Issue #28 must remain open and no asset may be described as `study-ready` or accepted.
