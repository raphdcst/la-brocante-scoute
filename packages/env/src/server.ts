import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.url(),
    CORS_ORIGIN: z.url(),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

    // stripe
    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),

    // helloasso
    HELLOASSO_CLIENT_ID: z.string().min(1),
    HELLOASSO_CLIENT_SECRET: z.string().min(1),

    // resend
    RESEND_API_KEY: z.string().min(1),
    EMAIL_FROM: z.email(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
