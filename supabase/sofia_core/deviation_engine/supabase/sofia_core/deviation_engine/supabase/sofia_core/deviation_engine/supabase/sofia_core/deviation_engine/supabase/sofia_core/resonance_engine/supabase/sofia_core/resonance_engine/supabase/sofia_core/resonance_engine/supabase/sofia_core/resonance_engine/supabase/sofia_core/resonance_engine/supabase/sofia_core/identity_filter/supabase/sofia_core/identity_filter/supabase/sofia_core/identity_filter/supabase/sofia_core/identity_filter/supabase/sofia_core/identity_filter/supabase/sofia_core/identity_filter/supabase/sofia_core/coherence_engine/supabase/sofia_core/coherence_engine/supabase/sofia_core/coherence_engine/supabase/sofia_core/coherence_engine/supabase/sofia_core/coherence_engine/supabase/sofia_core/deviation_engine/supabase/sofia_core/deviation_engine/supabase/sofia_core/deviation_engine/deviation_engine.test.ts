import { enforceDeviation } from './deviation_engine_runtime';

describe('Deviation Engine Runtime', () => {
  test('accepts valid deviation score with no hallucination markers', () => {
    const context = {
      deviation: {
        deviation_score: 0.1,
        hallucination_markers: false
      }
    };

    const result = enforceDeviation('Sample output', context);
    expect(result).toBe(true);
  });

  test('rejects deviation score above maximum', () => {
    const context = {
      deviation: {
        deviation_score: 0.5,
        hallucination_markers: false
      }
    };

    const result = enforceDeviation('Sample output', context);
    expect(result).toBe(false);
  });

  test('rejects when hallucination markers are detected', () => {
    const context = {
      deviation: {
        deviation_score: 0.1,
        hallucination_markers: true
      }
    };

    const result = enforceDeviation('Sample output', context);
    expect(result).toBe(false);
  });

  test('rejects when both deviation score and hallucination markers fail', () => {
    const context = {
      deviation: {
        deviation_score: 0.4,
        hallucination_markers: true
      }
    };

    const result = enforceDeviation('Sample output', context);
    expect(result).toBe(false);
  });
});
