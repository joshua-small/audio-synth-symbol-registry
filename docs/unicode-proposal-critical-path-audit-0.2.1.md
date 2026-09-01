# Unicode proposal critical-path audit

Status as of 2026-09-01T01:44:51-07:00, refreshed on exact merged base `00bbe89f19f376aed2bdc4f36e3c8ccbf03cb1b7` through the evidence-triggered six-record reassessment. This is an internal readiness map for the approved six-concept filter repertoire. It does not propose characters, select code points, accept artwork, contact an external party, or change the formal Unicode position from `HOLD`.

## Executive conclusion

The project is not ready to prepare a formal character proposal. Its strongest evidence establishes six useful and historically durable audio-filter semantics, widespread graphical use in products and education, and an implementation gap served today by labels, images, custom fonts, named icon assets, and project-specific interchange IDs. DA-024 adds a direct-versus-adverse public corpus: it finds real image, documentation, and importer friction, strongest for low shelf, but no portable target-glyph use for any record. It also finds successful ASCII protocols, structured enums, accessible prose, and word-based machine names. The weakest evidence therefore remains the evidence the current Unicode Script Encoding Working Group (SEW) puts at the center of eligibility: use of the proposed items as characters by an independent community, stability of the proposed character repertoire and forms, and need for public interchange in plain text.

This distinction is decisive. Current Unicode guidance explicitly separates an icon's semantic content from customary direct use in text. The project's machine-readable registry and LLM-efficient communication theory are credible benefits, but they are project-authored demonstrations and future-use arguments. They are not yet independently observed character usage or demonstrated public interchange demand.

The `HOLD` is therefore substantive, not procedural. Technical proposal materials such as names, properties, a font, usage figures, and the ISO/IEC summary form can be prepared internally, but none of them repairs the principal usage-and-interchange gap.

## Controlling guidance

