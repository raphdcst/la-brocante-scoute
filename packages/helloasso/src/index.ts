import { env } from "@la-brocante-scoute/env/server";
import { HelloAssoClient } from "@lecoq/helloasso-sdk";

export const client = new HelloAssoClient({
  clientId: env.HELLOASSO_CLIENT_ID,
  clientSecret: env.HELLOASSO_CLIENT_SECRET,
  defaultResponseType: "json",
});
