import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type ClassSection = z.infer<typeof ClassSectionSchema>;
export const ClassSectionSchema = z.object({
    id: z.number(),
    full_name: z.string(),
    total_students: z.number(),
    course_id: z.number(),
    semester_id: z.number(),
    teacher_id: z.number(),
    grade: z.number(),
});
export const ClassSectionSchemaDetail = z.object({
    id: z.number(),
    full_name: z.string(),
    total_students: z.number(),
    course_id: z.string(),
    semester_id: z.string(),
    teacher_id: z.string(),
    grade: z.number(),
});
export const GetClassSchema = z.object({
    params: z.object({ id: commonValidations.id }),
});
export const CreateClassSchema = z.object({
    body: z.object({
        full_name: commonValidations.full_name,
        total_students: commonValidations.total_students,
        course_id: commonValidations.id,
        semester_id: commonValidations.id,
        teacher_id: commonValidations.id
    }),
});

export const CreateMultiClassSchema = z.object({
    body: z.object({
        name: commonValidations.class_name,
        total_students: commonValidations.total_students,
        course_id: commonValidations.id,
        semester_id: commonValidations.id,
        count: commonValidations.multi_create,
    }),
});
export const UpdateClassSchema = z.object({
    params: z.object({
        id: commonValidations.id,
    }),
    body: z.object({
        full_name: commonValidations.class_name,
        total_students: commonValidations.total_students,
        course_id: commonValidations.id,
        semester_id: commonValidations.id,
        teacher_id: commonValidations.id
    }),
});
export const DeleteClassSchema = z.object({
    params: z.object({ id: commonValidations.id }),
});
