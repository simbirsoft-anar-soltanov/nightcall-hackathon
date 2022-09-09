import { isNonUndefined, NonUndefined } from './typeHelpers';

export const omitUndefined = <T>(
  object: Record<string, T>,
): Record<string, NonUndefined<T>> => {
  const entries = Object.entries(object);
  return entries.reduce(
    (previousValue: Record<string, NonUndefined<T>>, [key, value]) => {
      if (isNonUndefined(value)) {
        previousValue[key] = value;
      }
      return previousValue;
    },
    {},
  );
};
