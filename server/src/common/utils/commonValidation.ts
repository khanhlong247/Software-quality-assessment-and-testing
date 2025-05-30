import { z } from "zod";

export const commonValidations = {
	id: z
		.string()
		.refine((data) => !Number.isNaN(Number(data)), "ID must be a numeric value")
		.transform(Number)
		.refine((num) => num > 0, "ID must be a positive number"),
	text: z
		.string()
		.min(1, "Text cannot be empty")
		.refine((val) => val.trim().length > 0, {
			message: "Text cannot be empty",
		}),

	email: z
		.string()
		.email("Invalid email format")
		.nonempty("Email cannot be empty"),

	full_name: z
		.string()
		.nonempty("Full name cannot be empty")
		.min(2, "Full name must be at least 2 characters")
		.max(50, "Full name must not exceed 50 characters"),

	phone: z
		.string()
		.min(9, "Phone number must be at least 9 digits")
		.max(12, "Phone number must not exceed 12 digits")
		.regex(/^\d+$/, "Phone number must contain only digits")
		.nonempty("Phone number cannot be empty"),

	password: z
		.string()
		.min(6, "Password must be at least 6 characters")
		.nonempty(" Password cannot be empty"),

	date_of_birth: z
		.preprocess((arg) => {
			if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
		}, z.date({ required_error: "Date of birth is required" }))
		.refine((date) => date < new Date(), {
			message: "Date of birth must be in the past",
		}),

	link: z
		.string()
		.url("Invalid URL format")
		.nonempty("Link cannot be empty"),
};
