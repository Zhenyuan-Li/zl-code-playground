import express from 'express';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { createCellsRouter } from './routes/cells';

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  const app = express();

  app.use(createCellsRouter(filename, dir));

  if (useProxy) {
    app.use(
      createProxyMiddleware({
        target: 'http://localhost:3000',
        ws: true,
        logLevel: 'silent',
      })
    );
  } else {
    // absolute path to local-client in package
    const pkgPath = require.resolve('local-client/build/index.html');
    // Naive solution, won't work: can't reference files between different pkg
    // So we need to use lerna to link local-client to local-api
    app.use(express.static(path.dirname(pkgPath)));
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
