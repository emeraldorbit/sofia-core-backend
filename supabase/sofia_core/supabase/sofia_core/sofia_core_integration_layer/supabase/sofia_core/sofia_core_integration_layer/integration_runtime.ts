import spec from './integration_spec.json';
import { callSofiaAPI, callPipelineDirectly, metadata as bridgeMetadata } from '../sofia_core_frontend_bridge/frontend_bridge_runtime';

export const integrationMetadata = {
  version: spec.metadata.version,
  maintainer: spec.metadata.maintainer
};

export async function integrateAPI(input_text: string, context: object = {}) {
  if (!spec.integration_layer.enable_frontend_bridge) {
    throw new Error('Frontend bridge not enabled');
  }

  return await callSofiaAPI(input_text, context);
}

export function integratePipeline(input_text: string, context: object = {}) {
  if (!spec.integration_layer.allow_custom_context) {
    context = {};
  }

  return callPipelineDirectly(input_text, context);
}

export function getIntegrationHelpers() {
  if (!spec.integration_layer.expose_helpers) {
    return {};
  }

  return {
    integrateAPI,
    integratePipeline,
    integrationMetadata,
    bridgeMetadata
  };
}
