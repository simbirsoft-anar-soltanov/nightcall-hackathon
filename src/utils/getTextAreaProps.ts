export const getTextAreaProps = (helperText: string) => ({
  multiline: true,
  rows: 4,
  maxRows: 6,
  inputProps: { maxLength: 255 },
  helperText,
});
