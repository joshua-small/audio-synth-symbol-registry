# Shelf/shelving terminology dossier

This adverse evidence review addresses the open lexical question for `asr:filter.low-shelf` and `asr:filter.high-shelf`: whether `low shelving filter` and `high shelving filter` are exact response-class aliases for the registry's canonical `Low-shelf filter` and `High-shelf filter` names. It separates morphology and orthography from semantic equivalence and preserves product-specific counterexamples. It does not change a record, alias, related term, question, identifier, assessment, score, status, artwork, geometry, Unicode position, or external posture.

## Decision model

The review distinguishes four levels:

1. **Response-class equivalence:** both expressions identify the same affected frequency side and plateau-to-plateau shelf response, independent of signed gain.
2. **Implementation equivalence:** order, slope, Q, resonance, phase, cutoff convention, topology, parameterization, and algorithm are identical.
3. **Orthographic equivalence:** case, spacing, and an optional attributive hyphen do not change the concept.
4. **Unrestricted lexical substitution:** every use of `shelf`, `shelving`, `bass`, `treble`, `lowpass`, or `highpass` can be substituted without context.

An exact registry alias needs level 1. The corpus supports level 1 for the full phrases `low shelving filter` and `high shelving filter`, supports bounded normalization at level 3, and directly defeats levels 2 and 4.

## Source-independence matrix

| Independence group | Evidence | Direct lexical observation | Semantic control | Boundary |
| --- | --- | --- | --- | --- |
| Apple | EV-190 | One official ChromaVerb page labels controls `Low Shelf` and `High Shelf`, then identifies them in the same bullets as the low and high `shelving filter`. | Separate frequency, gain, and Q controls preserve affected-side type while gain varies. | Product control labels do not establish portable abbreviations, exact topology, or implementation identity. Other Apple pages corroborate the mapping but do not add an independence group. |
| MathWorks | EV-191 | One `designShelvingEQ` page says the default creates a `low-shelf equalizer`, while its typed form selects a `low-shelving or high-shelving equalizer`; headings and examples use Low-Shelf and High-Shelf. | Gain, slope, cutoff, and type remain separate inputs. | `equalizer` and `filter` are contextually parallel here, not globally interchangeable nouns in every domain. |
| Steinberg | EV-192 | RoomWorks uses the exact hyphenated phrases `low-shelving filter` and `high-shelving filter`. | Separate gain controls boost or attenuate each affected side. | This reverb input stage is one product context, not an algorithm or glyph standard. |
| FFmpeg | EV-193 | Immutable documentation has sections named `bass, lowshelf` and `treble, highshelf`; each is described as a two-pole `shelving filter`. | Signed gain and shelf transition parameters are separate. | The paired `bass` and `treble` section terms are broader than shelf type and do not transfer globally. |
| W3C Audio Working Group | EV-194 | The dated Audio EQ Cookbook uses the machine-style names `lowShelf` and `highShelf` for the two biquad formula families. | The formula families are parameterized rather than single fixed curves. | This source independently supports the shelf noun and the two-side taxonomy, but does not itself use `low shelving filter` or prove the morphology mapping. |

Apple and MathWorks each supply direct within-document equivalence. Steinberg independently supplies the exact `shelving filter` phrases, and FFmpeg connects its `lowshelf`/`highshelf` names to the `shelving filter` class at an immutable commit. W3C independently confirms the canonical shelf taxonomy. Repeated pages within Apple, MathWorks, or Steinberg are not counted as independent.

## Morphology versus orthography

### Shelf and shelving

`Shelf` is the noun naming the response shape or filter type. `Shelving` is the derived modifier describing a filter or equalizer that produces that response. Apple and MathWorks use both forms for the same controls or API operation within a single document. This is a morphological change between two words, not merely punctuation.

The exact full phrases therefore deserve explicit alias treatment in a later semantic change:

- `low shelving filter` -> `asr:filter.low-shelf`
- `high shelving filter` -> `asr:filter.high-shelf`

