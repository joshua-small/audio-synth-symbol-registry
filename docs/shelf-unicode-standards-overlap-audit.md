# Low-shelf and high-shelf Unicode and standards overlap audit

Status as of 2026-08-30. This is a research-only overlap and confusability audit for the approved provisional `asr:filter.low-shelf` and `asr:filter.high-shelf` concepts. It does not change either record, select or accept artwork, authorize outreach, or state a project position to Unicode or any other standards body.

## Result

No Unicode 17.0 character was found with the semantics of an audio low-shelf or high-shelf filter. The exact word `SHELF` does occur in U+02FD MODIFIER LETTER SHELF and U+02FE MODIFIER LETTER OPEN SHELF, but those are phonetic modifier letters, not audio or filter symbols. Unicode contains fork-like, angle-like, OCR, and mathematical characters that can resemble parts of the project's smooth two-prong study topology. Their encoded identities are different and they are unsafe semantic substitutes.

No reviewed adjacent-standard source supplied a low-shelf or high-shelf standalone glyph equivalent. ISO/IEC 10646 shares the encoded-character repertoire with Unicode at synchronized version levels, so the Unicode repertoire audit is also relevant to UCS overlap. SMuFL's current canonical glyph-name metadata contains no `filter`, `shelf`, `equaliz`, or `frequency response` name or description. IEC 60617's public preview establishes four pass/stop filter titles but not shelf entries in the reviewed public material. An AES convention paper uses shelving-filter terminology in audio engineering, but its reviewed author-maintained material does not establish a canonical standalone glyph.

These are non-duplication findings, not evidence of encoding need or proposal readiness. The smooth two-prong fork remains original project study geometry. Its resemblance to routing, branching, mathematical, OCR, or bracket characters is a study risk, not standards support.

## Scope and method

The audit separated four questions:

1. Does Unicode encode the audio shelf semantics?
2. Which existing characters or sequences can be mistaken for the proposed two-prong topology?
3. Do adjacent standards or standards communities define a semantic or graphical equivalent?
4. Can an existing character or sequence safely serve as portable interchange?

The Unicode check used the final Unicode 17.0 NamesList and official code charts. The SMuFL check used the canonical `glyphnames.json` file at repository commit `14acb17a6a479036f38e337396ed605fc4197b23`. IEC, ISO/IEC, and AES conclusions are deliberately bounded to the public sources cited below; restricted standards text and subscriber-only databases were not treated as searched.

### Reproduction commands

```sh
curl -fsSLo NamesList-17.0.0.txt \
  https://www.unicode.org/Public/17.0.0/ucd/NamesList.txt

rg -ni 'low[- ]?shelf|high[- ]?shelf|shelving|shelf|equaliz|filter|frequency response' \
  NamesList-17.0.0.txt

rg -n '^(003C|003E|02FD|02FE|22D4|2282|2283|2442|2443|2ADA|2ADB|2ADC|2ADD|27E8|27E9|3008|3009)\b' \
  NamesList-17.0.0.txt

git clone --depth 1 https://github.com/w3c-cg/smufl.git smufl-audit
git -C smufl-audit rev-parse HEAD
jq -r 'to_entries[] | select(((.key + " " + (.value.description // "")) |
  test("filter|shelf|equaliz|frequency response"; "i"))) |
  [.key,.value.codepoint,.value.description] | @tsv' \
  smufl-audit/metadata/glyphnames.json
```

At the pinned SMuFL commit, the `jq` command produced no rows. Re-running against a later Unicode or SMuFL version is required before reusing that conclusion.

Primary sources:

