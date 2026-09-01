# Internal Unicode proposal skeleton: six audio-filter response concepts

> **NOT A PROPOSAL. NOT SUBMITTABLE. Unicode status: `HOLD`.**
>
> This gap-driven worksheet is an internal project artifact. It deliberately contains unresolved placeholders, incomplete claims, no requested code points, no endorsement, and no authorization for outreach, submission, publication as a proposal, or standards action. Completing the layout does not make the repertoire eligible for encoding.

Status as of 2026-08-31T21:04:07-07:00 on repository base `48f688560dabe0363836de453c1de3bd346cc516`. This structure follows the current [SEW Submission Guidelines and Process](https://sew.unicode.org/guidelines) (EV-110), the [Unicode character-proposal FAQ](https://www.unicode.org/faq/char_proposal.html) (EV-112), the [property guidance](https://www.unicode.org/pending/properties.html) (EV-113), the [font policy](https://www.unicode.org/policies/font_policy.html) (EV-114), and the required [ISO/IEC JTC 1/SC 2/WG 2 Proposal Summary Form](https://www.unicode.org/L2/summary.html) (EV-116). The headings are a review scaffold, not a representation that SEW has reviewed or endorsed this project.

## Front matter - blocked

| Submission field | Internal state | Requirement before external-package review |
| --- | --- | --- |
| Title | `[UNMET - proposal title not selected]` | Select only when the eligible repertoire is known. |
| Author(s) and submitter | `[UNMET - no submission authorship decision]` | Human decision; identify all significant contributors and applicable Unicode CLAs. |
| Proposal date | `[UNMET - no external package exists]` | Set by the authors only when preparing the complete owner-review package. |
| UTC/L2 document number | `[UNASSIGNED - external intake only]` | Do not create locally; a document number can exist only through the applicable external intake process. |
| Requested action | `[UNMET - Unicode HOLD]` | State an encoding request only if the central eligibility evidence clears. |
| Repertoire size | Six research concepts; `[UNMET - proposed character repertoire not established]` | Current semantic scope is stable, but character eligibility may support six, a principled subset, or none. |
| Proposed allocation | `[OPEN - committees normally assign code points]` | Do not invent code points, block placement, PUA mappings, or pipeline status. |
| Contact and affiliations | `[UNMET - reserved external/legal decision]` | Verify identities, affiliations, permissions, and representations. |

## 1. Proposal summary - blocked

### Draftable factual core

The registry studies six audio-filter response classes: high-pass, low-pass, band-pass, band-stop, low-shelf, and high-shelf. Independent product, education, historical, engineering, API, and open-source sources support the durability of those **semantic classes**. Existing products also use compact graphical selectors and project-local icon fonts for some or all of them. The repository has not established that the six graphics are already used as portable characters by an independent community or that public plain-text interchange requires encoding them.

### Claims that must not yet appear as proposal conclusions

- `[UNMET - CHARACTER ELIGIBILITY]` No evidence currently establishes each item as a character rather than a UI icon, graph, control label, or project-local glyph.
- `[UNMET - INDEPENDENT CHARACTER USE]` DA-014 found no portable independent character use for any active concept.
- `[UNMET - PUBLIC PLAIN-TEXT NEED]` Communication failures and project-authored interchange demonstrations do not yet establish an independently observed need that encoded characters uniquely solve.
- `[PARTIAL - REPERTOIRE STABILITY]` DA-017 supports a coherent six-class semantic taxonomy but explicitly does not establish stable universal character forms.
- `[PARTIAL - NON-DUPLICATION]` DA-005 and DA-009 found no Unicode 17 semantic equivalent in bounded searches; the pipeline, non-approval archive, UTC/WG2 document register, alternate terminology, and Unicode version must be refreshed at submission time.
- `[UNMET - COMMUNITY SUPPORT]` No endorsement, request, or position is attributed to a vendor, educator, professional group, standards body, or user community.

**Required disposition before drafting a positive summary:** document all three SEW criteria for every included character, or reduce/abandon the repertoire on principled evidence. Technical completeness cannot substitute for this threshold.

## 2. Proposed repertoire and representative glyphs - blocked

The current conceptual order is low-side pass, high-side pass, middle pass, middle reject, low-side shelf, high-side shelf. That order is provisional and has no code-point implication.

| Registry identity | Semantic identity | Proposed Unicode name | Code point | Reference glyph | Character evidence |
| --- | --- | --- | --- | --- | --- |
| [`asr:filter.low-pass`](../registry/symbols/filter.low-pass.json) | Low-pass filter response | `[UNMET - immutable name]` | `[UNASSIGNED]` | `[PLACEHOLDER - no proposal glyph accepted]` | `[UNMET]` |
| [`asr:filter.high-pass`](../registry/symbols/filter.high-pass.json) | High-pass filter response | `[UNMET - immutable name]` | `[UNASSIGNED]` | `[PLACEHOLDER - no proposal glyph accepted]` | `[UNMET]` |
| [`asr:filter.band-pass`](../registry/symbols/filter.band-pass.json) | Band-pass filter response | `[UNMET - immutable name]` | `[UNASSIGNED]` | `[PLACEHOLDER - no proposal glyph accepted]` | `[UNMET]` |
| [`asr:filter.band-stop`](../registry/symbols/filter.band-stop.json) | Band-stop filter response | `[UNMET - immutable name]` | `[UNASSIGNED]` | `[PLACEHOLDER - no proposal glyph accepted]` | `[UNMET]` |
| [`asr:filter.low-shelf`](../registry/symbols/filter.low-shelf.json) | Low-shelf filter response, gain sign excluded | `[UNMET - immutable name]` | `[UNASSIGNED]` | `[PLACEHOLDER - no proposal glyph accepted]` | `[UNMET]` |
| [`asr:filter.high-shelf`](../registry/symbols/filter.high-shelf.json) | High-shelf filter response, gain sign excluded | `[UNMET - immutable name]` | `[UNASSIGNED]` | `[PLACEHOLDER - no proposal glyph accepted]` | `[UNMET]` |

Current compact-a SVGs are owner-approved for internal study construction and hash-locked in [`artwork/study-locks/six-member-compact-a.json`](../artwork/study-locks/six-member-compact-a.json). That lock is not artwork acceptance, canonical-reference designation, evidence of established forms, or permission to present the drawings as proposed characters. The two-prong shelf forks are original research geometry.

### Repertoire questions still open

- `[UNMET]` Show why every included identity is encoded atomically and why parameters remain higher-level data.
- `[UNMET]` Decide whether evidence supports all six characters, a smaller repertoire, or no character proposal.
- `[UNMET]` Resolve unrestricted `low cut`/high-pass and `high cut`/low-pass name relationships.
- `[UNMET]` Resolve the proposal treatment of `band reject`, `BSF`, and the narrower/context-dependent `notch` term without collapsing distinct identities.
- `[UNMET]` Decide names-list annotations, cross-references, and ordering after names and repertoire are technically reviewed.
- `[UNMET]` Demonstrate that shelf boost/cut orientation is glyphic or parametric context rather than a character split; current semantics exclude signed gain.

## 3. Rationale and eligibility - blocked

### 3.1 Independent usage as characters

`[UNMET - CENTRAL BLOCKER]`

Relevant but insufficient evidence:

- EV-100 documents axis-less product selectors for high-pass, low-pass, band-pass, and band-stop.
- EV-101 documents project-local custom-font components for high-pass, low-pass, and band-pass.
- EV-120 documents one project-local icon font with mappings for all six active concepts, including separate Band Reject and Notch members.
- EV-122 documents derivative ecosystem packaging and is not another independent implementation.
- DA-012 and DA-014 constrain those findings: product selectors and local font mappings demonstrate compact implementation, not portable character use.

Needed evidence slot for each proposed character:

| Requirement | Evidence to attach | Current state |
| --- | --- | --- |
| Independent community | Identified community independent of the project/creators | `[UNMET]` |
| Character-like use | Multiple independently authored examples where identity is carried as text or a stable text-backed notation | `[UNMET]` |
| Temporal/geographic breadth | Dated examples sufficient to establish persistence, not a one-off implementation | `[UNMET]` |
| Source independence | Publisher/author/implementation independence analysis | `[UNMET]` |
| Negative cases | UI-only, image-only, local-font, PUA, ligature, and label uses explicitly excluded or bounded | `[PARTIAL - DA-012/DA-014]` |

### 3.2 Stable repertoire and character forms

`[PARTIAL - SEMANTICS YES; CHARACTER FORMS NO]`

DA-017 establishes a durable six-way semantic taxonomy across manufacturers, decades, education, APIs, and implementations. It also preserves the adverse conclusion that vendors vary labels and drawings, and that stable taxonomy is not stable character identity. The study-locked original glyph family is suitable only for internal recognition work.

Needed evidence:

- `[UNMET]` independently observed visual conventions sufficient to define acceptable glyphic variation for each identity;
- `[UNMET]` six-way recognition and adverse-confusable results, without using recognition of original project artwork as proof of pre-existing usage;
- `[UNMET]` rationale for including or excluding axis-bearing forms;
- `[UNMET]` evidence-backed boundaries for band-stop versus notch and pass versus cut terminology;
- `[UNMET]` community validation that the repertoire is neither arbitrary nor missing inseparable members.

### 3.3 Need for public interchange in plain text

`[UNMET - CENTRAL BLOCKER]`

DA-001, DA-010, DA-014, and DA-016 show workarounds and bounded communication friction. EV-121, EV-140, and EV-141 preserve concrete misunderstandings or documentation failures. DA-016 finds recurring bounded friction only for low shelf under the project's own conservative rule. None establishes encoding necessity, prevalence, portable character use, or inability of prose/ASCII/structured IDs to work.

Needed evidence:

- `[UNMET]` independently authored public-text contexts where the target identity must survive copy/paste, search, indexing, accessibility, or machine processing;
- `[UNMET]` record-specific failures across independent publishers/communities for each included character;
- `[UNMET]` comparison against `HPF`, `LPF`, `BPF`, `BSF`, `LOW SHELF`, `HIGH SHELF`, ordinary prose, images, and `asr:` IDs;
- `[UNMET]` reason encoding is preferable to markup, structured metadata, or an icon/font registry in the documented contexts;
- `[UNMET]` evidence that compact human-machine and LLM communication is an observed independent need, not solely a forecast or project-authored demonstration.

## 4. History and community use - incomplete

The repository can draft a history of the six response classes using DA-002, DA-003, DA-007, DA-008, DA-015, and DA-017. Any future narrative must separate:

1. historical semantics and terminology;
2. axis-bearing response graphs;
3. compact UI selectors;
4. project-local font glyphs;
5. independently used text characters.

`[UNMET]` The fifth category remains absent. Do not convert historical use of a graph or label into a claim that the project silhouette was used as a character.

## 5. Character identity, names, and properties - placeholders only

### 5.1 Names and annotations

- Unicode character names: `[UNMET - none proposed]`
- Alternate names/aliases: `[UNMET - evidence and names-list policy review required]`
- Names-list annotations and cross-references: `[UNMET]`
- Repertoire order: `[PROVISIONAL - conceptual order only]`

Registry canonical names and spoken labels are evidence-management fields, not automatically valid immutable Unicode names. No name in this worksheet is a proposal name.

### 5.2 Provisional shared property hypothesis

The internal [character-properties and font strategy](character-properties-font-strategy.md) records one testable hypothesis for all six: `General_Category=So`, `Canonical_Combining_Class=0`, `Bidi_Class=ON`, `Bidi_Mirrored=N`, `East_Asian_Width=N`, `Line_Break=AL`, `Script=Common`, with no case, numeric value, decomposition, joining, combining, math, identifier, emoji, or variation-sequence behavior.

`[PARTIAL - NOT PROPOSAL DATA]` These values remain provisional until simulation, analogue review, names/repertoire resolution, and character eligibility are complete. UnicodeData-style rows cannot be written without names and code points and are intentionally absent.

Property validation slots:

- `[UNMET]` mixed-direction behavior and fixed internal orientation under UAX #9;
- `[UNMET]` line breaking and adjacent punctuation/numerals under UAX #14;
- `[UNMET]` normalization and sequence analysis after the non-duplication argument;
- `[UNMET]` accessibility behavior and text fallback expectations;
- `[UNMET]` collation/order rationale;
- `[UNMET]` confirmation that no member needs a distinct property profile.

## 6. Existing characters, sequences, and confusables - partial

DA-005 and DA-009 found no Unicode 17 semantic equivalent. They preserve these non-equivalent visual families:

| Target area | Existing near misses to discuss | Required proposal treatment |
| --- | --- | --- |
| Pass curves | `√` U+221A; `↗` U+2197; `↘` U+2198; curved arrows; box-drawing arcs | Explain mathematical, directional, or layout semantics and test recognition confusion. |
| Band-pass | `∩` U+2229; `⌒` U+2312; `⌢` U+2322; `⏜` U+23DC | Explain operator/bracket behavior, extensibility, and missing filter semantics. |
| Band-stop | `∪` U+222A; `⌣` U+2323; `⏝` U+23DD | Explain operator/bracket behavior and preserve the notch-width objection. |
| Shelves | fork/routing/merge/split/crossover forms; angle/bracket and OCR near misses in DA-009 | Explain why an unfamiliar fork would denote a shelf response and report adverse-confusable testing. |
| ASCII/sequence substitutes | `HPF`, `LPF`, `BPF`, `BSF`, full shelf labels, `/\`, `\/`, plateau sketches | Treat labels as successful fallbacks and shape sequences as font-dependent counteroptions; do not misuse ligatures or combining marks. |

`[UNMET]` Refresh NamesList, code charts, pipeline, non-approval archive, standardized/named sequences, and UTC/WG2 document registers at package review. UTS #39 cannot list an unencoded target as a formal confusable, so any visual-confusable language must remain descriptive.

## 7. Representative-glyph images and rights checklist - blocked

No third-party image is embedded in this skeleton. Stable links and ledger locators are not a substitute for the self-contained figures expected in a proposal.

For every future figure:

- [ ] `[UNMET]` figure number, caption, date/era, product/context, and exact ledger ID/locator;
- [ ] `[UNMET]` legible highlighting of the relevant character-like use in context;
- [ ] `[UNMET]` verified independent authorship and source identity;
- [ ] `[UNMET]` human-reviewed copyright/license/permission or defensible inclusion basis;
- [ ] `[UNMET]` no tracing, cropping, or alteration that implies artwork permission or changes the evidence;
- [ ] `[UNMET]` embedded archival-quality image rather than link-only evidence;
- [ ] `[UNMET]` alt text and accessible caption that distinguish observation from interpretation;
- [ ] `[UNMET]` provenance manifest and checksum for retained source material;
- [ ] `[UNMET]` separation of usage images from original representative glyph artwork;
- [ ] `[UNMET]` author/IP/CLA inventory for all significant proposal contributions.

The project's original CC0 SVG provenance does not grant rights to vendor/manual/forum images. A rights inventory and owner/legal review remain mandatory before external use.

## 8. Font and implementation - blocked

The property/font strategy supports a private, purpose-built, unencoded feasibility proof addressed by glyph name or glyph ID. It prohibits PUA mappings, invented code points, third-party font forks, and claims of proposal-font status. Font feasibility proves renderability, not character eligibility.

Required before an external package:

- `[UNMET]` accepted/canonical reference artwork or other owner-approved proposal glyphs;
- `[UNMET]` human-selected font license and verified ownership/provenance;
- `[UNMET]` appropriately licensed font supplied under current Unicode font policy;
- `[UNMET]` OpenType name IDs 0, 8, 9, 13, and 14 as applicable;
- `[UNMET]` deterministic transform, metrics, contour, raster, and reproducibility records;
- `[UNMET]` valid committee-appropriate mapping after legitimate assignment strategy exists;
- `[UNMET]` tested fallback, baseline, advance, small-size rendering, bidi, line wrap, normalization, and accessibility behavior;
- `[UNMET]` no unexpected color, emoji, GSUB ligature, variation, joining, math, or identifier behavior.

## 9. Why adjacent mechanisms are not automatic substitutes - incomplete rationale

This section must avoid presenting Unicode as the predetermined answer.

| Mechanism | What it can solve | Why it does not by itself provide Unicode plain-text identity | Current disposition |
| --- | --- | --- | --- |
| Registry IDs | Stable machine-readable semantics, accessibility labels, structured interchange | ASCII identifiers are application-level strings, not single characters | `GO`; current canonical interchange |
| Open-source font/icon set | Compact rendering and adoption experiments | Local names/mappings do not interoperate without the font and can collide in PUA | Useful parallel path; publication/license still gated |
| SMuFL | Mature music-notation glyph metadata and font practices | Current audit found no reviewed semantic equivalents; SMuFL generally manages notation glyphs and PUA-era mappings, not general Unicode allocation | Process precedent and possible future extension research; no equivalence/compliance claim |
| IEC 60617 | Authoritative adjacent electrotechnical diagram terminology for four pass/stop functions | Diagram symbols are not automatically encoded characters; audited IEC graphics are not the audio-community target drawings | Cite adjacency, not adoption, endorsement, or artwork rights |
| IEC 60417 / ISO 7000 | Equipment/public-information symbol systems | The sampled symbols do not establish these six audio response characters or plain-text use | Not substitutes on current evidence; scope must be stated precisely |
| AES/ISO industry work | Could align terminology, metadata, or later standards efforts | No current source establishes an AES/ISO position or encoding request for this repertoire | Future research/outreach only; no attributed position |
| Emoji | Colorful cross-platform pictographs under separate selection criteria | These are technical monochrome response concepts; emoji popularity criteria do not repair the non-emoji plain-text case | Outside active path |
| Images/markup | Exact visual communication in rich contexts | Images can be inaccessible, unsearchable, or nonportable, but often remain adequate; failures must be evidenced, not assumed | Material counteroption |

`[UNMET]` A future proposal must show contexts where these alternatives are inadequate while conceding contexts where they are sufficient.

## 10. Rejected encodings and alternative models

Current internal disposition, subject to evidence:

- Reject using visually similar mathematical, arrow, bracket, or box-drawing characters because they import wrong semantics and properties.
- Reject punctuation-sequence ligatures as canonical interchange because they alter ordinary text, remain font-specific, and establish no semantic identity.
- Reject combining marks for cutoff, slope, resonance, bandwidth, shelf gain, or axes; those are parameters or explanatory context.
- Reject PUA assignments as canonical IDs or evidence of encoding.
- Reject emoji variation selectors, ZWJ sequences, and standardized variation sequences as repairs for uncertain semantics.
- Retain axis-bearing drawings as explanatory variants, not separately encoded identities, unless future evidence supports a distinct character need.
- Retain the two-prong shelf fork only as current original study geometry; reject the three-prong/baseline-bearing shelf alternative from active research under D-016/D-019.
- Preserve `notch` as related and commonly narrower/context-dependent rather than silently making it identical to band-stop.
- Preserve unrestricted pass/cut alias equivalence as unresolved.
- Preserve no-encoding, registry-only, font/icon, markup, SMuFL-extension, and industry-metadata outcomes as legitimate alternatives.

`[UNMET]` Each rejection needs proposal-ready evidence and direct comparison if the project ever advances; project preference alone is insufficient.

## 11. ISO/IEC JTC 1/SC 2/WG 2 Proposal Summary Form - entirely blocked

Do not fill or sign the form while Unicode is on `HOLD`. The future package must answer, with verified evidence:

- requester, request type, proposed category, repertoire count, names, allocation, and font;
- published examples and user-community information;
- character use, context, frequency, and access to source references;
- name-list, properties, combining behavior, presentation forms, and related encoded characters;
- submitter commitment, contact, contribution, IP, and font-license questions.

Every current answer that would assert encoding need, community support, a proposed name/code point, permission, or legal commitment is `[UNMET OR RESERVED]`.

## 12. Evidence map and stable references

| Question | Repository authority | Direct source IDs | Current answer |
| --- | --- | --- | --- |
| Current status and scores | [Current evidence status](current-evidence-status.md) (DA-006 v0.2.9) | EV-001 through EV-151 in sparse ledger ranges | Six records remain `evidence-collecting`; Unicode `HOLD`. |
| Current SEW requirements | [Unicode critical-path audit](unicode-proposal-critical-path-audit.md) (DA-013) | EV-110-EV-118 | Three central criteria remain controlling. |
| Repertoire coherence | [Six-concept stability dossier](../evidence/reports/2026-08-31-six-concept-repertoire-stability.md) (DA-017) | EV-150, EV-151 plus cited corpus | Stable taxonomy; universal character forms unproved. |
| Existing Unicode/standards overlap | [Four-record audit](unicode-overlap-audit.md) (DA-005); [shelf audit](shelf-unicode-standards-overlap-audit.md) (DA-009) | EV-001, EV-037-EV-039, EV-070-EV-073 | No bounded semantic equivalent found; confusables and adjacent standards remain. |
| Independent character-like use | [Independent-use spike](../evidence/reports/2026-08-31-independent-character-use-spike.md) (DA-014) | EV-100, EV-101, EV-120-EV-122 | Compact/project-local implementation exists; portable character use absent. |
| Plain-text friction | [Workaround search](plain-text-workaround-search.md) (DA-001); [shelf spike](../evidence/reports/2026-08-31-shelf-plain-text-friction.md) (DA-010); [casebook](../evidence/reports/2026-09-01-communication-failure-casebook.md) (DA-016) | EV-080-EV-084, EV-121, EV-140, EV-141 | Bounded friction exists; encoding need unproved. |
| Names/properties/font | [Property/font strategy](character-properties-font-strategy.md) | EV-110, EV-113, EV-114 | Provisional shared property hypothesis; no names, code points, or font. |
| Artwork | [Study lock](../artwork/study-locks/six-member-compact-a.json); [artwork criteria](artwork-criteria.md) | Repository-authored provenance only | Internal geometry lock; no canonical/proposal artwork acceptance. |

Ledger IDs resolve through [`evidence/ledger.json`](../evidence/ledger.json); derived-analysis versions and content hashes resolve through [`evidence/derived-analyses.json`](../evidence/derived-analyses.json). A self-contained external proposal cannot rely on repository links alone: all necessary figures and arguments must be embedded and archived in the owner-reviewed submission package.

## 13. Exit criteria for replacing this skeleton

This worksheet remains visibly non-submittable until all of the following are true:

1. every included identity clears independent character use, stable repertoire/form, and public plain-text interchange need;
2. negative and alternative outcomes are preserved and fairly addressed;
3. names, ordering, annotations, properties, confusables, normalization, bidi, line breaking, and accessibility are technically reviewed;
4. representative glyphs are accepted through Human Review and the font is licensed, reproducible, and policy-compliant;
5. every embedded usage image has an explicit, human-reviewed rights basis and provenance;
6. the ISO/IEC proposal summary information is complete and accurate;
7. authorship, CLAs, IP, attribution, affiliations, and external representations receive human review;
8. an independent adverse reviewer finds the complete package evaluation-ready;
9. Joshua reviews the complete external submission and explicitly authorizes submission.

Until then, the correct external statement is: **No Unicode proposal has been submitted; formal proposal status remains `HOLD`.**

## Agent Report - 2026-08-31T21:10:18-07:00

- Report status: completed and independently approved after adverse-review corrections.
- Scope: internal, non-submittable SEW-oriented skeleton for the currently authorized six-concept repertoire under D-021.
- Base: exact repository commit `48f688560dabe0363836de453c1de3bd346cc516`.
- Inputs: EV-001 through EV-151 in the sparse ledger ranges; DA-001 through DA-017 except reserved/unused DA-011; current official guidance EV-110 through EV-118.
- Result: the proposal layout is concrete, but every unsupported eligibility, name, code-point, property, image-rights, font, community-support, and legal slot is visibly marked as unmet, partial, open, provisional, or reserved.
- Preserved objections: the evidence currently supports a semantic taxonomy and useful compact graphics more strongly than pre-existing characters; ASCII labels, prose, images, markup, registry IDs, and local fonts remain credible alternatives; recognition of original artwork cannot prove prior usage.
- Excluded actions: no code-point or immutable-name proposal, endorsement, external position, outreach, submission, proposal release, third-party image reuse, font publication, artwork acceptance, status promotion, active-repertoire expansion, or standards action.
- Validation: the full repository suite passed 113/113 tests; registry validation reported six records, six assessment sets, and 82 evidence sources at registry 0.2.8; Agent Report hygiene, all relative Markdown link targets, `git diff --check`, and the prohibited smart-quote scan passed.
- Independent review: the first adverse pass requested changes because a navigation link mutated immutable DA-013, proposal date and externally assigned document number were conflated, and the guard test did not protect each blocked repertoire row. The DA-013 mutation was reverted, the fields were split, and the test now asserts one exact unmet-name/unassigned-code-point/placeholder-glyph/unmet-evidence row per live record. The corrected exact staged diff received `APPROVE` with no remaining blocker or accidental submission implication.
