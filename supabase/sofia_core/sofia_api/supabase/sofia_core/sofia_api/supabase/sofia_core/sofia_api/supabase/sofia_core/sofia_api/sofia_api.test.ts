import { handleSofiaRequest } from './sofia_api_runtime';
import spec from './sofia_api_spec.json';

test('API returns structured output', () => {
  const result = handleSofiaRequest({ test: true });
  expect(result.output.status).toBe('ok');
  expect(result.specVersion).toBe(spec.metadata.version);
});
