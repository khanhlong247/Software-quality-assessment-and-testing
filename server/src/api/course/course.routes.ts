import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { validateRequest } from "@/common/utils/httpHandlers";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";

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
    tags: ["Course"],
    summary: "Get courses list",
    responses: createApiResponse(z.array(CourseSchema), "Success"),
});

courseRouter.get("/", courseController.getAllCourses);


// Get a course
courseRegistry.registerPath({
    method: "get",
    path: "/courses/{id}",
    tags: ["Course"],
    summary: "Get a course by id",
    request: { params: GetCourseSchema.shape.params },
    responses: createApiResponse(CourseSchema, "Success"),
});

courseRouter.get(
    "/:id",
    validateRequest(GetCourseSchema),
    courseController.getCourseById
);

// Create an course
courseRegistry.registerPath({
    method: "post",
    path: "/courses",
    tags: ["Course"],
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
    validateRequest(CreateCourseSchema),
    courseController.createCourse
);

// Update a course information
courseRegistry.registerPath({
    method: "put",
    path: "/courses/{id}",
    tags: ["Course"],
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
    validateRequest(UpdateCourseSchema),
    courseController.updateCourse
);


// Delete a course
courseRegistry.registerPath({
    method: "delete",
    path: "/courses/{id}",
    tags: ["Course"],
    summary: "Delete a course",
    request: {
        params: GetCourseSchema.shape.params,
    },
    responses: createApiResponse(CourseSchema, "Success"),
});
courseRouter.delete(
    "/:id",
    validateRequest(GetCourseSchema),
    courseController.deleteCourse
);
