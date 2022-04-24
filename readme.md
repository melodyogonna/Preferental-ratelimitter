# Token-Bucket rate limiting service

This is a service that allows you to set a request API limit for users based on their API key.

The service is based on the token bucket algorithm, check out the [token bucket algorithm](https://en.wikipedia.org/wiki/Token_bucket) for more information.

## Usage
This service provides both a synchronous (RESTful API) and an asynchronous (RabbitMQ Pub/Sub), for creating and refilling token buckets.
You only have the synchronous RESTful interface for checking whether a user can  make a request. See [API Documentation.](https://documenter.getpostman.com/view/8708995/UyrBhvk8)

To use RabbitMQ, publish messages to `ratelimiter` queue, using **topic** exchange, with the following routing keys:

- `ratelimiter.create-bucket` - Create a new token bucket for a user
- `ratelimiter.refill-bucket` - Refill a user's token bucket.

## Contribute
### Dependencies
- Node 14+
- MongoDB (Creating a free cluster on Mongo Atlas recommended)
- RabbitMQ (CloudAMQP provides a free instance for testing)
### Installation
To install the service, you can clone this repository from Github.

Starting the service in development mode:

```bash 
npm run start:dev
```

Running the service in production mode:

```bash 
npm run start
```

NB: You must build the service before running it. This is done by running the `npm run build` command.

Testing the service:

```bash 
npm run test
```