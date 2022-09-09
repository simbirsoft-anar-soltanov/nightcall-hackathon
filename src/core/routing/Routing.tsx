import { Suspense, useContext } from 'react';
import {
  Navigate,
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import useUser from 'core/hooks/useUser';
import Error404Page from 'pages/Error404Page/Error404Page';
import { UserContext } from 'core/context/user';
import { appPaths } from './paths';
import { UseUserType } from 'core/helpers/types';

const history = createBrowserHistory({ window });

const roleDashboard: Record<string, JSX.Element> = {
  moderator: appPaths.moderatorPage.asRoute(),
  organization: appPaths.organizationPage.asRoute(),
  employee: appPaths.employeePage.asRoute(),
};

const Routing = () => {
  const { user: loggedInUser } = useContext(UserContext);
  const {
    user: { role },
  }: UseUserType = useUser(loggedInUser?.uid);

  return (
    <Suspense fallback='Loading...'>
      <HistoryRouter history={history}>
        <Routes>
          <Route path='/' element={<Navigate to='/auth' />} />
          {appPaths.authPage.asRoute()}
          {appPaths.signUpPage.asRoute()}
          {loggedInUser && roleDashboard[role]}
          <Route path={'*'} element={<Error404Page />} />
        </Routes>
      </HistoryRouter>
    </Suspense>
  );
};

export default Routing;
