# Synergistic applications roadmap

Status as of 2026-08-29. This roadmap compares adjacent applications for the registry. It makes no external-standard claim, adopts no new symbol family, authorizes no outreach, and changes no registry record or status.

## Executive recommendation

Continue one evidence base and expose it through several reversible outputs instead of treating Unicode as the only successful outcome.

The recommended sequence is:

1. Strengthen the registry and its machine-readable interchange experiment.
2. Produce original neutral study artwork and test comprehension under the adopted human-review protocol.
3. Publish implementation-neutral examples only after the applicable publication and artwork gates are resolved.
4. With evidence of actual implementation or communication need, consider separate, human-authorized listening conversations with AES and relevant communities.
5. Reassess a Unicode character proposal only after the repository's formal non-go conditions clear.

This sequence preserves optionality. Work in steps 1 and 2 supports accessibility, documentation, fonts, applications, community review, and a later standards case even if no code point is ever proposed.

## Route comparison

| Route | External authority or owner | Current fit | Evidence already present | Main prerequisite | Primary risk | Recommended posture |
| --- | --- | --- | --- | --- | --- | --- |
| Registry and machine-readable interchange | This project; consumers own their integrations | Strong | Four semantic records, evidence ledger, stable-form ASCII IDs, text and speech fallbacks, experimental resolver | Usage examples and a versioned payload contract only if consumers emerge | Prematurely promising identifier or schema stability | Continue now; keep protocol experimental |
| Original font or icon package | This project for original work; upstream maintainer for any contribution; font license controls derivatives | Moderate | Artwork policy, recognition protocol, optional asset model, known custom-font implementations | Original accepted artwork, font metadata/licensing plan, rendering tests | A font demonstrates rendering, not portable text usage; PUA values can be mistaken for standard encoding | Prepare reproducible tooling after artwork exists; do not make PUA canonical |
| AES standards/community path | Audio Engineering Society Standards Committee and its working groups | Moderate, later | Cross-vendor audio evidence and an interoperability framing | Concrete implementer use cases, stakeholder map, bounded proposed deliverable | Standards work may be disproportionate to demand; outreach can imply a position | Best first standards-body listening option, subject to Human Review |
| SMuFL/W3C Music Notation Community Group | W3C Music Notation Community Group | Adjacent | Canonical-name and font-metadata precedent; open community process | A use case that genuinely intersects digital music notation | Current scope is notation, not general audio-product UI or text; a request could be out of scope | Learn from the model; seek informal scope feedback only after approval |
| Unicode character path | Unicode Technical Committee and Script Encoding Working Group, coordinated with ISO/IEC JTC 1/SC 2/WG 2 | Weak now, potentially meaningful later | Semantic family, overlap audit, workaround evidence, proposal safeguards | Registry acceptance, stronger plain-text demand, original font, properties, community review and support | Encoding visual UI conventions without demonstrated plain-text character use | Maintain `HOLD`; revisit only at explicit trigger |
| Unicode emoji path | Unicode Emoji Standard & Research Working Group and Unicode Technical Committee | Poor | Broad visual recognizability remains a research question | Global frequency and emoji-specific factors | Unicode says UI icons are automatically declined and points monochrome symbols to the character process | Do not pursue unless the use case materially changes |
| ISO/IEC path | Relevant ISO/IEC technical committee, participating national bodies, and nominated experts | Weak as a direct first move | IEC 60617 terminology adjacency and non-equivalence audit | Correct committee scope, national-body/committee support, multiple active experts, market relevance | Confusing adjacent IEC diagram symbols with this registry; high process cost | Monitor; consider only after industry adoption or an AES-aligned deliverable |
| Additional industry glyph families | Undetermined per domain; this project's owner controls registry scope | Potentially strong as a registry method | Reusable evidence, assessment, accessibility, and provenance model | Bounded intake and separate authorization for every new family | Scope dilution and importing vendor/standards artwork or assumptions | Maintain a research queue; do not add records yet |

