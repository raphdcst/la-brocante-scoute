import { publicProcedure } from "../../index";
import { auth } from "@la-brocante-scoute/auth";

export const getBearerTokenProcedure = publicProcedure.test.auth.bearer.get.handler(
  async ({ input, context }) => {
    const h7 = context.headers;

    const session = await auth.api.magicLinkVerify({
      query: {
        token: input.token,
      },
      headers: h7,
    });

    return {
      bearer: session.token,
    };
  },
);

export const authRouter = {
  bearer: {
    get: getBearerTokenProcedure,
  },
};
