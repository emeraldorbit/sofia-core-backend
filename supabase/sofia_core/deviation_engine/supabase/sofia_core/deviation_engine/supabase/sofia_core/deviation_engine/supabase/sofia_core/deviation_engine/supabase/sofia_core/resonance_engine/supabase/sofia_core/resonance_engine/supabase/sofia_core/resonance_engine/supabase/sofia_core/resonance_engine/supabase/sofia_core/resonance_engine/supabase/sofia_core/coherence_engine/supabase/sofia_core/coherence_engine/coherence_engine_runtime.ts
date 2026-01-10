import spec from './coherence_engine_spec.json';

export function enforceCoherence(output: string, context: any): boolean {
  const violations = [];

  const { continuity, structure } = context.coherence || {};
  const {
    continuity_min,
    continuity_max,
    structure_min,
    structure_max,
    reject_fragmentation
  } = spec.coherence;

  // Validate continuity
  if (spec.enforcement.validate_continuity) {
    if (
      continuity === undefined ||
      continuity < continuity_min ||
      continuity > continuity_max
    ) {
      violations.push('Coherence continuity out of bounds');
    }
  }

  // Validate structure
  if (spec.enforcement.validate_structure) {
    if (
      structure === undefined ||
      structure < structure_min ||
      structure > structure_max
    ) {
      violations.push('Coherence structure out of bounds');
    }
  }

  // Reject fragmentation
  if (spec.enforcement.reject_if_fragmented && reject_fragmentation) {
    if (context.fragmented === true) {
      violations.push('Fragmentation detected');
    }
  }

  // Log coherence events
  if (spec.enforcement.log_coherence_events) {
    console.log(
      `Coherence check → continuity: ${continuity}, structure: ${structure}, fragmented: ${context.fragmented}`
    );
  }

  return violations.length === 0;
}
