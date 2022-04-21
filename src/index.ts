import express from "express";
import createError from "http-errors";
import { AwilixContainer } from "awilix";

import exceptionHandlerMiddleware from "./middlewares/exceptionHandlerMiddleware";
import containerMiddleware from "./middlewares/containerMiddleware";
import routes from "./routes";

export default function application(container: AwilixContainer) {
  const app = express();
  app.use(express.json());
  app.use(containerMiddleware);
  app.use(routes());
  app.use((req, res, next) => {
    next(createError(404));
  });
  app.use(exceptionHandlerMiddleware);
  app.use((err: any, req: any, res: any, next: any) => {
    res.status(err.status || 500);
    console.log(err);
    res.json({
      message: "Internal Server Error",
      status: false,
    });
  });

  const { refillBucketHandler, createBucketHandler, pubsub } = container.cradle;

  (async () => {
    await pubsub.init();
    pubsub.consume("ratelimit", "ratelimit.createBucket", createBucketHandler);
    pubsub.consume("ratelimit", "ratelimit.refillBucket", refillBucketHandler);
  })();

  return app;
}
