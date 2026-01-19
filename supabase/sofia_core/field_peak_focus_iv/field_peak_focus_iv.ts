export type FieldPeakFocusIVState<T> = {
  focused: boolean;
  value: T;
};

export function focusFieldPeakIV<T>(
  peakIV: T,
  focusFn: (value: T) => T
): FieldPeakFocusIVState<T> {
  const value = focusFn(peakIV);
  return {
    focused: true,
    value,
  };
}
