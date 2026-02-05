import { healthGlobalContract } from "./health";
import { stripeGlobalContract } from "./stripe";
import { testGlobalContract } from "./test";

export const appContract = {
  health: healthGlobalContract,
  stripe: stripeGlobalContract,
  test: testGlobalContract,
};
