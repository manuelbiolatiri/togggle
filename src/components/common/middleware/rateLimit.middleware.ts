import apiLimiter from "express-rate-limit";
import { Request, Response, NextFunction } from "express";

const handler = (
  _request: Request,
  response: Response,
  _next: NextFunction,
  options
) => {
  return response.status(options.statusCode).json({
    message: options.message,
  });
};

const keyGenerator = (request: Request) => {
  const authHeader = request.headers["authorization"];

  if (authHeader) {
    return authHeader;
  }

  if (request.body && request.body.username) {
    return request.body.username;
  }

  return request.ip;
};

const globalRateLimiter = apiLimiter({
  windowMs: 30 * 1000,
  max: 30,
  message: "Please, try again in a few seconds",
  handler,
  keyGenerator,
});

export const globalRateLimiterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return globalRateLimiter(req, res, next);
};

// AuthenticationMiddleware
