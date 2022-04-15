import amqp from "amqplib";

export default async function rabbitMQConnection({
  AMQP_URL,
}: {
  AMQP_URL: string;
}) {
  const url = AMQP_URL;
  if (!url) {
    throw new Error("AMQP_URL is not defined");
  }
  const connection = await amqp.connect(url);
  return connection.createChannel();
}
