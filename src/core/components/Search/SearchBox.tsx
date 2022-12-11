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
  tSearch,
} from './SearchBox.internals';

type tSearchBox = {
  searchEvents: (x: tSearch) => void;
};

const SearchBox: FC<tSearchBox> = ({ searchEvents }) => {
  const [searchData, setSearchData] = useState(initSearch);

  const changeValue = (options: tOptions) => {
    const { value, field } = options;
    setSearchData((prev) => ({ ...prev, [field]: value }));
  };

  const handlerSearchEvents = () => {
    searchEvents(searchData);
  };

  return (
    <Grid sx={sxSearchBoxContainer}>
      <Box sx={sxLeftBoxSearch}>
        {searchNameFields.map((searchField) => (
          <SearchInput
            key={searchField.key}
            title={searchField.title}
            field={searchField.field}
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
