import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

type tAuthContainer = { children: ReactNode };

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '600px',
    margin: '60px auto 20px',
    padding: '28px',
  },
});

const AuthLayout = ({ children }: tAuthContainer) => {
  const classes = useStyles();

  return (
    <Box component='section' className={classes.root}>
      {children}
    </Box>
  );
};

export default AuthLayout;
