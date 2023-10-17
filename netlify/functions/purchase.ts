import { Config } from '@netlify/functions';
import Stripe from 'stripe';

const { STRIPE_BACKEND_SECRET } = process.env;

const stripe = new Stripe(STRIPE_BACKEND_SECRET, { apiVersion: '2023-10-16' });

export default async (req: Request) => {
  const body = await req.json();
  const { origin } = new URL(req.url);

  // Create Stripe session.
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price: body.priceId, quantity: 1 }],
    mode: 'payment',
    // Redirect to confirmation URL.
    success_url: `${origin}/confirmation?paymentStatus=success`,
    cancel_url: origin,
  });

  return Response.json({ id: session.id, url: session.url });
};

export const config: Config = {
  method: 'POST',
  path: '/api/purchase',
};
