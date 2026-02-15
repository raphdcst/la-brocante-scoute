import { z } from "zod";

const MetaSchema = z
  .object({
    requestId: z.string().optional(),
    timestamp: z.date().optional(),
    pagination: z
      .object({
        page: z.number().int(),
        limit: z.number().int(),
        total: z.number().int(),
        totalPages: z.number().int(),
      })
      .optional(),
  })
  .catchall(z.unknown());

const BaseResponseSchema = z.object({
  statusCode: z.int().min(100).max(599),
  meta: MetaSchema.optional(),
});

const SuccessResponseSchema = BaseResponseSchema.extend({
  success: z.literal(true),
  message: z.string().optional(),
});

const ErrorResponseSchema = BaseResponseSchema.extend({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
  }),
});

export const createApiResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.discriminatedUnion("success", [
    SuccessResponseSchema.extend({ data: dataSchema }),
    ErrorResponseSchema,
  ]);

export type ApiResponse<T> = z.infer<ReturnType<typeof createApiResponseSchema<z.ZodType<T>>>>;
