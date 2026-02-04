import { healthGlobalContract } from "./health";
import { stripeGlobalContract } from "./stripe";

export const appContract = {
  health: healthGlobalContract,
  stripe: stripeGlobalContract,
};
