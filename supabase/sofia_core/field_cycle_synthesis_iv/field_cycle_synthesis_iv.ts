export type FieldCycleSynthesisIVState<T> = {
  synthesized: boolean;
  value: T;
};

export function synthesizeFieldCycleIV<T>(
  extendedIV: T,
  synthesizer: (value: T) => T
): FieldCycleSynthesisIVState<T> {
  const value = synthesizer(extendedIV);
  return {
    synthesized: true,
    value,
  };
}
