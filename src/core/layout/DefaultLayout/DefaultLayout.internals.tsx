import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '28px',
    height: '100vh',
  },
  headerContainer: {
    borderBottom: '1px solid #DBDBDB',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1280px',
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

const authPatnNames = ['/entry/auth', '/entry/sign-up'];

export { useStyles, authPatnNames };
