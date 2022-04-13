import { Request, Response, NextFunction } from "express";

import { UnauthorizedException } from "../exceptions";

export default class RateLimitingController {
  static async canMakeRequest(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { accessKey } = request.body;
    request.container.register("associationKey", accessKey);
    const { rateLimiter } = request.container.cradle;
    try {
      await rateLimiter.init();
      if (rateLimiter.canMakeRequest()) {
        await rateLimiter.consume();
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
    const { accessKey, tokens } = request.body;
    request.container.register("associationKey", accessKey);
    const { rateLimiter } = request.container.cradle;
    try {
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
    const { accessKey, tokens } = request.body;
    request.container.register("associationKey", accessKey);
    const { rateLimiter } = request.container.cradle;
    try {
      await rateLimiter.createBucket(tokens);
      return response.status(200).json({
        message: "Bucket created successfully",
      });
    } catch (error) {
      return next(error);
    }
  }
}
