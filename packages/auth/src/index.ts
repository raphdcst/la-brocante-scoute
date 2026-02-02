import { db } from "@la-brocante-scoute/db";
import * as schema from "@la-brocante-scoute/db/schema/auth";
import { env } from "@la-brocante-scoute/env/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { magicLink } from "better-auth/plugins";

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
      // oxlint-disable-next-line no-unused-vars
      sendMagicLink: async ({ email, token, url }, ctx) => {
        console.log("sending magic link");
      },
    }),
  ],
});
