import Stripe from "stripe";
import { env } from "@la-brocante-scoute/env/server";

export const stripeClient = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-01-28.clover",
});
