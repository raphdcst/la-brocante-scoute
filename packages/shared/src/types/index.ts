import { z } from "zod";

import { ReservationSchema } from "../schemas";

export type Reservation = z.infer<typeof ReservationSchema>;
