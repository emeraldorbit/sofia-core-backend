import { enforceConstraints } from './constraint_engine_runtime';
import spec from './constraint_engine_spec.json';

describe('Constraint Engine Runtime', () => {
  test('accepts valid safety, identity, and format', () => {
    const context = {
      constraints: {
        safety: 0.9,
        identity_valid: true,
        format_valid: true
      }
    };

    const result = enforceConstraints('Sample output', context);
    expect(result).toBe(true);
  });

  test('rejects safety below minimum', () => {
    const context = {
      constraints: {
        safety: 0.5,
        identity_valid: true,
        format_valid: true
      }
    };

    const result = enforceConstraints('Sample output', context);
    expect(result).toBe(false);
  });

  test('rejects identity violation when lock is enabled', () => {
    const context = {
      constraints: {
        safety: 0.9,
        identity_valid: false,
        format_valid: true
      }
    };

    const result = enforceConstraints('Sample output', context);
    expect(result).toBe(false);
  });

  test('rejects format violation when enforcement is enabled', () => {
    const context = {
      constraints: {
        safety: 0.9,
        identity_valid: true,
        format_valid: false
      }
    };

    const result = enforceConstraints('Sample output', context);
    expect(result).toBe(false);
  });
});
