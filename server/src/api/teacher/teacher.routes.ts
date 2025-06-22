import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { authenticate, authorize } from "@/common/middleware/auth";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import {
  TeacherSchema,
  GetTeacherSchema,
  CreateTeacherSchema,
  UpdateTeacherSchema,
} from "@/api/teacher/teacher.model";
import { validateRequest } from "@/common/utils/httpHandlers";
import { teacherController } from "./teacher.controller";

export const teacherRegistry = new OpenAPIRegistry();
export const teacherRouter: Router = express.Router();

teacherRegistry.register("Teacher", TeacherSchema);

// Get all teachers
teacherRegistry.registerPath({
  method: "get",
  path: "/teachers",
  tags: ["Teacher (Giảng viên)"],
  summary: "Get teachers list",
  responses: createApiResponse(z.array(TeacherSchema), "Success"),
});
teacherRouter.get(
  "/",
  authenticate,
  authorize(["admin", "moderator"]),
  teacherController.getAllTeachers
);

// Get a teacher
teacherRegistry.registerPath({
  method: "get",
  path: "/teachers/{id}",
  tags: ["Teacher (Giảng viên)"],
  summary: "Get a teacher by id",
  request: { params: GetTeacherSchema.shape.params },
  responses: createApiResponse(TeacherSchema, "Success"),
});
teacherRouter.get(
  "/:id",
  authenticate,
  authorize(["admin", "moderator"]),
  validateRequest(GetTeacherSchema),
  teacherController.getTeacherById
);
// Create a teacher
teacherRegistry.registerPath({
  method: "post",
  path: "/teachers",
  tags: ["Teacher (Giảng viên)"],
  summary: "Create a teacher",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateTeacherSchema.shape.body,
        },
      },
    },
  },
  responses: createApiResponse(TeacherSchema, "Success"),
});
teacherRouter.post(
  "/",
  authenticate,
  authorize(["admin", "moderator"]),
  validateRequest(CreateTeacherSchema),
  teacherController.createTeacher
);

// Update a teacher
teacherRegistry.registerPath({
  method: "put",
  path: "/teachers/{id}",
  tags: ["Teacher (Giảng viên)"],
  summary: "Update teacher information",
  request: {
    params: UpdateTeacherSchema.shape.params,
    body: {
      content: {
        "application/json": {
          schema: UpdateTeacherSchema.shape.body,
        },
      },
    },
  },
  responses: createApiResponse(TeacherSchema, "Success"),
});
teacherRouter.put(
  "/:id",
  authenticate,
  authorize(["admin", "moderator"]),
  validateRequest(UpdateTeacherSchema),
  teacherController.updateTeacher
);
// Delete a teacher
teacherRegistry.registerPath({
  method: "delete",
  path: "/teachers/{id}",
  tags: ["Teacher (Giảng viên)"],
  summary: "Delete a teacher",
  request: { params: GetTeacherSchema.shape.params },
  responses: createApiResponse(TeacherSchema, "Success"),
});
teacherRouter.delete(
  "/:id",
  authenticate,
  authorize(["admin", "moderator"]),
  validateRequest(GetTeacherSchema),
  teacherController.deleteTeacher
);
