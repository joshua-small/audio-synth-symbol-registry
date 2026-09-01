# Six-concept repertoire stability and semantic-boundary dossier

Status as of 2026-08-31T20:21:44-07:00 on exact base `5a813917`. This dossier addresses the P1 repertoire-boundary and stability lane identified by DA-013. It evaluates the current six concepts only. It does not change a registry record, alias, semantic field, status, artwork, or the project's formal Unicode `HOLD`.

## Executive finding

The six concepts form a coherent and historically durable **audio-filter response repertoire** at the level of abstract function:

1. low frequencies pass;
2. high frequencies pass;
3. a middle band passes;
4. a middle band is rejected;
5. the low-frequency side receives shelf gain; and
6. the high-frequency side receives shelf gain.

That six-way organization survives major changes in product era, implementation technology, teaching context, terminology, and rendering treatment. Manufacturer documentation, education, engineering references, standards-adjacent APIs, and independent software implementations repeatedly preserve the same oppositions: low versus high side, pass versus reject, and pass/stop versus shelving response. The grouping is therefore defensible as a research repertoire rather than an arbitrary selection of six attractive graphics.

The stronger claim that all six have a single established drawing is **not supported**. Sources use axis-bearing graphs, contextual displays, small selectors, text labels, abbreviations, physical controls, API tokens, custom fonts, and no graphic at all. The stable object is presently the semantic response class, not one universal glyph contour. This distinction keeps the repertoire useful for registry and interoperability work while leaving the Unicode stability criterion materially open.

## Method and claim levels

This synthesis reuses the project's primary-source ledger and adds only two necessary immutable implementation references:

- EV-150 pins the Web Audio API editor source, which places all six semantic neighborhoods in one normative software taxonomy and explicitly separates shelf type from signed gain.
- EV-151 pins JUCE's independent DSP APIs, which preserve the same neighborhoods across implementation classes while using `notch` rather than `band-stop`.

Evidence is evaluated at four different levels:

| Level | Question | Finding |
| --- | --- | --- |
| Semantic identity | Does the response function recur independently? | Strong for all six. |
| Repertoire boundary | Do the six form a recognizable class with principled exclusions? | Strong enough for the current research repertoire; not proof of a complete universal audio-symbol set. |
| Representation class | Do sources repeatedly use curves, selectors, labels, or implementation tokens for the identity? | Strong, but treatment varies by context. |
| Standalone glyph identity | Is one context-free drawing independently stable across communities? | Not established, especially for shelves and broad band-stop. |

No source is counted as independent evidence twice merely because it appears in an earlier derived report. The matrix below cites original EV records; DA reports provide prior interpretation and provenance only.

## Cross-lane evidence matrix

