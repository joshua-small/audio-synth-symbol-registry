# Band-stop and Notch Adverse Boundary Dossier

## Decision target

This bounded pass tests whether the remaining Band-stop/Notch ambiguity is an unstable definition of `asr:filter.band-stop`, or stable terminology polysemy that can be contained by an explicit evidence rule. It also identifies which of the record's 15/20 readiness gaps this evidence can and cannot close.

This report makes no semantic-field, alias, identifier, status, artwork, assessment, schema, study, or Unicode change. `Notch`-only evidence remains excluded unless a source explicitly equates or distinguishes it in a way relevant to the broad Band-stop concept.

## Result

The evidence does not support either universal claim:

- `Notch` is always an exact synonym for `Band-stop`; or
- `Notch` always begins at one portable numeric Q or bandwidth threshold.

It does support a stable interoperable rule:

1. `Band-stop`/`Band-reject` names the broad rejected-band response class.
2. `Notch` commonly names a narrow or high-Q member of that class.
3. Some authoritative standards, products, APIs, and teaching materials deliberately use `Notch` for the broad class or use the names interchangeably.
4. Therefore `Notch` is a context-dependent related term, not an unconditional exact alias in this registry.
5. A `Notch`-only source does not count for Band-stop unless that source itself explicitly maps or contrasts the terms. When it does, only the mapped or contrasted claim transfers; unrelated Notch glyph or usage evidence still does not.

The contradiction is in naming practice, not in the broad Band-stop semantic nucleus. A later mechanical reassessment can defensibly raise Band-stop semantic stability from 2 to 3 and close the material boundary blocker by citing this controlled-polysemy rule. That reassessment should preserve the current canonical name, related-term treatment, and Notch exclusion. It should not add `Notch` as an alias or create a Notch record without separate scope authorization.

## Evidence matrix

| Source | Definitions and labels | Width/Q treatment | Direct implementation or use | Adverse implication |
| --- | --- | --- | --- | --- |
| SciPy `iirnotch` (EV-180) | Explicitly defines Notch as a narrow-band, high-Q Band-stop | `Q = w0 / bw`, with bandwidth measured at -3 dB | Dedicated center-frequency-plus-Q constructor | Strong subtype evidence, but no universal threshold |
| SciPy `butter` (EV-181) | Exposes a separately named `bandstop` design | Two critical edges define the rejected range | General Butterworth Band-stop constructor | Concrete implementation distinction from `iirnotch` |
| Analog Devices university lab (EV-182) | Broad Band-stop/Band-reject; narrow-band Band-stop called Notch | Shows Q controlling width and discusses Q below/above 1 in the lab circuit | Designed second-order hardware lab | The Q examples are circuit-context guidance, not a cross-domain naming law |
| Harvey Mudd College Twin-T lecture (EV-183) | Calls one Twin-T response both Band-stop and Notch | Calculates Q = 0.25 and a broad bandwidth | Education implementation | Directly defeats any universal claim that the word Notch requires high Q |
| Audacity glossary (EV-184) | Broad Band-stop/Band-rejection; Notch is narrow/high-Q Band-stop; finite-depth Band-cut is separately described | Relative narrowness and high Q, no numeric boundary | User-facing project glossary | Supports a broad canonical record and warns against absorbing ordinary finite-depth bell cuts |
| Audacity user discussion (EV-185) | Users distinguish a too-narrow Notch effect from a broader Band Stop plug-in | Operational width difference motivates the request | Real audio-user workflow | Shows practical naming friction; it is not engineering authority |
| Adobe Audition documentation (EV-186) | `Band Stop`, also known as Notch | Requires two cutoff points | Current DAW effect documentation | Authoritative exact-alias/product-use counterevidence |
| Native Instruments education (EV-187) | Notch is similar to Band-stop but precisely targets one frequency | Qualitative narrow targeting | Producer/mix-engineer education | Supports practitioner-facing subtype usage, not a numeric threshold |
| ITU-R RS.2184 (EV-188) | Uses `Notch` for an operational interference-removal filter and discusses earlier hardware Band-stop filters | Specifies width for the implementation and conditions where a small width is useful | Formal telecom deployment report | Width is application-specified; it does not define a universal lexical boundary |
| MathWorks `bandstop` (EV-189) | General Band-stop operation | Two-element stopband ranges, configurable attenuation and steepness | General signal-processing implementation | Demonstrates broad rejected ranges outside a specialized Notch constructor |

Existing EV-026 through EV-032, EV-120, EV-130, EV-150, and EV-151 remain controlling counterevidence. In particular, the W3C Web Audio API explicitly uses `notch` as also known as Band-stop/Band-rejection, while Ardour independently implements Band Reject and Notch as separate members. Those choices can coexist because they are implementation-local taxonomies.

## Boundary variables

The sources repeatedly require more information than a name or a bare axis-less curve can carry:

- lower and upper stopband edges, or center frequency plus bandwidth;
- the attenuation threshold used to measure bandwidth;
- Q convention and filter order;
- stopband attenuation or notch depth;
- whether the term names a broad family, a narrow subtype, a response minimum, or a product/API mode.

No reviewed authoritative source supplies a cross-domain Q, octave-width, hertz-width, or normalized-width threshold that converts every Band-stop into a Notch. Relative terms such as `narrow`, `precise`, and `high Q` are common but not interoperable discriminants by themselves.

## Direct answer to the 15/20 gaps

### Semantic stability: recommend 2 -> 3 in a separate reassessment

