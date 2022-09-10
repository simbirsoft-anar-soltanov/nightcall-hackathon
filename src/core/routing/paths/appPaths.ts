import { lazy } from 'react';
import AppPath from './utils/AppPath';

/**
 * Пример использования:
 * export const myRoute = route('/my/:param/:optionalParam?');', {
 *   Component: About,
 *   props: { myProp: 'whatever' }
 * });
 */

const route = AppPath.preset({
  // Лейаут по умолчанию, можно переопределить для конкретного роута
  Layout: lazy(
    () =>
      import(
        /* webpackChunkName: 'default' */ 'core/layout/DefaultLayout/DefaultLayout'
      ),
  ),
});

export const authPage = route('/auth', {
  Component: lazy(
    () => import(/* webpackChunkName: 'default' */ 'pages/AuthPage/AuthPage'),
  ),
});

export const signUpPage = route('/singup', {
  Component: lazy(
    () =>
      import(/* webpackChunkName: 'default' */ 'pages/SignUpPage/SignUpPage'),
  ),
});

export const moderatorPage = route('/modDashboard', {
  Component: lazy(
    () =>
      import(
        /* webpackChunkName: 'default' */ 'pages/ModeratorPage/ModeratorPage'
      ),
  ),
});

export const organizationPage = route('/orgDashboard', {
  Component: lazy(
    () => import(/* webpackChunkName: 'default' */ 'pages/OrgPage/OrgPage'),
  ),
});

export const employeePage = route('/empDashboard', {
  Component: lazy(
    () =>
      import(
        /* webpackChunkName: 'default' */ 'pages/EmployeePage/EmployeePage'
      ),
  ),
});

export const errorBoundary = route('/error', {
  Component: lazy(
    () =>
      import(
        /* webpackChunkName: 'default' */ 'core/components/ErrorBoundary/ErrorFallback'
      ),
  ),
});
