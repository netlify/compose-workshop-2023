import { Config, Context } from '@netlify/edge-functions';
import { encode, decode } from 'https://deno.land/std/encoding/base64.ts';

export default async (request: Request, context: Context) => {
  const CONNECT_API_URL = Netlify.env.get('VITE_CONNECT_API_URL');
  const API_TOKEN = Netlify.env.get('VITE_CONNECT_API_AUTH_TOKEN');

  const url = new URL(request.url);

  const queryArgs = url.searchParams.get('query');

  const fromBase64Args = new TextDecoder().decode(decode(queryArgs));

  const res = await fetch(CONNECT_API_URL, {
    method: `POST`,
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: fromBase64Args,
  });

  const result = await res.json();

  return Response.json(result, {
    headers: {
      'Content-Type': 'application/json',
      'cache-control': 'public, max-age=3600, s-maxage=3600',
      'Netlify-Vary': 'query=query',
    },
  });
};

export const config: Config = {
  path: '/graphql',
  cache: 'manual',
};
