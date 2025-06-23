import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { authenticate, authorize } from "@/common/middleware/auth";
import { validateRequest } from "@/common/utils/httpHandlers";
import { moneyController } from "./money.controller";
import { UpdateMoney } from "./money.model";

export const moneyRegistry = new OpenAPIRegistry();
export const moneyRouter: Router = express.Router();

moneyRouter.get(
  "/report",
  authenticate,
  authorize(["admin", "moderator"]),
  moneyController.reportStats
);

moneyRouter.post(
  "/update",
  authenticate,
  authorize(["admin", "moderator"]),
  validateRequest(UpdateMoney),
  moneyController.changeMoneyPerCredit
);
