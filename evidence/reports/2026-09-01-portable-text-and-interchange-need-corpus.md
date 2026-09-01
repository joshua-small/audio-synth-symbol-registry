# Six-concept portable-text use and interchange-need corpus

## Agent Report - 2026-09-01T00:53:06-07:00

### Decision question

Does independently published public evidence show that any of the six active filter-response concepts is already used as a portable character, or that an encoded response glyph is necessary because ordinary prose, abbreviations, structured identifiers, images, accessibility text, or machine formats fail?

This dossier extends DA-014 and DA-016 with an adverse-evidence lane. It distinguishes a semantic character, a drawn glyph, an icon-font slot, an image, an ASCII token, and a structured identifier. Project-authored demonstrations, the private proof font, and the project owner's first-person use case do not count as independent public evidence.

The result is negative for portable response-glyph use across all six records. Public implementation and communication friction is real, especially for low shelf, but the reviewed corpus also contains successful ordinary text, abbreviations, enums, and structured identifiers. The evidence therefore supports continued registry, accessibility, icon-namespace, and interchange work while preserving Unicode `HOLD`.

Validation on the exact serialized local tree passed `npm test` 118/118, including six records, eight assessment sets, 124 evidence sources at registry 0.3.4, all registered source and derived-artifact digests, documentation drift, private font/study boundaries, and Agent Report hygiene. JSON parsing, source digest re-fetches, straight-quote enforcement, protected-path review, and `git diff --check` also passed. This validation preceded the exact-head approval recorded below.

Independent review: `APPROVE` with no blocker at exact substantive head `826746603eaceb0b3c03145e9de997787b67078c`. The reviewer accepted the direct/adverse classifications, source and temporal bounds, FontAudio/Iconify derivative collapse, Notch non-transfer, LLM tokenization caveat, record-level gap findings, negative searches, protected no-change boundaries, and Unicode `HOLD`. This approval-only annotation changes no reviewed substance.

### Method, independence, and anti-bias controls

The bounded search covered four artifact classes:

1. public source code, custom fonts, icon packages, and machine-readable names;
2. vendor documentation, engineering references, education, and accessibility documentation;
3. community exchanges, trade media, and image-identification cases; and
4. accessibility, import/export, copy/paste, search, indexing, parsing, and machine-interchange failures.

Each observation was assigned one of these dispositions:

| Disposition | Meaning in this dossier |
| --- | --- |
| Direct portable use | A target response form behaves as a portable text character across unrelated systems or communities. |
| Direct need/friction | A public artifact shows an exact concept becoming unavailable, ambiguous, image-dependent, or materially indirect in communication or interchange. |
| Character-like but local | A custom font, PUA mapping, ordinary-slot remapping, icon name, or UI asset uses character-like machinery but requires project-local context. |
| Adverse alternative | Ordinary prose, an abbreviation, enum, structured ID, accessible label, or other non-glyph mechanism successfully carries the identity. |
| Adverse causation | A failure is real, but its demonstrated cause is parser coverage, locale handling, documentation, UI labeling, or another defect that encoding a glyph would not inherently repair. |
| Excluded | A project-authored demonstration, general graph, circuit symbol, Notch-only case, inaccessible result, duplicate lineage, or result without an exact target mapping. |

Repeated artifacts from one publisher or upstream icon set are collapsed. FontAudio and Iconify are one derivative lineage, and framework/catalog adapters carrying the same Iconify names are not independent implementations. One VoiceMeeter discussion counts once even though it names five active concepts. Notch-only results do not transfer to broad Band-stop without the DA-020 source-local mapping or contrast.

The corpus is purposive, English-language, and not market-weighted. Negative searches are bounded absence findings, not proof that no example exists anywhere.

## Reproducible query log

Searches were run on 2026-08-31 and 2026-09-01 PDT. Candidate sources were accepted only when the exact public artifact and relevant locator could be reinspected.

