import { Theme } from '@mui/material/styles';
import { UseFormRegister, FieldValues } from 'react-hook-form';

export type tSelectProps = {
  label: string;
  name: string;
  formError: string | undefined;
  register: UseFormRegister<FieldValues>;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ['Самара', 'Ульяновск', 'Казань'];

const getStyles = (name: string, personName: string[], theme: Theme) => {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

export { MenuProps, names, getStyles };