## Workstream A: registry-first machine interchange

### Current evidence

- The checked-in [interchange prototype](interchange-prototype.md) resolves canonical ASCII `asr:` IDs to text and speech without Unicode, a font, or PUA assignment.
- The [W3C Data on the Web Best Practices](https://www.w3.org/TR/dwbp/) recommends persistent identifiers, machine-readable formats, metadata, versioning, and explicit licensing for reusable data.
- [RFC 8259](https://www.rfc-editor.org/rfc/rfc8259) provides the interoperable JSON data model, while [JSON Schema](https://json-schema.org/specification) can constrain a future payload if an actual consumer contract emerges.
- [W3C Character Model: String Matching](https://www.w3.org/TR/charmod-norm/) cautions that visually or semantically similar strings are not necessarily Unicode-equivalent. This supports keeping semantic identity distinct from rendered appearance.

### Low-cost reversible work

- Add copy-pasteable examples for plain text, JSON, accessibility speech, and application-owned asset lookup.
- Collect actual user stories: chat, DAW documentation, issue trackers, preset metadata, controller labels, educational notes, and agent prompts.
- Measure whether canonical IDs reduce ambiguity or token/character cost compared with prose, images, or improvised sketches. Report both wins and cases where `LPF`/`HPF` are already sufficient.
- Define a versioned interchange schema only after at least one independent consumer needs it. Until then, examples should remain explicitly experimental.
- Keep identity, semantic status, fallback, speech, and presentation asset as separate fields.

### LLM and agent use

Canonical IDs could make human-agent exchanges less ambiguous and sometimes shorter, but both claims require measurement. Token counts vary by model and tokenizer, and an unfamiliar identifier can cost more context than a familiar abbreviation. A useful evaluation should compare at least `LPF`, `low-pass filter`, `asr:filter.low-pass`, an improvised sketch, and an image-dependent prompt across concrete tasks. Measure task accuracy, clarification turns, copy/paste survival, character count, model-specific token count, and accessibility. Do not optimize the canonical vocabulary around one model's tokenizer or claim that compact serialization proves broad human text use.

### Gate and risk

A stable protocol, compatibility promise, permanent identifier, public release, or external adoption claim requires the existing repository gates. Machine readability is useful evidence but does not itself prove Unicode eligibility.

## Workstream B: open-source typography and graphics

### Current evidence

- [SMuFL](https://www.w3.org/community/music-notation/wiki/Group_Charter) demonstrates a mature separation between canonical glyph names, repertoire metadata, font implementation, and Unicode status in the music-notation domain.
- The official [SMuFL fonts page](https://www.smufl.org/fonts/) describes Bravura as a SMuFL implementation under the SIL Open Font License and invites improvements through its GitHub project.
- The [SIL Open Font License 1.1 text](https://openfontlicense.org/open-font-license-official-text/) permits use, study, modification, embedding, and redistribution subject to its conditions. Modified fonts must respect Reserved Font Names and remain under the OFL.
- The [OFL guidance for modified fonts](https://openfontlicense.org/how-to-modify-ofl-fonts) makes clear that derivatives remain OFL-licensed and cannot be sold by themselves.
- [fontTools](https://fonttools.readthedocs.io/) supplies open-source tooling for constructing, inspecting, converting, and subsetting OpenType fonts.

### Options, not adopted decisions

| Option | Benefit | Cost/risk | Recommended trigger |
| --- | --- | --- | --- |
| Standalone SVG set | Simplest application and documentation integration; avoids encoding claims | No native text behavior | Original artwork accepted and publication authorized |
| Original purpose-built font | Full control of naming, metrics, sources, tests, and licensing | Maintenance and shaping/rendering QA; no portable semantics without shared encoding | Multiple implementers request font delivery |
| Contribute glyphs upstream | Reuses an existing ecosystem and distribution path | Host project scope, contribution terms, glyph-name policy, and acceptance are external decisions | A clearly in-scope host and maintainers express interest after authorized outreach |
| Fork an OFL font | Rapid proof of rendering and integration | Reserved Font Names, attribution, license inheritance, merge burden, and false impression of upstream endorsement | A prototype needs surrounding font metrics that cannot be tested standalone |
| PUA mapping | Enables a local font/app demo | PUA values are non-interoperable and may collide; copying text loses meaning without the font | App-internal demo only, with conspicuous nonstandard labeling |

### Recommendation

Begin with original editable SVG and semantic metadata. If a font experiment becomes useful, generate it from the same original source and treat glyph names or app asset keys as presentation mappings. Do not make a PUA code point the registry identity. Before any fork, perform a file-level license and Reserved Font Name audit; repository-level OFL labeling alone is insufficient.

## Workstream C: AES and audio-industry standardization

### Why AES is the most plausible first standards conversation

The [AES Standards Committee](https://aes.org/standards/) describes its work in terms of audio-engineering interoperability. Its [participation rules](https://aes.org/standards/standards-development/aes-standards-participation/) say working-group membership is open to directly and materially affected individuals and does not require AES membership, although membership is encouraged.

That makes AES structurally more accessible and topically closer than a direct ISO/IEC proposal. It does not show that an existing AES group wants this work, that the registry qualifies for standardization, or that AES endorses the premise.

### Possible deliverables to test before outreach

- A terminology and semantic-reference report, not a mandated graphic.
- A recommended machine-readable identifier set with accessibility labels.
- A technical report on common filter-response representations and known divergences.
- A liaison or informative note that maps audio-product terminology to adjacent IEC terminology without reusing IEC artwork.

### Prerequisites

1. Identify the exact AESSC technical or standards committee whose charter could cover the problem.
2. Document at least two independent implementer use cases and the interoperability failure each experiences.
3. Prepare a one-page neutral problem statement that distinguishes glyph recognition, UI design, font delivery, text interchange, and character encoding.
4. Decide whether the ask is feedback, collaborators, a report, or standards work. These are materially different asks.
5. Obtain Human Review authorization before contacting AES or representing a project position.

### Stop conditions

Do not initiate standards work if the only demonstrated benefit is cosmetic UI consistency, if existing abbreviations resolve the cited workflows adequately, or if no materially affected implementer will participate.

## Workstream D: ISO and IEC

### Current evidence

- The repository's [overlap audit](unicode-overlap-audit.md) identifies IEC 60617 S01247-S01250 as adjacent electrotechnical diagram terminology, not the target audio-community response shorthand.
- The current [ISO/IEC Directives, Part 1](https://www.iso.org/sites/directives/current/consolidated/index.html) require committee approval and active participation commitments for a new work item; the exact criteria depend on committee size and route.
- ISO's public [standards-development overview](https://www.iso.org/sites/ConsumersStandards/voting_iso.html) describes national-body voting, market relevance, nominated experts, working drafts, committee review, and consensus.

### Conservative path

Treat ISO/IEC as a downstream option, not the next action. First determine whether the problem is best framed as terminology, graphical symbols for equipment, electrotechnical documentation, accessibility, or information technology. Each points toward a different committee and can produce conflicting requirements.

A low-cost preparatory artifact is a committee-scope map containing only published scopes, relevant existing work, national-body entry routes, liaison relationships, and explicit non-matches. Creating the map is internal research. Asking a committee, filing a proposal, seeking endorsement, or asserting project alignment is an external-position gate.

## Workstream E: SMuFL and music-notation community

### Fit and boundary

The [W3C Music Notation Community Group charter](https://www.w3.org/community/music-notation/wiki/Group_Charter) covers MusicXML, SMuFL, MNX, and musical-instrument data, with the goal of digital music-notation interoperability. SMuFL is valuable prior art for canonical glyph names, metadata, optional glyphs, font behavior, and open review. General DAW and synthesizer UI symbols are not clearly within that charter.

### Potentially useful engagement questions

- Has the community encountered filter-response symbols inside scores, analytical notation, pedagogical annotations, or text embedded in notation documents?
- Would a registry-to-SMuFL mapping be useful if a notation use case exists, or would external semantic identifiers be preferable?
- Which parts of SMuFL's canonical-name, metadata, alternate-glyph, and font-validation model transferred well, and which should not be copied outside notation?

These are future listening questions, not outreach already made. Joining, posting, submitting an issue, or claiming community support requires Human Review.

## Workstream F: Unicode character path

### Current position

The repository's `HOLD` remains warranted. Unicode's [character proposal guidance](https://www.unicode.org/pending/proposals.html) calls for modern sources, comparison with visually similar characters, proposed properties, an ISO/IEC 10646 summary form, and an appropriately licensed font before recommendation. The project's overlap audit addresses only one part of that burden.

The later [character-properties and internal font-proof strategy](character-properties-font-strategy.md) records a reversible property hypothesis and a private unencoded proof architecture for the current six concepts. It does not change this roadmap's `HOLD`, choose code points, allocate PUA values, publish a font, or cure the missing plain-text interchange evidence.

### Reassessment triggers

Reopen the internal feasibility assessment only when all repository non-go safeguards are cleared and the corpus can answer:

- What plain-text content cannot be represented adequately today?
- Who exchanges that content across independently implemented systems?
- Is each item an abstract character rather than an exact icon, graph, or interaction state?
- What are its stable semantic boundaries and canonical properties?
- Why are existing characters, sequences, abbreviations, markup, images, or registry IDs insufficient?
- Can original neutral glyphs and an appropriately licensed proposal font be supplied?
- Does current community review support the repertoire and distinctions?

### Low-cost reversible work

- Keep the overlap audit reproducible against future Unicode releases.
- Preserve dated examples of real text workarounds, including negative searches.
- Draft property hypotheses in a clearly non-proposal research note only after semantics stabilize.
- Maintain a delta checklist against current proposal guidance rather than drafting a submission prematurely.

Any preliminary inquiry, proposal, liaison statement, or public claim of Unicode support remains separately human-gated.

## Workstream G: emoji feasibility

Unicode's current [emoji proposal guidelines](https://unicode.org/emoji/proposals.html) say UI icons are automatically declined. They also direct widely used monochrome symbols that do not require color to the character-proposal route. Proposals require empirical frequency evidence, openly licensable images, and emoji-specific inclusion factors; anecdote, petitions, and cause arguments do not substitute for evidence.

The current concept is functional notation that should remain recognizable in monochrome and should not acquire platform-dependent pictorial semantics. On present evidence, an emoji proposal would weaken the technical framing and duplicate research better directed to the symbol-character route.

Recommendation: keep emoji out of the active roadmap. Reconsider only if independent evidence reveals an expressive conversational use distinct from the technical filter-response character use. Submission-window timing is not the substantive blocker.

## Workstream H: future glyph families

The project owner's future-research examples include shelving, bell/peak, all-pass, tilt, waveform, routing, dynamics, polarity, phantom power, and other audio/synthesis symbols. Axis-bearing variants may be useful as expanded alternatives when evidence shows that axes carry necessary context. Other industries could use the registry method, but should not automatically share the `asr:` semantic namespace or acceptance assumptions.

### Proposed research intake, not an adopted scope expansion

For each candidate family, record:

1. Domain and specific communication failure.
2. Canonical term hypotheses and contested aliases.
3. At least one direct primary source and one independent use.
4. Whether the target is a character, diagram object, UI icon, control legend, notation glyph, emoji, or illustration.
5. Existing Unicode, ISO, IEC, industry-standard, and open-source overlap.
6. Text fallback and accessibility speech.
7. Visual variants and whether axes, direction, state, value, color, or animation carry meaning.
8. Artwork provenance and licensing boundaries.
9. Likely implementers and measurable interoperability benefit.
10. A recommendation to reject, watch, research, or request Human Review for a bounded scope addition.

### Portfolio rule

Do not add a family merely because its symbols are attractive or familiar. Prefer families where the research method produces value even without encoding: shared terminology, accessible labels, machine identifiers, documentation mappings, or tested original graphics. Each new semantic family and namespace decision remains a Human Review gate.

## Cross-route evidence package

One reusable evidence package can support later decisions without presuming their outcome:

| Artifact | Registry | Font | AES | SMuFL | Unicode | Future families |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Semantic definitions and boundaries | Yes | Yes | Yes | Yes | Yes | Yes |
| Direct usage and counterevidence | Yes | Helpful | Yes | Yes | Yes | Yes |
| Text fallback and speech label | Yes | Yes | Yes | Helpful | Yes | Yes |
| Original neutral SVG | Optional | Yes | Helpful | Yes | Yes | Optional |
| Recognition/confusability study | Helpful | Yes | Helpful | Helpful | Helpful | Helpful |
| Versioned machine identifiers | Yes | Yes | Yes | Mappable | Helpful | Yes |
| Plain-text workaround corpus | Helpful | No | Helpful | Helpful | Critical | Helpful |
| License and provenance record | Yes | Critical | Yes | Critical | Critical | Yes |

## Near-term backlog recommendation

These tasks stay inside the established research scope and are reversible:

1. Add structured use-case fixtures to the interchange prototype, including a case where abbreviations are sufficient and one where an image is currently required.
2. Define measurement fields for token/character count, ambiguity, accessibility, copy/paste survival, and round-trip identity; do not claim improvement until measured.
3. Prepare original SVG study stimuli and negative controls under the adopted protocol, stopping before recruitment and artwork acceptance gates.
4. Create a standards-scope map for AES, IEC, ISO, and SMuFL using only published charters and processes.
5. Prepare a future-family intake template without adding a candidate family.
6. After implementation evidence accumulates, present the owner with separate outreach options and a recommended first listening audience.

## Explicitly deferred decisions

- Whether to contact AES, SMuFL/W3C, IEC, ISO, Unicode, vendors, educators, journalists, or user communities.
- Whether to adopt or submit any external-standard position.
- Whether to publish, fork, or contribute to a font.
- Whether to assign PUA values.
- Whether to add axis-bearing variants or another symbol family.
- Whether to promote any registry record, publish artwork, recruit study participants, or make a Unicode proposal.

## Agent Report - 2026-08-29T23:21:17-07:00

- Scope: compared Unicode, emoji, AES, ISO/IEC, SMuFL, open-font, machine-interchange, and future-family routes as one conservative portfolio.
- Evidence: used current repository findings plus direct Unicode, W3C, AES, ISO, SIL OFL, fontTools, RFC, and JSON Schema sources linked above.
- Recommendation: prioritize registry-first interchange and original evidence generation; treat AES as the most plausible later standards listening route; use SMuFL as adjacent process prior art; retain Unicode `HOLD`; do not actively pursue emoji.
- Guardrails: made no scope, status, semantic, artwork, licensing, outreach, standards, protocol, or release decision. All consequential options remain subject to existing Human Review gates.
- Validation: full repository tests and independent review are required before merge.
- Report status: completed
- Completion PR: [PR #32 review record](https://github.com/joshua-small/audio-synth-symbol-registry/pull/32)
- Merge commit: [`c938d5388b7cad722d25158a0c58adb6d28122fa`](https://github.com/joshua-small/audio-synth-symbol-registry/commit/c938d5388b7cad722d25158a0c58adb6d28122fa)
- Validation result: passed; 24/24 tests, `git diff --check`, and GitHub Actions passed.
- Independent review result: passed after remediation with no blockers.
- Limitations: no organization or community was contacted; no unpublished committee material was reviewed; the exact AES/ISO/IEC committee fit remains a future scope-mapping task; source processes can change and must be rechecked before action.
