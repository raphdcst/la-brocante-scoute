import { z } from "zod";

import { ReservationSchema, CheckoutSchema, ApiResponseSchema } from "../schemas";

export type Reservation = z.infer<typeof ReservationSchema>;
export type Checkout = z.infer<typeof CheckoutSchema>;
export type ApiResponse = z.infer<typeof ApiResponseSchema>;
