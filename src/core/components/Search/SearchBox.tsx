import { FC, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { Search } from '@mui/icons-material';
import SearchInput from 'core/components/Search/SearchInput';
import {
  sxSearchBoxContainer,
  sxLeftBoxSearch,
  sxSearchButton,
  searchNameFields,
  initSearch,
  tOptions,
  tSearchFilters,
} from './SearchBox.internals';

type tSearchBox = {
  handleFiltersEvents: (filters: tSearchFilters) => void;
};

const SearchBox: FC<tSearchBox> = ({ handleFiltersEvents }) => {
  const [searchData, setSearchData] = useState(initSearch);

  const changeValue = (options: tOptions) => {
    const { value, field } = options;
    setSearchData((prev) => ({ ...prev, [field]: value }));
  };

  const handlerSearchEvents = () => handleFiltersEvents(searchData);

  return (
    <Grid sx={sxSearchBoxContainer}>
      <Box sx={sxLeftBoxSearch}>
        {searchNameFields.map(({ key, title, field }) => (
          <SearchInput
            key={key}
            title={title}
            field={field}
            changeValue={changeValue}
          />
        ))}
      </Box>

      <Box>
        <Button sx={sxSearchButton} onClick={handlerSearchEvents}>
          <Search className='mr-3' />
          Найти
        </Button>
      </Box>
    </Grid>
  );
};

export default SearchBox;
