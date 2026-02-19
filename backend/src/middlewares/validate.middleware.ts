import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validateBody =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));

        return res.status(400).json({
          success: false,
          message: "Invalid request data",
          error: {
            message: "Validation failed",
            details: validationErrors,
          },
        });
      }
      next(error);
    }
  };

export const validateQuery =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));

        return res.status(400).json({
          success: false,
          message: "Invalid query parameters",
          error: {
            message: "Validation failed",
            details: validationErrors,
          },
        });
      }
      next(error);
    }
  };
