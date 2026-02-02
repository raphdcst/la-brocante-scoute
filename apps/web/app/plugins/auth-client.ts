import { createAuthClient } from "better-auth/vue";
import { adminClient } from "better-auth/client/plugins";
import { magicLinkClient } from "better-auth/client/plugins";
import { stripeClient } from "@better-auth/stripe/client";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const authClient = createAuthClient({
    baseURL: config.public.serverUrl,
    plugins: [adminClient(), magicLinkClient(), stripeClient({ subscription: false })],
  });

  return {
    provide: {
      authClient: authClient,
    },
  };
});
