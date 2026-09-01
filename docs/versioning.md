# Versioning

This project uses [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html).

## Independently versioned artifacts

Each artifact type has its own authority. A version recorded in one artifact's metadata is not authority to release, redefine, or version another artifact.

| Artifact | Authoritative metadata | Notes |
| --- | --- | --- |
| Registry data | `registry/registry-metadata.json` | Authoritative for the published registry collection, record-status model, and registry version. |
| Schema | `registry/registry-metadata.json` | The schema version is the compatibility contract for machine-readable records. |
| Assessments | `registry/registry-metadata.json` | Dated evidence-readiness snapshots governed by `registry/schema/assessment-set.schema.json`. |
| Derived analyses | `evidence/derived-analyses.json` | Versioned project-authored audits, matrices, boundary analyses, and syntheses. These preserve provenance but do not create independent evidence. |
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

Assessment format 0.2.0 adds optional `artifact_refs` while retaining support for immutable 0.1.0 snapshots. A set and all its member assessments use the same format version; format 0.1.0 cannot carry 0.2.0 references. Each reference pins a `DA-*` artifact version, states its use, and identifies the underlying ledger inputs used by that claim. The derived-analysis registry identifies artifacts by ID-version pair, supports version-pinned derived dependencies, rejects dependency cycles, and pins each registered file with SHA-256. New versions of one artifact ID use distinct immutable paths so historical digests and assessment references remain verifiable. Changing an analysis in a way that could change an assessment conclusion requires a new artifact version. Moving a file without changing its content is a patch-level registry correction.

Schema 0.3.0 adds optional `source_capture` metadata to evidence-ledger sources. Existing sources remain valid without it. Capture metadata records reproducibility and rights limitations under [the mutable-source capture policy](mutable-source-capture-policy.md); it does not archive source content or strengthen the underlying evidence claim.

Tooling 0.4.0 adds semantic validation for numeric-offset capture timestamps, including calendar, clock, and UTC-offset bounds.

Registry 0.2.0 adds the provisional low-shelf and high-shelf records. Schema 0.4.0 adds their two sign-agnostic affected-side representation concepts while retaining the existing record shape. Assessments 0.3.0 adds an immutable six-record current snapshot. Derived analyses 0.2.0 adds the superseding six-record status synthesis while preserving the earlier synthesis at its immutable historical path. Tooling 0.5.0 extends the registry-driven interchange prototype and its tests to resolve the two new records; it does not add artwork or change canonical identity rules.

Assessments 0.3.1 adds an immutable post-evidence six-record snapshot using the unchanged 0.2.0 assessment format. Derived analyses 0.2.3 adds the corresponding current-status synthesis. Registry data remains 0.2.2 because the reassessment adds no ledger entry or live-record change.

Registry 0.2.3 adds EV-100 and EV-101 through a patch-level target-use evidence reinspection without changing a live record. Assessments 0.3.2 adds an immutable six-record snapshot using unchanged format 0.2.0; the four original records are mechanically reassessed and both shelf assessments are reproduced unchanged. Derived analyses 0.2.4 adds DA-012 and the superseding current-status synthesis.

Registry 0.2.4 adds EV-110 through EV-118 through a current Unicode proposal-guidance audit without changing a live record. Assessments remain 0.3.2 and intentionally assess registry 0.2.3 because the guidance-only additions do not alter record-level usage evidence or readiness scores. Derived analyses 0.2.5 preserves the prior 0.2.4 status synthesis at its immutable historical path, adds DA-013, and adds the combined superseding current-status synthesis as DA-006 0.2.5. No semantic, alias, identifier, artwork, status, schema, tooling, or release change is implied.

Registry 0.2.5 adds EV-120 through EV-122 through a patch-level independent-use evidence spike. Derived analyses 0.2.6 preserves the prior 0.2.5 status synthesis at its immutable historical path, adds DA-014 with its reproducible query log, exclusions, source-independence treatment, and negative portable-text result, and adds the combined superseding current-status synthesis as DA-006 0.2.6. No semantic, alias, identifier, artwork, assessment, status, schema, tooling, Unicode position, or release change is implied.

