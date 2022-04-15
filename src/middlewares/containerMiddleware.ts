import { Request, Response, NextFunction } from "express";

import container from "../utils/container";

export default (req: Request, res: Response, next: NextFunction) => {
  req.container = container.createScope();
  next();
};
