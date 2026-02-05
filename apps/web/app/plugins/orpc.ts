import type { AppRouterClient } from "@la-brocante-scoute/api/routers/index";
import { appContract } from "@la-brocante-scoute/contract";
import { defineNuxtPlugin } from "#app";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { RequestValidationPlugin, ResponseValidationPlugin } from "@orpc/contract/plugins";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const rpcUrl = `${config.public.serverUrl}/api/rpc`;

  const rpcLink = new RPCLink({
    plugins: [new RequestValidationPlugin(appContract), new ResponseValidationPlugin(appContract)],
    url: rpcUrl,
    fetch(url, options) {
      return fetch(url, {
        ...options,
        credentials: "include",
      });
    },
  });

  const client: AppRouterClient = createORPCClient(rpcLink);
  const orpcUtils = createTanstackQueryUtils(client);

  return {
    provide: {
      orpc: orpcUtils,
    },
  };
});
