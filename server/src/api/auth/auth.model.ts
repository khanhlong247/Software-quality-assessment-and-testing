import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";
extendZodWithOpenApi(z);

export const loginSchema = z.object({
  body: z.object({
    email: commonValidations.email,
    password: commonValidations.password,
  })
  ,
});
export const loginResponse = z.object({
  body: z.object({
    message: commonValidations.text,
    token: commonValidations.text,
  }),
});


export const initForgotPasswordSchema = z.object({
  body: z.object({
    email: commonValidations.email,
  }),
});

export const completeForgotPasswordSchema = z.object({
  body: z.object({
    email: commonValidations.email,
    otp: commonValidations.otp_code,
    newPassword: commonValidations.password,
  }),
});

export const forgotPasswordResponseSchema = z.object({
  success: z.boolean().describe("Request success status"),
  message: z.string().describe("Response message"),
  responseObject: z
    .object({
      email: z.string().email().describe("Email of the user who reset the password"),
    })
    .describe("Forgot password response data"),
  statusCode: z.number().describe("HTTP status code"),
});


export const completeForgotPasswordResponseSchema = z.object({
  success: z.boolean().describe("Request success status"),
  message: z.string().describe("Response message"),
  responseObject: z
    .object({
      email: z.string().email().describe("Email of the user who reset the password"),
    })
    .describe("Complete forgot password response data"),
  statusCode: z.number().describe("HTTP status code"),
});