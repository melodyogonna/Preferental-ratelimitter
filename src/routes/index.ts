import { Router } from "express";
import rateLimitRoutes from "./rateLimitRoutes";

export default () => {
  const routes = Router();
  rateLimitRoutes(routes);
  return routes;
};
