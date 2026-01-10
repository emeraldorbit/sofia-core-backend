import spec from './deviation_engine_spec.json';

export function enforceDeviation(output: string, context: any): boolean {
  const violations = [];

  const { deviation_score, hallucination_markers } = context.deviation || {};
  const {
    deviation_min,
    deviation_max,
    reject_if_exceeds,
    flag_hallucinations
  } = spec.deviation;

  // Validate deviation score
  if (spec.enforcement.validate_deviation_score) {
    if (
      deviation_score === undefined ||
      deviation_score < deviation_min ||
      deviation_score > deviation_max
    ) {
      violations.push('Deviation score out of bounds');
    }
  }

  // Check hallucination markers
  if (spec.enforcement.check_hallucination_markers) {
    if (flag_hallucinations && hallucination_markers === true) {
      violations.push('Hallucination markers detected');
    }
  }

  // Context divergence placeholder
  if (spec.enforcement.check_context_divergence) {
    // Future expansion for context divergence logic
  }

  // Reject if deviation exceeds limits
  if (violations.length > 0 && reject_if_exceeds) {
    return false;
  }

  // Log deviation events
  if (spec.enforcement.log_deviation_events) {
    console.log(
      `Deviation check → deviation_score: ${deviation_score}, hallucinations: ${hallucination_markers}`
    );
  }

  return violations.length === 0;
}
