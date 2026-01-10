import { handleSofiaRequest } from './sofia_api_runtime';

describe('Sofia API Runtime', () => {
  const mockEngines = {
    resonance_engine: jest.fn((o, c) => o),
    identity_filter: jest.fn((o, c) => o),
    coherence_engine: jest.fn((o, c) => o),
    deviation_engine: jest.fn((o, c) => o),
    alignment_engine: jest.fn((o, c) => o),
    output_sealer: jest.fn((o, c) => o)
  };

  test('accepts valid request and returns final output', async () => {
    const request = {
      method: 'POST',
      body: {
        input_text: 'Hello world',
        context: { engines_passed: true }
      }
    };

    const result = await handleSofiaRequest(request, mockEngines);
    expect(result.final_output).toBe('Hello world');
  });

  test('rejects invalid request schema', async () => {
    const request = {
      method: 'POST',
      body: {
        input_text: 123,
        context: 'not-an-object'
      }
    };

    const result = await handleSofiaRequest(request, mockEngines);
    expect(result.error.code).toBe('invalid_request');
  });

  test('returns pipeline failure when engines fail', async () => {
    const failingEngines = {
      ...mockEngines,
      coherence_engine: jest.fn(() => null)
    };

    const request = {
      method: 'POST',
      body: {
        input_text: 'Hello world',
        context: { engines_passed: true }
      }
    };

    const result = await handleSofiaRequest(request, failingEngines);
    expect(result.error.code).toBe('pipeline_failure');
  });
});
