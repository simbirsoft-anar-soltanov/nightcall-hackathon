export type NonUndefined<T> = T extends undefined ? never : T;

export const isNonUndefined = <T>(value: T): value is NonUndefined<T> => {
  return value !== undefined;
};
