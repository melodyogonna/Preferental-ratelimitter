import EventEmitter from "events";

import {
  createContainer,
  asClass,
  Lifetime,
  InjectionMode,
  asValue,
  asFunction,
} from "awilix";

import config from "../config";
import application from "../index";
import rabbitMQConnection from "../services/pubsub/connection";
import RateLimiter from "../services/rateLimitter";
import RateLimitManager from "../services/rateLimitter/rateLimitManager";
import pubsub from "../services/pubsub";
import ConsumerManager from "../services/pubsub/consumer";
import {
  createBucketHandler,
  refillBucketHandler,
} from "../services/rateLimitter/utils";

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container.register({ config: asValue(config) });
container.register({ connectionChannel: asFunction(rabbitMQConnection) });
container.register({
  rateLimiter: asClass(RateLimiter, { lifetime: Lifetime.SCOPED }),
  rateLimitManager: asClass(RateLimitManager, { lifetime: Lifetime.SCOPED }),
  createBucketHandler: asFunction(createBucketHandler),
  refillBucketHandler: asFunction(refillBucketHandler),
});
container.register({
  pubsub: asClass(pubsub),
  consumerManager: asClass(ConsumerManager),
});
container.register({
  eventEmitter: asFunction(() => new EventEmitter()).singleton(),
});

container.register({
  app: asFunction(application).singleton(),
  container: asFunction(() => container).singleton(),
});
export default container;
