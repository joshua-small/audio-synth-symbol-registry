# Band-stop text use and third-render dossier

This evidence-only dossier tests two remaining Band-stop evidence questions after DA-020 and the 0.3.1 reassessment:

1. whether a third independent implementation directly binds the broad Band-stop/Band-reject class to an axis-less centered rejected-band form; and
2. whether independent audio prose or interchange uses the canonical name, an exact alias, or a source-locally expanded contextual abbreviation unambiguously outside one product UI.

It recommends a later mechanical reassessment but changes no record, assessment, score, lifecycle state, artwork, geometry, alias, fallback, speech label, Unicode position, or external posture.

## Admission rule

DA-020 remains controlling. `Band-stop` and `Band-reject` name the broad rejected-band class. `Notch` remains context-dependent, commonly narrow but sometimes an exact source-local synonym, response feature, low-Q behavior, or implementation-local mode. A Notch-only source does not transfer to this record unless that source explicitly maps or contrasts Notch with Band-stop or Band-reject.

Positive visual evidence therefore had to be explicitly bound to Band-stop, Band-reject, Band-eliminate, or a same-source mapped broad equivalent. Notch-only graphics were excluded even when their outline looked similar. Text evidence had to show actual audio use in prose, documentation, community discussion, or interchange rather than merely a menu label or a project-authored fallback.

## Source-independence matrix

| Independence group | Evidence | Direct observation | Counted conclusion | Boundary |
| --- | --- | --- | --- | --- |
| Bitwig | EV-200 | Ordered Phase-4 guide prose places Band-reject immediately before disabled; the matching screenshot's penultimate compact mode is an axis-less centered valley. | Third independent broad-class target rendering. | Product-local selector only; no portable text use, authorship claim, exact contour, or reuse right. |
| KVR Audio Community | EV-201 and enriched EV-032 | One thread uses BR in sound-design advice and expands it as Band reject. Another uses Band-Rejection, Band-Stop, BR, and BRF while directly preserving the behavioral contrast with Notch. | Actual community prose with locally recoverable meaning. | Both threads count as one community publisher group. BR remains context-dependent, and the discussion is mutable and non-authoritative. |
| Sound On Sound | EV-202 and EV-203 | Two trade articles use BR with direct Band-reject expansions in explanatory and practical synthesis prose. | Independent non-UI audio prose using Band-reject and BR unambiguously. | Both articles count as one trade-media publisher group. |
| Apple | EV-204 | A versioned Sculpture guide labels a filter type BR, expands Band reject, and supplies a source-local Band-reject/Notch mapping. | Independent vendor-documentation corroboration. | UI/documentation evidence is not the non-UI prose basis and does not create a universal alias. |

Repeated URLs, pages, posts, or articles within one publisher are not separate independence groups. Derived analyses do not multiply the underlying sources.

## Third independent target rendering

