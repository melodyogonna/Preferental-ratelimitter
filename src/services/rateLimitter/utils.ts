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
  return async (data: createUpdateBucketInterface) => {
    validate(createBucketValidator, data);
    const { tokens, identificationAccessKey } = data;
    await rateLimiter.init(identificationAccessKey);
    const bucket = await rateLimiter.createBucket(tokens);
    return bucket;
  };
}

export function refillBucketHandler(rateLimiter: RateLimiter) {
  return async (data: createUpdateBucketInterface) => {
    validate(refillBucketValidator, data);
    const { tokens, identificationAccessKey } = data;
    await rateLimiter.init(identificationAccessKey);
    const bucket = await rateLimiter.refillBucket(tokens);
    return bucket;
  };
}