- [Unicode 17.0 NamesList](https://www.unicode.org/Public/17.0.0/ucd/NamesList.txt)
- [Unicode 17.0 Spacing Modifier Letters chart](https://www.unicode.org/charts/PDF/U02B0.pdf)
- [Unicode 17.0 Mathematical Operators chart](https://www.unicode.org/charts/PDF/U2200.pdf)
- [Unicode 17.0 Control Pictures and Optical Character Recognition chart](https://www.unicode.org/charts/PDF/U2400.pdf)
- [Unicode 17.0 Supplemental Mathematical Operators chart](https://www.unicode.org/charts/PDF/U2A00.pdf)
- [Unicode Technical Standard #39](https://www.unicode.org/reports/tr39/)
- [Unicode relationship to ISO/IEC 10646](https://www.unicode.org/versions/Unicode16.0.0/core-spec/appendix-c/)
- [ISO/IEC 10646:2020 catalogue entry](https://www.iso.org/standard/76835.html)
- [SMuFL canonical glyph-name metadata](https://github.com/w3c-cg/smufl/blob/14acb17a6a479036f38e337396ed605fc4197b23/metadata/glyphnames.json)
- [IEC 60617 official database preview](https://webstore.iec.ch/en/iec_catalog/product/preview/?id=L3B1Yi9wZGYvcHJldmlldy9pbmZvX2llYzYwNjE3e2VkMS4wfWIucGRm)
- [AES Convention Paper 10339 accompanying repository](https://github.com/spatialaudio/aes148-shelving-filter)

## Semantic-equivalent search

| Concept | Unicode semantic equivalent | Portable text already available | Conclusion |
| --- | --- | --- | --- |
| `asr:filter.low-shelf` | None found | `LOW SHELF`; canonical ASCII ID `asr:filter.low-shelf` | Unicode character names and annotations do not identify a low-frequency shelving-filter response. |
| `asr:filter.high-shelf` | None found | `HIGH SHELF`; canonical ASCII ID `asr:filter.high-shelf` | Unicode character names and annotations do not identify a high-frequency shelving-filter response. |

The NamesList term search has one important lexical false positive:

| Candidate | Encoded identity | Disposition |
| --- | --- | --- |
| `˽` U+02FD MODIFIER LETTER SHELF | Phonetic modifier letter in Spacing Modifier Letters | Same English word, unrelated semantic domain; not an audio shelf. |
| `˾` U+02FE MODIFIER LETTER OPEN SHELF | Phonetic modifier letter in Spacing Modifier Letters | Same English word, unrelated semantic domain; not an audio shelf. |

This demonstrates why a name-token hit cannot be treated as semantic equivalence without checking the chart and encoded use.

## Representative visual-near-miss audit for the two-prong topology

Here, "near miss" means an existing character that may resemble a component or orientation of the unencoded project study form in some fonts. It does not mean UTS #39 formally identifies the project form as a confusable. UTS #39 compares encoded strings and cannot list unencoded project artwork as a target. The table is representative rather than an exhaustive glyph-by-glyph visual census: it selects the closest semantic families surfaced by the NamesList term and cross-reference search, then samples the principal orientation or construction variants. Related modifier arrowheads, double or open subset/superset signs, bracket compatibility forms, and ornamental angle brackets remain within those same risk families.

| Candidate | Encoded identity | Exposure | Why it is not equivalent |
| --- | --- | --- | --- |
| `<` U+003C and `>` U+003E | ASCII mathematical comparison signs | Both shelves | They provide the two diagonal prongs but no affected-side shelf semantics. Adding a stem changes neither encoded character's meaning. |
| `〈` U+3008 and `〉` U+3009; `⟨` U+27E8 and `⟩` U+27E9 | CJK and mathematical angle brackets | Both shelves | Paired delimiters can look like wider or smoother forks, but encode bracketing, not response type. |
| `⋔` U+22D4 PITCHFORK | Mathematical relation | Both shelves after rotation or stylistic comparison | Its name and branch geometry are tempting, but it is a mathematical relation with a vertical stem and fixed orientation. |
| `⫚` U+2ADA PITCHFORK WITH TEE TOP and `⫛` U+2ADB TRANSVERSAL INTERSECTION | Mathematical operators | Both shelves | They add crossings or a tee and encode mathematical relations, not affected frequency side. |
| `⫝̸` U+2ADC FORKING and `⫝` U+2ADD NONFORKING | Equational-logic relations | Both shelves | Unicode explicitly annotates these as logic symbols. Their fork language is unrelated to audio response. |
| `⑂` U+2442 OCR FORK and `⑃` U+2443 OCR INVERTED FORK | OCR-A control-reading symbols | Both shelves after rotation | Their visual construction is legacy OCR notation, not a filter response, and their typical vertical orientation differs from the project study form. |
| `⊂` U+2282 / `⊃` U+2283 and related subset/superset signs | Mathematical set relations | Both shelves | Curvature may resemble smooth convergence, but the open bowls lack the stem and carry set-theory semantics. |
| `Y`, `λ`, and routing-style split/merge drawings | Letters or diagram conventions, not one semantic character family | Both shelves | A reader can interpret branching or signal flow instead of finite gain plateaus. This is a recognition-study hazard, not an interchangeable notation. |

The main visual risk is therefore not a single duplicate glyph. It is cross-domain interpretation: a compact smooth fork can read as compare, bracket, set relation, OCR mark, or route split/merge before it reads as an affected frequency side.

## Plausible sequences

| Concept | Plausible sketch | What it preserves | Failure mode |
| --- | --- | --- | --- |
| Low shelf | `>-`, `>--`, `>_`, `LOW SHELF` | A left-opening fork plus right stem, or the full name | Punctuation components retain comparison/angle meanings; kerning and baseline differ by font; the fork can read as merge/split. |
| High shelf | `-<`, `--<`, `_<`, `HIGH SHELF` | A left stem plus right-opening fork, or the full name | Same limitations; `-<` can also be parsed as a malformed left arrow or programming token. |
| Either | `<`, `>`, `LS`, `HS` | Extreme terseness | Angle signs do not encode the stem or shelf semantics. `LS` and `HS` remain unestablished and broadly ambiguous abbreviations. |

No shape sequence is recommended as canonical interchange. `LOW SHELF`, `HIGH SHELF`, and the canonical `asr:` IDs remain semantically explicit. The sequences should be used as negative controls if the study tests whether the original smooth forks are recognized independently of familiar punctuation.

## Adjacent standards and notation

### ISO/IEC 10646

The Unicode Standard documents synchronized levels at which Unicode and ISO/IEC 10646 have identical repertoires, code points, names, and character identities. ISO's public ISO/IEC 10646:2020 catalogue describes the UCS as a coded repertoire for scripts and additional symbols. Therefore, a separate claim that the synchronized UCS already encodes an audio shelf character would conflict with this Unicode repertoire audit. This does not audit every difference in standard text or a future unsynchronized amendment.

### SMuFL

SMuFL is an adjacent glyph-registration system for music notation, not a general plain-text character encoding. Its canonical `glyphnames.json` uses Private Use Area code points for many standardized music-font glyph names. The pinned metadata search found no name or description containing the bounded terms. That is a reproducible no-match in the current canonical list, not proof that no SMuFL font, optional glyph, private extension, or future community proposal could contain visually similar artwork.

### IEC

The public IEC 60617 preview defines IEC 60617 as a graphical-symbol database for electrotechnical diagrams and lists S01247 High-pass filter, S01248 Low-pass filter, S01249 Band-pass filter, and S01250 Band-stop filter. The reviewed preview did not supply corresponding low-shelf or high-shelf entries. Because full entry sheets and database search coverage may require subscriber access, this audit records only that bounded public-material result. It does not claim exhaustive absence from IEC 60617, IEC 60417, or ISO 7000, and it reproduces no IEC artwork.

### AES

AES Convention Paper 10339 and its author-maintained accompanying repository use `shelving filter`, shelving level, transition slope, and bandwidth as engineering terminology. That supports the technical concept but is a paper, not an AES Standard or a glyph registry. The reviewed paper material does not present itself as registering a canonical low-shelf/high-shelf standalone symbol. This audit did not perform a reproducible search of the AES Standards catalogue and makes no claim about subscriber-only papers or every AES Standard.

## Per-record disposition

### Low shelf

- Semantic equivalent: none found.
- Lexical false positives: U+02FD and U+02FE.
- Primary visual risks: greater-than and closing-angle forms, fork relations after rotation, OCR fork forms, and route merge/split interpretation.
- Sequence disposition: retain `LOW SHELF` and `asr:filter.low-shelf`; do not substitute `>-`, `>`, `LS`, an OCR character, or a mathematical fork.
- Standards disposition: adjacent sources establish coded-character, diagram, music-font, and engineering contexts, but no reviewed semantic or graphical equivalent.

### High shelf

- Semantic equivalent: none found.
- Lexical false positives: U+02FD and U+02FE.
- Primary visual risks: less-than and opening-angle forms, fork relations after rotation, OCR inverted-fork forms, and route split/merge interpretation.
- Sequence disposition: retain `HIGH SHELF` and `asr:filter.high-shelf`; do not substitute `-<`, `<`, `HS`, an OCR character, or a mathematical fork.
- Standards disposition: adjacent sources establish coded-character, diagram, music-font, and engineering contexts, but no reviewed semantic or graphical equivalent.

## Consequences

1. The shelf pair now has a reproducible bounded overlap audit, addressing the narrow audit gap identified in the provisional record proposal without claiming an exhaustive visual census.
2. This result can support a later rubric reassessment, but it does not itself promote either record or increase independent usage evidence.
3. The smooth two-prong topology remains plausible for recognition testing, with routing and punctuation interpretations treated as explicit negative controls.
4. A six-way pilot should test the shelf forks against the four pass/band concepts and should include at least angle-sign and routing/split distractors.
5. Unicode remains on HOLD: no-equivalent is necessary overlap evidence, not sufficient evidence of plain-text demand, established glyph use, community support, or proposal readiness.
6. A future refresh must rerun the term and code-point checks against the then-current Unicode and SMuFL releases and state what public standards material was accessible.

## Agent Report - 2026-08-30T17:38:08-07:00

- Scope: audited semantic equivalents, lexical collisions, visual near-misses, plausible sequences, ISO/IEC 10646, SMuFL, IEC, and AES adjacency for the provisional low-shelf and high-shelf concepts.
- Evidence: Unicode 17.0 NamesList and official charts; UTS #39; Unicode/ISO repertoire documentation; ISO catalogue metadata; SMuFL canonical metadata pinned to commit `14acb17a6a479036f38e337396ed605fc4197b23`; IEC 60617 public preview; and AES Convention Paper 10339 accompanying material.
- Outcome: found no encoded semantic equivalent or reviewed adjacent-standard glyph equivalent; documented `SHELF` phonetic false positives and fork/routing/bracket/math/OCR confusability risks.
- Guardrails: changed no record, status, identifier, semantic field, alias, assessment, or artwork; made no external claim or contact; reproduced no third-party artwork.
- Validation: repository validation and independent review are required before merge.
- Limitations: restricted standards content, exhaustive IEC 60417/ISO 7000 entry search, subscriber-only AES material, font-by-font rendering, and participant recognition were not audited.
- Report status: in-progress