[Bitwig's Phase-4 guide](https://www.bitwig.com/userguide/latest/synth/#phase-4) lists its filter modes in display order: two low-pass forms, two band-pass forms, two high-pass forms, Band-reject, then disabled. The [official Phase-4 screenshot](https://assets.bitwig.net/media/bitwig_userguide/18/images/15appendix/10%20-%20PHASE-4.png?v=ib29e22vcQ) shows the same row. Its penultimate mode is a centered valley without a local axis.

The mapping does not depend on a Notch label or visual transfer. Bitwig is a distinct publisher and product implementation from Image-Line EV-100 and Ardour EV-120. No shared implementation or design lineage was found among the three. Individual outline authorship remains unknown, so the defensible result is independent convergence on a primitive, not evidence of a common master, exact artwork identity, priority, or rights.

The common primitive is limited to an axis-less centered rejected-band response with higher sides. The conclusion explicitly excludes:

- axes and baselines;
- parameter values, cutoff markers, bandwidth or Q thresholds, and slope;
- color, fill, line weight, whitespace, and interaction state;
- arbitrary rotation or orientation change;
- exact width, curvature, proportions, endpoint placement, or path construction;
- vendor artwork, source authorship, reuse rights, and project geometry.

## Audio-specific text use

### Community prose

[KVR topic 114226](https://www.kvraudio.com/forum/viewtopic.php?t=114226) contains practical sound-design advice using `BR filter`; a later post in the same discussion expands `BR` as `Band reject`. This is actual audio-community prose with a locally explicit meaning.

[KVR topic 483762](https://www.kvraudio.com/forum/viewtopic.php?t=483762), already EV-032, uses the full names Band-Rejection and Band-Stop, the compact families HP/LP/BP/BR, and later BPF/BRF. Crucially, the same discussion reports that one BR mode behaved differently from a typical Notch filter. The source therefore supports actual contextual shorthand while preserving, rather than erasing, DA-020's controlled-polysemy boundary.

### Independent trade prose

The June 2007 [Sound On Sound ES2 article](https://www.soundonsound.com/techniques/es2-logics-most-sophisticated-virtual-analogue-synth) enumerates Filter 1 modes in explanatory prose and directly pairs BR with Band-reject.

The September 2006 [Sound On Sound Pentagon I article](https://www.soundonsound.com/techniques/programming-sonar-5s-pentagon-i-soft-synth) uses BR with the Band-reject expansion in a practical instruction involving two filters and separate cutoff control.

These are two observations from one trade-media publisher group. Together they establish repeated non-UI prose at that publisher, while independence for the score recommendation comes from the separate KVR community group.

### Vendor corroboration

The versioned [Apple Sculpture guide](https://support.apple.com/guide/logicpro-ipad/filter-lpipbe1143ab/3.3/ipados/26) labels a filter button BR, expands it as Band reject, describes its rejected band, and explicitly relates Band reject and Notch in that product context. The source is admissible under DA-020 because the mapping is source-local. It corroborates the abbreviation but is not counted as non-UI prose.

## Abbreviation disposition

The evidence supports three deliberately separate conclusions:

1. The canonical Band-stop/Band-reject concept is actually used in independent audio prose outside one product UI.
2. `BR` and `BRF` can be unambiguous when the local source expands them or contrasts the relevant response classes.
3. The reviewed corpus does not justify replacing the registry's source-grounded `BSF` fallback or adding unrestricted `BR` or `BRF` aliases.

KVR's need to expand and debate BR is evidence of contextual recoverability, not universal recognition. `BR` also has meanings outside this narrow audio-filter context. The dossier therefore recommends no fallback, speech, alias, or lookup change.

## Negative searches, ambiguity, and exclusions

- No independent audio-chat corpus using `BSF` was found. Searches were dominated by education, RF/electronics, and unrelated biosand-filter uses. The absence does not invalidate the source-grounded fallback, but it prevents a stronger common-chat claim.
- [SIR StandardGATE](https://www.siraudiotools.com/StandardGATE-Manual.php) says its filter-type icon opens a menu containing Band stop, but the public static material reviewed did not bind a visible compact form to that menu member. It is excluded from visual convergence.
- EasyEffects source at commit `00a8068a50e42eb8f10c37055679b7edc78035a8` names a band-reject mode, but the inspected source and documentation yielded no qualifying compact glyph. It is a negative implementation result.
- Gearspace and Moog search results used `BR` without a same-source expansion sufficient for this pass. They remain ambiguous corroboration, not core text evidence.
- Ableton, FabFilter, EasyEffects, and other Notch-only selectors or drawings were excluded unless their same source explicitly mapped or contrasted the broad class. Visual resemblance alone never overrides DA-020.
- No reviewed source used the response glyph itself as portable plain text.
- No independent Band-stop case was found in which a user had to draw, attach, or custom-encode the response form to complete text communication.

## Capture commitments

No source bytes are committed. The digests below bind the inspected public responses; they are evidence commitments, not redistribution or reuse licenses.

| Evidence | Capture | SHA-256 | Limitation |
| --- | --- | --- | --- |
| EV-200 | Bitwig guide HTML, 143275 bytes | `0fc7de8182408602a5076abbc70572bcff9fe7810c12bf4aa9bce00f39d713aa` | Mutable latest-guide route. |
| EV-200 | Bitwig official PNG, 160222 bytes, 1756 by 453 | `8fd4d4ab03a5c810fbb6784c3e9d4459e1e420562fc126106d22d0943fedc3c1` | Query-versioned vendor asset; inspection only. |
| EV-200 | Ordered HTML+PNG concatenation used by the ledger capture | `5a822dd2a69db212997976054ed608f893cea93ce7b7e9b6170b790fb1993615` | Binds the prose-to-image pair, not a shared upstream artifact. |
| EV-201 | KVR topic 114226 HTML, 172418 bytes | `436f5332baa3318b9413be7437ba702ae9082e77d3883f3efe1c6bd9d759a58d` | Mutable forum and session-bearing response; post IDs are locators. |
| EV-032 | KVR topic 483762 HTML, 148910 bytes | `98293ae3394702a98f01ad39dd8eb930e0b5736d656fb1b35778d3f9b5365861` | Mutable forum and session-bearing response; post IDs are locators. |
| EV-202 | Sound On Sound ES2 HTML, 155195 bytes | `18f423c6081d2c245929b53d5063a59eb282c7376810e08fd5467288057c2304` | Mutable publisher page. |
| EV-203 | Sound On Sound Pentagon I HTML, 151878 bytes | `f297e923908247fc3357009898be7a92b505bad3b169f6df6d05d7e22cdcfd57` | Mutable publisher page. |
| EV-204 | Versioned Apple guide HTML, 1540844 bytes | `2783d567f031aa94c10fbfa265057c47a55216095c52e8966e9c54a2e7f42242` | Vendor-controlled versioned route. |

## Separate reassessment recommendation

This dossier recommends, but does not apply, a later mechanical assessment with these exact changes:

- `text_and_accessibility`: 2 -> 3. Score 2 already grounds `BSF` and the speech label. Enriched EV-032 directly uses the full canonical Band-Stop name in non-UI KVR prose. EV-201 corroborates Band-reject and source-locally expanded contextual BR within the same KVR publisher group; EV-202 and EV-203 independently corroborate Band-reject and locally expanded BR within one Sound On Sound publisher group. The two collapsed publisher groups establish unambiguous actual use while leaving `BSF` as the unchanged fallback and BR outside unrestricted aliases.
- `visual_convergence`: 2 -> 3. EV-200 is the third independent explicit axis-less Band-reject implementation alongside EV-100 and EV-120, with all required exclusions documented above.
- total: 16 -> 18, with semantic stability 3, independent usage 3, overlap audit 3, and legal provenance 3 unchanged.

The current immutable assessment remains 16/20 and `registry-candidate`. A separate snapshot, exact-head review, and score arithmetic check are required to apply the recommendation. An 18/20 total would not itself establish `registry-accepted` eligibility because that lifecycle has additional 4/4 semantic and usage floors, public-review, Human Review, and external-package requirements.

## Protected no-change disposition

- The live Band-stop record, canonical name, definition, identifier, aliases, related terms, BSF fallback, speech label, questions, and candidate lifecycle are unchanged.
- DA-020's Notch transfer rule remains unchanged and controlling.
- Assessments, scores, eligibility findings, and snapshot metadata are unchanged.
- Artwork, geometry, paths, proportions, study locks, font work, PUA and code-point posture, and third-party rights remain unchanged.
- Schema, tooling, releases, outreach, standards positions, and external authority remain unchanged.
- Unicode remains `HOLD`; the evidence does not establish portable glyph interchange or encoding necessity.

## Agent Report - 2026-09-01T00:19:18-07:00

- Scope: evidence-only Band-stop third-render and audio-text-use dossier under the DA-020 source-transfer rule.
- Evidence: EV-200 through EV-204 plus enriched EV-032, with Image-Line EV-100 and Ardour EV-120 retained as the earlier visual comparators.
- Independence: Bitwig supplies the third visual publisher/implementation; KVR, Sound On Sound, and Apple are three text publisher groups, with SOS and KVR providing non-UI prose.
- Recommendation: later visual 2 -> 3, text 2 -> 3, and total 16 -> 18; do not apply in this dossier.
- Negative result: no portable response-glyph text use, independent drawing-required Band-stop case, common audio-chat BSF corpus, or qualifying SIR/EasyEffects third form was established.
- Rights: no third-party text, interface, image, icon, contour, source bytes, or artwork is committed, copied, traced, or claimed reusable.
- Mutation boundary: no record, assessment, score/status, artwork/geometry, alias/fallback/speech, schema/tooling/font/PUA, Unicode HOLD, external posture, outreach, or release change.
- Validation: `npm test` passed 117/117 after validating six records, eight assessment sets, 119 evidence sources, registry 0.3.3, assessments 0.3.4, schema 0.4.0, tooling 0.8.0, registered source and derived-artifact digests, documentation drift, protected study/font boundaries, and Agent Report hygiene. `git diff --check` and explicit capture/protected-path checks passed.
- Independent review: corrected exact head `ce13a95e6758af79cff1c7e5deb88d0018e5ef80` received `APPROVE` after verifying the text-rubric provenance, KVR and Sound On Sound publisher collapse, BR contextual-abbreviation boundary, DA-020 transfer rule, registered hashes, and protected no-change fields. This approval annotation changes no reviewed substance.
