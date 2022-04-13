import { Request, Response, NextFunction } from "express";
import { BaseHTTPException } from "../exceptions/exceptions";

export default function exceptionHandlerMiddleware(
  error: BaseHTTPException,
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.log(error);
  if (error.statusCode) {
    const { message } = error;
    response.status(error.statusCode).json({ message, status: false });
  } else {
    next(error);
  }
}
