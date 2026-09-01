# Private non-PUA icon-package readiness

Status as of 2026-09-01T02:11:01-07:00. This Agent Report records a PRIVATE INTERNAL construction and validation proof under D-021 and D-028. The integrated exact remote base is `2a87e60e39a5dc26c62f754fbdf8976db6810ec2`, tree `3bfc7955dcb670d776af12018deab9a2939e9b72`, after the approved evolutionary-history corpus v2 merge. The implementation does not publish package bytes, accept artwork, select a package-output publication license, change geometry or semantics, assign a code point, perform outreach, or alter Unicode `HOLD`.

## Outcome

The six locked `compact-a` draft SVGs can be assembled deterministically into a private application-asset package with:

- a schema-validated semantic manifest;
- six individual SVG files copied byte-for-byte from their locked sources;
- an SVG symbol sprite whose six path bodies retain the locked source path markup;
- lowercase kebab-keyed Iconify-compatible JSON with no embedded accessibility names;
- generated ESM lookup data and TypeScript declarations;
- separate accessible-control, informative-image, and CSS-mask examples; and
- SHA-256 integrity commitments for every generated file.

The generated manifest binds registry version 0.4.2, stable package keys, semantic identifiers, names, definitions, structured bounded alias policy, text fallbacks, speech labels, lifecycle status, draft artwork state, source and package SVG paths, exact source hashes, provenance paths, accessibility guidance, and evidence-qualified external-name slots. It explicitly records `null` for every Unicode, SMuFL, and Private Use Area code point.

## Construction boundary

The generator refuses to write inside the repository and refuses an existing output directory. Before copying a source it verifies the exact six-member lock order and SHA-256 values, the unpublished 0.0.0 artwork metadata with no canonical assets, each draft provenance record's project-original/CC0 declaration and pending acceptance state, each registry record's current schema and `not-submitted` Unicode state, and the locked 24-by-24 single-path profile. Individual package SVG files are exact byte copies; source geometry remains authoritative.

Two fresh external-directory builds must contain the same relative paths and byte content. The validator then compiles the checked-in JSON Schema, verifies individual source/package equality, validates package integrity hashes, and reports one deterministic aggregate package commitment. No generated manifest, SVG copy, sprite, Iconify JSON, lookup module, example, or integrity file is tracked in git.

The integrated bounded validation produced 16 identical files in each of two fresh builds, preserved all six source SVG byte streams, and produced aggregate package commitment `79ff97420c617b887f4f8420b6284e7fed6afb9ed14ccdaea888fbbe691216f4`. Repository validation and all 124 tests passed with registry 0.4.2 and tooling 0.9.0.

## Alias contract

Every icon carries a machine-readable policy whose exact labels are the registry name plus the bounded registry alias array. The generator expands these into an explicit allowed-variant index: ASCII case and outer ASCII whitespace may vary, and only the first internal attributive separator may toggle between one space and one hyphen. Every later separator must remain exactly as approved. Thus `low-shelving filter`, `low shelf filter`, and `low-cut` resolve, while invented `low-shelving-filter`, `high-shelving-filter`, `low-shelf-filter`, and `band-pass-filter` do not. Lookup requires the caller to declare the `audio-filter-response-class` context and performs no substring or morphological inference. Related terms and blocked examples remain non-exact; this explicitly keeps `notch filter`, `low shelving`, `high shelving`, `LS`, `HS`, parameter phrases, implementation names, and arbitrary cut phrases out of exact lookup. An explicit product-documentation signal disables generic resolution because the product's stated behavior overrides the general alias table.

## Accessibility contract

Icon data and accessible naming are deliberately separate:

- an icon inside a named control is decorative, uses `aria-hidden="true"`, and takes its accessible name from the consuming control;
- a standalone informative SVG uses the registry name as alternative text;
- a meaningful inline use supplies a consumer-owned unique `<title>` ID and matching `aria-labelledby` wrapper, as demonstrated independently for all six icons; and
- CSS masks inherit `currentColor` and require the consuming element or control to provide semantics.

