/**
 * Genesis-Continuum-II state representing second-order renewal continuity.
 */
export type GenesisContinuumIIState<T> = {
  continuous: boolean;
  value: T;
};

/**
 * Continue second-order genesis into the ongoing continuum.
 */
export function continueGenesisII<T>(
  generationII: T,
  continuer: (value: T) => T
): GenesisContinuumIIState<T> {
  const value = continuer(generationII);
  return {
    continuous: true,
    value,
  };
}
