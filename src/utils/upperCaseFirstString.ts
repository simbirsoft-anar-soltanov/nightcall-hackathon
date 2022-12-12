export const upperCaseFirstString = (value: string) => {
  if (!value) return;

  return value[0].toUpperCase() + value.slice(1);
};
