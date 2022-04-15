import {
  createContainer,
  asClass,
  Lifetime,
  InjectionMode,
  asValue,
  asFunction,
} from "awilix";

import config from "../config";
import rabbitMQConnection from "../services/pubsub/connection";
import RateLimiter from "../services/rateLimitter";
import RateLimitManager from "../services/rateLimitter/rateLimitManager";

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container.register({ config: asValue(config) });
container.register({ rabbitMQConnection: asFunction(rabbitMQConnection) });
container.register({
  rateLimiter: asClass(RateLimiter, { lifetime: Lifetime.SCOPED }),
  rateLimitManager: asClass(RateLimitManager, { lifetime: Lifetime.SCOPED }),
});
export default container;
