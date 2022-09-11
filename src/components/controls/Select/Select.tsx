import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import NativeSelect from '@mui/material/NativeSelect';
import { names, tSelectProps } from './Select.internals';
import { SelectProps } from '@mui/material/Select';
import ErrorDescription from '../ErrorDescription/ErrorDescription';
import { styleLabel } from '../Input/Input.internals';

const Select: FC<tSelectProps & SelectProps> = ({
  label,
  formError,
  name,
  register,
}) => {
  return (
    <Box>
      {label && <Typography sx={styleLabel}>{label}</Typography>}
      <NativeSelect defaultValue={30} {...register(name)}>
        {names.map((name) => (
          <option value={name} key={name}>
            {name}
          </option>
        ))}
      </NativeSelect>
      {formError && (
        <ErrorDescription
          text={formError}
          extraStyle={{ position: 'absolute', bottom: '-26px' }}
        />
      )}
    </Box>
  );
};

export default Select;
