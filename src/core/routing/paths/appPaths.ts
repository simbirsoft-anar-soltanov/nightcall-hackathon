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