| Query lane | Representative queries and locators | Result |
| --- | --- | --- |
| Portable shape characters | `audio filter symbol ASCII high pass low pass`; `bandpass intersection symbol audio`; `bandstop union symbol audio`; `low shelf high shelf character` | No target response form used as a portable character and no stable cross-community ASCII response-curve convention recovered. Mathematical intersection/union and arc-like results were semantic or visual near misses. |
| Slash and knee approximations | `high pass slash backslash symbol`; `low pass ASCII knee`; `filter curve text slash`; `LPF HPF slash mnemonic` | Improvised slash/backslash explanations and circuit/block diagrams appeared, but no stable, six-concept, cross-community notation was established. |
| Fonts, PUA, and local slots | `audio filter icon font highpass lowpass`; `low shelf high shelf PUA`; `filter-bandreject icon`; exact FontAudio and `fad:` names | Ardour and DSSSP use local font machinery. FontAudio is distributed through Iconify and derivative catalogs. No shared PUA or ordinary-slot mapping was found across independent projects. |
| Copy/paste, search, and indexing | `filter icon copy paste audio`; `high pass symbol unicode`; issue searches for filter icon search, labels, accessibility, and serialization | No public case showed a target glyph copied between unrelated text systems, indexed as a character, or round-tripped by a shared encoding. |
| Machine interchange | Equalizer APO filter format; Web Audio `BiquadFilterType`; FFmpeg audio filter names; EasyEffects APO import issues | ASCII tokens and structured names carry all six semantics in multiple systems. Two EasyEffects failures are real, but one is unsupported filter-type import and one is numeric-locale parsing. |
| Accessibility | `EQ filter accessibility highpass lowpass shelf notch`; REAPER accessibility documentation; issue searches for unlabeled filter icons | Accessible prose names all six response classes only if source-local Notch is admitted for broad rejection; the source otherwise supports five exact registry names plus Notch. No evidence showed that a response glyph alone improved assistive output. |
| Communities and media | `what does this EQ symbol mean`; `provide labels EQ Types`; `low shelf symbol manual`; `band pass symbol forum`; `band stop draw filter` | Image-dependent and mislabeled cases were recovered for five concepts, with strongest recurrence for low shelf. No qualifying Band-stop drawing-required case was found. |
| LLM and agent communication | `audio filter glyph LLM token`; `AI prompt high pass symbol`; `agent audio filter character` | No independently published demand or established target-glyph convention was recovered. Project-authored prompt demonstrations were excluded. |

## Public code, fonts, and asset namespaces

### Local font machinery

- Ardour EV-120 maps all six active concepts, plus a distinct Notch, to ordinary ASCII slots in its bundled Toolkit font. The raw letters retain their ordinary meanings outside that stylesheet and font.
- DSSSP EV-101 supplies high-pass, low-pass, and band-pass components through a bundled PUA font. Its separate Notch component does not transfer to Band-stop.
- FontAudio EV-025 supplies audio UI icons. Iconify EV-122 republishes that same upstream set as versioned machine-readable JSON names including `filter-highpass`, `filter-lowpass`, `filter-bandpass`, `filter-shelving-hi`, `filter-shelving-lo`, and `filter-notch`.

These are direct evidence that software authors find compact filter assets useful. They are not independent portable character use. Ardour's ordinary slots and DSSSP's PUA are incompatible local mappings, while FontAudio/Iconify is an asset-name route rather than text encoding.

### FontAudio/Iconify derivative route

The FontAudio to Iconify route is a credible synergistic implementation path. A semantic name such as `fad:filter-highpass` can be resolved by Iconify-aware tools and transformed into framework-specific assets. Exact-ID search results inspected in this spike were derivative catalogs or adapters carrying the same upstream names, not unrelated communities independently using the response shape as text.

This route supports registry-to-icon namespace alignment, adapters, and open-source asset collaboration. It weakens any claim that every useful cross-tool symbol requires a Unicode scalar because named icon assets already offer one non-text interoperability mechanism. It does not settle licensing, artwork provenance, accessibility, offline availability, copy/paste behavior, or plain-text interchange.

## Successful ordinary text and structured interchange

### Equalizer APO

