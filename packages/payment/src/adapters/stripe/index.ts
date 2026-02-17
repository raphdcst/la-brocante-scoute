import type Stripe from "stripe";

import { PaymentError, type CreateCheckoutResult, type PaymentProvider } from "../../interface";

import type { StripeCheckoutParams } from "./types";

export class StripeAdapter implements PaymentProvider<StripeCheckoutParams> {
  public readonly name = "stripe";
  private stripe: Stripe;

  constructor(stripe: Stripe) {
    this.stripe = stripe;
  }

  async createCheckout(params: StripeCheckoutParams): Promise<CreateCheckoutResult> {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: params.currency,
            product_data: {
              name: params.itemName,
            },
            unit_amount: params.amountInCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: params.urls.successUrl,
      cancel_url: params.urls.cancelUrl,
      customer_email: params.customer.email,
      metadata: params.metadata,
    });

    if (!session.url) {
      throw new PaymentError("Stripe checkout creation failed.");
    }

    return {
      checkoutUrl: session.url,
      id: session.id,
    };
  }
}
