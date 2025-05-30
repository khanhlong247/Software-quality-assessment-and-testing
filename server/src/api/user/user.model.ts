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
	role: z.string()
});

export const GetUserSchema = z.object({
	params: z.object({ id: commonValidations.id }),
});

