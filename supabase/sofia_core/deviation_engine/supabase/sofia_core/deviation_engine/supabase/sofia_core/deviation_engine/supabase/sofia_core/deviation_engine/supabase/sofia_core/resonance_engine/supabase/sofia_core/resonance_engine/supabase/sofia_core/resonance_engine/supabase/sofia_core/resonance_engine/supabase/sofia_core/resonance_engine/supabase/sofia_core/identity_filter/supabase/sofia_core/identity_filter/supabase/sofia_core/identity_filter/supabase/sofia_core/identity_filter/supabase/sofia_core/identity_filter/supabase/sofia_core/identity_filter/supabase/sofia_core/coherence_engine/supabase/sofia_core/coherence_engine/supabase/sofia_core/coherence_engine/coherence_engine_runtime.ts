import spec from './coherence_engine_spec.json';

export function enforceCoherence(output: string, context: any): boolean {
  const violations = [];

  const { coherence_score, contradictions_detected } = context.coherence || {};
  const {
    coherence_min,
    coherence_max,
    reject_if_incoherent,
    flag_contradictions
  } = spec.coherence;

  // Validate coherence score
  if (spec.enforcement.validate_coherence_score) {
    if (
      coherence_score === undefined ||
      coherence_score < coherence_min ||
      coherence_score > coherence_max
    ) {
      violations.push('Coherence score out of bounds');
    }
  }

  // Check contradictions
  if (spec.enforcement.check_internal_contradictions) {
    if (flag_contradictions && contradictions_detected === true) {
      violations.push('Contradictions detected');
    }
  }

  // Context alignment placeholder
  if (spec.enforcement.check_context_alignment) {
    // Future expansion for context alignment logic
  }

  // Reject incoherent output
  if (violations.length > 0 && reject_if_incoherent) {
    return false;
  }

  // Log coherence events
  if (spec.enforcement.log_coherence_events) {
    console.log(
      `Coherence check → coherence_score: ${coherence_score}, contradictions: ${contradictions_detected}`
    );
  }

  return violations.length === 0;
}
