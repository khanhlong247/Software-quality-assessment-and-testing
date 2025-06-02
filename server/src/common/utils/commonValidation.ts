import { z } from "zod";

export const commonValidations = {
	id: z
		.string()
		.refine((data) => !Number.isNaN(Number(data)), "ID must be a numeric value")
		.transform(Number)
		.refine((num) => num > 0, "ID must be a positive number"),
	text: z
		.string({
			required_error: "This field is required",
			invalid_type_error: "Must be string",
		})
		.nonempty("This field cannot be empty")
		.min(1, "This field cannot be empty"),
	role: z.enum(["student", "teacher", "moderator", "admin"], {
		errorMap: () => ({
			message:
				"Message: Role must be one of 'student', 'teacher', 'moderator', or 'admin'",
		}),
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
	short_name: z
		.string()
		.nonempty("Short name cannot be empty")
		.min(2, "Short name must be at least 2 characters")
		.max(10, "Short name must not exceed 10 characters"),
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

	link: z.string().url("Invalid URL format").nonempty("Link cannot be empty"),

	salary_grade: z
		.number({
			required_error: "Salary grade is required",
			invalid_type_error: "Salary grade must be a number",
		})
		.refine((num) => num > 0 && num <= 5, {
			message:
				"Salary grade must be greater than 0 and less than or equal to 5",
		}),
	year: z
		.number({
			required_error: "Year is required",
			invalid_type_error: "Year must be a number",
		})
		.int("Year must be an integer")
		.min(
			new Date().getFullYear(),
			`Year cannot be smaller than ${new Date().getFullYear()}`
		)
		.max(
			new Date().getFullYear() + 10,
			`Year cannot be greater than ${new Date().getFullYear() + 10}`
		),

	date: z
		.preprocess((arg) => {
			if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
		}, z.date({ required_error: "Date is required" }))
		.refine((date) => !isNaN(date.getTime()), {
			message: "Invalid date format",
		}),

	otp_code: z
		.string()
		.length(6, "OTP must be 6 digits")
		.nonempty("Message: OTP code cannot be empty"),

	positive_number: z
		.number({
			required_error: "Positive number is required",
			invalid_type_error: "Must be a number",
		})
		.int("Must be an integer")
		.positive("Must be a positive number"),

	coefficient: z
		.number({
			required_error: "Coefficient is required",
			invalid_type_error: "Coefficient must be a number",
		})
		.min(0, "Coefficient must be at least 0")
		.max(3.5, "Coefficient must not exceed 3.5"),
};
