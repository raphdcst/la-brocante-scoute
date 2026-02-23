import { HelloAssoClient } from "@lecoq/helloasso-sdk";
import Stripe from "stripe";

import { HelloAssoAdapter } from "./adapters/helloasso";
import { StripeAdapter } from "./adapters/stripe";
import type {
  AdapterConfig,
  CheckoutParams,
  PaymentProvider,
  PaymentProviderId,
} from "./interface";

export * from "./interface";

export class Payment<T extends PaymentProviderId> {
  public readonly provider: PaymentProvider<T>;

  constructor(providerId: T, config: AdapterConfig<T>) {
    switch (providerId) {
      case "stripe": {
        const { secretKey, ...rest } = config as AdapterConfig<"stripe">;
        const stripeClient = new Stripe(secretKey, rest);
        this.provider = new StripeAdapter(stripeClient) as unknown as PaymentProvider<T>;
        break;
      }
      case "helloasso": {
        const { organizationSlug, ...options } = config as AdapterConfig<"helloasso">;
        const helloAssoClient = new HelloAssoClient(options);
        this.provider = new HelloAssoAdapter(
          helloAssoClient,
          organizationSlug,
        ) as unknown as PaymentProvider<T>;
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
