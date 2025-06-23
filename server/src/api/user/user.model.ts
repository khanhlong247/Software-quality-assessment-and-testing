import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type User = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
	id: z.number(),
	full_name: z.string(),
	email: z.string().email(),
	hash_password: z.string(),
	role: z.string(),
	phone: z.number()
});

export const GetUserSchema = z.object({
	params: z.object({ id: commonValidations.id }),
});

export const CreateUserSchema = z.object({
	body: z.object({
		full_name: commonValidations.full_name,
		email: commonValidations.email,
		password: commonValidations.password,
		role: commonValidations.role,
	}),

});

export const UpdateUserSchema = z.object({
	params: z.object({
		id: commonValidations.id,
	}),
	body: z.object({
		full_name: commonValidations.full_name,
		phone: commonValidations.phone,
	}),
});

export const ChangePasswordSchema = z.object({
	body: z.object({
		full_name: commonValidations.full_name,
		current_password: commonValidations.password,
		new_password: commonValidations.password,
	}),
});