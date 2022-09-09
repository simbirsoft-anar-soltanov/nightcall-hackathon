import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

type tDefaultLayout = { children: ReactNode };

const useStyles = makeStyles({
  root: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '28px',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
  },
});

const DefaultLayout = ({ children }: tDefaultLayout) => {
  const classes = useStyles();

  return (
    <Box component='section' className={classes.root}>
      {children}
    </Box>
  );
};

export default DefaultLayout;
