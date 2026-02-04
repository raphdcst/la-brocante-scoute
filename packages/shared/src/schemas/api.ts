import { z } from "zod";

const BaseResponseSchema = z.object({
  success: z.boolean(),
});

const SuccessResponseSchema = BaseResponseSchema.extend({
  success: z.literal(true),
  data: z.any(),
});

const ErrorResponseSchema = BaseResponseSchema.extend({
  success: z.literal(false),
  error: z.object({
    message: z.string(),
    code: z.string().optional(),
  }),
});

export const ApiResponseSchema = z.discriminatedUnion("success", [
  SuccessResponseSchema,
  ErrorResponseSchema,
]);
