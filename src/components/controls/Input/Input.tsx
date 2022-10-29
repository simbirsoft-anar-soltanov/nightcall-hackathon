import { Box, TextField, TextFieldProps, Typography } from '@mui/material';
import ErrorDescription from 'components/controls/ErrorDescription/ErrorDescription';
import { useStyles, styledBox, styleLabel } from './Input.internals';
import { tInputProps } from './types';

const Input = ({
  label,
  formError,
  name,
  register,
  placeholder,
  multiline,
  rows,
  maxRows,
  inputProps,
  helperText,
  sx,
}: tInputProps & TextFieldProps) => {
  const { root, rootTextArea } = useStyles();

  const extraProps = { multiline, rows, maxRows, inputProps, helperText, sx };

  return (
    <Box sx={styledBox}>
      {label && <Typography sx={styleLabel}>{label}</Typography>}
      <TextField
        spellCheck={false}
        classes={{ root: rows ? rootTextArea : root }}
        placeholder={placeholder}
        error={!!formError}
        {...register(name)}
        {...extraProps}
      />
      {formError && (
        <ErrorDescription
          text={formError}
          extraStyle={{ position: 'absolute', bottom: '-26px' }}
        />
      )}
    </Box>
  );
};

export default Input;