The Iconify bodies contain geometry only. They do not embed a repeated title, description, ARIA attribute, character, or product-local meaning. Iconify components default to decorative and `aria-hidden`; a consumer must opt into a meaningful use with an equivalent unique-ID naming wrapper.

## External mapping slots

The manifest provides evidence-qualified names for interoperability research, not equivalence or adoption claims. EV-120 supplies Ardour Toolkit names, EV-122 supplies the derivative FontAudio/Iconify namespace, EV-101 and EV-174 supply DSSSP names, and Band-stop marks FontAudio/Iconify and DSSSP Notch names `related-only`. The SMuFL glyph-name slot is null for all six. These slots do not copy third-party artwork, import third-party licenses, establish independent adoption, or authorize external use.

## Licensing and release boundary

- Locked source artwork: provenance records declare CC0-1.0 and no prohibited source geometry.
- Generator, schema, validator, tests, and documentation: repository Apache-2.0 tooling.
- Generated assembled package: private validation artifact with `package_output: null`; no publication license has been selected.
- Public icon-registry release, npm publication, font release, artwork acceptance, canonical artwork, external reuse, and licensing commitments remain reserved actions.

The project-owned source provenance permits private byte-identical copies for this bounded proof. That permission does not turn the package into a public release.

## Preserved objections

- SVG, sprites, CSS masks, and Iconify JSON solve application asset delivery, not portable plain-text interchange.
- The external namespaces demonstrate project-local or derivative icon use, not a shared character registry.
- The two shelves remain `evidence-collecting`; packaging does not resolve isolated recognition.
- Four records remain reversible `registry-candidate`, not `registry-accepted`.
- Band-stop keeps the broad Band-stop/Band-reject class and does not transfer Notch-only evidence without a source-local mapping.
- The package keys are internal identifiers and must not be presented as Unicode names, code points, SMuFL registration, or cross-project authority.

## Reproduction

From an exact checkout with dependencies installed:

```sh
npm run icon:private-package
npm test
```

The validator builds twice in fresh system-temporary directories, removes them after validation, and prints only non-sensitive commitments and boundary results. To inspect a private instance, invoke `node tooling/private-icon-package/build-private-icon-package.mjs /absolute/path/outside/repository/new-directory`; do not publish or commit the output.

## Agent Report

- Timestamp: 2026-09-01T02:11:01-07:00
- Scope: deterministic private, non-PUA application-asset packaging of the locked six.
- Source authority: exact integrated base `2a87e60e39a5dc26c62f754fbdf8976db6810ec2`; D-019 lock; project-original provenance; registry 0.4.2.
- Adverse review: the initial package was blocked for an under-specified alias contract and an unsupported inline-naming claim; this corrected proof adds fail-closed executable alias policy and six tested unique-ID inline examples.
- Finding: ready for exact-head independent adverse review as a private technical proof only.
- Validation: deterministic 16-file package commitment `79ff97420c617b887f4f8420b6284e7fed6afb9ed14ccdaea888fbbe691216f4`; repository validation and 124 tests passed.
- Independent review: APPROVE at exact integrated head `d015e5ae6e4ea5a4f6657620d90f85ad8bc7b2d6`, 2026-09-01T02:41:22-07:00. The reviewer independently regenerated the package and verified integrity, alias boundaries, accessibility patterns, Iconify compatibility, history-v2 preservation, protected-tree equality, and all 124 tests; no blocker remains. This approval-report-only annotation changes no package input or boundary.
- Non-finding: no Unicode, SMuFL, or Private Use Area code point is allocated or recommended; no public delivery route is selected.
- Boundary: Unicode `HOLD` remains unchanged; no publication, release, acceptance, outreach, semantic change, status change, external endorsement, or licensing decision.
