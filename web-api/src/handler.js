import { join, dirname } from 'node:path';
import { parse, fileURLToPath } from 'node:url';
import { routes } from './routes/heroRoute.js';
import { DEFAULT_HEADERS } from './util/util.js';

import { generateInstance } from './factories/heroFactory.js';

const currentDir = dirname(fileURLToPath(import.meta.url));
const filePath = join(currentDir, './../database', 'data.json');

const heroService = generateInstance({
  filePath
});
const heroRoutes = routes({
  heroService
})

const allRoutes = {
  ...heroRoutes,

  // 404 routes
  default: (request, response) => {
    response.writeHead(404, DEFAULT_HEADERS);
    response.write('Ops, something went wrong');
    response.end()
  }
}

function handler(request, response) {
  const {
    url,
    method,
  } = request;

  const {
    pathname,
  } = parse(url, true);

  const key = `${pathname}:${method.toLowerCase()}`;
  const chosen = allRoutes[key] || allRoutes.default;

  return Promise.resolve(chosen(request, response))
    .catch(handlerError(response));
}

function handlerError(response) {
  return error => {
    console.log('Something went wrong: ', error.stack);
    response.writeHead(500, DEFAULT_HEADERS);
    response.write(JSON.stringify({
      error: 'Internal Server Error',
      }));
    response.end();
  }
}

export default handler;