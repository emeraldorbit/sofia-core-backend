import { callSofiaAPI, callPipelineDirectly, metadata } from './frontend_bridge_runtime';
import spec from './frontend_bridge_spec.json';

describe('Sofia Core Frontend Bridge', () => {
  test('metadata matches spec', () => {
    expect(metadata.version).toBe(spec.metadata.version);
    expect(metadata.maintainer).toBe(spec.metadata.maintainer);
  });

  test('pipeline can be called directly', () => {
    const result = callPipelineDirectly('hello', { test: true });
    expect(result).toBeDefined();
  });

  test('API handler can be invoked', async () => {
    const response = await callSofiaAPI('hello world', { injected: true });
    expect(response).toBeDefined();
  });
});
