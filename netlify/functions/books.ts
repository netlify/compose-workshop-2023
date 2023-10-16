import { createHash } from 'crypto';
import csv from 'csvtojson';
import { Config, Context } from '@netlify/functions';

// const sleep = async (ms: number) => await new Promise(fn => setTimeout(fn, ms));

export default async (req: Request, context: Context) => {
  const { id } = context.params;

  const etag = createHash('md5')
    .update(id || 'all')
    .digest('hex');

  const headers = {
    'Cache-Control': 'public, max-age=0, must-revalidate', // Tell browsers to always revalidate
    'Netlify-CDN-Cache-Control': 'public, max-age=31536000, must-revalidate', // Tell Edge to cache asset for up to a year
    'Cache-Tag': `books,promotions`,
    ETag: `"${etag}"`,
  };

  if (req.headers.get('if-none-match') === etag) {
    console.log('Browser cache hit!', id || 'all');
    return new Response('Not modified', { status: 304, headers });
  }

  console.log('Browser cache miss', id || 'all');

  // simulate latency
  // await sleep(5000);

  const { origin } = new URL(req.url);
  const response = await fetch(`${origin}/books.csv`);
  const csvContent = await response.text();
  let json = await csv().fromString(csvContent);

  if (id) {
    const book = json.find(b => b.id === id);
    if (!book) {
      return new Response('Not found', { status: 404, headers });
    }
    json = book;
  }

  return Response.json(json, { headers });
};

export const config: Config = {
  method: 'GET',
  path: '/api/books{/:id}?', // https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API
};
