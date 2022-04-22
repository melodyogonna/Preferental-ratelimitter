import "dotenv/config";
import morgan from "morgan";
import mongoose from "mongoose";

import container from "./src/utils/container";

const app = container.resolve("app");
const config = container.resolve("config");

app.use(morgan("dev"));
mongoose.connect(config.DB_URL);

export default app;
