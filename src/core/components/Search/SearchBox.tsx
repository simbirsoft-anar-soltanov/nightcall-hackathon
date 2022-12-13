import { FC, Fragment } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, FormLabel, Grid } from '@mui/material';
import { Search } from '@mui/icons-material';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import SearchInput from 'core/components/Search/SearchInput';
import DropDown from 'components/controls/Dropdown/Dropdown';
import {
  sxSearchBoxContainer,
  sxLeftBoxSearch,
  sxSearchButton,
  searchNameFields,
  initSearch,
  tSearchFilters,
  schema,
  sxSearchLabel,
  tItems,
} from './SearchBox.internals';

type tSearchBox = {
  handleFiltersEvents: (filters: tSearchFilters) => void;
};

const SearchBox: FC<tSearchBox> = ({ handleFiltersEvents }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initSearch,
  });

  const onSubmit = handleSubmit((fields) => {
    handleFiltersEvents(fields as tSearchFilters);
  });

  return (
    <Grid component='form' onSubmit={onSubmit} sx={sxSearchBoxContainer}>
      <SearchInput
        label='Поиск мероприятия'
        name='search'
        register={register}
        formError={errors?.search?.message as string}
      />

      <Box sx={sxLeftBoxSearch}>
        {searchNameFields.map(({ key, label, name, type, items }) => (
          <Fragment key={key}>
            {type === 'dropdown' && (
              <Box sx={{ display: 'grid' }}>
                <Box className='mb-1 pl-1'>
                  <FormLabel sx={sxSearchLabel}>{label}</FormLabel>
                </Box>

                <DropDown
                  name={name}
                  control={control}
                  value=''
                  items={items as tItems}
                />
              </Box>
            )}

            {type === 'input' && (
              <SearchInput
                label={label}
                name={name}
                register={register}
                formError={errors?.[name]?.message as string}
              />
            )}
          </Fragment>
        ))}
      </Box>

      <Box sx={{ display: 'grid' }}>
        <Button type='submit' sx={sxSearchButton}>
          <Search className='mr-3' />
          Найти
        </Button>
      </Box>
      <Box>
        <Button
          size='medium'
          onClick={() => {
            reset(initSearch);
            handleFiltersEvents(initSearch as tSearchFilters);
          }}
          sx={sxSearchButton}
        >
          <RotateLeftIcon className='mr-3' />
          Сброс
        </Button>
      </Box>
    </Grid>
  );
};

export default SearchBox;
