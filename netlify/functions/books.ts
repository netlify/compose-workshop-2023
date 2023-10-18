import { Config } from '@netlify/functions';
import csv from 'csvtojson';

export default async (req: Request, context: Context) => {
    const { id } = context.params;
    console.log(`Looking up ${id || 'all books'}...`);
  const { origin } = new URL(req.url);
  const response = await fetch(`${origin}/books.csv`);
  const csvContent = await response.text();
  const books = await csv().fromString(csvContent);
  
  return Response.json(books);
};

export const config: Config = {
  method: 'GET',
  path: '/api/books{/:id}?',
};