import { implement } from "@orpc/server";
import { appContract } from "@la-brocante-scoute/contract";

import type { Context } from "./context";

export const oc = implement(appContract).$context<Context>();
