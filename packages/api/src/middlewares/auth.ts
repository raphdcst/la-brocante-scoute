import { ORPCError } from "@orpc/server";
import { oc } from "../orpc";

export const requireAuth = oc.middleware(async ({ context, next }) => {
  if (!context.session?.user) {
    throw new ORPCError("UNAUTHORIZED");
  }
  return next({
    context: {
      ...context,
      session: context.session,
    },
  });
});
