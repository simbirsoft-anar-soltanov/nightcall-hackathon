import { Route, RouteProps } from 'react-router-dom';
import { AppPathOptions } from './AppPath.interface';
import Path from './Path';

export type { AppPathOptions };

export default class AppPath extends Path {
  protected readonly options: AppPathOptions;

  constructor(path: string, options: AppPathOptions) {
    super(path, options);
    this.options = options;
  }

  public asRoute = (forwardedProps?: RouteProps) => {
    const { Component, Layout, props: routeProps } = this.options;
    const props = {
      ...routeProps,
      ...forwardedProps,
    };
    const componentNode = <Component {...props} />;
    const element = Layout ? (
      <Layout {...props}>{componentNode}</Layout>
    ) : (
      componentNode
    );

    return <Route path={this.toPath()} element={element} />;
  };
}
