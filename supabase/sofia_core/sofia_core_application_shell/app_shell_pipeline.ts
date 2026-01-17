/**
 * Sofia Core Pipeline Orchestration Layer
 * 
 * Provides declarative capability chaining with automatic data flow,
 * error handling, and context propagation.
 */

export interface PipelineStep {
  capability: string;
  transform?: (data: any) => any;
}

export interface PipelineResult {
  success: boolean;
  output?: any;
  error?: string;
  failedStep?: string;
  executedSteps?: string[];
}

export interface PipelineContext {
  call: (capability: string, input: any) => Promise<any>;
  [key: string]: any;
}

/**
 * Executes a pipeline of capability calls sequentially.
 * 
 * @param runtime - Runtime context with call() method
 * @param steps - Array of capability names or step objects
 * @param input - Initial input data
 * @returns Pipeline execution result with success status
 */
export async function runPipeline(
  runtime: PipelineContext,
  steps: (string | PipelineStep)[],
  input: any
): Promise<PipelineResult> {
  let data = input;
  const executedSteps: string[] = [];

  for (const step of steps) {
    const capability = typeof step === 'string' ? step : step.capability;
    const transform = typeof step === 'string' ? undefined : step.transform;

    try {
      // Apply optional transform before calling capability
      const inputData = transform ? transform(data) : data;
      
      // Call the capability
      const result = await runtime.call(capability, inputData);
      
      // Track execution
      executedSteps.push(capability);

      // Check for errors
      if (!result.success) {
        return {
          success: false,
          error: result.error || `Capability ${capability} failed`,
          failedStep: capability,
          executedSteps
        };
      }

      // Pass output to next step
      data = result.output || result.data;
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        failedStep: capability,
        executedSteps
      };
    }
  }

  return {
    success: true,
    output: data,
    executedSteps
  };
}

/**
 * Creates a reusable pipeline from a step definition.
 * 
 * @param steps - Array of capability names or step objects
 * @returns Function that executes the pipeline with given runtime and input
 */
export function createPipeline(steps: (string | PipelineStep)[]) {
  return async (runtime: PipelineContext, input: any): Promise<PipelineResult> => {
    return runPipeline(runtime, steps, input);
  };
}

/**
 * Validates that all capabilities in a pipeline exist in the runtime.
 * 
 * @param runtime - Runtime context with hasCapability() method
 * @param steps - Array of capability names or step objects
 * @returns Validation result with missing capabilities
 */
export function validatePipeline(
  runtime: { hasCapability: (cap: string) => boolean },
  steps: (string | PipelineStep)[]
): { valid: boolean; missingCapabilities: string[] } {
  const missingCapabilities: string[] = [];

  for (const step of steps) {
    const capability = typeof step === 'string' ? step : step.capability;
    if (!runtime.hasCapability(capability)) {
      missingCapabilities.push(capability);
    }
  }

  return {
    valid: missingCapabilities.length === 0,
    missingCapabilities
  };
}
