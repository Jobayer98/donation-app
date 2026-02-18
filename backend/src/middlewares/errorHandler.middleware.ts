import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { ZodError } from "zod";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({ success: false, message: err.message });
  }

  if (err.name === "PrismaClientKnownRequestError") {
    return res
      .status(400)
      .json({ success: false, message: "Database operation failed" });
  }

  res
    .status(500)
    .json({ success: false, message: err.message || "Internal server error" });
};
