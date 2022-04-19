/* eslint-disable camelcase */
import { Request, Response, NextFunction } from "express";

import { BadRequestException, UnauthorizedException } from "../exceptions";
import { BucketExistsError } from "../services/rateLimitter/errors";

export default class RateLimitingController {
  static async canMakeRequest(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { identificationAccessKey } = request.body;
    try {
      const rateLimiter = request.container.resolve("rateLimiter");
      await rateLimiter.init(identificationAccessKey);
      if (rateLimiter.canMakeRequest()) {
        await rateLimiter.consumeToken();
        return response.status(200).json({
          message: "Request accepted",
        });
      }
      throw new UnauthorizedException("Rate limit exceeded");
    } catch (error) {
      return next(error);
    }
  }

  static async refillBucket(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { identificationAccessKey, tokens } = request.body;
    try {
      const rateLimiter = request.container.resolve("rateLimiter");
      await rateLimiter.init(identificationAccessKey);
      await rateLimiter.refillBucket(tokens);
      return response.status(200).json({
        message: "Bucket refilled successfully",
      });
    } catch (error) {
      return next(error);
    }
  }

  static async createBucket(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { container } = request;
    const { identificationAccessKey, tokens } = request.body;
    try {
      const rateLimiter = container.resolve("rateLimiter");
      await rateLimiter.init(identificationAccessKey);
      await rateLimiter.createBucket(tokens);
      return response.status(200).json({
        message: "Bucket created successfully",
      });
    } catch (error) {
      if (error instanceof BucketExistsError) {
        return next(new BadRequestException("Bucket already exists"));
      }

      return next(error);
    }
  }

  static async getRemainingTokens(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { identificationAccessKey } = request.body;
    try {
      const rateLimiter = request.container.resolve("rateLimiter");
      await rateLimiter.init(identificationAccessKey);
      const remainingTokens = await rateLimiter.getRemainingTokens();
      const data = {
        remainingTokens,
      };
      return response.status(200).json({
        message: "Remaining tokens",
        data,
      });
    } catch (error) {
      return next(error);
    }
  }
}
