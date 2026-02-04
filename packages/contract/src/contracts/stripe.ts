import { createApiResponseSchema, CreateCheckoutSchema } from "@la-brocante-scoute/shared";
import { oc } from "@orpc/contract";
import { z } from "zod";

export const createCheckoutContract = oc.input(CreateCheckoutSchema).output(
  createApiResponseSchema(
    z.object({
      checkoutId: z.string().optional(),
      url: z.url().optional(),
    }),
  ),
);

export const stripeGlobalContract = {
  checkout: {
    create: createCheckoutContract,
  },
};
