import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '600px',
    height: '100%',
    margin: '0 auto 20px',
    padding: '26px',
    position: 'relative',
    [theme.breakpoints.down('xm')]: {
      padding: '20px',
      margin: '0 auto',
    },
    '& > img': {
      position: 'absolute',
      [theme.breakpoints.down('xm')]: {
        display: 'none',
      },
    },

    '& > img:nth-child(even)': {
      top: '15%',
      right: '-35%',
      transform: 'rotate(-21.48deg)',
    },

    '& > img:nth-child(odd)': {
      bottom: '30%',
      left: '-35%',
      transform: 'rotate(15deg)',
    },
  },
}));

const sxRegistrationTitle = {
  fontWeight: '700',
  fontSize: '32px',
  lineHeight: '40px',
  textAlign: 'center',
  letterSpacing: '0.05em',
  color: '#000',
};

export { useStyles, sxRegistrationTitle };
