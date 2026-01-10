import { enforceResonance } from './resonance_engine_runtime';
import spec from './resonance_engine_spec.json';

describe('Resonance Engine Runtime', () => {
  test('accepts valid amplitude and coherence', () => {
    const context = {
      resonance: {
        amplitude: 0.8,
        coherence: 0.7
      },
      dissonance: false
    };

    const result = enforceResonance('Sample output', context);
    expect(result).toBe(true);
  });

  test('rejects amplitude below minimum', () => {
    const context = {
      resonance: {
        amplitude: 0.2,
        coherence: 0.7
      },
      dissonance: false
    };

    const result = enforceResonance('Sample output', context);
    expect(result).toBe(false);
  });

  test('rejects amplitude above maximum', () => {
    const context = {
      resonance: {
        amplitude: 1.2,
        coherence: 0.7
      },
      dissonance: false
    };

    const result = enforceResonance('Sample output', context);
    expect(result).toBe(false);
  });

  test('rejects coherence below threshold', () => {
    const context = {
      resonance: {
        amplitude: 0.8,
        coherence: 0.3
      },
      dissonance: false
    };

    const result = enforceResonance('Sample output', context);
    expect(result).toBe(false);
  });

  test('rejects dissonance when flagged', () => {
    const context = {
      resonance: {
        amplitude: 0.8,
        coherence: 0.7
      },
      dissonance: true
    };

    const result = enforceResonance('Sample output', context);
    expect(result).toBe(false);
  });
});
