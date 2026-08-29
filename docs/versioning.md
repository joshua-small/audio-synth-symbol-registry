# Versioning

This project uses [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html).

## Independently versioned artifacts

- Registry release: the published set of accepted records and evidence links.
- Schema release: the machine-readable record contract.
- Artwork release: neutral reference SVGs, when published.
- Tooling release: validators, generators, and related code.

The current bootstrap release is `0.1.0`.

## Compatibility rules

- MAJOR: incompatible schema changes, removal or semantic redefinition of a published stable identifier, or incompatible public tooling API changes.
- MINOR: backwards-compatible fields, records, families, renderings, or features.
- PATCH: corrections, evidence additions, documentation changes, and non-semantic artwork refinements.

Before `1.0.0`, the project may make breaking changes in a MINOR release as permitted by SemVer. Every such change requires a decision-log entry and migration note.

## Stable identifiers

An accepted identifier is never reassigned to a different semantic meaning. Deprecated identifiers remain resolvable with an explicit replacement or historical note.
