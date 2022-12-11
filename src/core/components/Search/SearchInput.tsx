import React, { FC, useState } from 'react';
import { Box, FormLabel, TextField } from '@mui/material';
import {
  sxSearchInput,
  sxSearchLabel,
  sxItemLeftBoxSearch,
  tOptions,
} from 'core/components/Search/SearchBox.internals';

type tSearchInput = {
  title: string;
  field: string;
  changeValue: (x: tOptions) => void;
};

const SearchInput: FC<tSearchInput> = ({ title, field, changeValue }) => {
  const [value, setValue] = useState('');

  const handlerChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    changeValue({ field, value: newValue });
  };

  return (
    <Box sx={sxItemLeftBoxSearch}>
      <Box className='mb-1 pl-3'>
        <FormLabel sx={sxSearchLabel}>{title}</FormLabel>
      </Box>
      <TextField
        size='small'
        sx={sxSearchInput}
        className='custom-input'
        onChange={handlerChangeValue}
        value={value}
      />
    </Box>
  );
};

export default SearchInput;
