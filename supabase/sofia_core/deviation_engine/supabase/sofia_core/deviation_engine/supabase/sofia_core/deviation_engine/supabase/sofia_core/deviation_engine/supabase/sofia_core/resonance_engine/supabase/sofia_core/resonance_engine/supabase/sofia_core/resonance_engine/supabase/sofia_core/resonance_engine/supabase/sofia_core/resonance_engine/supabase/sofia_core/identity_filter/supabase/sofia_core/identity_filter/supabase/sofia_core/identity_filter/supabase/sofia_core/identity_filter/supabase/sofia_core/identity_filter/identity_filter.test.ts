import { enforceIdentityFilter } from './identity_filter_runtime';

describe('Identity Filter Runtime', () => {
  test('accepts valid identity fit and signature', () => {
    const context = {
      identity: {
        identity_fit: 0.9,
        signature_valid: true
      }
    };

    const result = enforceIdentityFilter('Sample output', context);
    expect(result).toBe(true);
  });

  test('rejects identity fit below minimum', () => {
    const context = {
      identity: {
        identity_fit: 0.5,
        signature_valid: true
      }
    };

    const result = enforceIdentityFilter('Sample output', context);
    expect(result).toBe(false);
  });

  test('rejects invalid signature', () => {
    const context = {
      identity: {
        identity_fit: 0.9,
        signature_valid: false
      }
    };

    const result = enforceIdentityFilter('Sample output', context);
    expect(result).toBe(false);
  });

  test('rejects when both identity fit and signature fail', () => {
    const context = {
      identity: {
        identity_fit: 0.4,
        signature_valid: false
      }
    };

    const result = enforceIdentityFilter('Sample output', context);
    expect(result).toBe(false);
  });
});
