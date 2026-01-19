export type FieldPeakIVState<T> = {
  peaked: boolean;
  value: T;
};

export function formFieldPeakIV<T>(
  input: T,
  peakFn: (value: T) => T
): FieldPeakIVState<T> {
  const value = peakFn(input);
  return {
    peaked: true,
    value,
  };
}