Equalizer APO EV-205 documents a public text protocol using `LP`/`LPQ`, `HP`/`HPQ`, `BP`, `LS`/`LSC`, `HS`/`HSC`, and `NO`. The table directly maps those tokens to Low-pass, High-pass, Band-pass, Low-shelf, High-shelf, and Notch descriptions.

This is adverse evidence that short ASCII can carry the semantics successfully in a documented protocol. It is also direct evidence that abbreviations require a protocol: the same page warns that Equalizer APO's real `BP` differs from the DCX2496 `BP`, which denotes a peaking filter. `NO` is Notch-only and does not establish broad Band-stop interchange.

### Web Audio and FFmpeg

Web Audio EV-150 uses `lowpass`, `highpass`, `bandpass`, `lowshelf`, `highshelf`, and `notch` as normative enum values, with its own explicit Notch/band-stop mapping. FFmpeg EV-209 uses word-based filter names including `highpass`, `lowpass`, `bandpass`, `bandreject`, `asuperpass`, `asuperstop`, `lowshelf`, and `highshelf` in immutable documentation.

Together these independently maintained systems show successful ordinary-text machine identities for all six concepts. Their vocabularies are not interchangeable without a mapping layer: Web Audio uses `notch` for its rejected-band type, FFmpeg provides broad `bandreject` and `asuperstop`, and Equalizer APO documents only `NO` for Notch. This favors explicit namespace and protocol mappings rather than assuming one universal abbreviation.

## Accessibility and machine-failure counterevidence

### Accessible prose

The REAPER Accessibility Wiki EV-208 documents the ReaEQ Type control in ordinary text. It explains Low shelf, High shelf, Low pass, High pass, Notch, and Band Pass using affected or passing frequency regions. This is adverse evidence that prose can make a graphical control available to screen-reader users without requiring the response shape itself to be voiced or encoded.

The exact broad Band-stop record is not silently credited: the page says Notch, and DA-020 requires a source-local mapping or contrast before Notch-only evidence transfers. The accessibility success covers five exact record names and a separate Notch concept.

### Semantic round-trip loss

EasyEffects issue 1283, EV-206, demonstrates real import loss. A public Equalizer APO preset contains `LS` and `HS`; EasyEffects 6.1.5 imports both as `PK` and resets Q to zero. The expected behavior is preservation of the declared filter type and Q.

This is direct machine-interchange friction for both shelves, but adverse to glyph causation. The source format already carries the identities in portable ASCII. The demonstrated defect is missing or incorrect importer support for those tokens. Encoding a response glyph would not inherently repair a parser that does not implement the source type.

EasyEffects issue 1479, EV-207, demonstrates a second real round-trip failure: decimal values in an APO text preset are truncated under a `pt-BR` numeric locale. The preset includes `LS` and `HS`, but the lost distinction is numeric precision, not filter identity. This case is retained as adverse causation and is not counted as character need for any record.

## Community, documentation, and image substitution

The strongest positive need evidence remains communication friction already recorded in the ledger:

- EV-021: an audio user supplies an image and asks what a high-pass symbol means.
- EV-023: a production user confuses low-pass and high-pass terminology; replies include an improvised slash/backslash knee mnemonic. This is useful explanation, not a stable portable notation.
- EV-121: an image-only VoiceMeeter request receives a numbered prose key for high-pass, low-pass, band-pass, low shelf, and high shelf. The successful answer is both direct friction and adverse prose evidence.
- EV-140: missing shelf labels require cross-product visual comparison for low shelf and high shelf.
- EV-141: a current vendor manual mislabels low-shelf instructions using high-shelf terms.

EV-022 remains too nonspecific to count for an exact record. General response plots, circuit diagrams, block diagrams, and images carrying parameters beyond the six semantic identities were excluded. The low-shelf casebook threshold remains the only threshold-positive public friction result; high shelf remains below it, high-pass/low-pass/band-pass have isolated cases, and Band-stop has zero accepted drawing-required or label-failure cases.

## Record-by-record gap assessment

