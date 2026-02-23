import { env } from "@la-brocante-scoute/env/server";
import { Payment } from "./client";

export * from "./interface";
export { Payment } from "./client";

export const payment = new Payment("helloasso", {
  clientId: env.HELLOASSO_CLIENT_ID,
  clientSecret: env.HELLOASSO_CLIENT_SECRET,
  organizationSlug: env.HELLOASSO_ORGANIZATION_SLUG,
  defaultResponseType: "json",
});
