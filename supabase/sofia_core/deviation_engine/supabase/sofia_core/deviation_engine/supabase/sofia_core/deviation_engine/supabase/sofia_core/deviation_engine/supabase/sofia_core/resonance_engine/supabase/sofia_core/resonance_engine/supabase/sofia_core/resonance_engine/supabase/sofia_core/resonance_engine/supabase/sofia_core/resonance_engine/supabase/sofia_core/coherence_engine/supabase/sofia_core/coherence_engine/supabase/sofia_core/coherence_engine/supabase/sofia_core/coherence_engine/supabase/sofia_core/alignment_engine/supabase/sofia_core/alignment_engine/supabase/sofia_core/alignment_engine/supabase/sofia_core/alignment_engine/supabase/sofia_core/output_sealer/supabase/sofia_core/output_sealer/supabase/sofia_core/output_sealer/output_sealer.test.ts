import { sealOutput } from './output_sealer_runtime';

describe('Output Sealer Runtime', () => {
  test('accepts output when all engines passed and returns locked output', () => {
    const context = {
      engines_passed: true
    };

    const result = sealOutput('  Final text  ', context);
    expect(result).not.toBeNull();
    expect(Object.isFrozen(result)).toBe(true);
    expect(result).toBe('Final text');
  });

  test('rejects output when engines did not pass', () => {
    const context = {
      engines_passed: false
    };

    const result = sealOutput('Sample output', context);
    expect(result).toBeNull();
  });

  test('applies formatting pass before sealing', () => {
    const context = {
      engines_passed: true
    };

    const result = sealOutput('   Needs trim   ', context);
    expect(result).toBe('Needs trim');
  });
});