| Lane | Pass/stop evidence | Shelf evidence | Stability contribution | Adverse finding |
| --- | --- | --- | --- | --- |
| Independent manufacturers, current | Ableton, FabFilter, Native Instruments, Yamaha, Apple, Steinberg, Moog, and Noise Engineering collectively document the four pass/reject categories through varying product families and terminology (EV-006-EV-013). Image-Line directly documents four compact axis-less pass/reject selectors in one product (EV-054, EV-100). | Ableton, Apple, FabFilter, Steinberg, Image-Line, Roland, and Universal Audio preserve low/high affected side with signed gain handled separately (EV-050-EV-056). | Independent products preserve the functional oppositions despite different controls and algorithms. | Terminology and drawings vary; many sources communicate with labels or contextual graphs rather than standalone shapes. |
| Decade-spanning primary sources | ARP 1971 establishes low-pass VCF material; 1987-1998 Roland manuals preserve low-pass/high-pass and later LPF/BPF/HPF screen treatments; Yamaha 2018 covers LPF/HPF/BPF/BEF (EV-014, EV-034-EV-036, EV-018). | A 1996 educational workflow and 1997 Mackie manual use low/high shelving with separate boost/cut; later sources preserve the pair (EV-060-EV-063). | The concepts persist from analog-instrument explanation through LCD workstations and software EQs. | There is no demonstrated unbroken lineage of identical axis-less forms. Early sources favor prose, controls, or axis-bearing response sketches. |
| Education and trade instruction | SFU and ICON Collective teach familiar response classes; historical and current vendor-education material uses graphs and names (EV-003, EV-013, EV-020). | University of Iowa, Mackie, Berklee, Indiana University, and Sound On Sound collectively preserve the low/high shelf pair. Iowa, Mackie, and Indiana explicitly separate polarity; Sound On Sound supplies the reorientation counterexample (EV-060-EV-064). | Educators treat the concepts as reusable response categories rather than product-specific features. | Captions, axes, numeric parameters, and prose commonly carry meaning; graphic self-sufficiency is not shown. |
| Engineering and terminology | Analog Devices, Texas Instruments, MathWorks, Apple, Moog, and practitioner discussion demonstrate both broad-family and narrow-subtype uses of `notch` (EV-026-EV-032, EV-012). | AES-adjacent material uses shelving terminology and parameters (EV-072). | Mathematical and engineering behavior remains stable even when labels are not. | No universal numeric boundary makes every notch exactly equivalent to every band-stop use. |
| Standards-adjacent implementations | IEC 60617's public preview names high-pass, low-pass, band-pass, and band-stop entries; Unicode/ISO overlap work finds no encoded equivalent (EV-039, EV-070-EV-073). | Web Audio supplies `lowshelf` and `highshelf` types with separate signed gain (EV-057, EV-150); IEC's reviewed public material supplies no shelf counterpart. | Formal or quasi-formal taxonomies preserve semantic categories independently of vendor UI. | IEC diagram symbols are not the audio community's adopted UI drawings; API terms are not glyph standards or character use. |
| Open-source implementations | DSSSP maps high-pass, low-pass, band-pass, and notch through a custom PUA font; JUCE distinguishes lowpass, bandpass, highpass, and notch APIs (EV-101, EV-151). | JUCE exposes low-pass shelf and high-pass shelf coefficient constructors with variable gain; DSSSP contains product-local shelf mappings whose internal naming is inconsistent (EV-101, EV-151). | Independent implementers need stable machine-addressable filter classes and sometimes build custom-font workarounds. | PUA and component-local mappings are not portable Unicode interchange. Internal names can drift even when behavior is stable. |

## Per-concept stability disposition

### `asr:filter.high-pass`

**Stable semantic nucleus:** frequencies above a cutoff pass while lower frequencies are attenuated. This is independently present in historical manuals, modern product documentation, education, Web Audio, and JUCE.

**Terminology boundary:** `high-pass` describes what passes. `low cut` describes what is removed. FabFilter and Noise Engineering use low-cut language for high-pass behavior (EV-007, EV-013), while many products prefer HP/HPF or the full high-pass name (EV-008-EV-013). The relationship is strong and common, but the corpus does not establish that every domain treats `LOW CUT` as an exact, unqualified character name. The current registry's conservative alias posture therefore remains justified.

**Form stability:** a rising response from attenuated lows to passing highs is recurrent in graphs and compact selectors. Axis presence, slope, resonance, pole count, dots, labels, and surrounding UI vary. The abstract direction is more stable than a specific stroke construction.

### `asr:filter.low-pass`

**Stable semantic nucleus:** frequencies below a cutoff pass while higher frequencies are attenuated. It has the longest directly sampled history in this corpus, from ARP-era VCF explanation through current software and standards-adjacent APIs.

**Terminology boundary:** `low-pass` describes what passes; `high cut` describes what is removed. Current products independently support the relationship, but LP/LPF remains more consistently machine- and product-addressable than the inverse cut phrase. As with high-pass, semantic relatedness is stronger than evidence for an unrestricted exact alias in every context.

**Form stability:** a descending response from passing lows to attenuated highs recurs, but axes, labels, resonance, slope, and selector framing are not invariant.

### `asr:filter.band-pass`

**Stable semantic nucleus:** a middle frequency region passes while lower and higher regions are attenuated. Modern vendors, 1990s workstation manuals, education, Web Audio, and JUCE all preserve it.

**Terminology boundary:** `band-pass`, `bandpass`, BP, and BPF are transparent orthographic or abbreviation variants in implementations. Bandwidth, order, and peak gain remain parameters, not separate response-class identities. JUCE explicitly notes an implementation-specific band-pass gain distinction (EV-151), which is useful counterevidence against treating one exact hump height or width as semantic.

**Form stability:** a centered raised/pass region is recurrent. Width, peak curvature, baseline, axes, and exact symmetry vary. Arc-like or intersection-like Unicode characters remain visual near misses rather than equivalents.

### `asr:filter.band-stop`

