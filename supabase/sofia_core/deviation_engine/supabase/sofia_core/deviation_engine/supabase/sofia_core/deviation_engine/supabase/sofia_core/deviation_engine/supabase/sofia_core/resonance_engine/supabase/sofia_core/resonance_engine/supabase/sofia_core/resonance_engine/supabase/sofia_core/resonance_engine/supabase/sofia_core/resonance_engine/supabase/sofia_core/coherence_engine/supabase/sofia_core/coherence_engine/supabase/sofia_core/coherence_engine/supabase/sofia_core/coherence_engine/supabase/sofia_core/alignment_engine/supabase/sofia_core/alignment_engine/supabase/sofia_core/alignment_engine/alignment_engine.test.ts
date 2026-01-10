import { enforceAlignment } from './alignment_engine_runtime';
import spec from './alignment_engine_spec.json';

describe('Alignment Engine Runtime', () => {
  test('accepts valid intent and mission fit', () => {
    const context = {
      alignment: {
        intent_fit: 0.8,
        mission_fit: 0.9
      },
      misaligned: false
    };

    const result = enforceAlignment('Sample output', context);
    expect(result).toBe(true);
  });

  test('rejects intent fit below minimum', () => {
    const context = {
      alignment: {
        intent_fit: 0.4,
        mission_fit: 0.9
      },
      misaligned: false
    };

    const result = enforceAlignment('Sample output', context);
    expect(result).toBe(false);
  });

  test('rejects intent fit above maximum', () => {
    const context = {
      alignment: {
        intent_fit: 1.2,
        mission_fit: 0.9
      },
      misaligned: false
    };

    const result = enforceAlignment('Sample output', context);
    expect(result).toBe(false);
  });

  test('rejects mission fit below threshold', () => {
    const context = {
      alignment: {
        intent_fit: 0.8,
        mission_fit: 0.5
      },
      misaligned: false
    };

    const result = enforceAlignment('Sample output', context);
    expect(result).toBe(false);
  });

  test('rejects misalignment when flagged', () => {
    const context = {
      alignment: {
        intent_fit: 0.8,
        mission_fit: 0.9
      },
      misaligned: true
    };

    const result = enforceAlignment('Sample output', context);
    expect(result).toBe(false);
  });
});
