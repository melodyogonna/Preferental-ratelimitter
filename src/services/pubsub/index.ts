import ConsumerManager from "./consumer";

export default class Pubsub {
  consumerManager: ConsumerManager;

  constructor(consumerManager: ConsumerManager) {
    this.consumerManager = consumerManager;
  }

  async consume(queue: string, topic: string) {
    await this.consumerManager.consumeMessage(queue, topic);
  }
}
