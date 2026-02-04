import { oc } from "@orpc/contract";
import { z } from "zod";

export const publicHealthCheckContract = oc.output(z.string());
export const privateHealthCheckContract = oc.output(
  z.object({
    message: z.string(),
  }),
);

export const healthGlobalContract = {
  public: publicHealthCheckContract,
  private: privateHealthCheckContract,
};
