import { protectedProcedure, publicProcedure } from "../index";
import { stripe } from "@la-brocante-scoute/stripe";

export const createCheckoutProcedure = publicProcedure.stripe.checkout.create.handler(
  async ({ input }) => {
    const checkout = await stripe.checkout.sessions.create({
      customer: input.customer,
      mode: "payment",
      line_items: input.lineItems,
      success_url: input.successUrl,
      cancel_url: input.cancelUrl,
      allow_promotion_codes: input.allowPromotionCode,
    });

    console.log(JSON.stringify(checkout, null, 2));

    if (!checkout.url || !checkout.id) {
      return {
        success: false,
        error: {
          message: "Could not create Stripe checkout session",
          code: checkout.lastResponse.statusCode,
        },
      };
    }

    return {
      success: true,
      data: {
        url: checkout.url,
        id: checkout.id,
      },
    };
  },
);

export const stripeRouter = {
  checkout: {
    create: createCheckoutProcedure,
  },
};
