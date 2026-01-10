export const deviationEngine = {
  initialize() {
    return {
      baseline: 0,
      deviation: 0,
      direction: "neutral",
      history: []
    };
  },

  update(state, input) {
    const delta = input.delta ?? 0;

    // compute next deviation
    let next = state.deviation + delta;

    // clamp to safe range
    if (next > 100) next = 100;
    if (next < -100) next = -100;

    // determine direction
    let direction = "neutral";
    if (next > state.deviation) direction = "positive";
    if (next < state.deviation) direction = "negative";

    const event = {
      previous: state.deviation,
      next,
      delta,
      direction,
      timestamp: Date.now()
    };

    return {
      ...state,
      deviation: next,
      direction,
      history: [...state.history, event]
    };
  },

  compute(state) {
    return {
      deviation: state.deviation,
      magnitude: Math.abs(state.deviation),
      direction: state.direction,
      history: state.history
    };
  }
};
