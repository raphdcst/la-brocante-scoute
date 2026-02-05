import { oc } from "@orpc/contract";
import { z } from "zod";

export const getBearerTokenSchema = oc
  .input(
    z.object({
      token: z.string(),
    }),
  )
  .output(
    z.object({
      bearer: z.string(),
    }),
  );

export const authGlobalContract = {
  bearer: {
    get: getBearerTokenSchema,
  },
};
