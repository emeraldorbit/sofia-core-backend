import spec from './deviation_engine_spec.json';

export function enforceDeviation(output: string, context: any): boolean {
  const violations = [];

  const { drift, pattern_integrity } = context.deviation || {};
  const {
    drift_min,
    drift_max,
    pattern_integrity_min,
    pattern_integrity_max,
    reject_drift
  } = spec.deviation;

  // Validate drift
  if (spec.enforcement.validate_drift) {
    if (
      drift === undefined ||
      drift < drift_min ||
      drift > drift_max
    ) {
      violations.push('Drift level out of bounds');
    }
  }

  // Validate pattern integrity
  if (spec.enforcement.validate_pattern_integrity) {
    if (
      pattern_integrity === undefined ||
      pattern_integrity < pattern_integrity_min ||
      pattern_integrity > pattern_integrity_max
    ) {
      violations.push('Pattern integrity out of bounds');
    }
  }

  // Reject drift
  if (spec.enforcement.reject_if_drifted && reject_drift) {
    if (context.drifted === true) {
      violations.push('Drift detected');
    }
  }

  // Log deviation events
  if (spec.enforcement.log_deviation_events) {
    console.log(
      `Deviation check → drift: ${drift}, pattern_integrity: ${pattern_integrity}, drifted: ${context.drifted}`
    );
  }

  return violations.length === 0;
}
