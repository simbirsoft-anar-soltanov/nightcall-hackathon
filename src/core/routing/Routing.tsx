import { FC, lazy, Suspense, useContext } from 'react';
import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { UserContext } from 'context/user';
import useUser from 'core/hooks/useUser';
import WelcomeLayout from 'layout/WelcomeLayout/WelcomeLayout';
import DefaultLayout from 'layout/DefaultLayout/DefaultLayout';
import Error404Page from 'pages/Error404Page/Error404Page';
import ErrorBoundary from 'core/components/ErrorBoundary/ErrorFallback';
import SpinnerWrap from 'core/components/SpinnerWrap/SpinnerWrap';
import { UseUserType } from 'core/helpers/types';

const history = createBrowserHistory({ window });

const AuthPage = lazy(() => import('pages/AuthPage/AuthPage'));
const SignUpPage = lazy(() => import('pages/SignUpPage/SignUpPage'));
const ModeratorPage = lazy(() => import('pages/ModeratorPage/ModeratorPage'));
const OrganizationPage = lazy(() => import('pages/OrgPage/OrgPage'));
const EmployeePage = lazy(
  () => import('pages/EmployeePage/EmployeePage.container'),
);
const EventPage = lazy(() => import('pages/EventPage/EventPage'));
const ProfilePage = lazy(() => import('pages/ProfilePage/ProfilePage'));

const roleRoute: Record<string, JSX.Element> = {
  Модератор: <Route path='mod' element={<ModeratorPage />} />,
  Сотрудник: <Route path='emp' element={<EmployeePage />} />,
  Организация: <Route path='org' element={<OrganizationPage />} />,
};

const Routing: FC = () => {
  const { user: loggedInUser } = useContext(UserContext);

  const {
    user: { role },
  }: UseUserType = useUser(loggedInUser?.uid);

  return (
    <Suspense fallback={<SpinnerWrap />}>
      <HistoryRouter history={history}>
        <Routes>
          <Route path='/' element={<WelcomeLayout />} />

          <Route path='/entry' element={<DefaultLayout />}>
            <Route path='auth' element={<AuthPage />} />
            <Route path='sign-up' element={<SignUpPage />} />
          </Route>

          <Route path='/dashboard' element={<DefaultLayout />}>
            {roleRoute[role]}

            <Route path='profile' element={<ProfilePage />} />
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
