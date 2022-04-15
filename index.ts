import "dotenv/config";
import morgan from "morgan";
import mongoose from "mongoose";

import app from "./src";
import container from "./src/utils/container";

const config = container.resolve("config");

app.use(morgan("dev"));
mongoose.connect(config.DB_URL);

export default app;
