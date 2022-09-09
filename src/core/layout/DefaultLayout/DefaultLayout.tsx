import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

type tDefaultLayout = { children: ReactNode };

const useStyles = makeStyles({
  root: {
    maxWidth: '1240px',
    margin: '0 auto',
    padding: '28px',
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
