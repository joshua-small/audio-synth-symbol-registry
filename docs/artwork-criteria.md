# Neutral Reference Artwork Criteria

## Purpose and boundary

This document defines how the registry may create, validate, version, and accept original neutral SVG reference artwork.

Artwork is a rendering aid for an approved semantic record. It is not the canonical interchange form, a Unicode claim, a replacement for text fallback or speech, or an attempt to reproduce a vendor control.

For the initial filter-response research set, the contemplated treatment is a compact, axis-less response form. Axis-bearing graphs remain illustrative-only unless a later evidence review establishes an independent semantic need.

## Normative requirements

An artwork contribution MUST:

1. Link to one existing registry semantic record.
2. Represent only that record's documented semantic identity.
3. Be original, neutral, editable SVG.
4. Include a complete provenance declaration.
5. Use the repository's approved artwork license, currently CC0-1.0.
6. Pass the validation and review requirements below.
7. Receive Human Review approval before it is marked `accepted`.

Artwork MUST NOT copy, trace, reconstruct, or closely imitate vendor, IEC, ISO, AES, SMuFL, FontAudio, or other third-party artwork. Evidence sources may establish terminology and use, but they do not grant permission to reuse geometry.

## Semantic constraints

A reference glyph may encode only the linked record's approved response class.

The initial artwork MUST NOT encode axes, labels, values, gridlines, gain baseline, units, slope, bandwidth, resonance, cutoff position, color, interaction state, product-specific affordance, or other parameter unless an approved semantic record expressly requires it.

If a reviewer needs to add meaning not stated by the linked record in order to describe the drawing, the drawing is out of scope.

## Record eligibility and asset status

Draft and study-ready original artwork MAY link to a record with status `evidence-collecting`, `registry-candidate`, or `registry-accepted`. This permits semantic and visual research without pretending that the artwork or identifier is permanent.

Accepted artwork MUST link to a `registry-accepted` record. Acceptance is therefore impossible while the record's identifier remains provisional.

| Asset status | Permitted linked record status | Meaning |
| --- | --- | --- |
| `draft` | `evidence-collecting`, `registry-candidate`, `registry-accepted` | Original geometry under internal review; not an accepted or published reference asset. |
| `study-ready` | `evidence-collecting`, `registry-candidate`, `registry-accepted` | Locked original geometry approved for a particular study protocol; not accepted artwork. |
| `accepted` | `registry-accepted` only | Human-approved reference artwork. |
| `withdrawn` | Any historical linked status | Preserved provenance; no longer recommended for new use. |

An asset ID is local artwork metadata, not a semantic identifier. It MUST use the `asr-art:` prefix, MUST be unique within `artwork/metadata.json`, and MUST NOT collide with, replace, or imply permanence of an `asr:` record ID.

## File and SVG requirements

Store the file at:

```text
artwork/svg/<record-id-without-colon>.svg
```

Example:

```text
artwork/svg/filter.high-pass.svg
```

Store matching provenance at:

```text
artwork/provenance/<record-id-without-colon>.yaml
```

Do not put versions in filenames.

Each SVG MUST:

- Be standalone SVG with the SVG namespace and a `viewBox`.
- Use a square coordinate system unless a documented exception is approved.
- Remain legible at 16, 20, 24, 32, and 64 CSS pixels.
- Use editable, repository-authored vector primitives or paths only.
- Use monochrome `currentColor` or a documented equivalent so hosts control contrast.
- Include an accessible name and description.
- Have no external resource dependencies.

Each SVG MUST NOT contain raster images, embedded image data, `<foreignObject>`, scripts, event handlers, animation, external stylesheets, external `<use>` references, web fonts, network references, or visible text.

Prefer simple paths, lines, polylines, and basic shapes. Filters, masks, clipping, gradients, opacity effects, and transforms require a documented reason.

## Accessibility

A meaningful standalone SVG MUST use the record's canonical name and spoken label, not a visual-only label.

```xml
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  role="img"
  aria-labelledby="title desc">
  <title id="title">High-pass filter</title>
  <desc id="desc">Reference glyph for a high-pass filter response.</desc>
  <!-- Original neutral geometry only -->
</svg>
```

When an implementation already supplies an equivalent accessible name, it SHOULD prevent duplicate announcement. When a rendered glyph is decorative because adjacent text already provides the same meaning, the implementation MAY hide that rendered instance from assistive technology.

A visible glyph alone is never an accessibility substitute for the record's text fallback and spoken label. Host applications remain responsible for applicable contrast requirements, including [WCAG 2.2 SC 1.4.11 Non-text Contrast](https://www.w3.org/TR/WCAG22/#non-text-contrast).

References:

