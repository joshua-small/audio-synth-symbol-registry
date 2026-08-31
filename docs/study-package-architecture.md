# Recognition Study Package Architecture

## Scope

This scaffold packages reviewed and explicitly hash-locked draft SVGs into deterministic blind derivatives for the recognition-study protocol. Geometry lock authorizes construction only. It does not designate an asset `study-ready`, accept artwork, launch a study, recruit participants, or publish results.

The geometry and artistic parameters remain a Human Review boundary. Keeping those decisions outside the packager prevents a deterministic implementation detail from becoming an accidental artwork specification.

## Inputs and outputs

Package schema 0.2.0 binds the six locked `compact-a` drafts through [`studies/six-member-compact-a-binding.json`](studies/six-member-compact-a-binding.json). The binding joins the lock manifest, artwork metadata, provenance declarations, QA manifests, and exact source bytes at lock-establishing commit `4ad8ec92477a938355df06bc943a57372c7f3438`. The input plan is local, unpublished working material. It contains:

- a study ID and cryptographically generated secret randomization seed of at least 32 bytes;
- the requested number of deterministic randomized forms;
- a registry record ID plus the expected locked asset ID and source SHA-256 for each stimulus;
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

Only `public/` could later be used by a participant-facing delivery system; construction does not authorize serving it. `private/answer-key.json` contains record mappings and the seed and must not be served to participants. The packager requests owner-only permissions for the private directory and answer key, but operational access control and platform-specific permission verification remain the study operator's responsibility.

## Reproducibility and blinding

- Opaque stimulus tokens are HMAC-SHA-256 derivations of the local seed and record ID.
- Stimulus and choice orders are deterministic HMAC-derived sorts scoped by form and stimulus.
- Every blind derivative has an exact SHA-256 digest in both manifests; its locked source digest remains private.
- Schema 0.2.0 validates each source against all repository authorities, then creates a deterministic blind derivative from the retained source buffer by removing answer-bearing title, description, role, and ARIA metadata.
- The exact byte buffer checked for forbidden terms and hashed is retained in memory and written to the package; the source path is not re-read after validation.
- Re-running the same plan and inputs produces the same manifests and asset names.
- The tool rejects a blind SVG containing its registry ID or any configured forbidden term. Participant-facing choice labels are intentionally present only in the forced-choice table, never in stimulus filenames, descriptors, or SVG bytes.
- The tool refuses to write into an existing output directory, reducing accidental replacement of a locked package.

The seed must be unpredictable and remain private until collection closes and the initial blinded coding is locked. A memorable phrase that merely satisfies the length check is not sufficient. If the seed or a record-to-token mapping is disclosed early, opaque tokens no longer preserve blinding.

The leakage check is defense in depth, not proof of blinding. Before launch, an independent reviewer must inspect filenames, SVG elements and metadata, the public manifest, the rendered form, HTTP metadata, surrounding UI, and browser accessibility output. A blind derivative may omit semantic accessible text only inside the controlled visual-recognition instrument; it does not replace the accessible source SVG or the canonical text and speech alternatives.

## Construction input

Use [`studies/six-way-construction-plan.template.json`](studies/six-way-construction-plan.template.json). Replace its conspicuous seed placeholder only in a private local instance; do not commit a real seed or generated package. The template fixes the neutral prompt, exact eight choices, sign-agnostic affected-side target, and six directed confusion pairs. Gain sign, gain magnitude, a 0 dB baseline, and upper/lower-branch framing are prohibited from participant-facing text.

Package schema 0.1.0 remains supported for generic historical fixtures, but it does not assert a repository artwork lock.

## Accessibility boundary

The public instrument must provide the protocol's prompt, response controls, keyboard operation, focus visibility, contrast, zoom behavior, and equivalent error handling. The stimulus itself must not expose the answer through an accessible name during blind visual recognition. This is a narrow study accommodation, not a model for publishing meaningful SVGs. The source artwork requirements in [Neutral Reference Artwork Criteria](artwork-criteria.md) still require canonical accessible names and descriptions.

People who cannot access the visual stimulus must not be treated as incorrect respondents or as evidence against the text and speech alternatives. Any evaluation of those alternatives is a separate accessibility study.

## Pre-launch verification

1. For construction, confirm each source asset has complete provenance and matches the authorized draft geometry lock. Before serving anything, obtain separate `study-ready` authorization.
2. Generate and retain the plan and private answer key outside the participant-serving tree.
3. Verify copied asset hashes against the locked stimulus hashes.
4. Inspect the full public tree for semantic names, IDs, source paths, comments, metadata, and answer-key material.
5. Render every form at required sizes and supported display modes.
6. Verify form and forced-choice randomization and confirm no feedback appears between items.
7. Exercise keyboard, zoom, contrast, error, resume, and submission behavior.
8. Obtain the protocol's Human Review authorization before recruitment or launch.

## Explicit omissions

- No SVG geometry generator or geometric parameters.
- No canonical or study-ready artwork files; the 0.2.0 binding consumes only the six authorized locked drafts and emits blind construction derivatives.
- No provenance claim for future artwork.
- No participant identifiers, response storage, analytics, consent collection, incentives, or recruitment integration.
- No claim of ISO 9186 conformance.
