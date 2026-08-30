# Recognition Study Package Architecture

## Scope

This scaffold packages already reviewed blind SVG derivatives for the recognition-study protocol. It does not generate geometry, designate an asset `study-ready`, accept artwork, launch a study, recruit participants, or publish results.

The geometry and artistic parameters remain a Human Review boundary. Keeping those decisions outside the packager prevents a deterministic implementation detail from becoming an accidental artwork specification.

## Inputs and outputs

The input plan is local, unpublished working material. It contains:

- a study ID and cryptographically generated secret randomization seed of at least 32 bytes;
- the requested number of counterbalanced forms;
- a registry record ID and blind SVG path for each stimulus;
- terms that must not occur in the blind derivative; and
- forced-choice IDs and participant-facing labels.

The command requires a new output directory:

```sh
npm run study:package -- --plan path/to/local-plan.json --out path/to/new-package
```

It produces two deliberately separate trees:

```text
new-package/
  public/
    assets/<opaque-token>.svg
    instrument.json
  private/
    answer-key.json
```

Only `public/` is suitable for a participant-facing delivery system. `private/answer-key.json` contains record mappings and the seed and must not be served to participants. Operational access control remains the study operator's responsibility.

## Reproducibility and blinding

- Opaque stimulus tokens are HMAC-SHA-256 derivations of the local seed and record ID.
- Stimulus and choice orders are deterministic HMAC-derived sorts scoped by form and stimulus.
- Every copied SVG has an exact SHA-256 digest in both manifests.
- Re-running the same plan and inputs produces the same manifests and asset names.
- The tool rejects a blind SVG containing its registry ID or any configured forbidden term.
- The tool refuses to write into an existing output directory, reducing accidental replacement of a locked package.

The seed must be unpredictable and remain private until collection closes and the initial blinded coding is locked. A memorable phrase that merely satisfies the length check is not sufficient. If the seed or a record-to-token mapping is disclosed early, opaque tokens no longer preserve blinding.

The leakage check is defense in depth, not proof of blinding. Before launch, an independent reviewer must inspect filenames, SVG elements and metadata, the public manifest, the rendered form, HTTP metadata, surrounding UI, and browser accessibility output. A blind derivative may omit semantic accessible text only inside the controlled visual-recognition instrument; it does not replace the accessible source SVG or the canonical text and speech alternatives.

## Input example

This shape-free example intentionally names no artwork paths that exist in the repository:

```json
{
  "study_id": "formative-pilot-v1",
  "randomization_seed": "generate-at-least-32-random-bytes-and-store-privately",
  "form_count": 12,
  "stimuli": [
    {
      "record_id": "asr:filter.high-pass",
      "blind_svg_path": "local-blind-derivatives/high-pass.svg",
      "forbidden_terms": ["high-pass", "high pass", "HPF", "low cut"]
    },
    {
      "record_id": "asr:filter.low-pass",
      "blind_svg_path": "local-blind-derivatives/low-pass.svg",
      "forbidden_terms": ["low-pass", "low pass", "LPF", "high cut"]
    }
  ],
  "forced_choices": [
    { "id": "high-pass", "label": "High-pass filter" },
    { "id": "low-pass", "label": "Low-pass filter" },
    { "id": "band-pass", "label": "Band-pass filter" },
    { "id": "band-stop", "label": "Band-stop filter" },
    { "id": "none", "label": "None of these" },
    { "id": "unknown", "label": "I do not know" }
  ]
}
```

The example is incomplete as a launch plan because it includes only two stimuli. It demonstrates the packaging contract without proposing geometry or marking anything study-ready.

## Accessibility boundary

The public instrument must provide the protocol's prompt, response controls, keyboard operation, focus visibility, contrast, zoom behavior, and equivalent error handling. The stimulus itself must not expose the answer through an accessible name during blind visual recognition. This is a narrow study accommodation, not a model for publishing meaningful SVGs. The source artwork requirements in [Neutral Reference Artwork Criteria](artwork-criteria.md) still require canonical accessible names and descriptions.

People who cannot access the visual stimulus must not be treated as incorrect respondents or as evidence against the text and speech alternatives. Any evaluation of those alternatives is a separate accessibility study.

## Pre-launch verification

1. Confirm each source asset has complete provenance and an authorized `study-ready` state.
2. Generate and retain the plan and private answer key outside the participant-serving tree.
3. Verify copied asset hashes against the locked stimulus hashes.
4. Inspect the full public tree for semantic names, IDs, source paths, comments, metadata, and answer-key material.
5. Render every form at required sizes and supported display modes.
6. Verify form and forced-choice randomization and confirm no feedback appears between items.
7. Exercise keyboard, zoom, contrast, error, resume, and submission behavior.
8. Obtain the protocol's Human Review authorization before recruitment or launch.

## Explicit omissions

- No SVG geometry generator or geometric parameters.
- No canonical, draft, or study-ready artwork files.
- No provenance claim for future artwork.
- No participant identifiers, response storage, analytics, consent collection, incentives, or recruitment integration.
- No claim of ISO 9186 conformance.
