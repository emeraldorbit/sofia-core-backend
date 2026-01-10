import { handleSofiaRequest } from './sofia_api_runtime';
import spec from './sofia_api_spec.json';

describe('Sofia API Handler', () => {
  test('spec metadata is correct', () => {
    expect(spec.metadata.version).toBeDefined();
    expect(spec.metadata.description).toContain('API');
  });

  test('handles basic request', () => {
    const result = handleSofiaRequest({ input: 'test' });
    expect(result).toHaveProperty('output');
    expect(result.output).toBeDefined();
  });
});
