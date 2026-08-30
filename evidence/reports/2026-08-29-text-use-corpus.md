# Publishing, Education, and Community Text-Use Report

## Scope

This pass examines journalism, education, user discussion, and icon-font projects for evidence about how response forms are explained or communicated outside a single product UI.

## Findings

[Harmony Central](https://www.harmonycentral.com/articles/recording/high-pass-and-low-pass-filters-r783/) calls response controls bent-line icons, demonstrating a recognizable UI convention (EV-019). [Simon Fraser University](https://www.sfu.ca/sonic-studio-webdav/cmns/Handbook%20Tutorial/Filters.html) and [ICON Collective](https://www.iconcollective.edu/types-of-eq) teach the semantics using labels and illustrations (EV-003, EV-020).

The community corpus records real comprehension and description friction: a symbol-identification question on [r/audio](https://www.reddit.com/r/audio/comments/hsa33u/i_need_help_figuring_out_what_this_symbol_means/), an [Allen & Heath forum](https://forums.allen-heath.com/t/eq-symbols/13319) discussion attempting to describe EQ symbols in text, a [r/musicproduction](https://www.reddit.com/r/musicproduction/comments/1ck9iwi/i_keep_mixing_up_low_pass_and_high_pass/) terminology-confusion thread, and a [KVR](https://www.kvraudio.com/forum/viewtopic.php?t=583829) terminology discussion (EV-021 through EV-024).

The counterfinding is decisive for the Unicode question at this stage: this pass found no positive example of an established compact response glyph being used as a portable plain-text interchange character. Existing visual workarounds rely on product images or dedicated icon fonts, including [DSSSP](https://github.com/NumberOneBot/dsssp/blob/main/src/icons/font.css) and [FontAudio](https://github.com/fefanto/fontaudio) (EV-005, EV-025).

## Limitations and next evidence

This is not proof that no positive examples exist. Continue a bounded search for dated, independently authored portable-text artifacts. If that search remains negative, record it as a formal objection to Unicode encoding while retaining the registry and open-font paths as separate possibilities.
