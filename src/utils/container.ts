import { createContainer, asClass, asValue, asFunction } from "awilix";

import config from "../config";
import rabbitMQConnection from "../services/pubsub/connection";

const container = createContainer();

container.register({ config: asValue(config) });
container.register({ rabbitMQConnection: asFunction(rabbitMQConnection) });
container.loadModules(
  [
    [
      `${__dirname}/../services/*.ts`,
      {
        register: asClass,
        lifetime: "SCOPED",
      },
    ],
  ],
  {
    cwd: __dirname,
  }
);
export default container;
