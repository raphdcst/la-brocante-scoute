import { db } from "@la-brocante-scoute/db";
import { stripeClient } from "@la-brocante-scoute/stripe";
import * as schema from "@la-brocante-scoute/db/schema/auth";
import { env } from "@la-brocante-scoute/env/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { magicLink } from "better-auth/plugins";
import { stripe } from "@better-auth/stripe";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",

    schema: schema,
  }),
  trustedOrigins: [env.CORS_ORIGIN],
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    disableSignUp: false,
    minPasswordLength: 8,
    requireEmailVerification: true,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async () => {
      console.log("sending reset password email");
    },
    onPasswordReset: async ({ user }, request) => {
      console.log(`reset password for ${user.id}`);
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignIn: true,
    sendOnSignUp: true,
    sendVerificationEmail: async () => {
      console.log("sending verification email");
    },
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    },
  },
  plugins: [
    admin({
      adminUserIds: [""],
      allowImpersonatingAdmins: false,
    }),
    magicLink({
      sendMagicLink: async () => {
        console.log("sending magic link");
      },
    }),
    stripe({
      stripeClient,
      stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET,
      createCustomerOnSignUp: true,

      onEvent: async (event) => {
        const evt = {
          data: event.data,
          type: event.type,
          request: event.request,
        };

        console.log("stripe event: ", JSON.stringify(evt, null, 2));
        console.log("complete event", JSON.stringify(event, null, 2));
      },
    }),
  ],
});
