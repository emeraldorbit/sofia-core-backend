import spec from './sofia_api_spec.json';

export function handleSofiaRequest(input: any) {
  return {
    specVersion: spec.metadata.version,
    input,
    output: {
      status: 'ok',
      timestamp: Date.now()
    }
  };
}
