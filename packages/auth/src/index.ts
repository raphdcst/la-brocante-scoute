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
    enabled: false,
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    },
  },
  plugins: [
    admin({}),
    magicLink({
      sendMagicLink: async () => {
        console.log("sending magic link");
      },
    }),
    stripe({
      stripeClient,
      stripeWebhookSecret: "whsec_DNNwxatvv0Q74sUMMO1XCdyMWuqT1mgG",
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