The shorter fragments `low shelving` and `high shelving` remain less determinate. They may be ordinary ellipsis in audio prose, but the reviewed evidence does not require adopting grammatical fragments as exact aliases.

### Case, spacing, and hyphenation

No semantic distinction was found among title case and lower case, or among open and hyphenated attributive compounds. MathWorks uses `low-shelf` and `low-shelving`; Steinberg uses `low-shelving`; Apple uses open `Low Shelf` control labels and open `low shelving filter` prose. FFmpeg uses concatenated machine tokens and open prose.

For lookup, ASCII case folding and equivalence of an internal ASCII space and hyphen are appropriate after whole-label tokenization. These variants should not multiply the alias array. Concatenated code tokens such as `lowshelf`, camel-case tokens such as `lowShelf`, and abbreviations require their own evidence and should not be inferred merely by deleting separators.

## Adverse and product-specific boundaries

### Product enums can collide with pass-filter semantics

MathWorks EV-195 implements a generic `shelvingFilter` whose `FilterType` values are `lowpass` and `highpass`. In that API, those values select which side receives the signed shelf gain. Outside that documented context, `lowpass` and `highpass` name the project's distinct pass-filter records. Product-local enum values must not become global shelf aliases.

### Bass and treble are broader than shelf type

FFmpeg EV-193 pairs `bass` with `lowshelf` and `treble` with `highshelf` in its section names. This is useful source-local terminology, but `bass` and `treble` also name frequency regions, instruments, tone controls, and program material. They are not safe unrestricted registry aliases.

### Pass inserted into a shelf phrase is collision-prone

JUCE EV-196 describes its factories as `low-pass shelf filter` and `high-pass shelf filter`, while its callable names are `makeLowShelf` and `makeHighShelf`. The inserted `pass` is a framework-local wording choice and collides with the separate low-pass/high-pass response classes. The dossier does not recommend those longer phrases as global aliases.

### Lexical equivalence does not fix topology or polarity controls

Steinberg EQ-P1A EV-197 offers low shelving boost and attenuation controls, a high peak boost section, and high shelving attenuation. This preserves the shelving response-class wording while demonstrating that a product can divide polarities and sides across different paths. `Low shelving filter` and `Low-shelf filter` can be lexically equivalent without promising one biquad, symmetrical polarity controls, or identical topology.

### The side word remains necessary

Plain `shelving filter` names the family but omits whether the low- or high-frequency side is affected. It is not an exact alias for either individual record. Similarly, `shelf filter` without a side cannot select one of the two records.

## Query, capture, and exclusion log

Searches combined the exact shelf and shelving phrases with official manufacturer documentation, engineering APIs, standards-adjacent formula references, and source repositories. Candidate sources were inspected at exact control bullets, API descriptions, section headings, or immutable source paths.

- Excluded search-result snippets when the publisher-controlled page was available.
- Excluded unattributed glossaries, mirrors, copied manuals, forum paraphrases, and SEO pages from the exact-equivalence count.
- Counted Apple pages once despite corroborating examples across ChromaVerb, Space Designer, Linear Phase EQ, and Vintage Console EQ.
- Counted MathWorks API pages once as one publisher group and used the `shelvingFilter` page primarily as adverse enum evidence.
- Counted Steinberg RoomWorks and EQ-P1A once for independence despite their positive and adverse roles.
- Counted the pinned FFmpeg documentation once.
- Reused no vendor image, curve, interface, or artwork. No third-party content is copied into the project.

EV-190 and EV-196 record checksums of public Apple and JUCE response bytes without retaining those bytes. EV-193 pins an immutable FFmpeg commit and hashes the exact documentation file. EV-194 hashes the dated W3C publication response. MathWorks EV-191/EV-195 and Steinberg EV-192/EV-197 are metadata-only because immediate repeated requests produced different raw bytes at the same URLs; retaining one transient digest would overstate reproducibility. Every retained checksum is an evidence commitment, not an archive, license, or guarantee that hosting remains available.

## Finding

