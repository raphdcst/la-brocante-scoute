import { z } from "zod";

export const ReservationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  buyedAt: z.coerce.date(),
});
