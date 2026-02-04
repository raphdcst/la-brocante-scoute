import { oc } from "./orpc";
import { requireAuth } from "./middlewares/auth";

export const publicProcedure = oc;
export const protectedProcedure = publicProcedure.use(requireAuth);

export { oc };
