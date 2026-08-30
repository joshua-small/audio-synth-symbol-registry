# Mutable-source capture policy

## Purpose and boundary

Mutable web documentation can change or disappear after an evidence observation. This policy records enough lawful metadata to identify what was inspected and what was not preserved. It does not authorize copying, redistributing, archiving, or reconstructing third-party content or artwork.

The source URL and evidence observation remain authoritative for the claim made at the time. Capture metadata improves reproducibility; it does not make a source immutable, prove that later content is identical, or turn a checksum into an archive.

## Required capture metadata

When a mutable source receives a `source_capture` object, record:

- `accessed_at`: the actual inspection time in ISO 8601 with an explicit numeric UTC offset;
- `product` and `product_version`: the documented product and version, or `null` when the source does not establish them;
- `exact_locator`: the narrowest reproducible heading path, page number, figure/table identity, parameter name, or source-file path;
- `stable_fragment`: a publisher-provided fragment, article ID, permanent route, commit ID, page anchor, or `null` when none is established;
- `preservation`: the method used, rights basis, and limitations.

Do not infer a product version from the current product release, URL shape, search result, or access date. Do not invent a fragment. A precise `null` plus a limitation is preferable to false stability.

## Preservation modes

| Mode | Use | Required evidence | Prohibited implication |
| --- | --- | --- | --- |
| `metadata-only` | Default when the project inspected a source but did not retain its bytes | Exact locator, rights basis, and an explicit reproducibility limitation | That the source was archived or remains recoverable |
| `linked-public-archive` | A publisher or lawful public archive already exposes a stable capture that the project may link | HTTPS archive URL plus the archive provider and relevant rights basis in prose | That this project created, controls, or has redistribution rights for the archive |
| `checksum-only` | A checksum of lawfully accessed bytes helps detect change without retaining or publishing those bytes | SHA-256 digest and an exact scope describing the bytes hashed | That the checksum preserves, reconstructs, licenses, or makes unavailable content accessible |
| `archive-and-checksum` | Both permitted mechanisms exist for the same scoped capture | Archive URL and SHA-256 scope | That either mechanism grants rights beyond its documented basis |

An Internet Archive URL is not automatically lawful or authoritative. Link it only when the capture is publicly available, relevant, and consistent with applicable terms and rights. Do not submit restricted, paywalled, authenticated, subscriber-only, robot-excluded, or otherwise non-public content to an archive without explicit permission.

## Rights-aware workflow

1. Open the source lawfully through its ordinary public or authorized access path.
2. Record the actual access timestamp, exact locator, product/version, and any publisher-stable fragment.
3. Record only the minimal observation needed for the evidence claim. Do not paste page text, screenshots, figures, or artwork into the repository merely for durability.
4. Default to `metadata-only` unless an archive link or checksum has a documented lawful basis.
5. If hashing is permitted, identify the exact byte scope, such as a downloaded public PDF file. Dynamic rendered pages, partial browser text, and normalized copies are not interchangeable checksum scopes.
6. State limitations plainly. A hash can confirm equality only when comparison bytes remain lawfully obtainable.
7. Revisit mutable sources with a new timestamp. Do not silently replace the earlier observation or claim that a changed page proves what it said previously.

## Bounded workflow sample

Evidence sources EV-006, EV-007, and EV-012 demonstrate the optional schema on three public vendor-documentation pages. The sample records headings or article locations, product/version where established, stable routing information where available, and exact access timestamps.

All three intentionally use `metadata-only`. No source bytes, screenshots, graphics, vendor HTML, restricted downloads, or third-party archive captures were added. This proves the conservative path and makes the absence of a lawful archive or checksum explicit rather than silently implying preservation.

## Interpretation safeguards

- An `archive_url` is a locator, not a license grant or endorsement.
- A checksum is integrity metadata, not content, an archive, or proof of publication date.
- A stable fragment can remain stable while the content around it changes.
- Product/version metadata describes the cited source, not necessarily every edition or current product behavior.
- Capture metadata does not strengthen a source beyond its actual direct observation.
- If a source becomes unavailable, retain the record and mark the limitation; do not recreate its content from memory.

## Agent Report - 2026-08-30T00:04:20-07:00

- Report status: completed
- Scope: defined lawful mutable-source capture metadata and applied the metadata-only workflow to EV-006, EV-007, and EV-012.
- Rights boundary: imported no third-party content, source bytes, screenshots, artwork, or archive; claimed no archival or redistribution right.
- Versioning: registry 0.1.5 and schema 0.3.0 carry the backward-compatible evidence metadata addition; tooling 0.4.0 adds semantic numeric-offset timestamp validation. No release or tag is authorized by this document.
- Validation: `npm test` passed 64/64 tests and `git diff --check` passed.
- Independent review: APPROVE after correction of timestamp semantics, preservation-mode exclusivity, and sample locator precision; no Human Review gate identified.
- Limitations: the bounded sample demonstrates metadata-only capture; archive and checksum modes remain available only when a future source has a documented lawful basis.
