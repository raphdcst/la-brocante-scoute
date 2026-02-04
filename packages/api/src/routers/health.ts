import { publicProcedure, protectedProcedure } from "../index";

export const publicHealthCheckProcedure = publicProcedure.health.public.handler(async () => {
  return "OK";
});

export const privateHealthCheckProcedure = protectedProcedure.health.private.handler(async () => {
  return {
    message: "This is private",
  };
});

export const healthRouter = {
  public: publicHealthCheckProcedure,
  private: privateHealthCheckProcedure,
};
