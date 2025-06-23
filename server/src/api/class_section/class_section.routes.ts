import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { validateRequest } from "@/common/utils/httpHandlers";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";

import { authenticate, authorize } from "@/common/middleware/auth";
import {
  ClassSectionSchema,
  GetClassSchema,
  CreateClassSchema,
  UpdateClassSchema,
  DeleteClassSchema,
  CreateMultiClassSchema,
  ClassSectionSchemaDetail,
} from "@/api/class_section/class_section.model";

import { classSectionController } from "./class_section.controller";
export const classSectionRegistry = new OpenAPIRegistry();
export const classSectionRouter: Router = express.Router();
classSectionRegistry.register("ClassSection", ClassSectionSchema);

// Get all class sections
classSectionRegistry.registerPath({
  method: "get",
  path: "/class-sections",
  tags: ["Class Section (Lớp học phần)"],
  summary: "Get class section list",
  responses: createApiResponse(z.array(ClassSectionSchema), "Success"),
});

classSectionRouter.get(
  "/",
  authenticate,
  authorize(["admin", "moderator"]),
  classSectionController.getAllClassSections
);
// Get all class sections details
classSectionRegistry.registerPath({
  method: "get",
  path: "/class-sections/details",
  tags: ["Class Section (Lớp học phần)"],
  summary: "Get class section list",
  responses: createApiResponse(z.array(ClassSectionSchemaDetail), "Success"),
});

classSectionRouter.get(
  "/details",
  authenticate,
  authorize(["admin", "moderator"]),
  classSectionController.getAllClassSectionsDetails
);

// Get a class section
classSectionRegistry.registerPath({
  method: "get",
  path: "/class-sections/{id}",
  tags: ["Class Section (Lớp học phần)"],
  summary: "Get a class section by id",
  request: { params: GetClassSchema.shape.params },
  responses: createApiResponse(ClassSectionSchema, "Success"),
});

classSectionRouter.get(
  "/:id",
  authenticate,
  authorize(["admin", "moderator"]),
  validateRequest(GetClassSchema),
  classSectionController.getClassSectionById
);

// Create a class section
classSectionRegistry.registerPath({
  method: "post",
  path: "/class-sections",
  tags: ["Class Section (Lớp học phần)"],
  summary: "Create a class section",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateClassSchema.shape.body,
        },
      },
    },
  },
  responses: createApiResponse(ClassSectionSchema, "Success"),
});

classSectionRouter.post(
  "/",
  authenticate,
  authorize(["admin", "moderator"]),
  validateRequest(CreateClassSchema),
  classSectionController.createClassSection
);

// Create multiply class section
classSectionRegistry.registerPath({
  method: "post",
  path: "/class-sections/multi-create",
  tags: ["Class Section (Lớp học phần)"],
  summary: "Create multiply class section",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateMultiClassSchema.shape.body,
        },
      },
    },
  },
  responses: createApiResponse(ClassSectionSchema, "Success"),
});

classSectionRouter.post(
  "/multi-create",
  authenticate,
  authorize(["admin", "moderator"]),
  validateRequest(CreateMultiClassSchema),
  classSectionController.createMultipleClassSections
);

// Update a class section information
classSectionRegistry.registerPath({
  method: "put",
  path: "/class-sections/{id}",
  tags: ["Class Section (Lớp học phần)"],
  summary: "Update class section information",
  request: {
    params: UpdateClassSchema.shape.params,
    body: {
      content: {
        "application/json": {
          schema: UpdateClassSchema.shape.body,
        },
      },
    },
  },
  responses: createApiResponse(ClassSectionSchema, "Success"),
});

classSectionRouter.put(
  "/:id",
  authenticate,
  authorize(["admin", "moderator"]),
  validateRequest(UpdateClassSchema),
  classSectionController.updateClassSection
);

// Delete a class section
classSectionRegistry.registerPath({
  method: "delete",
  path: "/class-sections/{id}",
  tags: ["Class Section (Lớp học phần)"],
  summary: "Delete a class section",
  request: {
    params: DeleteClassSchema.shape.params,
  },
  responses: createApiResponse(ClassSectionSchema, "Success"),
});
classSectionRouter.delete(
  "/:id",
  authenticate,
  authorize(["admin", "moderator"]),
  validateRequest(DeleteClassSchema),
  classSectionController.deleteClassSection
);
