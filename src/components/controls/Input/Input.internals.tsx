import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    '& .MuiInputBase-root': {
      background: '#f3f3f3',
      borderRadius: '6px',
      height: '52px',
    },
    '& .MuiInputBase-input': {
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '20px',
    },
    '& .MuiInputLabel-root': {
      paddingTop: '10px',
      paddingLeft: '8px',
      color: '#606060',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '20px',
      '&.MuiFormLabel-filled': {
        color: '#606060',
      },
      '&.Mui-focused': {
        color: '#7F7E82',
      },
      '&.Mui-error': {
        color: '#606060',
      },
    },
    '& .MuiInputBase-root::after': {
      border: 'none',
    },
    '& .MuiInputBase-root::before': {
      border: 'none',
    },
    '& .Mui-error::after': {
      border: 'none',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '& .MuiInputBase-root:hover:not(.Mui-disabled)::before': {
      border: 'none',
    },
  },
});

const styledBox = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
};

const styleLabel = {
  color: '#7F7E82',
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '20px',
  margin: '8px 0 16px',
};

export { useStyles, styledBox, styleLabel };
