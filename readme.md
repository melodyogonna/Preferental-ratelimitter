![GitHub Workflow Status](https://img.shields.io/github/workflow/status/melodyogonna/Preferental-ratelimitter/node-ci)
# Preferental rate limiting service

This is a service that allows you to set a request API limit for users based on their API key.

The service is based on the token bucket algorithm, check out the [token bucket algorithm](https://en.wikipedia.org/wiki/Token_bucket) for more information.

## Contribute
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