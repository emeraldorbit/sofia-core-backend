export type FieldDirectiveIVState<T> = {
  directed: boolean;
  value: T;
};

export function directFieldStateIV<T>(
  authorityIV: T,
  directiveFn: (value: T) => T
): FieldDirectiveIVState<T> {
  const value = directiveFn(authorityIV);
  return {
    directed: true,
    value,
  };
}