| Record | Direct friction or character-like implementation | Successful text or adverse evidence | Current portable-text finding | What would materially change the finding |
| --- | --- | --- | --- | --- |
| High-pass | EV-021, EV-023, EV-121; Ardour EV-120; DSSSP EV-101 | `HP`, `HPQ`, `HPF`, `highpass`, bounded `Low Cut`, accessible prose | No portable target glyph found. Image identification and naming confusion exist, while ordinary text succeeds in documented systems. | Independent inline target-glyph use or repeated cases where prose/IDs cannot preserve the identity across systems. |
| Low-pass | EV-023, EV-121; Ardour EV-120; DSSSP EV-101 | `LP`, `LPQ`, `LPF`, `lowpass`, bounded `High Cut`, accessible prose | No portable target glyph found. One image-label case and naming confusion do not establish encoding need. | Independent inline use, shared legacy mapping, or irreducible cross-system failure tied to the missing character. |
| Band-pass | EV-121; Ardour EV-120; DSSSP EV-101 | `BP`, `BPF`, `bandpass`, accessible prose; Equalizer APO's DCX2496 warning shows context dependence | No portable target glyph found. `BP` is compact but protocol-dependent. | More independent communication failures or portable glyph use with stable meaning across protocols. |
| Band-stop | Ardour EV-120 and the three product-local target renders organized by DA-023 | `BSF`, `bandreject`, `asuperstop`, contextual `BR`; Web Audio source-local Notch mapping | No portable target glyph and zero accepted compact-glyph communication failures. This is the weakest need record. | Broad-class inline glyph use or independent failures that do not rely on Notch-only transfer. |
| Low shelf | EV-121, EV-140, EV-141; Ardour EV-120; EasyEffects EV-206 | `LS`, `LSC`, `lowshelf`, `low shelving filter`, accessible prose; EV-206 already contains portable `LS` | No portable target glyph found, but this is the strongest public-friction record. Import loss is parser-caused, not character-caused. | Independent inline glyph use, repeated cross-system failures despite correct prose/IDs, or accessibility/search evidence that a character uniquely repairs. |
| High shelf | EV-121, EV-140; Ardour EV-120; EasyEffects EV-206 | `HS`, `HSC`, `highshelf`, `high shelving filter`, accessible prose; EV-206 already contains portable `HS` | No portable target glyph found. Multiple image-label cases remain below the casebook recurrence threshold. | A third independent qualifying failure plus evidence that existing names/IDs do not solve the exchange, or actual portable glyph use. |

## LLM and tokenization caveat

The hypothesis that one encoded scalar would make human-agent communication more token-light is plausible and testable, but it is not established by this corpus. Unicode scalar count, displayed glyph count, UTF encoding length, and model token count are different measurements. A single scalar can tokenize into multiple model tokens, while frequent ASCII strings such as `HPF`, `lowpass`, or a canonical `asr:` ID may tokenize compactly and carry more explicit semantics.

Any later claim should name the model and tokenizer version, compare the six candidate forms with canonical names, abbreviations, and registry IDs, test ambiguity and task accuracy rather than token count alone, and preserve version drift. Project-authored LLM demonstrations would remain implementation research, not independent community character use.

## Independence and temporal breadth

The public corpus spans several artifact eras and failure classes:

| Period | Representative independent group | Contribution |
| --- | --- | --- |
| 2005-2007 | KVR and Sound On Sound | Ordinary audio prose and contextual abbreviations for Band-stop/Band-reject. |
| 2012-2013 | public circuit and block-diagram discussions inspected by earlier spikes | ASCII diagrams exist but describe circuits or full graphs rather than a stable target-character convention; excluded. |
| 2019 | Equalizer APO wiki revision | Documented ASCII protocol for five exact records plus Notch, with an explicit `BP` context warning. |
| 2020-2021 | EV-021, EV-140, EasyEffects issue 1283 | Image identification, missing documentation, and semantic importer loss. |
| 2022-2023 | EasyEffects issue 1479; REAPER Accessibility Wiki revision 5 | Locale parsing failure and successful accessible prose. |
| 2024-2025 | Web Audio pinned source; Iconify package; EV-121 | Structured enums, derivative asset namespace, and an image-only family-label request. |
| 2026 | Ardour pinned font; FFmpeg pinned documentation; EV-141 | Local six-family font machinery, word-based machine names, and a vendor mislabeling case. |

