import { Channel } from "amqplib";

export default class ConsumerManager {
  connectionChannel: Channel;

  constructor(connectionChannel: Channel) {
    this.connectionChannel = connectionChannel;
  }

  /** Consume incoming rate-limiting rabbitmq message */
  async consumeMessage(queueName: string, topicName: string, callback: any) {
    await this.connectionChannel.assertExchange(topicName, "topic", {
      durable: true,
    });
    await this.connectionChannel.assertQueue(queueName, { durable: true });
    await this.connectionChannel.bindQueue(queueName, topicName, topicName);
    return this.connectionChannel.consume(queueName, callback);
  }

  async init() {
    this.connectionChannel = await this.connectionChannel;
  }
}
