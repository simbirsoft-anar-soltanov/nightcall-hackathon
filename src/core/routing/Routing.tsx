import { Suspense } from 'react';
import {
  Navigate,
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Error404Page from 'pages/Error404Page/Error404Page';
import { appPaths } from './paths';

const history = createBrowserHistory({ window });

const Routing = () => (
  <Suspense fallback='Loading...'>
    <HistoryRouter history={history}>
      <Routes>
        <Route path='/' element={<Navigate to='/auth' />} />
        {appPaths.authPage.asRoute()}
        <Route path={'*'} element={<Error404Page />} />
      </Routes>
    </HistoryRouter>
  </Suspense>
);

export default Routing;
