import type Stripe from "stripe";

import {
  PaymentError,
  type CheckoutParams,
  type CreateCheckoutResult,
  type PaymentProvider,
} from "../../interface";

export class StripeAdapter implements PaymentProvider<"stripe"> {
  public readonly name = "stripe";
  public readonly client: Stripe;

  constructor(stripe: Stripe) {
    this.client = stripe;
  }

  async createCheckout(params: CheckoutParams<"stripe">): Promise<CreateCheckoutResult> {
    const session = await this.client.checkout.sessions.create({
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
