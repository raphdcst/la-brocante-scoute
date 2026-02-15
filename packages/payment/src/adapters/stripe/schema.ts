import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  active: z.boolean(),
  name: z.string(),
  url: z.url().nullable(),
  defaultPrice: z.coerce.number(),
});

export const CheckoutSchema = z.object({
  customer: z.string(),
  mode: z.enum(["payment", "subscription", "setup"]),
  lineItems: z.array(
    z.object({
      price: z.string(),
      quantity: z.number(),
    }),
  ),
  successUrl: z.url(),
  cancelUrl: z.url(),
  allowPromotionCode: z.boolean(),
});

export const CreateCheckoutSchema = CheckoutSchema.pick({
  customer: true,
  lineItems: true,
  successUrl: true,
  cancelUrl: true,
  allowPromotionCode: true,
});
