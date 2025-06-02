import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Faculty = z.infer<typeof FacultySchema>;
export const FacultySchema = z.object({
    id: z.number(),
    full_name: z.string(),
    short_name: z.string(),
    description: z.string(),
});

export const GetFaciultySchema = z.object({
    params: z.object({ id: commonValidations.id }),
});

export const CreateFacultySchema = z.object({
    body: z.object({
        full_name: commonValidations.full_name,
        short_name: commonValidations.short_name,
        description: commonValidations.text,
    }),
});

export const UpdateFacultySchema = z.object({
    params: z.object({
        id: commonValidations.id,
    }),
    body: z.object({
        full_name: commonValidations.full_name,
        short_name: commonValidations.short_name,
        description: commonValidations.text,
    }),
});
