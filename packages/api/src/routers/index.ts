import type { RouterClient } from "@orpc/server";
import { oc } from "..";
import { healthRouter } from "./health";
import { stripeRouter } from "./stripe";
import { testRouter } from "./test";

export const appRouter = oc.router({
  health: healthRouter,
  stripe: stripeRouter,
  test: testRouter,
});

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
