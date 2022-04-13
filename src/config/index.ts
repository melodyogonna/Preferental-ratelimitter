export default {
  DB_URL:
    process.env.DB_URI || process.env.NODE_ENV === "development"
      ? "mongodb://localhost:27017/preferental"
      : "",

  AMQP_URL: process.env.AMQP_URL,
};