FontAudio and Iconify count as one lineage. KVR pages count as one community publisher, Sound On Sound articles as one trade publisher, and the VoiceMeeter exchange as one discussion across five concepts. Project reports do not multiply their input sources.

## Capture commitments

No source bytes, issue bodies, font data, icons, graphs, or vendor artwork are committed. Digests bind the exact public responses inspected on 2026-09-01 PDT.

| Evidence | Capture mode and exact locator | Accessed at | Bytes | SHA-256 | Limitation |
| --- | --- | --- | ---: | --- | --- |
| EV-205 | Equalizer APO SourceForge REST JSON; Filter command table and compatibility warning | `2026-09-01T00:52:43-07:00` | 23987 | `abb93da7fe8551b4919954b5fe6c48397cd2067fda84f6ff9c09a657045a8fa3` | Mutable wiki response; table is protocol-local; `NO` is Notch-only. |
| EV-206 | GitHub issue API JSON for EasyEffects #1283 | `2026-09-01T00:52:49-07:00` | 5429 | `08582cdfec101e8f53da31707e8a188947ca10008023d6320bc91c4de53b7ba1` | Mutable issue; reporter-supplied reproduction; no independent verification of every environment detail. |
| EV-207 | GitHub issue API JSON for EasyEffects #1479 | `2026-09-01T00:52:55-07:00` | 17067 | `7f9c5a2e92af72d20a59b754dfe00eedf509b78dcd565c15b4b3094707fbb1e4` | Mutable issue; numeric-locale loss is not a glyph-identity failure. |
| EV-208 | MediaWiki API JSON, ReaEffects_guide revision 5 | `2026-09-01T00:53:00-07:00` | 85998 | `a7aae2670640cfd16edc8e969f54fe2cb3235b7dc53a1ee03fa5d66e7d703d3a` | Community accessibility documentation; Notch does not automatically transfer to broad Band-stop. |
| EV-209 | FFmpeg `doc/filters.texi` at commit `b1f564bda248dbe8ac37cb743966fdd7ee4b490c` | `2026-09-01T00:53:06-07:00` | 961464 | `d9a184d6f9ee7e3563dfa5271afb1251d3871ffddbc96b7f594fae3a6935defc` | Immutable source; filter names are implementation commands, not portable glyphs. Same source bytes as EV-193 and therefore one FFmpeg source lineage. |

Existing immutable captures remain controlling for Ardour EV-120 (`2263a00e221e3fd64cf800495b03451a5d916ca05fbdf59fa594235a84a993d3`), Iconify EV-122 (`57c81970a54f3f0a64bc9fea5921cf7ca98b965d7a1d9ecef585f8bfbe23e05e`), Web Audio EV-150 (`81e7d84df0623c7d94a86d4ae03c2641349f1c487d809a7f236abe1f0aab7670`), and the FFmpeg bytes already cited by EV-193. Repetition here aids audit and creates no new independent source.

## Negative result and disposition

The search found no:

- independently used portable target response glyph for any of the six records;
- cross-system copy/paste exchange in which the target glyph retained its meaning;
- shared PUA, local-slot, or custom-font mapping across independent publishers;
- stable cross-community ASCII response-curve convention spanning the repertoire;
- independently published LLM or agent demand for the target glyphs;
- accessibility failure uniquely repaired by encoding the response form; or
- broad Band-stop drawing-required communication case.

The strongest adverse interpretation is that the observed cases are currently better addressed by correct labels, accessible names, documentation, protocol mappings, parser support, locale-safe serialization, canonical registry IDs, or named icon assets. That interpretation is compatible with every accepted case and must remain visible.

The dossier changes no record, canonical name, alias, related term, semantic definition, question, fallback, speech label, assessment, score, status, artwork, geometry, schema, tooling, font, PUA, code point, release, outreach, or external posture. No source bytes or third-party artwork are added. Unicode remains `HOLD`; no proposal or submission is authorized or implied.
