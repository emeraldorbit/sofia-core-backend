import spec from './identity_filter_spec.json';

export function enforceIdentityFilter(output: string, context: any): boolean {
  const violations = [];

  const { identity_fit, signature_valid } = context.identity || {};
  const {
    identity_fit_min,
    identity_fit_max,
    mask_output_if_mismatch,
    reject_if_mismatch
  } = spec.identity;

  // Validate identity fit
  if (spec.enforcement.validate_identity_fit) {
    if (
      identity_fit === undefined ||
      identity_fit < identity_fit_min ||
      identity_fit > identity_fit_max
    ) {
      violations.push('Identity fit out of bounds');
    }
  }

  // Validate signature
  if (spec.enforcement.apply_signature_check) {
    if (signature_valid !== true) {
      violations.push('Signature check failed');
    }
  }

  // Persona filter (placeholder for future persona rules)
  if (spec.enforcement.apply_persona_filter) {
    // Persona filtering logic can be expanded here
  }

  // Mask or reject mismatches
  if (violations.length > 0) {
    if (reject_if_mismatch) return false;
    if (mask_output_if_mismatch) return false;
  }

  // Log identity events
  if (spec.enforcement.log_identity_events) {
    console.log(
      `Identity check → identity_fit: ${identity_fit}, signature_valid: ${signature_valid}`
    );
  }

  return true;
}
