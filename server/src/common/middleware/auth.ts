import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import {logger} from "../../server";
import { ServiceResponse } from "../models/serviceResponse";

interface JwtPayload {
  id: string | number;
  email: string;
  phone: string;
  full_name: string;
  role: string;
  verified: boolean;
  iat: number;
  exp: number;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

const JWT_SECRET = process.env.JWT_SECRET ?? "your_jwt_secret";

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      res
        .status(401)
        .json({ message: "Unauthorized - Invalid or missing token" });
      return;
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Authentication failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// export const authorize = (roles: string[]) => {
//   return (
//     req: AuthenticatedRequest,
//     res: Response,
//     next: NextFunction
//   ): void => {
//     if (!req.user) {
//       res.status(401).json({ message: "Unauthorized - No user found" });
//       return;
//     }

//     if (!roles.includes(req.user.role)) {
//       res.status(403).json({ message: "Forbidden - Invalid permissions" });
//       return;
//     }

//     next();
//   };
// };

export const authorize = (roles: string[]) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    try {
      if (!req.user) {
        logger.error("Unauthorized: No user found in request");
        res.status(StatusCodes.UNAUTHORIZED).json(
          ServiceResponse.failure(
            "Unauthorized - No user found",
            null,
            StatusCodes.UNAUTHORIZED
          )
        );
        return;
      }

      if (!roles.includes(req.user.role)) {
        logger.error(`Forbidden: User role ${req.user.role} does not have required permissions`);
        res.status(StatusCodes.FORBIDDEN).json(
          ServiceResponse.failure(
            "Forbidden - Invalid permissions",
            null,
            StatusCodes.FORBIDDEN
          )
        );
        return;
      }

      next();
    } catch (ex) {
      const errorMessage = `Error in authorization: ${(ex as Error).message}`;
      logger.error(errorMessage);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
        ServiceResponse.failure(
          "An error occurred during authorization",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        )
      );
    }
  };
};