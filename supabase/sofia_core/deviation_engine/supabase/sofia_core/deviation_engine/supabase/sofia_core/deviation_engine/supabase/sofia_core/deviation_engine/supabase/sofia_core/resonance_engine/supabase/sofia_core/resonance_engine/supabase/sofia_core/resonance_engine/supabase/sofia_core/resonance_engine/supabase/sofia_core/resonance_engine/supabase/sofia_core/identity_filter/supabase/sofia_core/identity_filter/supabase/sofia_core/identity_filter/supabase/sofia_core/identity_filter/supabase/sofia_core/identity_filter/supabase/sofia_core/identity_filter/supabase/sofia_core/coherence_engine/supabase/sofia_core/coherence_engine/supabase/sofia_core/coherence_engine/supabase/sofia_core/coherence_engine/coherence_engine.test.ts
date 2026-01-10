import { enforceCoherence } from './coherence_engine_runtime';

describe('Coherence Engine Runtime', () => {
  test('accepts valid coherence score with no contradictions', () => {
    const context = {
      coherence: {
        coherence_score: 0.9,
        contradictions_detected: false
      }
    };

    const result = enforceCoherence('Sample output', context);
    expect(result).toBe(true);
  });

  test('rejects coherence score below minimum', () => {
    const context = {
      coherence: {
        coherence_score: 0.5,
        contradictions_detected: false
      }
    };

    const result = enforceCoherence('Sample output', context);
    expect(result).toBe(false);
  });

  test('rejects when contradictions are detected', () => {
    const context = {
      coherence: {
        coherence_score: 0.9,
        contradictions_detected: true
      }
    };

    const result = enforceCoherence('Sample output', context);
    expect(result).toBe(false);
  });

  test('rejects when both coherence score and contradictions fail', () => {
    const context = {
      coherence: {
        coherence_score: 0.6,
        contradictions_detected: true
      }
    };

    const result = enforceCoherence('Sample output', context);
    expect(result).toBe(false);
  });
});
