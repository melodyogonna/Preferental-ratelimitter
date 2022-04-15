import express from "express";
import createError from "http-errors";

import exceptionHandlerMiddleware from "./middlewares/exceptionHandlerMiddleware";
import containerMiddleware from "./middlewares/containerMiddleware";
import routes from "./routes";

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
export default app;
