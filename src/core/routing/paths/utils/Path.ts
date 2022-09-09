import { compile as compilePath, PathFunction } from 'path-to-regexp';
import qs from 'qs';
import { RouteProps } from 'react-router';
import { PathOptions } from './Path.interface';
import { omitUndefined } from 'src/utils/OmitUndefined';

export type { PathOptions };

type PathConstructor<T> = { new (...args: any): T };

export default class Path {
  protected readonly options: PathOptions;
  protected readonly path: string;
  protected readonly value: string;
  protected readonly compiledPath: PathFunction;

  public static preset<T>(
    this: PathConstructor<T>,
    presetOptions: object,
  ): <Options>(path: string, options?: Partial<Options>) => T {
    const Class = this;
    return function PathPreset(path, options) {
      return new Class(path, {
        ...presetOptions,
        ...options,
      });
    };
  }

  constructor(path: string, options: PathOptions = {}) {
    const { basename } = options;
    this.options = options;
    this.value = path;
    this.path = basename ? `${basename}${path}` : path;
    this.compiledPath = compilePath(this.path);
  }

  public toString() {
    return this.value;
  }

  public toPath() {
    return this.path;
  }

  public toUrl(
    routeParams: RouteProps = {},
    queryParams?: object,
    { absolute }: { absolute?: boolean } = {},
  ) {
    const { absolutePrefix, defaultRouteParams } = this.options;
    const pathname = this.compiledPath(
      omitUndefined({ ...defaultRouteParams, ...routeParams }),
    );
    const prefix = absolute ? absolutePrefix : '';
    const query = queryParams
      ? qs.stringify(queryParams, { addQueryPrefix: true })
      : '';
    return `${prefix}${pathname}${query}`;
  }
}
