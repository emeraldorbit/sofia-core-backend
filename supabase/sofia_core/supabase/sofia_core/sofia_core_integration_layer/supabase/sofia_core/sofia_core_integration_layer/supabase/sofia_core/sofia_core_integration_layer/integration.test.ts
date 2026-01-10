import { integrateAPI, integratePipeline, getIntegrationHelpers, integrationMetadata } from './integration_runtime';
import spec from './integration_spec.json';

describe('Sofia Core Integration Layer', () => {
  test('metadata matches spec', () => {
    expect(integrationMetadata.version).toBe(spec.metadata.version);
    expect(integrationMetadata.maintainer).toBe(spec.metadata.maintainer);
  });

  test('pipeline integration works', () => {
    const result = integratePipeline('hello', { injected: true });
    expect(result).toBeDefined();
  });

  test('API integration works', async () => {
    const response = await integrateAPI('hello world', { context: true });
    expect(response).toBeDefined();
  });

  test('helpers are exposed when enabled', () => {
    const helpers = getIntegrationHelpers();
    expect(helpers.integrateAPI).toBeDefined();
    expect(helpers.integratePipeline).toBeDefined();
    expect(helpers.integrationMetadata).toBeDefined();
  });
});
