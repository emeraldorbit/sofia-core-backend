import spec from './resonance_engine_spec.json';

export function enforceResonance(output: string, context: any): boolean {
  const violations = [];

  const { amplitude, coherence } = context.resonance || {};
  const {
    amplitude_min,
    amplitude_max,
    coherence_min,
    coherence_max,
    reject_dissonance
  } = spec.resonance;

  // Validate amplitude
  if (spec.enforcement.validate_amplitude) {
    if (
      amplitude === undefined ||
      amplitude < amplitude_min ||
      amplitude > amplitude_max
    ) {
      violations.push('Resonance amplitude out of bounds');
    }
  }

  // Validate coherence
  if (spec.enforcement.validate_coherence) {
    if (
      coherence === undefined ||
      coherence < coherence_min ||
      coherence > coherence_max
    ) {
      violations.push('Resonance coherence out of bounds');
    }
  }

  // Reject dissonance
  if (spec.enforcement.reject_if_dissonant && reject_dissonance) {
    if (context.dissonance === true) {
      violations.push('Dissonance detected');
    }
  }

  // Log resonance events
  if (spec.enforcement.log_resonance_events) {
    console.log(
      `Resonance check → amplitude: ${amplitude}, coherence: ${coherence}, dissonance: ${context.dissonance}`
    );
  }

  return violations.length === 0;
}
