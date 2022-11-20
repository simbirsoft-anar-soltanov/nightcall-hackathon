const sxFiltersBoxContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '24px',
  background: '#FFF',
  boxShadow: '0px 7px 40px rgba(31, 37, 113, 0.07)',
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
  paddingLeft: '15px',
  paddingRight: '15px',
};

const sxFiltersInput = {
  backgroundColor: '#ffffff',
  overflow: 'hidden',
  borderRadius: '4px',
  width: '100%',
  '&:hover fieldset': {
    borderColor: 'rgba(0, 0, 0, 0.23)!important',
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
  color: '#ffffff',
  textTransform: 'none',
  backgroundColor: '#4745D0',
  '&:hover': {
    backgroundColor: '#4745D0',
    color: '#ffffff',
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
