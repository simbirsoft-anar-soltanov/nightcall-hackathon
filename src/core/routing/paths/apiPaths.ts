import Path from './utils/Path';

/**
 * Пример использования:
 * export const myPath = api('/my/:param/:optionalParam?');
 * См. примеры из библиотеки https://github.com/pillarjs/path-to-regexp
 */
const api = Path.preset({ basename: '/api' });

export const comments = api('/comments');
