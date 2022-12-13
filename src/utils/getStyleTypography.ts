export const getStyleTypography = (
  fontSize?: string | number,
  fontWeight?: string | number,
  lineHeight?: string,
  color?: string,
) => {
  const result: Record<string, string | number | undefined> = {
    fontSize,
    fontWeight,
    lineHeight,
    color,
  };

  Object.keys(result).forEach((key) => {
    if (!result[key]) delete result[key];
  });

  return result;
};
