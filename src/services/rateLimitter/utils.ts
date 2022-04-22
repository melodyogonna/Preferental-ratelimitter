import { ConsumeMessage } from "amqplib";
import { Schema } from "joi";

import { createUpdateBucketInterface } from "./interfaces";
import RateLimiter from "./index";
import {
  refillBucketValidator,
  createBucketValidator,
} from "../../utils/validators";

function validate(schema: Schema, data: any) {
  const { error } = schema.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }
}
export function createBucketHandler(rateLimiter: RateLimiter) {
  return async (message: ConsumeMessage | null) => {
    if (message) {
      const data = JSON.parse(message.content.toString());
      validate(createBucketValidator, data);
      const { tokens, identificationAccessKey } = data;
      await rateLimiter.init(identificationAccessKey);
      await rateLimiter.createBucket(tokens);
    }
  };
}

export function refillBucketHandler(rateLimiter: RateLimiter) {
  return async (message: ConsumeMessage | null) => {
    if (message) {
      const data = JSON.parse(message.content.toString());
      validate(refillBucketValidator, data);
      const { tokens, identificationAccessKey } = data;
      await rateLimiter.init(identificationAccessKey);
      await rateLimiter.refillBucket(tokens);
    }
  };
}
