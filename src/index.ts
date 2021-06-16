import express from 'express';
import { iocInit } from './iocInit';
import { InversifyExpressServer } from 'inversify-express-utils';

const container = iocInit();

const server = new InversifyExpressServer(container);
server.setConfig((app) => {
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );
  app.use(express.json());
});

const app = server.build();

app.listen(3000, () => {
  console.log(`Application started successfully on port ${3000}.`);
});
