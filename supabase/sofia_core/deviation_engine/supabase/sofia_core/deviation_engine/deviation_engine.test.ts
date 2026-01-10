import { deviationEngine } from "./src/deviation_engine";

describe("deviationEngine", () => {
  test("initialize() returns correct baseline state", () => {
    const state = deviationEngine.initialize();

    expect(state.deviation).toBe(0);
    expect(state.direction).toBe("neutral");
    expect(state.alert).toBe(null);
    expect(state.stability).toBe(1.0);
    expect(Array.isArray(state.history)).toBe(true);
  });

  test("update() applies delta and clamps deviation", () => {
    let state = deviationEngine.initialize();

    state = deviationEngine.update(state, { delta: 150 });
    expect(state.deviation).toBe(100);

    state = deviationEngine.update(state, { delta: -300 });
    expect(state.deviation).toBe(-100);
  });

  test("update() determines correct direction", () => {
    let state = deviationEngine.initialize();

    state = deviationEngine.update(state, { delta: 10 });
    expect(state.direction).toBe("positive");

    state = deviationEngine.update(state, { delta: -20 });
    expect(state.direction).toBe("negative");

    state = deviationEngine.update(state, { delta: 0 });
    expect(state.direction).toBe("neutral");
  });

  test("update() triggers high drift alert", () => {
    let state = deviationEngine.initialize();

    state = deviationEngine.update(state, { delta: 50 });
    expect(state.alert).toBe("high_drift");
  });

  test("update() triggers critical drift alert", () => {
    let state = deviationEngine.initialize();

    state = deviationEngine.update(state, { delta: 90 });
    expect(state.alert).toBe("critical_drift");
  });

  test("stability scoring decreases with magnitude", () => {
    let state = deviationEngine.initialize();

    state = deviationEngine.update(state, { delta: 20 });
    expect(state.stability).toBeLessThan(1.0);

    state = deviationEngine.update(state, { delta: 60 });
    expect(state.stability).toBeLessThan(0.5);
  });

  test("history records each event", () => {
    let state = deviationEngine.initialize();

    state = deviationEngine.update(state, { delta: 10 });
    state = deviationEngine.update(state, { delta: -5 });

    expect(state.history.length).toBe(2);
    expect(state.history[0]).toHaveProperty("previous");
    expect(state.history[0]).toHaveProperty("next");
    expect(state.history[0]).toHaveProperty("timestamp");
  });

  test("compute() returns correct output structure", () => {
    let state = deviationEngine.initialize();
    state = deviationEngine.update(state, { delta: 25 });

    const output = deviationEngine.compute(state);

    expect(output).toHaveProperty("deviation");
    expect(output).toHaveProperty("magnitude");
    expect(output).toHaveProperty("direction");
    expect(output).toHaveProperty("alert");
    expect(output).toHaveProperty("stability");
    expect(output).toHaveProperty("history");
  });
});
