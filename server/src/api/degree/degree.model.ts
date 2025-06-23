import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Degree = z.infer<typeof DegreeSchema>;
export const DegreeSchema = z.object({
    id: z.number(),
    full_name: z.string(),
    short_name: z.string(),
    salary_grade: z.number(),
});

export const GetDegreeSchema = z.object({
    params: z.object({ id: commonValidations.id }),
});

export const CreateDegreeSchema = z.object({
    body: z.object({
        full_name: commonValidations.full_name,
        short_name: commonValidations.short_name,
        salary_grade: commonValidations.salary_grade,
    }),
});

export const UpdateDegreeSchema = z.object({
    params: z.object({
        id: commonValidations.id,
    }),
    body: z.object({
        full_name: commonValidations.full_name,
        short_name: commonValidations.short_name,
        salary_grade: commonValidations.salary_grade,
    }),
});
