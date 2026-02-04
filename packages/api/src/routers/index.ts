import type { RouterClient } from "@orpc/server";
import { oc } from "..";
import { healthRouter } from "./health";

export const appRouter = oc.router({
  health: healthRouter,
});

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
