# Versioning

This project uses [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html).

## Independently versioned artifacts

Each artifact type has its own authority. A version recorded in one artifact's metadata is not authority to release, redefine, or version another artifact.

| Artifact | Authoritative metadata | Notes |
| --- | --- | --- |
| Registry data | `registry/registry-metadata.json` | Authoritative for the published registry collection, record-status model, and registry version. |
| Schema | `registry/registry-metadata.json` | The schema version is the compatibility contract for machine-readable records. |
| Assessments | `registry/registry-metadata.json` | Dated evidence-readiness snapshots governed by `registry/schema/assessment-set.schema.json`. |
| Tooling | Root `package.json` | Authoritative for the published tooling package version. |
| Artwork | `artwork/metadata.json` | Created with the first original artwork asset. Authoritative for artwork version, publication status, and canonical asset mapping. |

`registry/registry-metadata.json` MAY report an informational artwork-version summary for discovery, but it is not authority for artwork release state, canonical asset paths, or artwork SemVer. If a future registry summary conflicts with `artwork/metadata.json`, the artwork metadata wins for artwork.

The bootstrap publishes registry, schema, assessments, and tooling at `0.1.0`. Artwork has no published version until original artwork exists and `artwork/metadata.json` declares its first authorized release. The evidence ledger is part of the registry-data artifact and uses the registry version.

A registry version change does not automatically publish or bump artwork. An artwork version change does not automatically change registry, schema, or tooling versions. Promotion of a semantic record to `registry-accepted` may make a linked artwork eligible for acceptance, but it does not itself accept or publish that artwork. Artwork acceptance and public artwork release remain separate Human Review gates under `AGENTS.md`.

## Assessment history and current status

Assessment sets are append-only dated snapshots. `status_at_assessment` records the registry status observed when that assessment was made; it is not rewritten when a record later changes status.

The assessments artifact version advances when a snapshot is published or its lifecycle changes. The snapshot's `assessment_set_version` and each record's `assessment_version` identify the machine-readable format, which is declared separately as `artifacts.assessments.format_version`. A PATCH artifact release may therefore add a new immutable snapshot without rewriting historical snapshots or changing their format version. `artifacts.assessments.current_snapshot` identifies the file containing the most recent assessment for every live record and must agree with timestamp-based selection.

Every live registry record must have at least one assessment. The validator selects its current assessment as the unique snapshot with the most recent `assessed_at` timestamp. Timestamps for multiple assessments of the same record must therefore be distinct.

- A live `registry-candidate` record requires a current eligible candidate-or-accepted assessment.
- A live `registry-accepted` record requires a current eligible accepted assessment, including the documented independent review, public-review period, and human authorization fields required by the project rubric.

Assessment data and schemas are versioned independently. A change to assessment structure, scoring interpretation, or selection behavior follows the same SemVer compatibility rules below and must preserve the ability to read historical snapshots.

## Compatibility rules

- MAJOR: incompatible schema changes, removal or semantic redefinition of a permanent identifier, or incompatible public tooling API changes.
- MINOR: backwards-compatible fields, records, families, renderings, or features.
- PATCH: corrections, evidence additions, documentation changes, and non-semantic artwork refinements.

Before `1.0.0`, the project may make breaking changes in a MINOR release as permitted by SemVer. Every such change requires a decision-log entry and migration note.

## Stable identifiers

An identifier is provisional while its record is `evidence-collecting` or `registry-candidate`. A `registry-accepted` identifier is permanent and is never reassigned to a different semantic meaning. Deprecated permanent identifiers remain resolvable with an explicit replacement or historical note.
