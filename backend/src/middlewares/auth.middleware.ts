import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import logger from "../utils/logger";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const header = req.headers["authorization"];

    if (!header) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const token = header.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Access denied. Invalid Token." });
    }

    const decoded = verifyToken(token);

    req.user = {
      id: decoded!.id,
      role: decoded!.role,
    };

    next();
  } catch (error) {
    logger.error("Authentication Error:", error);
    res.status(401).json({ message: "Authentication failed" });
  }
}

export function authorize(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!roles.includes(req.user.role)) {
      logger.warn(`Forbidden access attempt by user ${req.user.id} with role ${req.user.role}. Required roles: ${roles.join(", ")}`);
      return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
    }

    next();
  };
}
