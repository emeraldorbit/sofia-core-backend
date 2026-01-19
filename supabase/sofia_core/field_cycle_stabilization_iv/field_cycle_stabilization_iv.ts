export type FieldCycleStabilizationIVState<T> = {
  stabilized: boolean;
  value: T;
};

export function stabilizeFieldCycleIV<T>(
  input: T,
  stabilizer: (value: T) => T
): FieldCycleStabilizationIVState<T> {
  const value = stabilizer(input);
  return {
    stabilized: true,
    value,
  };
}
