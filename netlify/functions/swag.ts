import { Config, Context } from '@netlify/functions';
import haversine from 'haversine';

const ITEMS_COUNT = 3;

function selectRandomItems(arr, n: number) {
  return arr
    .slice() // Create a copy of the array to avoid modifying the original
    .sort(() => 0.5 - Math.random()) // Randomly shuffle the array
    .slice(0, n); // Get the first n items
}

export default async (req: Request, context: Context) => {
  const { origin } = new URL(req.url);
  const response = await fetch(`${origin}/swag.json`);
  const { merchandise } = await response.json();

  const hasGeo = context.geo?.latitude && context.geo?.longitude;
  const items = hasGeo
    ? merchandise
        .sort(
          (a, b) =>
            haversine(a.location, context.geo) -
            haversine(b.location, context.geo)
        )
        .slice(0, ITEMS_COUNT)
    : selectRandomItems(merchandise, ITEMS_COUNT);

  return Response.json(items);
};

export const config: Config = {
  method: 'GET',
  path: '/api/swag',
};
