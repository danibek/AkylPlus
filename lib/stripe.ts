import Stripe from "stripe";

if (!process.env.STRIPE_API_KEY) {
  throw new Error("STRIPE_API_KEY is not defined");
}

export const stripe = new Stripe(process.env.STRIPE_API_KEY, {
  apiVersion: "2023-08-16",
  typescript: true,
  maxNetworkRetries: 3,
  timeout: 10000,
});
