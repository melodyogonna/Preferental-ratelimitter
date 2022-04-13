import { Router } from "express";

import {
  createBucketValidator,
  canMakeRequestValidator,
  refillBucketValidator,
} from "../utils/validators";
import validationMiddeware from "../middlewares/validationMiddeware";
import RateLimitController from "../controllers";

export default (router: Router) => {
  router.get("/", (req, res) => {
    res.send("Hello World!");
  });

  router.post(
    "/can-make-request",
    validationMiddeware(canMakeRequestValidator),
    RateLimitController.canMakeRequest
  );
  router.post(
    "/create-bucket",
    validationMiddeware(createBucketValidator),
    RateLimitController.createBucket
  );

  router.put(
    "/refill-bucket",
    validationMiddeware(refillBucketValidator),
    RateLimitController.refillBucket
  );
  return router;
};
