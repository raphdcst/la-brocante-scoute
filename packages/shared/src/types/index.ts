import { z } from "zod";

import { ReservationSchema, CheckoutSchema, type ApiResponse } from "../schemas";

export type Reservation = z.infer<typeof ReservationSchema>;
export type Checkout = z.infer<typeof CheckoutSchema>;
export { type ApiResponse };
