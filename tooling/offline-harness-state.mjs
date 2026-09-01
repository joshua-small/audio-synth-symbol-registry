const PHASES = new Set(["free-text", "forced-choice", "contamination", "complete"]);

function fail(message) {
  throw new Error(message);
}

function requiredString(value, field) {
  if (typeof value !== "string" || value.length === 0) fail(`${field} must be a non-empty string`);
  return value;
}

export function createHarnessState(instrument, formId) {
  const form = instrument.forms.find(({ form }) => form === formId);
  if (!form) fail(`unknown form: ${formId}`);
  if (form.stimulus_order.length !== 6 || new Set(form.stimulus_order).size !== 6) {
    fail("offline six-way validation requires exactly six unique stimuli");
  }
  return {
    schema_version: "0.1.0",
    synthetic_validation: true,
    study_id: instrument.study_id,
    package_schema_version: instrument.package_schema_version,
    form: formId,
    phase: "free-text",
    position: 0,
    stimulus_order: [...form.stimulus_order],
    free_text: [],
    forced_choice: [],
    contamination: null,
    complete: false,
  };
}

export function applyHarnessAction(state, action, instrument) {
  if (!PHASES.has(state.phase)) fail("invalid harness phase");
  const token = state.stimulus_order[state.position];
  if (state.phase === "free-text" && action.type === "answer-free-text") {
    const unknown = action.unknown === true;
    const text = typeof action.text === "string" ? action.text.trim() : "";
    if (unknown === (text.length > 0)) fail("provide either free text or I do not know, but not both");
    state.free_text.push({ opaque_stimulus_token: token, response_text: unknown ? null : text, unknown });
    state.position += 1;
    if (state.position === state.stimulus_order.length) {
      state.phase = "forced-choice";
      state.position = 0;
    }
    return state;
  }
  if (state.phase === "forced-choice" && action.type === "answer-forced-choice") {
    const order = instrument.forms.find(({ form }) => form === state.form).choice_order_by_stimulus[token];
    const choice = requiredString(action.choice_id, "choice_id");
    if (!order.includes(choice)) fail("choice_id was not offered for this stimulus");
    if (!Number.isInteger(action.confidence) || action.confidence < 1 || action.confidence > 5) {
      fail("confidence must be an integer from 1 through 5");
    }
    state.forced_choice.push({
      opaque_stimulus_token: token,
      forced_choice_id: choice,
      confidence: action.confidence,
      displayed_choice_order: [...order],
    });
    state.position += 1;
    if (state.position === state.stimulus_order.length) {
      state.phase = "contamination";
      state.position = 0;
    }
    return state;
  }
  if (state.phase === "contamination" && action.type === "answer-contamination") {
    if (!["yes", "no", "unsure"].includes(action.flag)) fail("contamination flag must be yes, no, or unsure");
    const note = typeof action.note === "string" && action.note.trim().length > 0 ? action.note.trim() : null;
    if (action.flag !== "yes" && note !== null) fail("a contamination note is allowed only with yes");
    state.contamination = { flag: action.flag, note };
    state.phase = "complete";
    state.complete = true;
    return state;
  }
  fail(`action ${action.type} is not allowed during ${state.phase}`);
}

export function exportSyntheticResult(state) {
  if (!state.complete || state.phase !== "complete") fail("cannot export an incomplete validation run");
  if (state.free_text.length !== 6 || state.forced_choice.length !== 6 || state.contamination === null) {
    fail("complete validation export must contain six free-text answers, six forced choices, and one contamination answer");
  }
  return {
    export_schema_version: "0.1.0",
    synthetic_validation: true,
    study_id: state.study_id,
    package_schema_version: state.package_schema_version,
    form: state.form,
    free_text: state.free_text,
    forced_choice: state.forced_choice,
    contamination: state.contamination,
  };
}
