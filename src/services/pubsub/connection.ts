import amqp from "amqplib";

export default async function rabbitMQConnection(config: any) {
  const url = config.AMQP_URL;
  if (!url) {
    throw new Error("AMQP_URL is not defined");
  }
  const connection = await amqp.connect(url);
  const channel = await connection.createChannel();
  return channel;
}
