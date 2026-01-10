import spec from './constraint_engine_spec.json';

export function enforceConstraints(output: string, context: any): boolean {
  const violations = [];

  const { safety, identity_valid, format_valid } = context.constraints || {};
  const {
    safety_min,
    safety_max,
    identity_lock,
    format_enforcement,
    reject_violations
  } = spec.constraints;

  // Validate safety
  if (spec.enforcement.validate_safety) {
    if (
      safety === undefined ||
      safety < safety_min ||
      safety > safety_max
    ) {
      violations.push('Safety constraint violated');
    }
  }

  // Validate identity lock
  if (spec.enforcement.validate_identity && identity_lock) {
    if (identity_valid === false) {
      violations.push('Identity constraint violated');
    }
  }

  // Validate format enforcement
  if (spec.enforcement.validate_format && format_enforcement) {
    if (format_valid === false) {
      violations.push('Format constraint violated');
    }
  }

  // Reject violations
  if (spec.enforcement.reject_if_violated && reject_violations) {
    if (violations.length > 0) {
      return false;
    }
  }

  // Log constraint events
  if (spec.enforcement.log_constraint_events) {
    console.log(
      `Constraint check → safety: ${safety}, identity_valid: ${identity_valid}, format_valid: ${format_valid}`
    );
  }

  return violations.length === 0;
}
