import { enforceCoherence } from './coherence_engine_runtime';
import spec from './coherence_engine_spec.json';

describe('Coherence Engine Runtime', () => {
  test('accepts valid continuity and structure', () => {
    const context = {
      coherence: {
        continuity: 0.8,
        structure: 0.75
      },
      fragmented: false
    };

    const result = enforceCoherence('Sample output', context);
    expect(result).toBe(true);
  });

  test('rejects continuity below minimum', () => {
    const context = {
      coherence: {
        continuity: 0.3,
        structure: 0.75
      },
      fragmented: false
    };

    const result = enforceCoherence('Sample output', context);
    expect(result).toBe(false);
  });

  test('rejects continuity above maximum', () => {
    const context = {
      coherence: {
        continuity: 1.2,
        structure: 0.75
      },
      fragmented: false
    };

    const result = enforceCoherence('Sample output', context);
    expect(result).toBe(false);
  });

  test('rejects structure below threshold', () => {
    const context = {
      coherence: {
        continuity: 0.8,
        structure: 0.4
      },
      fragmented: false
    };

    const result = enforceCoherence('Sample output', context);
    expect(result).toBe(false);
  });

  test('rejects fragmentation when flagged', () => {
    const context = {
      coherence: {
        continuity: 0.8,
        structure: 0.75
      },
      fragmented: true
    };

    const result = enforceCoherence('Sample output', context);
    expect(result).toBe(false);
  });
});
