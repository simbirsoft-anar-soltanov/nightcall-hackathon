import * as yup from 'yup';
import { yupFields } from 'utils/yupFields';

const {
  filterForm: { city, startDate, category },
} = yupFields;

const schema = yup.object({
  city,
  startDate,
  category,
});

export type tItems = { key: string; value: string }[];

type tItemSearchNameFields = {
  key: number;
  label: string;
  name: string;
  type: string;
  items?: tItems;
};

const searchNameFields: Array<tItemSearchNameFields> = [
  {
    key: 1,
    label: 'Дата проведения',
    name: 'startDate',
    type: 'input',
  },
  {
    key: 2,
    label: 'Город',
    name: 'city',
    type: 'dropdown',
    items: [
      { key: 'Samara', value: 'Самара' },
      { key: 'Ulyanovsk', value: 'Ульяновск' },
      { key: 'Kazan', value: 'Казань' },
    ],
  },
  {
    key: 3,
    label: 'Категории',
    name: 'category',
    type: 'dropdown',
    items: [
      { key: 'eco', value: 'Экология' },
      { key: 'volunteering', value: 'Волонтёрство' },
      { key: 'shelter', value: 'Помощь приютам' },
    ],
  },
];

export type tOptions = {
  value: string;
  field: string;
};

export type tSearchFilters = {
  [index: string]: string;
  [key: number]: string;
  search: string;
  city: string;
  startDate: string;
  category: string;
};

const initSearch: tSearchFilters = {
  search: '',
  city: '',
  startDate: '',
  category: '',
};

const sxSearchBoxContainer = {
  padding: '24px',
  background: '#FFF',
  boxShadow: '0 7px 40px rgba(31, 37, 113, 0.07)',
  borderRadius: '20px',
  border: '1px solid #E1E3E8',
  backgroundColor: '#E1E3E8',
  display: 'grid',
  gridTemplate: `'search search btn' auto 'filter filter filter' 1fr / 1fr`,
  gridAutoFlow: 'column',
  alignItems: 'flex-end',
  gap: '12px',
};

const sxLeftBoxSearch = {
  display: 'grid',
  gridAutoFlow: 'column',
  gridTemplate: 'auto/ 1fr 1fr 1fr 200px',
  gap: '12px',
  alignItems: 'flex-end',
};

const sxSearchLabel = {
  fontWeight: '500',
  fontSize: '12px',
  color: '#7780A1',
};

const sxItemLeftBoxSearch = {
  flex: '0 0 33.33333%',
  width: '33.33333',
  padding: '0 15px',
  paddingLeft: '15px',
};

const sxSearchInput = {
  backgroundColor: '#fff',
  overflow: 'hidden',
  borderRadius: '4px',
  width: '100%',
  '&:hover fieldset': {
    borderColor: 'rgba(0, 0, 0, 0.23) !important',
  },
};

const sxSearchButton = {
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
  schema,
  searchNameFields,
  initSearch,
  sxSearchBoxContainer,
  sxSearchLabel,
  sxLeftBoxSearch,
  sxItemLeftBoxSearch,
  sxSearchInput,
  sxSearchButton,
};
