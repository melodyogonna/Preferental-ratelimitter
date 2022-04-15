import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

import { BadRequestException } from "../exceptions/exceptions";

export default function validationMiddleware(schema: Schema) {
  return (request: Request, response: Response, next: NextFunction) => {
    const { error } = schema.validate(request.body);
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }
    next();
  };
}
