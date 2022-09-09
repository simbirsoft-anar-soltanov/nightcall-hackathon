import { RouteProps } from 'react-router';

export interface PathOptions {
  absolutePrefix?: string;
  basename?: string;
  defaultRouteParams?: RouteProps;
}
