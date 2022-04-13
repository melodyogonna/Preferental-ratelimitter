import { Channel, ConsumeMessage } from "amqplib";

interface WorkerManagerInterface {
  connectionChannel: Channel;
}
export default class WorkerManager {
  connectionChannel: Channel;

  constructor({ connectionChannel }: WorkerManagerInterface) {
    this.connectionChannel = connectionChannel;
  }

  /** Consume incoming rate-limiting rabbitmq message */
  async consumeMessage() {
    const queue = process.env.queuename || "rate-limit";
    const topic = process.env.topic || "rate-limit.create";
    await this.connectionChannel.assertQueue(queue, { durable: true });
    await this.connectionChannel.consume(queue, this.processMessage);
  }

  processMessage(message: ConsumeMessage | null) {
    console.log(message);
  }
}
