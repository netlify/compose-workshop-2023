import { createHash } from 'crypto';
import csv from 'csvtojson';
import { Config, Context } from '@netlify/functions';

// const sleep = async (ms: number) => await new Promise(fn => setTimeout(fn, ms));

export default async (req: Request, context: Context) => {
  const { slug } = context.params;
  console.log(`Looking up ${slug || 'all books'}...`);

  const etag = createHash('md5')
    .update(slug || 'all')
    .digest('hex');

  const headers = {
    'Cache-Control': 'public, max-age=0, must-revalidate', // Tell browsers to always revalidate
    'Netlify-CDN-Cache-Control': 'public, max-age=31536000, must-revalidate', // Tell Edge to cache asset for up to a year
    'Cache-Tag': `books,promotions`,
    ETag: `"${etag}"`,
  };

  if (req.headers.get('if-none-match') === etag) {
    return new Response('Not modified', { status: 304, headers });
  }

  const { origin } = new URL(req.url);
  const response = await fetch(`${origin}/books.csv`);
  const csvContent = await response.text();
  const books = await csv().fromString(csvContent);

  if (slug) {
    const book = books.find(b => b.slug === slug);
    if (!book) {
      return new Response('Not found', { status: 404, headers });
    }
    return Response.json(book, { headers });
  }

  return Response.json(books, { headers });
};

export const config: Config = {
  method: 'GET',
  path: '/api/books{/:slug}?', // https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API
};
