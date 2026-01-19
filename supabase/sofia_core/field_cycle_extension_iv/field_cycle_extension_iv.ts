export type FieldCycleExtensionIVState<T> = {
  extended: boolean;
  value: T;
};

export function extendFieldCycleIV<T>(
  stabilizedIV: T,
  extender: (value: T) => T
): FieldCycleExtensionIVState<T> {
  const value = extender(stabilizedIV);
  return {
    extended: true,
    value,
  };
}
