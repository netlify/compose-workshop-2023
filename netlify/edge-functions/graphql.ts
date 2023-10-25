import { Config, Context } from '@netlify/edge-functions';

export default async (request: Request, context: Context) => {
  const CONNECT_API_URL = Netlify.env.get('VITE_CONNECT_API_URL');
  const API_TOKEN = Netlify.env.get('VITE_CONNECT_API_AUTH_TOKEN');

  const { query, variables } = await request.json();

  console.log(CONNECT_API_URL, query, variables);

  const res = await fetch(CONNECT_API_URL, {
    method: `POST`,
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  console.log(res);

  const result = await res.json();

  console.log(result);

  return Response.json(result, {
    headers: {
      'Content-Type': 'application/json',
      'cache-control': 'public,max-age=120',
      cached: 'true',
    },
  });
};

export const config: Config = {
  path: '/graphql',
  cache: 'manual',
};
