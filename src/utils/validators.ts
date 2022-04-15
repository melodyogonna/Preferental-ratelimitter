import Joi from "joi";

export const canMakeRequestValidator = Joi.object({
  user_identification_key: Joi.string().required(),
});

export const refillBucketValidator = Joi.object({
  user_identification_key: Joi.string().required(),
  tokens: Joi.number().required(),
});

export const getBucketValidator = Joi.object({
  user_identification_key: Joi.string().required(),
});

export const createBucketValidator = Joi.object({
  user_identification_key: Joi.string().required(),
  tokens: Joi.number().required(),
});
