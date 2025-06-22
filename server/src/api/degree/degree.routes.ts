import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { validateRequest } from "@/common/utils/httpHandlers";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";

import { authenticate, authorize } from "@/common/middleware/auth";

import {
  DegreeSchema,
  GetDegreeSchema,
  CreateDegreeSchema,
  UpdateDegreeSchema,
} from "@/api/degree/degree.model";

import { degreeController } from "./degree.controller";

export const degreeRegistry = new OpenAPIRegistry();
export const degreeRouter: Router = express.Router();

degreeRegistry.register("Degree", DegreeSchema);

// Get all degrees
degreeRegistry.registerPath({
  method: "get",
  path: "/degrees",
  tags: ["Degree (Bằng cấp)"],
  summary: "Get degrees list",
  responses: createApiResponse(z.array(DegreeSchema), "Success"),
});

degreeRouter.get(
  "/",
  authenticate,
  authorize(["admin", "moderator"]),
  degreeController.getAllDegrees
);

// Get a degree
degreeRegistry.registerPath({
  method: "get",
  path: "/degrees/{id}",
  tags: ["Degree (Bằng cấp)"],
  summary: "Get a degree by id",
  request: { params: GetDegreeSchema.shape.params },
  responses: createApiResponse(DegreeSchema, "Success"),
});

degreeRouter.get(
  "/:id",
  authenticate,
  authorize(["admin", "moderator"]),
  validateRequest(GetDegreeSchema),
  degreeController.getDegreeById
);

// Create a degree
degreeRegistry.registerPath({
  method: "post",
  path: "/degrees",
  tags: ["Degree (Bằng cấp)"],
  summary: "Create a degree",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateDegreeSchema.shape.body,
        },
      },
    },
  },
  responses: createApiResponse(DegreeSchema, "Success"),
});

degreeRouter.post(
  "/",
  authenticate,
  authorize(["admin", "moderator"]),
  validateRequest(CreateDegreeSchema),
  degreeController.createDegree
);

// Update a degree information
degreeRegistry.registerPath({
  method: "put",
  path: "/degrees/{id}",
  tags: ["Degree (Bằng cấp)"],
  summary: "Update degree information",
  request: {
    params: UpdateDegreeSchema.shape.params,
    body: {
      content: {
        "application/json": {
          schema: UpdateDegreeSchema.shape.body,
        },
      },
    },
  },
  responses: createApiResponse(DegreeSchema, "Success"),
});

degreeRouter.put(
  "/:id",
  authenticate,
  authorize(["admin", "moderator"]),
  validateRequest(UpdateDegreeSchema),
  degreeController.updateDegree
);

// Delete a degree
degreeRegistry.registerPath({
  method: "delete",
  path: "/degrees/{id}",
  tags: ["Degree (Bằng cấp)"],
  summary: "Delete degree",
  request: {
    params: GetDegreeSchema.shape.params,
  },
  responses: createApiResponse(DegreeSchema, "Success"),
});
degreeRouter.delete(
  "/:id",
  authenticate,
  authorize(["admin", "moderator"]),
  validateRequest(GetDegreeSchema),
  degreeController.deleteDegree
);
