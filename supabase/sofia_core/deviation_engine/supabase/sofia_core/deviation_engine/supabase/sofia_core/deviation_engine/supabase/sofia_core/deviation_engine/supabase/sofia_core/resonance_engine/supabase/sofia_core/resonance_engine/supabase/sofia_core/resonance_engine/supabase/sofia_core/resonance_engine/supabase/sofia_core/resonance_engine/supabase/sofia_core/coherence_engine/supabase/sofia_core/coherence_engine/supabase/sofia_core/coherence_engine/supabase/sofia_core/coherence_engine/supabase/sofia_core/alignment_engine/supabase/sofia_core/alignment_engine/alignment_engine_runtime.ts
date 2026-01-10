import spec from './alignment_engine_spec.json';

export function enforceAlignment(output: string, context: any): boolean {
  const violations = [];

  const { intent_fit, mission_fit } = context.alignment || {};
  const {
    intent_fit_min,
    intent_fit_max,
    mission_fit_min,
    mission_fit_max,
    reject_misalignment
  } = spec.alignment;

  // Validate intent fit
  if (spec.enforcement.validate_intent_fit) {
    if (
      intent_fit === undefined ||
      intent_fit < intent_fit_min ||
      intent_fit > intent_fit_max
    ) {
      violations.push('Intent fit out of bounds');
    }
  }

  // Validate mission fit
  if (spec.enforcement.validate_mission_fit) {
    if (
      mission_fit === undefined ||
      mission_fit < mission_fit_min ||
      mission_fit > mission_fit_max
    ) {
      violations.push('Mission fit out of bounds');
    }
  }

  // Reject misalignment
  if (spec.enforcement.reject_if_misaligned && reject_misalignment) {
    if (context.misaligned === true) {
      violations.push('Misalignment detected');
    }
  }

  // Log alignment events
  if (spec.enforcement.log_alignment_events) {
    console.log(
      `Alignment check → intent_fit: ${intent_fit}, mission_fit: ${mission_fit}, misaligned: ${context.misaligned}`
    );
  }

  return violations.length === 0;
}