**Stable semantic nucleus:** frequencies outside a middle rejected region pass. IEC's public taxonomy, Yamaha's `Band-Eliminate`, Apple's band-reject wording, Moog's named notch mode, Web Audio's behavior, Image-Line's explicit `Band stop` menu, and engineering literature collectively preserve the broad response neighborhood while retaining the notch boundary below.

**Band-stop versus notch:** the evidence supports a one-way safe relationship, not universal identity:

- In engineering definitions, a notch is often a narrow or high-Q band-stop subtype (EV-026, EV-029).
- Other engineering and product sources use `notch`, `band-stop`, or `band reject` as alternate labels for the available rejected-band response (EV-027, EV-030, EV-100, EV-150).
- Some sources use `notch` for the deepest central feature or make the distinction context-dependent (EV-028, EV-031, EV-032).
- No reviewed source supplies a universal Q or bandwidth threshold.

The coherent repertoire therefore needs one broad rejected-band member, but current evidence does not justify claiming that the member is universally named or drawn as `notch`. Keeping `notch filter` as a related term rather than an exact alias remains the least lossy boundary.

**Form stability:** a central rejection valley between passing sides is recurrent. Apparent width can prime `notch` versus broad `band-stop` readings. Exact width must remain glyphic variation or parameter state unless future evidence establishes a portable boundary.

### `asr:filter.low-shelf`

**Stable semantic nucleus:** the low-frequency side is the side affected by a shelf gain relative to the high-frequency side. Across product, education, engineering, Web Audio, and JUCE evidence, the same type supports positive or negative gain.

**Shelf polarity boundary:** boost versus cut is not part of the unqualified type identity. Iowa supplies a separate Boost/Cut setting; Mackie supplies signed gain; Indiana teaches both signs; Steinberg can invert gain without changing type; Web Audio and JUCE expose gain as a separate parameter (EV-060, EV-061, EV-063, EV-053, EV-150, EV-151). A concrete response graph may show polarity, but that graph is an instantiated state rather than the entire semantic type.

**Form stability:** product selectors and graph treatments establish compact low-side shelf communication, but the corpus does not establish one context-free fork. The project's two-prong fork is original study geometry representing sign-agnostic affected side. It is not evidence that the community already standardized that form.

### `asr:filter.high-shelf`

**Stable semantic nucleus:** the high-frequency side is the side affected by shelf gain relative to the low-frequency side. It mirrors low shelf in product controls, education, APIs, and implementation libraries.

**Shelf polarity boundary:** as for low shelf, boost and cut are separate state. Sound On Sound's observation that a low-frequency shelving boost can be re-described as a high-frequency cut under reorientation demonstrates why side and polarity must not be collapsed (EV-064).

**Form stability:** compact high-side selectors exist, but contextual curves, full words, `HI` controls, and API terms remain common alternatives. No universal two-prong contour is established.

## Why these six are coherent

The six share five properties that provide a defensible current boundary:

1. **Magnitude-response identity.** Each names a reusable class of frequency-magnitude behavior, rather than a parameter such as Q, slope, resonance, cutoff frequency, or gain amount.
2. **Paired oppositions.** High-pass and low-pass exchange the passing side; band-pass and band-stop exchange pass and reject in the middle; low shelf and high shelf exchange the affected side.
3. **Independent recurrence.** Every class occurs outside this project in multiple manufacturers and at least one implementation, education, engineering, or standards-adjacent lane.
4. **Compact selection use.** Product UIs and custom-font implementations show practical value in addressing response classes compactly, even when they do not establish portable character use.
5. **Composable state.** Cutoff, order, Q, slope, signed shelf gain, and exact bandwidth can vary without requiring another class identity.

The boundary is intentionally not a claim that these are the only useful audio responses. Bell/peaking, all-pass, tilt, crossover, comb, resonance, and compound modes appear in the same ecosystems. They are excluded from the **current active repertoire** because they are not needed to close one of the three paired oppositions above and have not passed the project's activation gate. Their existence is counterevidence to any claim of universal completeness, but not to the internal coherence of the selected six.

## Representation variation that must remain non-semantic

| Variation | Disposition in this dossier |
| --- | --- |
| Visible axes or baseline | Contextual aid, not part of the abstract identity. |
| Exact slope, pole count, and transition curvature | Parameter or glyphic variation. |
| Resonant overshoot or undershoot | Parameter/implementation state. |
| Band width and apparent notch narrowness | Parameter; terminology may change with context. |
| Shelf boost versus cut orientation | Signed gain state, not shelf-type identity. |
| Stroke weight, corner radius, and optical compensation | Glyphic variation, subject to later artwork review. |
| Product-local labels, dots, band numbers, and control framing | Higher-level UI, not character identity. |
| Full graph versus compact silhouette versus API token | Representation class, not a change in underlying response semantics. |

