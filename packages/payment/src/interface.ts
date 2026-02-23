import type { HelloAssoClient } from "@lecoq/helloasso-sdk";
import type Stripe from "stripe";

import type { HelloAssoConfig, HelloAssoCheckoutParams } from "./adapters/helloasso/types";
import type { StripeConfig, StripeCheckoutParams } from "./adapters/stripe/types";

export interface BaseCheckoutParams {
  amountInCents: number;
  itemName: string;
  customer: {
    email: string;
    firstName: string;
    lastName: string;
  };
  metadata: Record<string, string>;
}

export type BaseAdapterConfig = object;

export interface BaseAdapterOptions<T extends BaseAdapterConfig, R extends BaseCheckoutParams> {
  config: T;
  checkoutParams: R;
}

export type StripeAdapterOptions = BaseAdapterOptions<StripeConfig, StripeCheckoutParams>;
export type HelloAssoAdapterOptions = BaseAdapterOptions<HelloAssoConfig, HelloAssoCheckoutParams>;

export interface ProviderMap {
  stripe: {
    adapterOptions: StripeAdapterOptions;
    client: Stripe;
  };
  helloasso: {
    adapterOptions: HelloAssoAdapterOptions;
    client: HelloAssoClient;
  };
}

export type PaymentProviderId = keyof ProviderMap;

export type CheckoutParams<T extends PaymentProviderId> =
  ProviderMap[T]["adapterOptions"]["checkoutParams"];
export type AdapterConfig<T extends PaymentProviderId> = ProviderMap[T]["adapterOptions"]["config"];
export type ProviderClient<T extends PaymentProviderId> = ProviderMap[T]["client"];

export interface CreateCheckoutResult {
  checkoutUrl: string;
  id: string;
}

export class PaymentError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export interface PaymentProvider<T extends PaymentProviderId> {
  name: T;
  client: ProviderClient<T>;
  createCheckout(params: CheckoutParams<T>): Promise<CreateCheckoutResult>;
}
