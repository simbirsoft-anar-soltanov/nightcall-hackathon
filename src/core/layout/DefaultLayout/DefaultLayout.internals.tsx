import { ReactNode } from 'react';
import { makeStyles } from '@mui/styles';

export type tDefaultLayout = { children: ReactNode };

const useStyles = makeStyles({
  root: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '28px',
    height: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  logo: {
    width: 48,
    height: 48,
  },
  userBlock: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    gap: '12px',
  },
  userName: {
    color: '#000',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: 0.8,
  },
});

export { useStyles };
