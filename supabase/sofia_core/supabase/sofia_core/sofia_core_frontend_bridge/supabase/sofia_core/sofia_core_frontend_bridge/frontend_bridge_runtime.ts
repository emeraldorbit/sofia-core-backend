import spec from './frontend_bridge_spec.json';
import { handleSofiaRequest } from '../sofia_api/sofia_api_runtime';
import { runPipeline } from '../pipeline_integrator/pipeline_integrator_runtime';
import { engines } from '../sofia_core_index/sofia_core_index';

export const metadata = {
  version: spec.metadata.version,
  maintainer: spec.metadata.maintainer
};

export async function callSofiaAPI(input_text: string, context: object = {}) {
  if (!spec.frontend_bridge.expose_api_handler) {
    throw new Error('API handler not exposed');
  }

  const request = {
    method: 'POST',
    body: {
      input_text,
      context
    }
  };

  return await handleSofiaRequest(request, engines);
}

export function callPipelineDirectly(input_text: string, context: object = {}) {
  if (!spec.frontend_bridge.wrap_pipeline_directly) {
    throw new Error('Pipeline not exposed');
  }

  return runPipeline(input_text, context, engines);
}
