import { validateConstraints } from './tonal_constraints';
import spec from './tonal_engine_spec.json';

export function enforceTonalGovernance(output: string, context: any): boolean {
  const violations = [];

  if (spec.runtime_enforcement.validate_register) {
    if (!context.register || !spec.constraints.temporal_register.includes(context.register)) {
      violations.push('Invalid temporal register');
    }
  }

  if (spec.runtime_enforcement.validate_hinge_state) {
    if (!context.hinge || !spec.constraints.hinge_modulation.states.includes(context.hinge)) {
      violations.push('Invalid hinge state');
    }
  }

  if (spec.runtime_enforcement.validate_membrane_integrity) {
    const { pressure, symmetry } = context.membrane || {};
    if (pressure < spec.constraints.membrane_protocol.pressure_threshold ||
        symmetry < spec.constraints.membrane_protocol.loop_symmetry_min) {
      violations.push('Membrane integrity violation');
    }
  }

  const constraintViolations = validateConstraints(output, spec.constraints);
  violations.push(...constraintViolations);

  if (spec.runtime_enforcement.reject_if_violation && violations.length > 0) {
    console.warn('Output rejected due to tonal governance violations:', violations);
    return false;
  }

  return true;
}
