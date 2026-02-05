import { publicProcedure } from "../index";
import { stripe, type Stripe } from "@la-brocante-scoute/stripe";

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

    if (!checkout.url || !checkout.id) {
      return {
        success: false,
        error: {
          message: "Could not create Stripe checkout session",
          code: "INTERNAL_SERVER_ERROR",
        },
      };
    }

    return {
      success: true,
      data: {
        url: checkout.url,
        checkoutId: checkout.id,
      },
    };
  },
);

export const listProductsProcedure = publicProcedure.stripe.products.list.handler(async () => {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const data = products.data.map((product) => {
    const price = product.default_price as Stripe.Price | null;

    return {
      id: product.id,
      active: product.active,
      name: product.name,
      url: product.url,
      defaultPrice: price?.unit_amount ? price.unit_amount / 100 : 0,
    };
  });

  return {
    success: true,
    data: {
      products: data,
    },
  };
});

export const stripeRouter = {
  checkout: {
    create: createCheckoutProcedure,
  },
  products: {
    list: listProductsProcedure,
  },
};
