import spec from './deviation_engine_spec.json';

export function enforceDeviation(output: string, context: any): boolean {
  const violations = [];

  const deviation = context.deviation;
  const { min, max, preferred_band } = spec.deviation;

  // Validate deviation bounds
  if (spec.enforcement.validate_bounds) {
    if (
      deviation === undefined ||
      deviation < min ||
      deviation > max
    ) {
      violations.push('Deviation outside global bounds');
    }
  }

  // Validate preferred band
  if (spec.enforcement.validate_preferred_band) {
    const [low, high] = preferred_band;
    if (deviation < low || deviation > high) {
      violations.push('Deviation outside preferred band');
    }
  }

  // Reject flat responses
  if (spec.deviation.reject_flat_responses) {
    if (context.flat === true) {
      violations.push('Flat response detected');
    }
  }

  // Log deviation events
  if (spec.enforcement.log_deviation_events) {
    console.log(
      `Deviation check → deviation: ${deviation}, flat: ${context.flat}`
    );
  }

  return violations.length === 0;
}
