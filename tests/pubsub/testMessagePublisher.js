#!/usr/local/opt/node@14/bin/node
import "dotenv/config";

import rabbitMQConnection from "../../src/services/pubsub/connection";
import config from "../../src/config";

async function publishMessage() {
  const channel = await rabbitMQConnection(config);
  const routingKey = "ratelimiter.createBucket";
  const message = "Hello World!";

  await channel.assertExchange(routingKey, "topic", { durable: true });
  await channel.publish(routingKey, routingKey, Buffer.from(message));
  channel.close();
  console.log(`Message published: ${message}`);
}

(async () => {
  await publishMessage();
})();