## Adverse case

A skeptical reviewer can reasonably argue that the dossier demonstrates a stable **taxonomy**, not stable **characters**. That objection is correct as far as current evidence goes.

- Historical continuity is strongest for words, abbreviations, controls, and axis-bearing graphs.
- Current vendors vary both naming and presentation.
- IEC diagram entries are adjacent but do not establish the audio-community drawings under study.
- Web Audio and JUCE are software taxonomies, not glyph standards.
- DSSSP's custom-font PUA mapping proves an implementation workaround, but not interoperable public text usage.
- The two-prong shelf forks are project-authored abstractions and remain vulnerable to routing, angle, and mathematical readings.
- `notch` can be narrower than `band-stop`, and a drawing's width can change the reader's label.

Accordingly, this dossier closes the question "Is the current six-item research scope principled?" more strongly than it closes "Are six pre-existing character forms stable enough for Unicode?" The latter remains open.

## Disposition and next evidence

| Question | Disposition |
| --- | --- |
| Are the six semantic classes stable enough to retain as the active research repertoire? | Yes. |
| Are low/high cut safe to treat as exact universal aliases now? | No; retain as unresolved related terminology. |
| Is notch universally identical to band-stop? | No; retain notch as a related, commonly narrower or context-dependent term. |
| Do low/high shelf identities include boost or cut sign? | No; signed gain is separate state. |
| Does the evidence establish one universal standalone drawing for each class? | No. |
| Does this change any registry or Unicode status? | No. Unicode remains `HOLD`. |

Highest-value follow-on work remains the P0 character-use/interchange corpus and independent interchange-failure casebook. A later proposal-oriented synthesis may use this dossier to explain repertoire scope, but it must not present semantic stability as independently observed character use.

## Reproducibility and rights

EV-150 is pinned to Web Audio commit `bfc7143fcf798a5a0fc056a2e31f78f679e219ea` with SHA-256 `81e7d84df0623c7d94a86d4ae03c2641349f1c487d809a7f236abe1f0aab7670` for `index.bs`.

EV-151 is pinned to JUCE commit `7aae7d8e8deb8413bb01633d2795ef9974a181c5`. The two reviewed headers have individual SHA-256 digests recorded in the evidence entry and a deterministic concatenated digest `45d38cf49cc7dd2dab36b0c2b9a170220225dee28ecb072788cf00e6fa734e18`.

All other claims resolve to existing ledger entries and their exact locators. No third-party artwork, manual page, UI, source code, or specification diagram is copied, traced, or imported.

## Agent Report - 2026-08-31T20:21:44-07:00

- Report status: completed; independent adverse re-review approved.
- Exact base: `5a813917`.
- Scope: six-concept semantic stability, boundary, and repertoire-coherence synthesis under D-021.
- New primary evidence: EV-150 and EV-151 only; both are immutable Git sources with SHA-256 commitments.
- Result: all six semantic classes are independently durable and form a coherent paired response repertoire. Universal drawing identity, portable character use, and Unicode eligibility remain unestablished.
- Boundaries preserved: band-stop remains broader than or contextually related to notch; high-pass/low-cut and low-pass/high-cut relationships remain unresolved as exact aliases; shelf side remains independent of signed gain.
- Guardrails: no new active family, alias, semantic field, record status, artwork, proposal name, code point, external position, outreach, or submission change.
- Rights: no third-party graphic or source artifact is retained or redistributed.
- Validation: `npm test` passed 112/112 tests; validation reported six records, six assessment sets, and 75 evidence sources at registry 0.2.5; Agent Report hygiene and `git diff --check` passed.
- Independent review: REQUEST CHANGES on the first pass for two source-identity/rights errors, three source-fidelity overstatements, and stale current-status/report bookkeeping. All requested corrections were applied. Re-review APPROVED after independently reproducing EV-150, EV-151, DA-006, and DA-017 digests and rerunning the exact suite with no remaining blocker.
- Limitations: English-language purposive corpus; no market weighting; no product-build inspection; no font-by-font comparison; no participant recognition; no exhaustive standards-database search; taxonomy stability is not character-form stability.
