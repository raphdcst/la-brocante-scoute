import { HelloAssoClient } from "@lecoq/helloasso-sdk";
import Stripe from "stripe";

import { HelloAssoAdapter } from "./adapters/helloasso";
import { StripeAdapter } from "./adapters/stripe";
import type {
  AdapterConfig,
  CheckoutParams,
  PaymentProvider,
  PaymentProviderId,
  ProviderMap,
} from "./interface";

export * from "./interface";

export class Payment<T extends PaymentProviderId> {
  public readonly provider: PaymentProvider<CheckoutParams<T>>;

  constructor(providerId: T, config: ProviderMap[T]) {
    switch (providerId) {
      case "stripe": {
        const { secretKey, ...rest } = config as unknown as AdapterConfig<"stripe">;
        const stripeClient = new Stripe(secretKey, rest);
        this.provider = new StripeAdapter(stripeClient) as Payment<T>["provider"];
        break;
      }
      case "helloasso": {
        const { organizationSlug, ...options } = config as unknown as AdapterConfig<"helloasso">;
        const helloAssoClient = new HelloAssoClient(options);
        this.provider = new HelloAssoAdapter(
          helloAssoClient,
          organizationSlug,
        ) as Payment<T>["provider"];
        break;
      }
      default: {
        const exhaustiveCheck: never = providerId;
        throw new Error(`Unhandled provider: ${exhaustiveCheck}`);
      }
    }
  }

  createCheckout(params: CheckoutParams<T>) {
    return this.provider.createCheckout(params);
  }
}
