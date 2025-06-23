import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { validateRequest } from "@/common/utils/httpHandlers";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { authenticate, authorize } from "@/common/middleware/auth";
import {
  CourseSchema,
  GetCourseSchema,
  CreateCourseSchema,
  UpdateCourseSchema,
} from "@/api/course/course.model";

import { courseController } from "./course.controller";
import { degreeRouter } from "../degree/degree.routes";
export const courseRegistry = new OpenAPIRegistry();
export const courseRouter: Router = express.Router();

courseRegistry.register("Course", CourseSchema);

// Get all courses
courseRegistry.registerPath({
  method: "get",
  path: "/courses",
  tags: ["Course (Học phần)"],
  summary: "Get courses list",
  responses: createApiResponse(z.array(CourseSchema), "Success"),
});

courseRouter.get(
  "/",
  authenticate,
  authorize(["admin", "moderator"]),
  courseController.getAllCourses
);

// Get a course
courseRegistry.registerPath({
  method: "get",
  path: "/courses/{id}",
  tags: ["Course (Học phần)"],
  summary: "Get a course by id",
  request: { params: GetCourseSchema.shape.params },
  responses: createApiResponse(CourseSchema, "Success"),
});

courseRouter.get(
  "/:id",
  authenticate,
  authorize(["admin", "moderator"]),
  validateRequest(GetCourseSchema),
  courseController.getCourseById
);

// Create an course
courseRegistry.registerPath({
  method: "post",
  path: "/courses",
  tags: ["Course (Học phần)"],
  summary: "Create a course",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateCourseSchema.shape.body,
        },
      },
    },
  },
  responses: createApiResponse(CourseSchema, "Success"),
});

courseRouter.post(
  "/",
  authenticate,
  authorize(["admin", "moderator"]),
  validateRequest(CreateCourseSchema),
  courseController.createCourse
);

// Update a course information
courseRegistry.registerPath({
  method: "put",
  path: "/courses/{id}",
  tags: ["Course (Học phần)"],
  summary: "Update course information",
  request: {
    params: UpdateCourseSchema.shape.params,
    body: {
      content: {
        "application/json": {
          schema: UpdateCourseSchema.shape.body,
        },
      },
    },
  },
  responses: createApiResponse(CourseSchema, "Success"),
});

courseRouter.put(
  "/:id",
  authenticate,
  authorize(["admin", "moderator"]),
  validateRequest(UpdateCourseSchema),
  courseController.updateCourse
);

// Delete a course
courseRegistry.registerPath({
  method: "delete",
  path: "/courses/{id}",
  tags: ["Course (Học phần)"],
  summary: "Delete a course",
  request: {
    params: GetCourseSchema.shape.params,
  },
  responses: createApiResponse(CourseSchema, "Success"),
});
courseRouter.delete(
  "/:id",
  authenticate,
  authorize(["admin", "moderator"]),
  validateRequest(GetCourseSchema),
  courseController.deleteCourse
);