- [SVG 2](https://www.w3.org/TR/SVG2/)
- [SVG Accessibility API Mappings](https://www.w3.org/TR/svg-aam-1.0/)
- [W3C Images Tutorial](https://www.w3.org/WAI/tutorials/images/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)

## Provenance declaration

Every artwork file MUST have a matching YAML declaration:

```yaml
schema_version: "0.1.0"
asset_id: "asr-art:filter.high-pass"
record_id: "asr:filter.high-pass"
asset_path: "artwork/svg/filter.high-pass.svg"
asset_status: "draft" # draft | study-ready | accepted | withdrawn
artwork_version: "0.0.0"
created_at: "YYYY-MM-DDTHH:MM:SS-07:00"
created_by:
  - name: "Contributor name or handle"
    role: "original geometry author"
originality:
  statement: >
    This SVG was created for this repository. No third-party artwork was
    copied, traced, or used as source geometry.
  prohibited_source_material_used: false
  reference_sources:
    - source_id: "EV-XXX"
      observation_only: true
      note: "Semantic or corpus evidence only; not used as geometry."
tools:
  - name: "Tool name"
    use: "Geometry authoring or validation"
license: "CC0-1.0"
semantic_constraints:
  axis_bearing_form: "illustrative-only"
  encoded_properties:
    - "filter response class"
  excluded_properties:
    - "axes"
    - "gain baseline"
    - "frequency values"
    - "slope"
    - "bandwidth"
    - "resonance"
    - "interaction state"
accessibility:
  canonical_name: "High-pass filter"
  spoken_label: "high-pass filter"
  title_present: true
  description_present: true
validation:
  svg_syntax: "pending"
  external_resources: "pending"
  size_review_px: [16, 20, 24, 32, 64]
  contrast_host_review: "pending"
review:
  independent_agent_review: "pending"
  human_artwork_acceptance: "pending"
  decision_log_entry: null
```

The declaration records source observations, not artwork source material.

## Review and acceptance

1. Confirm the linked semantic record and evidence.
2. Add original geometry and provenance in `draft` status.
3. Validate SVG syntax, external-resource absence, accessibility markup, and rendering at every required size on light and dark backgrounds using the [SVG validation and render-QA tooling](svg-validation-and-render-qa.md).
4. Obtain independent agent review for provenance, semantic leakage, portability, and visual-family consistency.
5. Run the applicable blind study only on a locked `study-ready` rendering.
6. Open a focused PR with validation results and an Agent Report.
7. Add a Human Review request for artwork acceptance. The linked record must be `registry-accepted`.
8. After authorization, record the decision in `docs/decision-log.md`, set the asset status to `accepted`, and update artwork metadata.

No study, lint, agent review, or merge alone accepts artwork.

## Artwork metadata and publication contract

No artwork metadata file exists until a first original artwork asset is proposed. In the same PR as that first asset, create `artwork/metadata.json`. This file is the authoritative machine-readable index and release metadata for artwork. Individual provenance YAML files explain origin; they do not define the published artwork set or version.

Minimum contract:

```json
{
  "metadata_schema_version": "0.1.0",
  "artwork_version": "0.1.0",
  "publication_status": "published",
  "canonical_assets": [
    {
      "asset_id": "asr-art:filter.high-pass",
      "record_id": "asr:filter.high-pass",
      "canonical_path": "artwork/svg/filter.high-pass.svg",
      "asset_status": "accepted",
      "provenance_path": "artwork/provenance/filter.high-pass.yaml"
    }
  ]
}
```

- `artwork/metadata.json` is authoritative for `artwork_version`, `publication_status`, and the current canonical `asset_id` to `record_id` to `canonical_path` mapping.
- A provenance declaration is authoritative for its asset's creator, originality, tool, accessibility, and review details.
- The linked record remains authoritative for semantic identity, status, text fallback, and spoken label.
- A canonical path MUST be stable after publication. A withdrawn asset remains listed with its historical path and a replacement or withdrawal reason.
- `asset_id` uniqueness is validated by the metadata index. Do not derive an asset ID from an unaccepted record as a promise that either ID will remain permanent.

Artwork SemVer is independent from registry, schema, and tooling SemVer under D-007. Artwork version changes do not automatically change registry version, and a registry release does not automatically publish artwork.

Before any artwork is accepted, the index MUST use `publication_status: "unpublished"`, a valid pre-release corpus version of `artwork_version: "0.0.0"`, an empty `canonical_assets` array, and a `draft_candidates` array for proposed assets. Each draft-candidate item records its asset ID, record ID, asset path, `draft` status, and provenance path. Draft candidates are noncanonical working material and are not a publication or release. A draft candidate MUST NOT enter `canonical_assets` until the linked record and artwork satisfy the acceptance and release gates above.

- PATCH: Non-semantic geometry, metadata, formatting, accessibility, or rendering corrections.
- MINOR: First publication at `0.1.0`, a new accepted reference asset, a backward-compatible variant, or a material but semantically equivalent redesign.
- MAJOR: Removal of a published canonical path without compatibility treatment, incompatible metadata-contract change, or redefinition of a documented rendering contract.

A public artwork release occurs only when all of the following are true: the asset is `accepted`, its linked record is `registry-accepted`, `artwork/metadata.json` declares `publication_status: "published"`, a Human Review authorizes the release, and the repository creates the corresponding `artwork-vX.Y.Z` tag. Until then, draft and study-ready assets are unpublished working material, even if visible in an open PR.

A reference glyph is not the canonical interchange identifier. Its version must never substitute for the linked record ID or text fallback.

## Pre-review checklist

- [ ] Linked semantic record and constraints identified.
- [ ] Originality declaration complete.
- [ ] No third-party geometry, tracing, or implied permission.
- [ ] SVG contains no external or executable content.
- [ ] SVG has a `viewBox`, accessible name, and description.
- [ ] Asset reviewed at 16, 20, 24, 32, and 64 px on light and dark backgrounds.
- [ ] No prohibited parameter or product state is encoded.
- [ ] Any axis-bearing form is marked illustrative-only.
- [ ] Independent review is complete.
- [ ] Proposed artwork version change is stated.
- [ ] Human Review asks for acceptance or rejection.
