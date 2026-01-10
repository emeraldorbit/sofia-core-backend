import { enforceDeviation } from './deviation_engine_runtime';
import spec from './deviation_engine_spec.json';

describe('Deviation Engine Runtime', () => {
  test('accepts valid drift and pattern integrity', () => {
    const context = {
      deviation: {
        drift: 0.1,
        pattern_integrity: 0.85
      },
      drifted: false
    };

    const result = enforceDeviation('Sample output', context);
    expect(result).toBe(true);
  });

  test('rejects drift above maximum', () => {
    const context = {
      deviation: {
        drift: 0.5,
        pattern_integrity: 0.85
      },
      drifted: false
    };

    const result = enforceDeviation('Sample output', context);
    expect(result).toBe(false);
  });

  test('rejects pattern integrity below minimum', () => {
    const context = {
      deviation: {
        drift: 0.1,
        pattern_integrity: 0.4
      },
      drifted: false
    };

    const result = enforceDeviation('Sample output', context);
    expect(result).toBe(false);
  });

  test('rejects drift when flagged', () => {
    const context = {
      deviation: {
        drift: 0.1,
        pattern_integrity: 0.85
      },
      drifted: true
    };

    const result = enforceDeviation('Sample output', context);
    expect(result).toBe(false);
  });
});