`Low shelving filter` and `high shelving filter` are established exact response-class aliases for `Low-shelf filter` and `High-shelf filter`, respectively. The evidence is direct within Apple and MathWorks documentation and independently corroborated by Steinberg and FFmpeg terminology, with W3C supporting the underlying lowShelf/highShelf taxonomy.

The equivalence is bounded. It does not imply identical gain sign, amount, plateau placement, slope, order, Q, resonance, overshoot, phase, cutoff convention, topology, controls, implementation, or glyph. Product documentation overrides generic alias lookup when it assigns a different or more specific operation.

## Separate semantic-review recommendation

Under D-021, a follow-up semantic change may be reviewed independently with this exact scope:

1. Move `low shelving filter` from related terms into the exact alias array for `asr:filter.low-shelf`.
2. Move `high shelving filter` from related terms into the exact alias array for `asr:filter.high-shelf`.
3. Resolve each record's shelving-term question as **bounded yes** at response-class level.
4. Retain `low shelving` and `high shelving` as related terms unless separate evidence supports fragment aliases.
5. Document case folding and space/hyphen equivalence as lookup normalization rather than redundant aliases.
6. Exclude plain `shelving filter`, plain `shelf filter`, `bass`, `treble`, `lowpass`, `highpass`, `low-pass shelf filter`, `high-pass shelf filter`, LS, HS, LSC, HSC, and signed boost/cut names from exact global aliases.
7. State that documented product behavior overrides generic alias transfer and that response-class aliasing carries no parameter, topology, implementation, or glyph equivalence.
8. Make no canonical-name, identifier, fallback, spoken-label, definition, assessment, score, status, artwork, geometry, Unicode, release, or external-posture change unless separately justified.

This dossier does not apply that recommendation.

## Agent Report - 2026-08-31T23:51:02-07:00

- Report status: substantive evidence dossier implemented and frozen for exact-head adverse review; no publication action is authorized.
- Scope: resolve the evidence question concerning `shelf` versus `shelving` terminology while preserving morphology, orthography, product-specific mappings, and implementation boundaries.
- Evidence: EV-190 through EV-197, with Apple, MathWorks, Steinberg, FFmpeg, and W3C as five publisher or implementation groups. Apple and MathWorks provide direct within-document mappings.
- Result: the exact full phrases `low shelving filter` and `high shelving filter` are supported as bounded response-class aliases; case, spacing, and attributive hyphenation are normalization; shorter fragments and collision-prone product terms remain excluded.
- Reproducibility: all eight sources have exact locators; Apple, JUCE, dated W3C, and commit-pinned FFmpeg carry SHA-256 commitments. Four request-varying MathWorks/Steinberg pages are explicitly metadata-only after immediate digest rechecks detected changing response bytes.
- Rights: no third-party source bytes, text, screenshots, diagrams, interfaces, code, or artwork are committed, copied, traced, or claimed as reusable.
- Mutation boundary: no live alias, related term, question, definition, identifier, assessment, score, status, artwork, geometry, Unicode position, release, outreach, or external posture changes. Unicode remains `HOLD`.
- Recommendation: apply the two exact aliases only in a separately reviewed semantic disposition after this evidence dossier passes exact-head adverse review.
- Validation: `npm test` passed 117/117 after validating six records, eight assessment sets, 114 evidence sources, registry 0.3.2, assessments 0.3.4, schema 0.4.0, tooling 0.8.0, registered source and derived-artifact digests, documentation drift, protected study/font boundaries, and Agent Report hygiene. `git diff --check` passed.
- Independent review: `REQUEST CHANGES` on exact head `4bd7cfe7ecd69198c691ca0d6077c3cbf53f789a` for two FFmpeg provenance/wording defects only. EV-193 now records the commit's 2026-08-31 date, and DA-022 is narrowed to the pinned `doc/filters.texi` section names and two-pole shelving-filter descriptions without claiming unpinned implementation wording. Exact corrected head `f6f94e11e0f57b1b3d743fe341552cb0f29705ce` received `APPROVE` with no remaining blocker; this approval annotation changes no reviewed substance.
