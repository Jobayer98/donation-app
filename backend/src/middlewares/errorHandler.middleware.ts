import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { ZodError } from "zod";
import logger from "../utils/logger";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // Log the error
  const statusCode = err instanceof ApiError ? err.statusCode : (err instanceof ZodError ? 400 : 500);

  if (statusCode >= 500) {
    logger.error(`[${_req.method}] ${_req.path} - Internal Server Error:`, err);
  } else {
    logger.warn(`[${_req.method}] ${_req.path} - ${err.message || "Client Error"}`);
  }

  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: err.issues.map(e => ({ path: e.path.join('.'), message: e.message }))
    });
  }

  if (err.name === "PrismaClientKnownRequestError") {
    logger.error("Database operation failed:", err);
    return res
      .status(400)
      .json({ success: false, message: "Database operation failed" });
  }

  res
    .status(statusCode)
    .json({ success: false, message: err.message || "Internal server error" });
};
