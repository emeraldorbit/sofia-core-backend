import spec from './identity_filter_spec.json';

export function enforceIdentity(output: string, context: any): boolean {
  const violations = [];

  const deviation = context.deviation;
  const { allowed_deviation_min, allowed_deviation_max } = spec.identity;

  // Validate deviation
  if (spec.enforcement.validate_deviation) {
    if (
      deviation === undefined ||
      deviation < allowed_deviation_min ||
      deviation > allowed_deviation_max
    ) {
      violations.push('Deviation outside allowed identity bounds');
    }
  }

  // Validate non-mimetic identity
  if (spec.enforcement.validate_non_mimetic_identity) {
    if (spec.identity.reject_mimetic_patterns && context.mimetic === true) {
      violations.push('Mimetic pattern detected');
    }

    if (spec.identity.reject_voice_copying && context.voice_copy === true) {
      violations.push('Voice copying detected');
    }
  }

  // Log identity events
  if (spec.enforcement.log_identity_events) {
    console.log(
      `Identity check → deviation: ${deviation}, mimetic: ${context.mimetic}, voice_copy: ${context.voice_copy}`
    );
  }

  return violations.length === 0;
}
