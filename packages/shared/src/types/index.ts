import { z } from "zod";

import { ReservationSchema, CheckoutSchema, ProductSchema, type ApiResponse } from "../schemas";

export type Reservation = z.infer<typeof ReservationSchema>;
export type Checkout = z.infer<typeof CheckoutSchema>;
export type Product = z.infer<typeof ProductSchema>;
export { type ApiResponse };
