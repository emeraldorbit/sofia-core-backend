export type FieldApexExpressionIVState<T> = {
  expressed: boolean;
  value: T;
};

export function expressApexStateIV<T>(
  focusIV: T,
  expressFn: (value: T) => T
): FieldApexExpressionIVState<T> {
  const value = expressFn(focusIV);
  return {
    expressed: true,
    value,
  };
}
