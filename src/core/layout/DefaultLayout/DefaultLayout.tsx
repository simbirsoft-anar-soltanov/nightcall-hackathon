import { FC, useEffect, useContext } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { FirebaseContext } from 'context/firebase';
import { UserContext } from 'context/user';
import useUser from 'core/hooks/useUser';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ErrorBoundary from 'core/components/ErrorBoundary/ErrorBoundary';
import { rolePath } from 'pages/AuthPage/AuthPage.internals';
import { UseUserType } from 'core/helpers/types';
import { useStyles, authPatnNames } from './DefaultLayout.internals';

const DefaultLayout: FC = () => {
  const { firebase } = useContext(FirebaseContext);

  const { user: loggedInUser } = useContext(UserContext);
  const {
    user,
    user: { role },
  }: UseUserType = useUser(loggedInUser?.uid);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { root } = useStyles();

  useEffect(() => {
    if (user?.id) {
      const isAuthUser = authPatnNames.includes(pathname);

      isAuthUser && navigate(rolePath[role], { replace: true });
    }
  }, [user]);

  return (
    <Box component='section' className={`hero is-fullheight ${root}`}>
      <Header firebase={firebase} loggedInUser={loggedInUser} user={user} />

      <div className='container is-fluid'>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </div>

      <Box component='footer' className='hero-foot'>
        <Footer />
      </Box>
    </Box>
  );
};

export default DefaultLayout;
