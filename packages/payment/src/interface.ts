import type { StripeConfig, StripeCheckoutParams } from "./adapters/stripe/types";
import type { HelloAssoConfig, HelloAssoCheckoutParams } from "./adapters/helloasso/types";

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
  stripe: StripeAdapterOptions;
  helloasso: HelloAssoAdapterOptions;
}

export type PaymentProviderId = keyof ProviderMap;

export type CheckoutParams<T extends PaymentProviderId> = ProviderMap[T]["checkoutParams"];
export type AdapterConfig<T extends PaymentProviderId> = ProviderMap[T]["config"];

export interface CreateCheckoutResult {
  checkoutUrl: string;
  id: string;
}

export class PaymentError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export interface PaymentProvider<T extends BaseCheckoutParams> {
  name: string;
  createCheckout(params: T): Promise<CreateCheckoutResult>;
}
