/* eslint-disable camelcase */
import { Request, Response, NextFunction } from "express";

import { UnauthorizedException } from "../exceptions";
import { use } from "chai";

export default class RateLimitingController {
  static async canMakeRequest(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { user_identification_key } = request.body;
    try {
      const rateLimiter = request.container.resolve("rateLimiter");
      await rateLimiter.init(user_identification_key);
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
    const { user_identification_key, tokens } = request.body;
    try {
      const rateLimiter = request.container.resolve("rateLimiter");
      await rateLimiter.init(user_identification_key);
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
    const { user_identification_key, tokens } = request.body;
    try {
      const rateLimiter = container.resolve("rateLimiter");
      await rateLimiter.init(user_identification_key);
      await rateLimiter.createBucket(tokens);
      return response.status(200).json({
        message: "Bucket created successfully",
      });
    } catch (error) {
      return next(error);
    }
  }
}
