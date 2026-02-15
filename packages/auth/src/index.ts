import { db } from "@la-brocante-scoute/db";
import { MagicLinkEmail, sendEmail } from "@la-brocante-scoute/email";
import * as schema from "@la-brocante-scoute/db/schema/auth";
import { env } from "@la-brocante-scoute/env/server";
import { stripe as stripeClient } from "@la-brocante-scoute/payment";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { bearer } from "better-auth/plugins";
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
    bearer(),
    admin({
      adminUserIds: [""],
      allowImpersonatingAdmins: false,
    }),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        const res = await sendEmail({
          to: email,
          subject: "Se connecter - La Brocante Scoute",
          html: MagicLinkEmail(url),
        });

        console.log(res);
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
