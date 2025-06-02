import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";

import { loginResponse, loginSchema } from "./auth.model";
import { validateRequest } from "@/common/utils/httpHandlers";
import { authController } from "./auth.controller";

export const authRegistry = new OpenAPIRegistry();
export const authRouter: Router = express.Router();

// login
authRegistry.registerPath({
  method: "post",
  path: "/auth/login",
  tags: ["Auth"],
  summary: "User login",
  request: {
    body: {
      content: {
        "application/json": {
          schema: loginSchema.shape.body,
        },
      },
    },
  },
  responses: createApiResponse(loginResponse, "Success"),
});

authRouter.post(
  "/login",
  validateRequest(loginSchema),
  authController.login
);
