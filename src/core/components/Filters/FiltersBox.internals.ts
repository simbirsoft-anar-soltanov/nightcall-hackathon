const sxFiltersBoxContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '24px',
  background: '#FFF',
  boxShadow: '0 7px 40px rgba(31, 37, 113, 0.07)',
  borderRadius: '20px',
  border: '1px solid #E1E3E8',
  backgroundColor: '#E1E3E8',
};

const sxLeftBoxFilters = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  flex: '0 0 75%',
  width: '70%',
};

const sxFiltersLabel = {
  fontWeight: '500',
  fontSize: '12px',
  color: '#7780A1',
};

const sxItemLeftBoxFilters = {
  flex: '0 0 33.33333%',
  width: '33.33333',
  padding: '0 15px',
  paddingLeft: '15px',
};

const sxFiltersInput = {
  backgroundColor: '#fff',
  overflow: 'hidden',
  borderRadius: '4px',
  width: '100%',
  '&:hover fieldset': {
    // Todo попробовать убрать импотэнт
    borderColor: 'rgba(0, 0, 0, 0.23) !important',
  },
};

const sxFiltersButton = {
  width: '142px',
  height: '46px',
  border: '2px solid #4745D0',
  borderRadius: '12px',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '24px',
  color: '#fff',
  textTransform: 'none',
  backgroundColor: '#4745D0',
  '&:hover': {
    backgroundColor: '#4745D0',
    color: '#fff',
  },
};

export {
  sxFiltersBoxContainer,
  sxFiltersLabel,
  sxLeftBoxFilters,
  sxItemLeftBoxFilters,
  sxFiltersInput,
  sxFiltersButton,
};
