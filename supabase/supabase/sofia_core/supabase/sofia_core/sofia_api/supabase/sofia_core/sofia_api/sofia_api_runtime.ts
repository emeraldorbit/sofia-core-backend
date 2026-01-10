import apiSpec from './sofia_api_spec.json';
import { runPipeline } from '../pipeline_integrator/pipeline_integrator_runtime';

export async function handleSofiaRequest(request: any, engines: Record<string, Function>) {
  const { endpoint, method, validate_request_schema, require_pipeline_integrity } = apiSpec.api;

  // Validate method
  if (request.method !== method) {
    return buildError('invalid_request', 'Invalid HTTP method');
  }

  // Validate schema
  if (validate_request_schema) {
    if (typeof request.body?.input_text !== 'string' || typeof request.body?.context !== 'object') {
      return buildError('invalid_request', apiSpec.errors.invalid_request);
    }
  }

  const input = request.body.input_text;
  const context = request.body.context;

  // Run pipeline
  const result = runPipeline(input, context, engines);

  if (require_pipeline_integrity && (result === null || result === false)) {
    return buildError('pipeline_failure', apiSpec.errors.pipeline_failure);
  }

  return {
    final_output: result,
    engine_trace: context
  };
}

function buildError(code: string, message: string) {
  return {
    error: {
      code,
      message
    }
  };
}
