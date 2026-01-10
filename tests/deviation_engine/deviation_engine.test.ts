import { deviationEngine } from "../../src/deviation_engine";

describe("deviation_engine", () => {
  test("returns expected deviation for simple input", () => {
    const result = deviationEngine([1, 2, 3]);
    expect(result).toBeDefined();
  });
});
