import { ComponentType, LazyExoticComponent, ReactNode } from 'react';
import { PathOptions } from './Path.interface';
import { RouteProps } from 'react-router-dom';

type WithChildren = { children: ReactNode | ReactNode[] };

export interface AppPathOptions<T extends RouteProps = RouteProps>
  extends PathOptions {
  Component: LazyExoticComponent<ComponentType<T>>;
  Layout: LazyExoticComponent<ComponentType<WithChildren>>;
  props?: Record<string, never>;
}
