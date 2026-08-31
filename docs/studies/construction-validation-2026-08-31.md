# Private Construction Validation - 2026-08-31

## Scope and authorization

Joshua authorized HR-002 in interactive project chat at `2026-08-31T07:37:38-07:00`. The authorization covered one private, non-operational validation instance against exact repository commit `8ee4680d62c00e1c768eea2830f53cd6096c3c8f`.

The randomization seed, plan contents, answer key, source-to-token mappings, opaque tokens, derivative-to-record associations, and answer-bearing package remain private and outside git and GitHub. This report contains only non-sensitive counts, results, limitations, and cryptographic commitments.

## Agent Report - 2026-08-31T07:44:29-07:00

### Construction result

The repository packager created a `construction-only` package bound to the six exact draft assets whose authority tree points to geometry-lock commit `4ad8ec92477a938355df06bc943a57372c7f3438`.

| Check | Result | Reviewable evidence |
| --- | --- | --- |
| Private permissions | Pass | Validation root and private directory were owner-only; plan and answer key were owner-readable and owner-writable only. |
| Authority and source hashes | Pass | All six plan expectations, binding entries, lock entries, metadata records, provenance declarations, QA manifests, and current source bytes agreed. |
| Derivative hashes | Pass | All six emitted SVG byte streams matched the public and private derivative commitments. |
| Public/private separation | Pass | The public tree contained no seed, answer-key locator, registry ID, source path, source hash, asset ID, lock commit, or provenance association. No symlinks were present. |
| Semantic-leakage defense | Pass | Every blind SVG omitted title, description, role, ARIA, IDs, text elements, comments, declarations, and record-specific forbidden terms. Participant-facing choice labels remained only in the forced-choice table by design. |
| Twelve-form integrity | Pass | All 12 forms contained each of six opaque stimuli exactly once. All 72 item presentations contained each of eight choices exactly once. This instance produced 12 distinct stimulus permutations and 72 distinct choice permutations. |
| Static rendering | Pass | All six blind derivatives rendered at 16, 20, 24, 32, and 64 pixels in light and dark modes: 60 asset renders. Every form order also rendered in light and dark mode: 24 form renders. |
| Accessibility boundary | Pass within construction scope | Canonical source SVGs retained linked accessible titles and descriptions. Blind derivatives omitted answer-bearing accessible names only for the controlled visual-recognition task. The instrument retained the neutral participant prompt and explicit text labels for all eight choices. |
| Determinism | Pass | Rebuilding from the same private plan produced a byte-identical package. |
| Repository validation | Pass | `npm test`: 104 tests passed, 0 failed. Registry validation covered 6 records, 5 assessment sets, and 62 evidence sources; Agent Report hygiene passed. |

### Commitments

These SHA-256 values permit later verification against the retained private material without disclosing it:

| Material | SHA-256 |
| --- | --- |
| Private construction plan | `0f503d589036f0ec27c1dff560c73119307364ebc0aa98716796319964f29e5b` |
| Private answer key | `d6c61182328bece71c5b43ae869b7a3261c1892bb4b0efc003b8471f1d4f1d65` |
| Public instrument manifest | `5259a8d3a5f4eb9183a84ff187002a61b42e2ab69ea60ae437cec3c3c8907ce5` |
| Public package tree | `adf9c7c9d878682e704fc75c058635bfa329e771ecff0d724023dca04f047dfd` |
| Private static-render audit tree | `f350b9caf203b58851b6196db7d02518731935cabd999d1d49f27c379e0c35b9` |

The tree commitments use this canonical algorithm:

1. Start at the named tree root: `package/public/` for the public package commitment and `render-audit/` for the private render commitment.
2. Recursively enumerate regular files and reject symbolic links. Express each path relative to that root with `/` separators.
3. Sort the relative paths in ascending JavaScript string order.
4. For each file, encode one UTF-8 entry as `<relative-path><U+0000><lowercase SHA-256 of exact file bytes>`.
5. Join entries with one U+000A byte and no terminal newline, then report the lowercase SHA-256 of that byte sequence. The empty-tree commitment is SHA-256 of zero bytes.

A non-secret test vector makes implementations checkable. For a tree containing `a.txt` with UTF-8 bytes `A\n` and `sub/b.bin` with bytes `00 ff`, the tree commitment is `267ed526ec8ace3c3ed9fa284188806ea353ea076a786e8204bdb3fbc1dc959a`.

The algorithm does not publish individual private paths, opaque filenames, per-file hashes, or record associations.

### Limitations and adverse findings

- This package is construction material, not a participant-facing runtime. It cannot exercise keyboard order and activation, visible focus, browser zoom and reflow, contrast in the surrounding UI, validation errors, resume behavior, submission behavior, HTTP headers and metadata, or the browser accessibility tree.
- Static render success does not establish legibility, recognition, semantic convergence, or artwork acceptance.
- A visual-recognition instrument necessarily withholds the stimulus answer from assistive technology. People unable to access the visual stimulus must not be scored as incorrect or used as evidence against text and speech alternatives.
- The leakage checks are defense in depth. They do not authorize serving the package, participant access, recruitment, data collection, or launch.

## Recommendation and next gate

Do not promote the assets or package to `study-ready` yet. The next narrowly scoped gate should authorize construction of a private, offline, non-operational participant-interface harness so an independent reviewer can exercise keyboard, focus, zoom, error, resume, submission simulation, surrounding contrast, browser accessibility-tree output, and delivery-metadata boundaries without recruiting participants or collecting data. The harness should use synthetic responses only, open no network listener, and retain no real-response data.

That authorization should continue to exclude participants, recruitment, privacy and consent decisions, retention, incentives or spending, launch, publication, artwork acceptance, release, outreach, and standards action.
