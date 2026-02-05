import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string(),
  active: z.boolean(),
  name: z.string(),
  url: z.url().nullable(),
  defaultPrice: z.coerce.number(),
});
