import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import {
    FacultySchema,
    GetFaciultySchema,
    CreateFacultySchema,
    UpdateFacultySchema,
} from "@/api/faculty/faculty.model";
import { validateRequest } from "@/common/utils/httpHandlers";
import { facultyController } from "./faculty.controller";

export const facultyRegistry = new OpenAPIRegistry();
export const facultyRouter: Router = express.Router();

facultyRegistry.register("Faculty", FacultySchema);

// Get all faculties
facultyRegistry.registerPath({
    method: "get",
    path: "/faculties",
    tags: ["Faculty"],
    summary: "Get faculties list",
    responses: createApiResponse(z.array(FacultySchema), "Success"),
});

facultyRouter.get("/", facultyController.getAllFaculties);

// Get a faculty
facultyRegistry.registerPath({
    method: "get",
    path: "/faculties/{id}",
    tags: ["Faculty"],
    summary: "Get a faculty by id",
    request: { params: GetFaciultySchema.shape.params },
    responses: createApiResponse(FacultySchema, "Success"),
});

facultyRouter.get(
    "/:id",
    validateRequest(GetFaciultySchema),
    facultyController.getFacultyById
);

// Create a faculty
facultyRegistry.registerPath({
    method: "post",
    path: "/faculties",
    tags: ["Faculty"],
    summary: "Create a faculty",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: CreateFacultySchema.shape.body,
                },
            },
        },
    },
    responses: createApiResponse(FacultySchema, "Success"),
});

facultyRouter.post(
    "/",
    validateRequest(CreateFacultySchema),
    facultyController.createFaculty
);

// Update a faculty 
facultyRegistry.registerPath({
    method: "put",
    path: "/faculties/{id}",
    tags: ["Faculty"],
    summary: "Update faculty information",
    request: {
        params: UpdateFacultySchema.shape.params,
        body: {
            content: {
                "application/json": {
                    schema: UpdateFacultySchema.shape.body,
                },
            },
        },
    },
    responses: createApiResponse(FacultySchema, "Success"),
});

facultyRouter.put(
    "/:id",
    validateRequest(UpdateFacultySchema),
    facultyController.updateFaculty
);

// Delete a faculty
facultyRegistry.registerPath({
    method: "delete",
    path: "/faculties/{id}",
    tags: ["Faculty"],
    summary: "Delete faculty",
    request: {
        params: GetFaciultySchema.shape.params,
    },
    responses: createApiResponse(FacultySchema, "Success"),
});
facultyRouter.delete(
    "/:id",
    validateRequest(GetFaciultySchema),
    facultyController.deleteFaculty
);
