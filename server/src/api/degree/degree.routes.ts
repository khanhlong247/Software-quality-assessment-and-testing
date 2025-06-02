import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";
import { validateRequest } from "@/common/utils/httpHandlers";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";

import {
    DegreeSchema,
    GetDegreeSchema,
    CreateDegreeSchema,
    UpdateDegreeSchema
} from "@/api/degree/degree.model";

import { degreeController } from "./degree.controller";

export const degreeRegistry = new OpenAPIRegistry();
export const degreeRouter: Router = express.Router();

degreeRegistry.register("Degree", DegreeSchema);

// Get all degrees
degreeRegistry.registerPath({
    method: "get",
    path: "/degrees",
    tags: ["Degree"],
    summary: "Get degrees list",
    responses: createApiResponse(z.array(DegreeSchema), "Success"),
});

degreeRouter.get("/", degreeController.getAllDegrees);

// Get a degree
degreeRegistry.registerPath({
    method: "get",
    path: "/degrees/{id}",
    tags: ["Degree"],
    summary: "Get a degree by id",
    request: { params: GetDegreeSchema.shape.params },
    responses: createApiResponse(DegreeSchema, "Success"),
});

degreeRouter.get(
    "/:id",
    validateRequest(GetDegreeSchema),
    degreeController.getDegreeById
);

// Create a degree
degreeRegistry.registerPath({
    method: "post",
    path: "/degrees",
    tags: ["Degree"],
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
    validateRequest(CreateDegreeSchema),
    degreeController.createDegree
);

// Update a degree information
degreeRegistry.registerPath({
    method: "put",
    path: "/degrees/{id}",
    tags: ["Degree"],
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
    validateRequest(UpdateDegreeSchema),
    degreeController.updateDegree
);


// Delete a degree
degreeRegistry.registerPath({
    method: "delete",
    path: "/degrees/{id}",
    tags: ["Degree"],
    summary: "Delete degree",
    request: {
        params: GetDegreeSchema.shape.params,
    },
    responses: createApiResponse(DegreeSchema, "Success"),
});
degreeRouter.delete(
    "/:id",
    validateRequest(GetDegreeSchema),
    degreeController.deleteDegree
);
