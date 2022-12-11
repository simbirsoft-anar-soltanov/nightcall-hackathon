export const dataIsEmpty = (x: Record<any, string>): boolean => {
  const isEmpty = Object.keys(x).reduce((result, key) => {
    if (x[key] !== '') {
      return [...result, key];
    }
    return result;
  }, [] as Array<string>);
  return !isEmpty.length;
};
