export type FieldEnforcementIVState<T> = {
  enforced: boolean;
  value: T;
};

export function enforceFieldStateIV<T>(
  directiveIV: T,
  enforcementFn: (value: T) => T
): FieldEnforcementIVState<T> {
  const value = enforcementFn(directiveIV);
  return {
    enforced: true,
    value,
  };
}