Registry 0.2.6 adds EV-130 and EV-131 through a patch-level band-stop render and alias evidence spike. Derived analyses 0.2.7 preserves the prior 0.2.6 status synthesis at its immutable historical path, adds DA-015 with explicit Notch exclusion and counterevidence, and adds the combined superseding current-status synthesis as DA-006 0.2.7. No semantic, alias, identifier, artwork, assessment, status, schema, tooling, Unicode position, or release change is implied.

Registry 0.2.7 adds EV-140 and EV-141 through a bounded communication-failure casebook without changing a live record. Derived analyses 0.2.8 preserves the prior 0.2.7 status synthesis at its immutable historical path, adds DA-016, and adds the combined superseding current-status synthesis as DA-006 0.2.8. Assessments remain 0.3.2 because these evidence additions do not mechanically change readiness scores. Low shelf alone meets the casebook's internal recurrence threshold; that finding does not establish portable character use or Unicode eligibility. No semantic, alias, identifier, artwork, status, schema, tooling, or release change is implied, and the Unicode HOLD remains active.

Registry 0.2.8 adds EV-150 and EV-151 and DA-017 through the six-concept repertoire-stability dossier without changing a live record. Assessments remain 0.3.2 pending mechanical incorporation of EV-120 through EV-151. Derived analyses 0.2.9 preserves the complete preceding synthesis chain and adds the superseding current-status synthesis as DA-006 0.2.9. Semantic-taxonomy coherence does not establish standalone form stability, portable character use, or Unicode eligibility.

Registry 0.2.9 and assessments 0.3.3 add the immutable six-record snapshot `registry-0.2.9-2026-08-31.json` using unchanged assessment format 0.2.0. It mechanically incorporates EV-120 through EV-151 and DA-014 through DA-017: high-pass and low-pass remain 18/20; band-pass rises to 20/20; band-stop rises to 15/20; and both shelves remain 17/20. The snapshot preserves inverse cut-name, Notch, and shelf-form blockers, excludes Notch-only evidence from band-stop, and records low shelf alone meeting DA-016's bounded friction threshold. After independent adverse review, D-021 authorizes the reversible promotion of band-pass to `registry-candidate`; its identifier remains provisional. Derived analyses 0.2.10 adds the superseding current synthesis as DA-006 0.2.10. No semantic field, identifier, alias, fallback, artwork, Unicode position, or external authority changes.

Tooling 0.6.0 adds backwards-compatible package schema 0.2.0 for exact binding of the six locked draft hashes, deterministic blind-derivative construction, six-way choice/control validation, and private provenance commitments. Package schema 0.1.0 remains readable. This does not bump or release artwork: artwork remains 0.0.0, unpublished, noncanonical, and draft.

Tooling 0.7.0 adds a private, offline, synthetic-only participant-surface harness and deterministic private scoring-key/export validation. It does not change either study-package schema, authorize participant use, or alter registry or artwork versions.

Tooling 0.8.0 adds deterministic construction and validation for a private, cmap-free, unencoded six-glyph font proof plus a separate abstract character-property simulator. Generated font bytes, specimens, and simulation output must remain outside the repository. This version allocates no Unicode or Private Use Area code points, changes no locked SVG bytes, publishes no font, and does not change registry, evidence, schema, artwork, or study-package versions.

Derived analyses 0.2.11 preserves DA-006 0.2.10 at its immutable historical path and adds the superseding current synthesis as DA-006 0.2.11. It records tooling 0.8.0 and the internal proof result without treating private technical validation as an independent evidence source or changing any record, assessment, artwork, or Unicode position.

## Compatibility rules

- MAJOR: incompatible schema changes, removal or semantic redefinition of a permanent identifier, or incompatible public tooling API changes.
- MINOR: backwards-compatible fields, records, families, renderings, or features.
- PATCH: corrections, evidence additions, documentation changes, and non-semantic artwork refinements.

Before `1.0.0`, the project may make breaking changes in a MINOR release as permitted by SemVer. Every such change requires a decision-log entry and migration note.

## Stable identifiers

An identifier is provisional while its record is `evidence-collecting` or `registry-candidate`. A `registry-accepted` identifier is permanent and is never reassigned to a different semantic meaning. Deprecated permanent identifiers remain resolvable with an explicit replacement or historical note.
