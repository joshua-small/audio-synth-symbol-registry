# Versioning

This project uses [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html).

## Independently versioned artifacts

The authoritative metadata is `registry/registry-metadata.json`.

- Registry data: the published collection of entries at every status.
- Schema: the machine-readable entry contracts.
- Artwork: original neutral reference SVGs, when published.
- Tooling: validators, generators, and related code.

The bootstrap publishes registry, schema, and tooling at `0.1.0`. Artwork has no published version until original artwork exists.

## Compatibility rules

- MAJOR: incompatible schema changes, removal or semantic redefinition of a permanent identifier, or incompatible public tooling API changes.
- MINOR: backwards-compatible fields, records, families, renderings, or features.
- PATCH: corrections, evidence additions, documentation changes, and non-semantic artwork refinements.

Before `1.0.0`, the project may make breaking changes in a MINOR release as permitted by SemVer. Every such change requires a decision-log entry and migration note.

## Stable identifiers

An identifier is provisional while its record is `evidence-collecting` or `registry-candidate`. A `registry-accepted` identifier is permanent and is never reassigned to a different semantic meaning. Deprecated permanent identifiers remain resolvable with an explicit replacement or historical note.
