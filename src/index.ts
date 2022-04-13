import express from "express";

import exceptionHandlerMiddleware from "./middlewares/exceptionHandlerMiddleware";
import containerMiddleware from "./middlewares/containerMiddleware";
import routes from "./routes";

const app = express();
app.use(express.json());

app.use(containerMiddleware);
app.use(routes());

app.use(exceptionHandlerMiddleware);
export default app;
