import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import {
	ChangePasswordSchema,
	CreateUserSchema,
	GetUserSchema,
	UpdateUserSchema,
	UserSchema,
} from "@/api/user/user.model";
import { validateRequest } from "@/common/utils/httpHandlers";
import { userController } from "./user.controller";

export const userRegistry = new OpenAPIRegistry();
export const userRouter: Router = express.Router();

userRegistry.register("User", UserSchema);

// Get all users
userRegistry.registerPath({
	method: "get",
	path: "/users",
	tags: ["User"],
	summary: "Get users list",
	responses: createApiResponse(z.array(UserSchema), "Success"),
});

userRouter.get("/", userController.getAllUsers);

// Get an user
userRegistry.registerPath({
	method: "get",
	path: "/users/{id}",
	tags: ["User"],
	summary: "Get an user by id",
	request: { params: GetUserSchema.shape.params },
	responses: createApiResponse(UserSchema, "Success"),
});

userRouter.get(
	"/:id",
	validateRequest(GetUserSchema),
	userController.getUserById
);

// Create an user
userRegistry.registerPath({
	method: "post",
	path: "/users",
	tags: ["User"],
	summary: "Create an user",
	request: {
		body: {
			content: {
				"application/json": {
					schema: CreateUserSchema.shape.body,
				},
			},
		},
	},
	responses: createApiResponse(UserSchema, "Success"),
});

userRouter.post(
	"/",
	validateRequest(CreateUserSchema),
	userController.createUser
);

// Update an user information
userRegistry.registerPath({
	method: "put",
	path: "/users/{id}",
	tags: ["User"],
	summary: "Update user information",
	request: {
		params: GetUserSchema.shape.params,
		body: {
			content: {
				"application/json": {
					schema: UpdateUserSchema.shape.body,
				},
			},
		},
	},
	responses: createApiResponse(UserSchema, "Success"),
});

userRouter.put(
	"/:id",
	validateRequest(UpdateUserSchema),
	userController.updateUser
);

// Change user password
userRegistry.registerPath({
	method: "put",
	path: "/users/{id}/password",
	tags: ["User"],
	summary: "Change password",
	request: {
		params: GetUserSchema.shape.params,
		body: {
			content: {
				"application/json": {
					schema: ChangePasswordSchema.shape.body,
				},
			},
		},
	},
	responses: createApiResponse(UserSchema, "Success"),
});

userRouter.put(
	"/:id/password",
	validateRequest(ChangePasswordSchema),
	userController.changePassword
);

// Delete an user information
userRegistry.registerPath({
	method: "delete",
	path: "/users/{id}",
	tags: ["User"],
	summary: "Delete user information",
	request: {
		params: GetUserSchema.shape.params,
	},
	responses: createApiResponse(UserSchema, "Success"),
});
userRouter.delete(
	"/:id",
	validateRequest(ChangePasswordSchema),
	userController.deleteUser
);
