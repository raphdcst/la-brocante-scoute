import type Stripe from "stripe";
import type { BaseCheckoutParams } from "../../interface";

export type StripeConfig = Partial<Stripe.StripeConfig> & {
  secretKey: string;
};

export interface StripeCheckoutParams extends BaseCheckoutParams {
  currency: string;
  urls: {
    successUrl: string;
    cancelUrl: string;
  };
}
