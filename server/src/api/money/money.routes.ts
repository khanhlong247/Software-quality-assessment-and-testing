import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { validateRequest } from "@/common/utils/httpHandlers";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { authenticate, authorize } from "@/common/middleware/auth";

import { moneyController } from "./money.controller";

export const moneyRegistry = new OpenAPIRegistry();
export const moneyRouter: Router = express.Router();

moneyRouter.get(
  "/report",
  authenticate,
  authorize(["admin", "moderator"]),
  moneyController.reportStats
);
