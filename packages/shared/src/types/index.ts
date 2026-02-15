import { z } from "zod";

import { ReservationSchema, type ApiResponse } from "../schemas";

export type Reservation = z.infer<typeof ReservationSchema>;

export { type ApiResponse };
