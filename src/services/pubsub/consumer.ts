import { EventEmitter } from "events";

import { Channel, ConsumeMessage } from "amqplib";

export default class ConsumerManager {
  connectionChannel: Channel;
  private readonly eventEmitter: EventEmitter;

  constructor(connectionChannel: Channel, eventEmitter: EventEmitter) {
    this.connectionChannel = connectionChannel;
    this.eventEmitter = eventEmitter;
  }

  /** Consume incoming rate-limiting rabbitmq message */
  async consumeMessage(queueName: string, topicName: string) {
    await this.connectionChannel.assertExchange(topicName, "topic", {
      durable: true,
    });
    await this.connectionChannel.assertQueue(queueName, { durable: true });
    await this.connectionChannel.bindQueue(queueName, topicName, topicName);
    return this.connectionChannel.consume(queueName, this.processMessage);
  }

  processMessage(message: ConsumeMessage | null) {
    if (message) {
      const content = message.content.toString();
      this.eventEmitter.emit(message.fields.routingKey, content);
      this.connectionChannel.ack(message);
    }
  }
}
