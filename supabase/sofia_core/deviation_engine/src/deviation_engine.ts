export const deviationEngine = {
  initialize() {
    return {
      baseline: 0,
      deviation: 0,
      history: []
    };
  },

  update(state, input) {
    const nextDeviation = state.deviation + (input.delta ?? 0);

    return {
      ...state,
      deviation: nextDeviation,
      history: [...state.history, nextDeviation]
    };
  },

  compute(state) {
    return {
      deviation: state.deviation,
      magnitude: Math.abs(state.deviation),
      history: state.history
    };
  }
};
