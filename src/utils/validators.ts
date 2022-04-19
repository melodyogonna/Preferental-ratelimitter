import Joi from "joi";

export const canMakeRequestValidator = Joi.object({
  identificationAccessKey: Joi.string().required(),
});

export const refillBucketValidator = Joi.object({
  identificationAccessKey: Joi.string().required(),
  tokens: Joi.number().required(),
});

export const getBucketValidator = Joi.object({
  identificationAccessKey: Joi.string().required(),
});

export const createBucketValidator = Joi.object({
  identificationAccessKey: Joi.string().required(),
  tokens: Joi.number().required(),
});
