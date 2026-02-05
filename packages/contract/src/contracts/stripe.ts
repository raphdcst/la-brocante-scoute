import {
  createApiResponseSchema,
  CreateCheckoutSchema,
  ProductSchema,
} from "@la-brocante-scoute/shared";
import { oc } from "@orpc/contract";
import { z } from "zod";

export const createCheckoutContract = oc.input(CreateCheckoutSchema).output(
  createApiResponseSchema(
    z.object({
      checkoutId: z.string().nullable(),
      url: z.url().nullable(),
    }),
  ),
);

export const listProductsContract = oc.output(
  createApiResponseSchema(
    z.object({
      products: z.array(ProductSchema),
    }),
  ),
);

export const stripeGlobalContract = {
  checkout: {
    create: createCheckoutContract,
  },
  products: {
    list: listProductsContract,
  },
};
