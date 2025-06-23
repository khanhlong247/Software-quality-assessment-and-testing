import {
	OpenAPIRegistry,
	OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";

import { healthCheckRegistry } from "@/api/healthCheck/healthCheckRouter";
import { userRegistry } from "@/api/user/user.routes";
import { degreeRegistry } from "@/api/degree/degree.routes";
import { facultyRegistry } from "@/api/faculty/faculty.routes";
import { teacherRegistry } from "@/api/teacher/teacher.routes";
import { semesterRegistry } from "@/api/semester/semester.routes";
import { authRegistry } from "@/api/auth/auth.routes";
import { courseRegistry } from "@/api/course/course.routes";
import { classSectionRegistry } from "@/api/class_section/class_section.routes";
export type OpenAPIDocument = ReturnType<
	OpenApiGeneratorV3["generateDocument"]
>;

export function generateOpenAPIDocument(): OpenAPIDocument {
	const registry = new OpenAPIRegistry([
		healthCheckRegistry,
		authRegistry,
		userRegistry,
		degreeRegistry,
		facultyRegistry,
		teacherRegistry,
		semesterRegistry,
		courseRegistry,
		classSectionRegistry,
	]);

	registry.registerComponent("securitySchemes", "bearerAuth", {
		type: "http",
		scheme: "bearer",
		bearerFormat: "JWT",
		description: "Enter your JWT token in the format: Bearer <token>",
	});
	const generator = new OpenApiGeneratorV3(registry.definitions);
	return generator.generateDocument({
		openapi: "3.0.0",
		info: {
			version: "1.0.0",
			title: "FE Practice API",
		},
		externalDocs: {
			description: "View the raw OpenAPI Specification in JSON format",
			url: "/swagger.json",
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	});
}