The broad rejected-band nucleus is stable, and the existing exclusion rule prevents the unstable `Notch` label from silently widening the record. The material question can be closed as controlled polysemy:

> Band-stop is the broad canonical concept. Notch is a commonly narrower but context-dependent related term. No universal numeric boundary is asserted, and Notch-only evidence is non-transferable without an explicit source-local mapping or contrast.

This is a stronger result than claiming a universal synonym or subtype rule because it survives the adverse sources.

### Text and accessibility: remain at 2

This dossier strengthens terminology handling but supplies no common portable glyph interchange, no independent audio-chat shorthand corpus, and no reason to replace the clear fallback `BSF` or speech label `Band-stop filter`. It cannot justify score 3.

### Visual convergence: remain at 2

The reviewed sources describe transfer functions, product labels, or axis-bearing responses. They do not supply a third independent, explicit, axis-less Band-stop/Band-reject target implementation. Notch-only drawings remain excluded. Apparent trough width cannot encode a portable Q threshold without axes or measurement conventions.

### Legal provenance and overlap: unchanged

Only source metadata, paraphrased observations, and response digests are retained. No third-party figure, graph, circuit, glyph, or source content is copied. The Unicode position remains HOLD, and this report makes no outreach or encoding claim.

## Exact recommendation

In the next mechanical Band-stop reassessment:

1. Raise semantic stability to 3 based on the stable broad-class definition plus the source-transfer rule above.
2. Mark the prior universal-equivalence question resolved by policy, not by asserting consensus terminology.
3. Close the material Notch hard blocker while preserving the contradiction as non-material counterevidence and a documented interoperability caution.
4. Keep `Notch` out of exact aliases and do not credit Notch-only implementations, glyphs, or usage.
5. Keep text/accessibility and visual convergence at 2 until their independent safeguards are met.
6. Recalculate eligibility mechanically; do not infer `registry-candidate`, artwork acceptance, or Unicode readiness from this dossier alone.

## Reproducible search and capture log

Accessed 2026-08-31 in America/Los_Angeles. Queries were bounded to sources that explicitly contained both the general rejected-band concept and a relevant Notch equation, distinction, or product mapping:

- `site:electropedia.org notch filter band-stop filter definition`
- `site:iec.ch notch filter band-stop definition Q bandwidth`
- `site:docs.scipy.org iirnotch narrow band frequency spectrum Q bandwidth`
- `site:mathworks.com notch filter bandstop wider narrow Q`
- `site:.edu "notch filter" "band-stop" narrow bandwidth Q`
- `site:audacityteam.org notch filter band-stop`
- `site:manual.audacityteam.org "Notch Filter" Q`
- `site:ardour.org manual "Band Reject" Notch`
- `site:csrc.nist.gov glossary notch filter band-stop`
- `site:nist.gov "notch filter" "band-stop filter"`
- `site:itu.int notch filter band-stop definition`
- `site:iso.org notch filter band-stop`
- `github "bandreject" icon filter font svg`
- `github "band-stop" icon svg equalizer filter`
- `"Band Reject" filter icon DAW manual`
- `"Band Stop" filter type icon audio plugin`

For EV-180 through EV-184 and EV-186 through EV-189, the ledger records exact locators and either response-byte SHA-256 commitments or explicit metadata-only limitations. EV-185 records the stable Discourse topic/post locator; its JSON endpoint returned an error during capture, so no digest is claimed. Dynamic HTML digests commit to the observed responses but do not prove future page contents or original publication dates.

## Exclusions and limitations

- Notch-only Ableton, Apple, JUCE, Web Audio, and other product evidence was not transferred as Band-stop target use unless the source explicitly supplied the relevant relationship.
- Search-result snippets, Wikipedia-derived repetition, generic icon marketplaces, social posts, and unlocated copied definitions were excluded from authoritative counts.
- The sample is purposive and English-language, not market-weighted.
- SciPy and MathWorks API distinctions do not prove that every implementation uses separate operations.
- HMC and W3C exact-alias treatments do not prove that practitioners universally understand the names as synonyms.
- Audacity community reports demonstrate operational confusion but cannot define engineering semantics.
- No user study, glyph-recognition result, or portable plain-text use is produced here.
- No standards body was contacted, and no external endorsement is implied.

## Agent Report - 2026-08-31T21:38:59-07:00

- Report status: completed
- Scope: bounded adverse review of the Band-stop/Notch boundary and the current Band-stop 15/20 gaps.
- Evidence: EV-180 through EV-189, checked against existing EV-026 through EV-032, EV-120, EV-130, EV-150, EV-151, DA-004, DA-015, and DA-017.
- Finding: the terminology is consistently polysemous rather than definitionally unbounded. The broad Band-stop/Band-reject nucleus and an explicit Notch source-transfer rule can support semantic score 3 in a separate reassessment.
- Preserved adverse evidence: narrow/high-Q subtype use, exact-synonym product/API use, a low-Q education counterexample, implementation-local separation, and practical user confusion.
- Remaining gaps: no portable/common text interchange and no third explicit broad axis-less target implementation.
- Validation: `npm test` passed 117/117 after validating six records, seven assessment sets, 92 evidence sources, every registered derived-artifact digest, documentation drift, and Agent Report hygiene. `git diff --check` and exact-head independent review are recorded before merge.
- Boundaries: no semantic, alias, identifier, assessment, status, artwork, study, Unicode, release, or outreach change; Notch-only evidence remains excluded.
