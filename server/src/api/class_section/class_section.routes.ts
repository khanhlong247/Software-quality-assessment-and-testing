import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { validateRequest } from "@/common/utils/httpHandlers";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";

import {
    ClassSectionSchema,
    GetClassSchema,
    CreateClassSchema,
    UpdateClassSchema,
    DeleteClassSchema,
} from "@/api/class_section/class_section.model";

import { classSectionController } from "./class_section.controller";
export const classSectionRegistry = new OpenAPIRegistry();
export const classSectionRouter: Router = express.Router();
classSectionRegistry.register("ClassSection", ClassSectionSchema);

// Get all class sections
classSectionRegistry.registerPath({
    method: "get",
    path: "/class-sections",
    tags: ["Class Section"],
    summary: "Get class section list",
    responses: createApiResponse(z.array(ClassSectionSchema), "Success"),
});

classSectionRouter.get("/", classSectionController.getAllClassSections);


// Get a class section
classSectionRegistry.registerPath({
    method: "get",
    path: "/class-sections/{id}",
    tags: ["Class Section"],
    summary: "Get a class section by id",
    request: { params: GetClassSchema.shape.params },
    responses: createApiResponse(ClassSectionSchema, "Success"),
});

classSectionRouter.get(
    "/:id",
    validateRequest(GetClassSchema),
    classSectionController.getClassSectionById
);

// Create a class section
classSectionRegistry.registerPath({
    method: "post",
    path: "/class-sections",
    tags: ["Class Section"],
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
    validateRequest(CreateClassSchema),
    classSectionController.createClassSection
);

// Update a class section information
classSectionRegistry.registerPath({
    method: "put",
    path: "/class-sections/{id}",
    tags: ["Class Section"],
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
    validateRequest(UpdateClassSchema),
    classSectionController.updateClassSection
);


// Delete a class section
classSectionRegistry.registerPath({
    method: "delete",
    path: "/class-sections/{id}",
    tags: ["Class Section"],
    summary: "Delete a class section",
    request: {
        params: DeleteClassSchema.shape.params,
    },
    responses: createApiResponse(ClassSectionSchema, "Success"),
});
classSectionRouter.delete(
    "/:id",
    validateRequest(DeleteClassSchema),
    classSectionController.deleteClassSection
);
