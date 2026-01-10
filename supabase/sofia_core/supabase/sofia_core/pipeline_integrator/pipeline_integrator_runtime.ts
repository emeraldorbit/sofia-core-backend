import pipelineSpec from './pipeline_integrator_spec.json';

export function runPipeline(output: string, context: any, engines: Record<string, Function>): string | null {
  const { engine_order, stop_on_failure, log_pipeline_events } = pipelineSpec.pipeline;
  const { validate_engine_sequence, validate_context_flow, require_all_engines_defined } = pipelineSpec.enforcement;

  const violations = [];

  // Validate engine sequence
  if (validate_engine_sequence && !Array.isArray(engine_order)) {
    violations.push('Invalid engine order');
  }

  // Validate all engines are defined
  if (require_all_engines_defined) {
    for (const engine of engine_order) {
      if (typeof engines[engine] !== 'function') {
        violations.push(`Engine not defined: ${engine}`);
      }
    }
  }

  if (violations.length > 0) {
    return null;
  }

  let currentOutput = output;

  for (const engine of engine_order) {
    const result = engines[engine](currentOutput, context);

    if (result === false || result === null) {
      if (stop_on_failure) {
        if (log_pipeline_events) {
          console.log(`Pipeline halted at ${engine}`);
        }
        return null;
      }
    }

    if (typeof result === 'string') {
      currentOutput = result;
    }
  }

  if (log_pipeline_events) {
    console.log(`Pipeline completed successfully`);
  }

  return currentOutput;
}
