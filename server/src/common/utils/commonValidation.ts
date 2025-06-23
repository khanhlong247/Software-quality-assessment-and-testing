import { z } from "zod";

export const commonValidations = {
  id: z
    .string()
    .refine((data) => !Number.isNaN(Number(data)), "ID phải là giá trị số")
    .transform(Number)
    .refine((num) => num > 0, "ID phải là số dương"),
  text: z
    .string({
      required_error: "Trường văn bản là bắt buộc",
      invalid_type_error: "Phải là chuỗi",
    })
    .nonempty("Trường văn bản không được để trống")
    .min(1, "Trường văn bản không được để trống"),
  role: z.enum(["student", "teacher", "moderator", "admin"], {
    errorMap: () => ({
      message:
        "Vai trò phải là một trong các giá trị: 'student', 'teacher', 'moderator', hoặc 'admin'",
    }),
  }),
  email: z
    .string()
    .email("Định dạng email không hợp lệ")
    .nonempty("Email không được để trống"),

  full_name: z
    .string()
    .nonempty("Tên không được để trống")
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(50, "Tên không được vượt quá 50 ký tự"),

  class_name: z
    .string()
    .nonempty("Tên lớp không được để trống")
    .min(4, "Tên lớp phải có ít nhất 4 ký tự")
    .max(50, "Tên lớp không được vượt quá 50 ký tự"),

  course_name: z
    .string()
    .nonempty("Tên khóa học không được để trống")
    .min(5, "Tên khóa học phải có ít nhất 5 ký tự")
    .max(50, "Tên khóa học không được vượt quá 50 ký tự"),

  short_name: z
    .string()
    .nonempty("Tên viết tắt không được để trống")
    .min(2, "Tên viết tắt phải có ít nhất 2 ký tự")
    .max(10, "Tên viết tắt không được vượt quá 10 ký tự")
    .regex(/^[a-zA-Z\s]+$/, "Tên viết tắt chỉ được chứa chữ cái và dấu cách"),
  phone: z
    .string()
    .min(9, "Số điện thoại phải có ít nhất 9 chữ số")
    .max(12, "Số điện thoại không được vượt quá 12 chữ số")
    .regex(/^\d+$/, "Số điện thoại chỉ được chứa chữ số")
    .nonempty("Số điện thoại không được để trống"),

  password: z
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .nonempty("Mật khẩu không được để trống"),

  date_of_birth: z
    .preprocess((arg) => {
      if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
    }, z.date({ required_error: "Ngày sinh là bắt buộc" }))
    .refine((date) => date < new Date(), {
      message: "Ngày sinh phải là ngày trong quá khứ",
    }),

  link: z
    .string()
    .url("Định dạng URL không hợp lệ")
    .nonempty("Link không được để trống"),

  salary_grade: z
    .number({
      required_error: "Bậc lương là bắt buộc",
      invalid_type_error: "Bậc lương phải là số",
    })
    .refine((num) => num > 0 && num <= 5, {
      message: "Bậc lương phải lớn hơn 0 và nhỏ hơn hoặc bằng 5",
    }),
  year: z
    .number({
      required_error: "Năm là bắt buộc",
      invalid_type_error: "Năm phải là số",
    })
    .int("Năm phải là số nguyên")
    .min(
      new Date().getFullYear(),
      `Năm không được nhỏ hơn ${new Date().getFullYear()}`
    )
    .max(
      new Date().getFullYear() + 10,
      `Năm không được lớn hơn ${new Date().getFullYear() + 10}`
    ),

  date: z
    .preprocess((arg) => {
      if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
    }, z.date({ required_error: "Ngày là bắt buộc" }))
    .refine((date) => !isNaN(date.getTime()), {
      message: "Định dạng ngày không hợp lệ",
    }),

  otp_code: z
    .string()
    .length(6, "Mã OTP phải có 6 chữ số")
    .nonempty("Mã OTP không được để trống"),

  positive_number: z
    .number({
      required_error: "Số dương là bắt buộc",
      invalid_type_error: "Phải là số",
    })
    .int("Phải là số nguyên")
    .positive("Phải là số dương"),

  total_students: z
    .number({
      required_error: "Số học sinh là bắt buộc",
      invalid_type_error: "Phải là số",
    })
    .min(1, "Số học sinh phải lớn hơn hoặc bằng 1")
    .max(160, "Số học sinh không được vượt quá 160")
    .int("Phải là số nguyên")
    .positive("Phải là số dương"),

  course_credit: z
    .number({
      required_error: "Số tín chỉ là bắt buộc",
      invalid_type_error: "Số tín chỉ phải là số",
    })
    .min(1, "Số tín chỉ phải lớn hơn hoặc bằng 1")
    .max(10, "Số tín chỉ không được vượt quá 10"),

  total_hours: z
    .number({
      required_error: "Số tiết là bắt buộc",
      invalid_type_error: "Số tiết phải là số",
    })
    .min(10, "Số tiết chỉ phải lớn hơn hoặc bằng 20")
    .max(80, "Số tiết phải nhỏ hơn hoặc bằng 80")
    .positive("Số tiết phải là số dương"),

  coefficient: z
    .number({
      required_error: "Hệ số là bắt buộc",
      invalid_type_error: "Hệ số phải là số",
    })
    .min(0, "Hệ số phải lớn hơn hoặc bằng 0")
    .max(3.5, "Hệ số không được vượt quá 3.5"),

  multi_create: z
    .number({
      required_error: "Số dương là bắt buộc",
      invalid_type_error: "Phải là số",
    })
    .min(1, "Số lượng lớp phải ít nhất là 1")
    .max(9, "Số lượng lớp không được vượt quá 9")
    .int("Số lượng lớp phải là số nguyên")
    .positive("Số lượng lớp phải là số dương"),
};