The current process source is the [SEW Submission Guidelines and Process](https://sew.unicode.org/guidelines) (EV-110). It states three basic criteria:

1. usage by a community independent of the creator;
2. stability of the proposed repertoire and characters; and
3. need for public interchange in plain text.

The [Character Proposal FAQ](https://www.unicode.org/faq/char_proposal.html) (EV-112), [Unicode property guidance](https://www.unicode.org/pending/properties.html) (EV-113), [font policy](https://www.unicode.org/policies/font_policy.html) (EV-114), and [ISO/IEC proposal-summary page](https://www.unicode.org/L2/summary.html) (EV-116) define submission contents and implementation obligations. The [symbol criteria](https://www.unicode.org/pending/symbol-guidelines.html) (EV-111) remain useful supplementary guidance, but the page itself says that practice has refined the 1999 criteria and points authors to the current proposal guidance.

The [Emoji and Pictographs FAQ](https://www.unicode.org/faq/emoji_dingbats.html) (EV-115) confirms the route choice: non-emoji pictographic symbols and interface icons require a strong plain-text interchange case. Emoji popularity criteria are not a substitute.

## Requirement map

`Met` means the repository contains evidence adequate for the narrow requirement. `Partial` means relevant work exists but does not yet satisfy the proposal burden. `Open` means the necessary artifact or evidence is absent. These are project judgments, not decisions by Unicode.

| Requirement | Source requirement | Current project evidence | Status | Remaining gap |
| --- | --- | --- | --- | --- |
| Character eligibility | Each addition must be a character rather than merely a glyph, abbreviation, ligature, or graphic. | The registry defines six machine-processable semantic identities and canonical ASCII IDs. Vendor and education sources predominantly show labels, controls, graphs, or UI icons. | Open | Demonstrate that each proposed item functions as a character in text or a text-backed notational system, not only as a useful graphic selected through higher-level UI. |
| Non-duplication | Check existing characters, sequences, pipeline items, and prior non-approvals; explain rejected equivalents. | DA-005 and DA-009 find no Unicode 17 semantic equivalent and record visual near misses and failed sequences. EV-117 and EV-118 find no obvious current pipeline or non-approval match under bounded English terms. | Partial | Refresh at submission time; search the UTC/WG2 document register and alternate terminology more broadly; reconcile any later pipeline changes. Code-point selection itself may remain open for the committees. |
| Demonstrated usage | The characters must already be in use by an independent community. | Independent sources establish all six filter concepts and multiple axis-less implementations. Ardour EV-120 uses local ordinary font slots for all six, DSSSP EV-101 uses a local PUA font for three, and FontAudio/Iconify EV-025/EV-122 supplies one derivative named-asset lineage. DA-024 finds no shared mapping, cross-system copy/paste, or portable target-glyph use. | Open | Identify independently authored use of each target identity as a portable character or stable legacy-encoded glyph. UI selectors, incompatible project-local fonts, and derivative icon catalogs establish implementation value but do not meet the SEW character-use criterion. |
| Stability | The proposed repertoire and characters must be stable and not in active development. | The six semantic concepts have long histories. D-016 fixes the research repertoire; D-019 locks exact study geometry. | Open | Show community-level repertoire stability and an established range of glyphic variation. A project lock is reversible research governance, not proof that independently used character forms are settled. The band-stop/notch boundary and shelf visual convergence remain open. |
| Public plain-text interchange need | Encoding must be needed for public interchange of information in plain text. | DA-016 records threshold-positive bounded friction only for low shelf. DA-024 preserves image-dependent cases for five concepts and real EasyEffects round-trip failures, but the latter are parser-support and numeric-locale defects. Equalizer APO EV-205, Web Audio EV-150, REAPER accessibility prose EV-208, and FFmpeg EV-209 demonstrate successful non-glyph text alternatives. Joshua's hand-drawn mix-message case remains first-person motivation rather than independent public evidence. | Open | Obtain independent, record-specific cases where ordinary prose, accessible names, protocol mappings, structured IDs, or named assets cannot preserve the identity and where a character specifically repairs search, indexing, copy/paste, round-trip, accessibility, or processing. No sampled source uses a target glyph as portable plain text. |
| Repertoire completeness and boundaries | Incomplete non-notational repertoires are weak; the proposed set must have a compelling scope and stable exclusions. | The active six cover the basic pass/stop and shelf response family. The registry records boundaries, related terms, future scope, and rejected signed shelf variants. | Partial | Defend why these six form a coherent encodable class while bell/peak, all-pass, tilt, crossover, comb, resonance, and other audio icons are excluded or deferred. Resolve whether band-stop includes notch and whether shelf gain sign is rendering state rather than character identity. |
| Semantic distinctiveness | Proposed characters need well-defined identities distinguishable from existing and proposed characters. | Registry definitions distinguish the six functions. DA-005 and DA-009 document semantic non-equivalence with existing Unicode characters. | Partial | Complete six-way recognition and adverse-confusable testing; test shelf/pass, band-pass/arc, band-stop/union, and routing/fork confusion. Recognition of project artwork supports legibility but cannot establish pre-existing character usage. |
| Visual-confusable comparison | A proposal must compare visually similar existing characters. | DA-005 and DA-009 identify mathematical, arrow, technical, box-drawing, bracket, OCR, routing, and fork-like near misses. | Partial | Produce proposal-quality comparative figures across representative fonts and explain minimum distinguishing features. Keep this separate from UTS #39's encoded-string confusable scope. |
| Proposed names and ordering | A proposal needs concrete names and preferred ordering; alternate names should be discussed. | Registry canonical names, aliases, fallbacks, speech labels, and six IDs exist. | Open | Draft immutable Unicode character names, annotations/cross-references, and repertoire order. Registry names are not automatically suitable Unicode names. Reconcile high-pass/low-cut, low-pass/high-cut, band-stop/notch, and shelf/shelving terminology without creating duplicate identities. |
| Character properties and behavior | At minimum, UnicodeData-style properties are required, plus applicable rendering, directionality, segmentation, collation, casing, line-break, identifier, and special behavior. | The [character-properties and internal font-proof strategy](character-properties-font-strategy.md) supplies a uniform provisional `So/0/ON/N/AL` model, `Script=Common`, `East_Asian_Width=N`, and explicit normalization, identifier, bidi, and rendering hypotheses. | Partial | Run its property simulations and mixed-direction tests; revisit any failed analogue; integrate proposal-ready values only after usage evidence confirms the character model. The strategy intentionally leaves immutable names and ordering open. |
| Glyph and rendering model | The proposal must show the requested glyph and explain any special shaping behavior. | Original, neutral, editable six-member SVG study geometry exists and is hash-locked. It is draft, unpublished, and noncanonical. | Partial | Define the acceptable glyphic variation and minimum rendering requirements without making stroke details semantic. Determine whether the axis-less forms remain identifiable at text sizes and in multiple font styles. Artwork acceptance remains a Human Review gate. |
| Evidence images | Supporting evidence should be incorporated into the archived proposal as clearly identified, captioned images showing characters in use, rather than supplied only as links. | The ledger has detailed citations and rights notes, but deliberately does not copy vendor or standards artwork. Original contact sheets show project designs, not independent usage. | Open | Build a rights-reviewed evidence-figure inventory. For every figure, record source, date, locator, what is being demonstrated, redaction/crop treatment, and the legal basis for inclusion in a permanently archived public proposal. Do not treat permission to inspect as permission to republish. |
| Font and implementation path | SEW requires a suitably licensed font before it recommends a proposal to UTC. | No font is published. The internal strategy defines a purpose-built, unencoded, no-PUA proof addressed by glyph name or ID. Original SVGs are CC0; repository policy anticipates OFL-1.1 or another explicit font license. | Partial | Validate the private proof strategy only if it supports internal review; a proposal font still requires accepted geometry, a human-selected license, required OpenType provenance/name metadata, and committee-appropriate mapping. Font feasibility does not repair the usage gap. |
| ISO/IEC 10646 relationship | A proposal must include the standardized WG2 proposal summary information. Unicode and ISO/IEC 10646 repertoire work is coordinated. | EV-071, EV-073, and DA-009 document synchronization and adjacent standards. EV-116 identifies the required form. | Partial | Fill a draft summary only when the repertoire, names, properties, font, and evidence are mature. Do not pursue separate contradictory Unicode and ISO/IEC character identities. External submission remains reserved. |
| Proposal document and bibliography | A single, self-contained PDF needs a clear request, background, modern sources, comparisons, properties, bibliography, authorship, date, and page identification. | The registry, decision log, reports, and provenance are strong source material. No submission document exists. | Open | Assemble only after the eligibility evidence is credible. A polished PDF produced earlier would risk disguising the critical evidence gap as a formatting gap. |
| Authorship, CLA, and IP | Submitter and all significant proposal authors must have applicable Unicode CLAs; potential IP claimants must be identified. The font needs an accepted license. | Repository licenses and original-artwork provenance are explicit. No Unicode CLA or submission authorship determination is recorded. | Open, reserved | Human review must decide authorship, contributor/IP representations, CLA execution, evidence-image legal basis, and font license before submission. Agent assistance does not authorize legal representations. |

## Six-concept evidence disposition

| Concept | Semantic history and independent use | Character-like or portable glyph use | Principal proposal-specific blocker |
| --- | --- | --- | --- |
| `asr:filter.high-pass` | Strong; bounded `Low Cut` response-class relationship resolved | Three independent axis-less implementations and image/terminology friction; `HP`, `HPF`, `highpass`, and accessible prose succeed; no portable target character | Establish independent inline target-glyph use or repeated irreducible failures despite correct prose and IDs. |
| `asr:filter.low-pass` | Strong; bounded `High Cut` response-class relationship resolved | Three independent axis-less implementations and image/terminology friction; `LP`, `LPF`, `lowpass`, and accessible prose succeed; no portable target character | Establish independent inline target-glyph use or repeated irreducible failures despite correct prose and IDs. |
| `asr:filter.band-pass` | Strong | Multiple axis-less implementations and one image-label case; `BP`, `BPF`, and `bandpass` succeed but `BP` is protocol-dependent; no portable target character | Establish independent target-glyph use or stronger communication failures, while preserving arc/intersection and abbreviation ambiguity. |
| `asr:filter.band-stop` | Strong broad concept under DA-020 source-local Notch rule | Three independent broad-class axis-less implementations and contextual prose; zero accepted drawing-required cases; `BSF`, `bandreject`, and `asuperstop` alternatives exist; no portable target character | Establish broad-class portable glyph use or irreducible interchange failures without borrowing Notch-only evidence. |
| `asr:filter.low-shelf` | Strong sign-agnostic affected-side semantics and three-form two-prong convergence | Only threshold-positive public friction record; local font use and LS parser loss exist, but `LS`, `lowshelf`, full prose, and accessible descriptions already carry identity; no portable target character | Establish independent character use or failures specifically repaired by encoding rather than labels, documentation, or parser support; isolated shelf/pass recognition remains open. |
| `asr:filter.high-shelf` | Strong sign-agnostic affected-side semantics and three-form two-prong convergence | Multiple public image-label cases remain below threshold; local font use and HS parser loss exist, while `HS`, `highshelf`, and prose succeed; no portable target character | Establish a third independent qualifying failure plus character-specific benefit, or actual portable target-glyph use; isolated shelf/pass recognition remains open. |

No concept currently clears the central proposal criteria merely because its registry assessment score is high. The assessment rubric measures internal record readiness and expressly does not assert Unicode eligibility.

Assessment artifact 0.3.5 records high-pass, low-pass, and band-pass at 20/20, Band-stop at 18/20, and both shelves at 19/20. Band-stop's higher text and visual scores do not repair its zero accepted drawing-required cases or establish portable glyph use. The two full shelving-filter terms are resolved at bounded response-class level, but isolated low-shelf/high-pass and high-shelf/low-pass recognition remain material internal registry blockers. None of these assessment changes clears independent character use, public plain-text need, community support, proposal artwork, registry acceptance, or owner authorization for external action.

## Unicode requirements versus project safeguards

The following safeguards are useful project policy, not published Unicode thresholds:

- the project's three-independent-source plain-text-friction safeguard;
- its 20-point registry assessment rubric and dimension floors;
- `evidence-collecting`, `registry-candidate`, and `registry-accepted` statuses;
- the 14-day public-review requirement for registry acceptance;
- six-way blinded recognition thresholds and study sequencing;
- exact SVG hash locks and the exclusion of three-prong shelf variants;
- canonical `asr:` IDs and ASCII fallbacks;
- the rule that third-party artwork is never copied or traced into project artwork.

Clearing these safeguards may make the evidence more credible, but does not compel Unicode acceptance. Conversely, Unicode does not publish a rule requiring exactly three friction examples, a registry score, or this project's study protocol. A future proposal must argue the current SEW criteria directly.

The project's stricter rights boundary also differs from the Unicode FAQ's request for embedded usage images. That is not a contradiction: it means the evidence-figure lane needs an explicit, human-reviewed legal basis rather than silently importing images.

## Highest-value internal evidence lanes

### P0: Continue the character-use and interchange corpus

DA-024 completed the first cross-artifact direct-versus-adverse pass through issue trackers, source code, preset formats, documentation, accessibility material, icon-font mappings, custom encodings, and community exchanges. It preserves negative results and distinguishes:

- a text label naming a filter;
- a graphical UI control;
- a contextual response graph;
- a stable glyph accessed through a legacy or custom encoding;
- a glyph used inline with text or numbers;
- a glyph whose identity is searched, indexed, parsed, copied, or round-tripped.

No portable target-glyph use was found. Continue this lane only with new publisher classes, older primary artifacts, non-English corpora, independently used legacy encodings, or exact search/index/copy/paste/round-trip cases. Preserve Equalizer APO, Web Audio, FFmpeg, accessibility prose, icon namespaces, and parser-fix evidence as adverse alternatives rather than searching only for confirming examples.

### P0: Continue the independent interchange-failure casebook

DA-016 and DA-024 establish bounded friction but not encoding need. Low shelf alone meets the project's recurrence rule; high shelf remains below it, high-pass/low-pass/band-pass have isolated cases, and Band-stop has zero accepted compact-glyph communication failures. Continue collecting exact lost distinctions, but require each case to state whether ordinary prose, an accessible name, a structured ID, a protocol mapping, a parser fix, or a named icon asset solved it adequately. Project-authored examples remain separate from independent demand evidence.

### P1: Repertoire-boundary and stability dossier

Turn the historical, vendor, education, and community corpus into a decade-spanning per-concept matrix of identity, terminology, representation class, and variation. The goal is not to average vendor artwork into a new design. It is to determine whether a stable abstract character survives graphical variation and whether the six-item boundary is defensible.

### P1: Evidence-figure rights inventory

Identify the strongest independently authored usage figures now, but do not place them in a proposal. Record ownership, publication context, exact crop, proposed caption, what criterion each figure supports, and the candidate legal or permission path. Escalate only the actual licensing/legal choices for Human Review.

### P1: Complete the technical character model

The provisional property and no-PUA font-proof strategy is complete. Run its property simulations, then prepare nonbinding candidate names, cross-references, ordering, block analogues, and minimum rendering distinctions. This can expose hidden semantic problems cheaply, but it should not be mistaken for closing the usage gap.

### P2: Font proof of implementation

After the property and glyph-variation model stabilizes, build a private proof font with explicit noncanonical mapping and automated metadata/rendering checks. It can validate production feasibility and proposal-chart rendering. It cannot create evidence that the community already uses the characters.

### P2: Full prior-document search and submission skeleton

Expand the bounded pipeline/non-approval check into the UTC and WG2 document registers, then maintain a proposal skeleton that points to evidence artifacts without presenting itself as a submission. Assemble the self-contained PDF only after the P0 evidence supports eligibility.

## Decision rule

Keep Unicode at `HOLD` until the evidence supports all three current SEW criteria for every proposed character or supports a principled smaller repertoire. In particular, do not advance because the technical worksheet, font, or proposal layout is complete.

A reasonable internal `GO` threshold for preparing the complete external-submission package is:

1. independent character-like usage by a community and compelling public plain-text interchange evidence for each included item;
2. a stable and defensible repertoire with resolved semantic boundaries;
3. documented existing-character, sequence, pipeline, prior-document, and confusable review;
4. proposal-ready names, properties, behavior, ordering, and rendering model;
5. a suitably licensed font and rights-reviewed self-contained evidence figures; and
6. independent adverse review finding no material overclaim.

Review and authorization of that complete package, its legal representations, and any submission remain Human Review gates.

## Agent Report - 2026-08-31T20:15:37-07:00

- Report status: completed; exact-head re-review approved after corrections
- Scope: mapped current authoritative Unicode non-emoji proposal requirements and the six-concept repository's remaining gaps without changing the external position.
- Exact refreshed main base: `415eb56e4ecbb87092eb4566d46d8a3941b41235`
- Primary guidance: EV-110 through EV-118, all official Unicode or SEW sources with timestamped captures; EV-110 uses metadata-only capture because its dynamic response bytes were not reproducible.
- Project evidence reviewed: all six registry records; current assessments and evidence synthesis; EV-100/EV-101 and DA-012 target-use findings; the merged band-pass readiness package; D-001 through D-022; DA-001 through DA-010; artwork metadata, provenance policy, licensing policy, study locks, offline-harness result, and the merged character-properties/font-proof strategy.
- Result: the controlling blockers are independent character usage, public plain-text interchange need, and community-level stability. Property and no-PUA font-proof strategies are partially prepared internally; proposal-ready names, test results, font artifact and license, evidence figures, ISO/IEC form, and document construction remain open downstream technical or legal work.
- Guardrails: no outreach, submission, participant action, proposal status, record status, identifier, alias, artwork, code-point, property, font, licensing, or external-position change.
- Limitations: the bounded pipeline and non-approval term searches do not cover every UTC/WG2 document or alternate name; restricted standards databases were not reopened; no legal conclusion is offered about third-party evidence figures or AI-assisted authorship under the Unicode CLA.
- Validation: exact-current-main `npm test` passed 112/112 tests; registry validation, Agent Report hygiene, and `git diff --check` passed. GitHub Actions remain pending.
- Independent review: the post-rebase adverse review required sequential version provenance, reconciliation with EV-100/EV-101 and DA-012, and removal of a stale technical-model queue item. Exact substantive head `cce30890e8da55b735899d9a273fabce9929607e` passed re-review after all corrections, with only this approval-report delta requested for confirmation.

## Agent Report - 2026-09-01T00:53:06-07:00

- Report status: proposal blocker map refreshed for exact-head adverse review through DA-024.
- Scope: incorporate the direct-versus-adverse portable-text corpus without changing proposal posture, live records, scores, semantics, artwork, font, PUA, or external authority.
- Result: independent character use and public plain-text encoding need remain open for all six records. Low shelf has the strongest public friction; Band-stop has the weakest compact-glyph need evidence.
- Counterevidence: documented ASCII protocols, structured enums, accessible prose, word-based commands, parser- and locale-specific defects, and derivative named icon assets remain viable alternatives or narrower causal explanations.
- Hypothesis boundary: one Unicode scalar is not necessarily one LLM token; any token-efficiency argument requires model- and tokenizer-specific testing and cannot substitute for independent community character use.
- Unicode status: `HOLD`; no proposal, outreach, external submission, code point, font publication, or artwork acceptance is authorized or implied.
- Validation: `npm test` passed 118/118 with registry/evidence 0.3.4 and derived analyses 0.2.19; registered hashes, documentation drift, Agent Report hygiene, source re-fetches, protected paths, and `git diff --check` passed before the exact-head approval recorded below.
- Independent review: `APPROVE` with no blocker at exact substantive head `826746603eaceb0b3c03145e9de997787b67078c`; the approval-only annotation changes no reviewed blocker or external posture.

## Agent Report - 2026-09-01T01:55:03-07:00

- Report status: blocker map synchronized to assessment artifact 0.3.5 for exact-head adverse review.
- Scope: record Band-stop 18/20 and the two shelf 19/20 dispositions without changing any proposal-specific eligibility conclusion.
- Result: independent character use, character-specific public plain-text need, community support, registry acceptance, and external authorization remain open for all six records.
- Boundary: Band-stop score movement does not create portable glyph use; shelf terminology resolution does not establish isolated recognition; registry scores do not establish Unicode eligibility.
- Unicode status: `HOLD`; no proposal, outreach, submission, code point, font publication, artwork acceptance, or external action is authorized.
- Validation: all 119 tests, registered-digest validation, documentation drift, Agent Report hygiene, immutable-predecessor comparison, and protected-tree checks pass. Exact-head adverse review remains pending.
