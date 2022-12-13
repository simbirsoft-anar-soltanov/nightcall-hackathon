import { FC } from 'react';
import { Box, FormLabel, TextField, TextFieldProps } from '@mui/material';
import { tInputProps } from 'components/controls/Input/types';
import {
  sxSearchInput,
  sxSearchLabel,
  sxItemLeftBoxSearch,
} from 'core/components/Search/SearchBox.internals';

type tSearchInput = tInputProps & TextFieldProps;

const SearchInput: FC<tSearchInput> = ({
  label,
  name,
  register,
  formError,
}) => {
  return (
    <Box sx={sxItemLeftBoxSearch}>
      <Box className='mb-1 pl-1'>
        <FormLabel sx={sxSearchLabel}>{label}</FormLabel>
      </Box>

      <TextField
        size='small'
        className='custom-input'
        defaultValue=''
        sx={sxSearchInput}
        error={!!formError}
        {...register(name)}
      />
    </Box>
  );
};

export default SearchInput;
