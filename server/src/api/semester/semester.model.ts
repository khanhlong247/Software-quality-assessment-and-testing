import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Semester = z.infer<typeof SemesterSchema>;
export const SemesterSchema = z.object({
    id: z.number(),
    name: z.string(),
    start_year: z.number(),
    start_date: z.date(),
    end_date: z.date(),
});

export const GetSemesterSchema = z.object({
    params: z.object({ id: commonValidations.id }),
});

export const CreateSemesterSchema = z.object({
    body: z.object({
        name: commonValidations.full_name,
        start_year: commonValidations.year,
        start_date: commonValidations.date,
        end_date: commonValidations.date,
    }),
});

export const UpdateSemesterSchema = z.object({
    params: z.object({
        id: commonValidations.id,
    }),
    body: z.object({
        name: commonValidations.full_name,
        start_year: commonValidations.year,
        start_date: commonValidations.date,
        end_date: commonValidations.date,
    }),
});
