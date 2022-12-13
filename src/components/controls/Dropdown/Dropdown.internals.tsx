import { makeStyles } from '@mui/styles';
import { MenuProps } from '@mui/material';
import { getStyleTypography } from 'utils/getStyleTypography';

const useStyles = makeStyles({
  formControl: {
    border: '1px solid #7F7E82',

    '& .MuiInputBase-root': {
      minWidth: '150px',
      color: '#848484',
      justifyContent: 'center',
      border: '1.5px solid #A7ABAC',
      background: '#fff',
    },
    '& .MuiSelect-select.MuiSelect-select': {
      color: '#1E1E1E',
      padding: '4px 16px',
    },
    '& .MuiSelect-root.Mui-focused': {
      border: 'none',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
  select: {
    minHeight: '31px !important',
    width: 'auto',
    ...getStyleTypography('14px', 400, undefined, '#1E1E1E'),

    '&:focus': {
      backgroundColor: 'none',
    },
  },
  selectIcon: {
    position: 'relative',
    color: '#1E1E1E',
    fontSize: '24px',
  },
  paper: {
    marginTop: 8,
    marginLeft: 8,
    minWidth: '150px',
  },
  list: {
    padding: 0,
    width: '150px',
    color: '#1E1E1E',
    '& li': {
      paddingTop: 8,
      paddingBottom: 8,
      outline: 'none',
      ...getStyleTypography('14px', 400, '20px'),
    },
    '& li.Mui-selected': {
      background: '#fff',
    },
    '& li.Mui-selected:hover': {
      background: '#fff',
    },
    '& li.Mui-selected:focus': {
      background: '#fff',
    },
  },
});

const handleMenuProps = (
  list?: string,
  paper?: string,
): Partial<MenuProps> => ({
  classes: { list, paper },
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'center',
  },
  disableScrollLock: true,
});

const getSxManage = (isManage?: boolean) =>
  isManage
    ? {
        ['.MuiInputBase-root']: {
          height: '28px',
          ...getStyleTypography('14px', 400, '20px', '#000'),
        },
        ['.MuiSelect-icon']: {
          color: '#000',
        },
      }
    : undefined;

export { useStyles, handleMenuProps, getSxManage };
