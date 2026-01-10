import { enforceDeviation } from './deviation_engine_runtime';
import spec from './deviation_engine_spec.json';

describe('Deviation Engine Runtime', () => {
  test('accepts deviation inside global and preferred bounds', () => {
    const context = {
      deviation: 0.75,
      flat: false
    };

    const result = enforceDeviation('Sample output', context);
    expect(result).toBe(true);
  });

  test('rejects deviation below global minimum', () => {
    const context = {
      deviation: 0.1,
      flat: false
    };

    const result = enforceDeviation('Sample output', context);
    expect(result).toBe(false);
  });

  test('rejects deviation above global maximum', () => {
    const context = {
      deviation: 1.2,
      flat: false
    };

    const result = enforceDeviation('Sample output', context);
    expect(result).toBe(false);
  });

  test('rejects deviation outside preferred band', () => {
    const context = {
      deviation: 0.4,
      flat: false
    };

    const result = enforceDeviation('Sample output', context);
    expect(result).toBe(false);
  });

  test('rejects flat responses when flat flag is true', () => {
    const context = {
      deviation: 0.75,
      flat: true
    };

    const result = enforceDeviation('Sample output', context);
    expect(result).toBe(false);
  });
});
