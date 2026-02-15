import { healthGlobalContract } from "./health";
import { testGlobalContract } from "./test";

export const appContract = {
  health: healthGlobalContract,
  test: testGlobalContract,
};
