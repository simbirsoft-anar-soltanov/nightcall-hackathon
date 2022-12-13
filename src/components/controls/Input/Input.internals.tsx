import { makeStyles } from '@mui/styles';

const getSxInput = (isTextArea?: boolean) => ({
  '& .MuiInputBase-root': {
    background: '#f3f3f3',
    borderRadius: '6px',
    height: `${isTextArea ? 'auto' : '46px'}`,
  },
  '& .MuiInputBase-input': {
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '20px',
  },
  '.MuiDialog-container & .MuiInputBase-input': {
    maxWidth: '100%',
    width: '600px',
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
  '& .MuiFormHelperText-root': {
    position: 'absolute',
    right: '-5px',
    bottom: '0',
    textAlign: 'right',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20px',
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
});

const useStyles = makeStyles({
  root: getSxInput(),
  rootTextArea: getSxInput(true),
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
  margin: '8px 0',
};

export { useStyles, styledBox, styleLabel };
