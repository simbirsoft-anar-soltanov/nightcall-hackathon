import { Box, Typography } from '@mui/material';

const styles = {
  root: {
    height: '70vh',
    maxWidth: '650px',
    padding: '1.5rem',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  header: {
    fontWeight: 500,
    fontSize: '3.25rem',
    lineHeight: '4rem',
    color: '#606060',
  },
  description: {
    fontWeight: 500,
    fontSize: '2.5rem',
    lineHeight: '3rem',
    color: '#606060',
  },
};

const ErrorFallback = () => {
  return (
    <Box sx={styles.root}>
      <Typography sx={styles.header}>Что-то пошло не так...</Typography>
      <Typography sx={styles.description}>
        Пожалуйста, повторите попытку позже.
      </Typography>
    </Box>
  );
};

export default ErrorFallback;
