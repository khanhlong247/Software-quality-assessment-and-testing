import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Teacher = z.infer<typeof TeacherSchema>;
export const TeacherSchema = z.object({
    id: z.number(),
    user_id: z.number(),
    degree_id: z.number(),
    faculty_id: z.number(),
});

export const GetTeacherSchema = z.object({
    params: z.object({ id: commonValidations.id }),
});

export const CreateTeacherSchema = z.object({
    body: z.object({
        user_id: commonValidations.id,
        degree_id: commonValidations.id,
        faculty_id: commonValidations.id,
    }),
});

export const UpdateTeacherSchema = z.object({
    params: z.object({
        id: commonValidations.id,
    }),
    body: z.object({
        degree_id: commonValidations.id,
        faculty_id: commonValidations.id,
    }),
});
