import { Box, Button, Grid, TextField, FormLabel } from '@mui/material';
import {
  sxFiltersBoxContainer,
  sxFiltersLabel,
  sxLeftBoxFilters,
  sxItemLeftBoxFilters,
  sxFiltersInput,
  sxFiltersButton,
} from './FiltersBox.internals';
import { Search } from '@mui/icons-material';

const FiltersBox = () => {
  return (
    <Grid sx={sxFiltersBoxContainer}>
      <Box sx={sxLeftBoxFilters}>
        <Box sx={sxItemLeftBoxFilters}>
          <Box className='mb-1 pl-3'>
            <FormLabel sx={sxFiltersLabel}>Город</FormLabel>
          </Box>
          <TextField
            size='small'
            sx={sxFiltersInput}
            className='custom-input'
          />
        </Box>
        <Box sx={sxItemLeftBoxFilters}>
          <Box className='mb-1 pl-3'>
            <FormLabel sx={sxFiltersLabel}>Дата проведения</FormLabel>
          </Box>
          <TextField
            size='small'
            sx={sxFiltersInput}
            className='custom-input'
          />
        </Box>
        <Box sx={sxItemLeftBoxFilters}>
          <Box className='mb-1 pl-3'>
            <FormLabel sx={sxFiltersLabel}>Категории</FormLabel>
          </Box>
          <TextField
            size='small'
            sx={sxFiltersInput}
            className='custom-input'
          />
        </Box>
      </Box>
      <Box>
        <Button sx={sxFiltersButton}>
          <Search className='mr-3' />
          Найти
        </Button>
      </Box>
    </Grid>
  );
};

export default FiltersBox;
