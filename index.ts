import morgan from "morgan";

import app from "./src";

app.use(morgan("dev"));

export default app;
