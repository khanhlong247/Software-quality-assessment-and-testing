import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Course = z.infer<typeof CourseSchema>;
export const CourseSchema = z.object({
    id: z.number(),
    name: z.string(),
    credit: z.number(),
    coefficient: z.number(),
    total_hour: z.number(),
});

export const GetCourseSchema = z.object({
    params: z.object({ id: commonValidations.id }),
});

export const CreateCourseSchema = z.object({
    body: z.object({
        name: commonValidations.course_name,
        credit: commonValidations.course_credit,
        coefficient: commonValidations.coefficient,
        total_hour: commonValidations.total_hours,
    }),
});
export const UpdateCourseSchema = z.object({
    params: z.object({
        id: commonValidations.id,
    }),
    body: z.object({
        name: commonValidations.course_name,
        credit: commonValidations.course_credit,
        coefficient: commonValidations.coefficient,
        total_hour: commonValidations.total_hours,
    }),
});