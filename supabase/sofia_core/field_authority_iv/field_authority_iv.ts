export type FieldAuthorityIVState<T> = {
  authorized: boolean;
  value: T;
};

export function authorizeFieldStateIV<T>(
  input: T,
  authorityFn: (value: T) => T
): FieldAuthorityIVState<T> {
  const value = authorityFn(input);
  return {
    authorized: true,
    value,
  };
}
