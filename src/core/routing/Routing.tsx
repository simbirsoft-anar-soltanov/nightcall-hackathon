import { FC, lazy, Suspense } from 'react';
import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import DefaultLayout from 'core/layout/DefaultLayout/DefaultLayout';
import SpinnerWrap from 'core/components/SpinnerWrap/SpinnerWrap';
import Error404Page from 'pages/Error404Page/Error404Page';
import ErrorBoundary from 'core/components/ErrorBoundary/ErrorFallback';

const history = createBrowserHistory({ window });

const AuthPage = lazy(() => import('pages/AuthPage/AuthPage'));
const SignUpPage = lazy(() => import('pages/SignUpPage/SignUpPage'));
const ModeratorPage = lazy(() => import('pages/ModeratorPage/ModeratorPage'));
const OrganizationPage = lazy(() => import('pages/OrgPage/OrgPage'));
const EmployeePage = lazy(
  () => import('pages/EmployeePage/EmployeePage.container'),
);
const EventPage = lazy(() => import('pages/EventPage/EventPage'));

const Routing: FC = () => {
  return (
    <Suspense fallback={<SpinnerWrap />}>
      <HistoryRouter history={history}>
        <Routes>
          <Route path='/' element={<DefaultLayout />}>
            <Route index element={<AuthPage />} />
            <Route path='/sign-up' element={<SignUpPage />} />
          </Route>

          <Route path='/dashboard' element={<DefaultLayout />}>
            <Route path='mod' element={<ModeratorPage />} />
            <Route path='org' element={<OrganizationPage />} />
            <Route path='emp' element={<EmployeePage />} />
            <Route path='event/:id' element={<EventPage />} />
          </Route>

          <Route path='errorBoundary' element={<ErrorBoundary />} />
          <Route path={'*'} element={<Error404Page />} />
        </Routes>
      </HistoryRouter>
    </Suspense>
  );
};

export default Routing;
