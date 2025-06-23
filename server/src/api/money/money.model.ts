import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export const UpdateMoney = z.object({
    body: z.object({
        money: commonValidations.money_credit,
    }),
});