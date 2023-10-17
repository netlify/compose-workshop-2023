import { Config, Context } from '@netlify/functions';
const stripe = require('stripe')(process.env.STRIPE_BACKEND_SECRET);

export default async (req: Request, context: Context) => {
  const body = await req.json();

  // Create Stripe session.
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price: body.priceId, quantity: 1 }],
    mode: 'payment',
    // Redirect to confirmation URL.
    success_url: `${process.env.APP_HOSTNAME}/confirmation?paymentStatus=success`,
    cancel_url: `${process.env.APP_HOSTNAME}`,
  });

  return Response.json({ id: session.id, url: session.url });
};

export const config: Config = {
  method: 'POST',
  path: '/api/purchase-session',
};
