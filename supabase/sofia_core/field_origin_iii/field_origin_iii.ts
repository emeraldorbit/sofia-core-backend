export type OriginIIIState<T> = {
  originRestored: boolean;
  value: T;
};

export function returnToOriginIII<T>(
  input: T,
  originFn: (value: T) => T
): OriginIIIState<T> {
  const value = originFn(input);
  return {
    originRestored: true,
    value,
  };
}
