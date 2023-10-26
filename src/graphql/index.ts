import haversine from 'haversine';

const CONNECT_API_URL = import.meta.env.VITE_CONNECT_API_URL!;
const API_TOKEN = import.meta.env.VITE_CONNECT_API_AUTH_TOKEN!;
const ITEMS_COUNT = 5;

export async function getProducts() {
  const query = `
    query products {
        allContentstackProduct {
          nodes {
            description
            id
            image {
              url
            }
            price
            rating
            stripe_price_id
            title
            location {
              latitude: lat
              longitude: long
            }
          }
        }
      }
    `;

  const params = JSON.stringify({
    query,
    variables: {},
  });

  const b64Parms = btoa(params);

  const response = await fetch(`/graphql?query=${b64Parms}`, {
    method: `GET`,
    headers: {
      'x-nf-debug-logging': 'true',
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();

  const products = result?.data?.allContentstackProduct?.nodes;
  const geo = (window as any)?.geo;
  return geo
    ? products
        .sort(
          (a: any, b: any) =>
            haversine(a.location?.[0], geo) - haversine(b.location?.[0], geo)
        )
        .slice(0, ITEMS_COUNT)
    : products;
}

export async function getBooks() {
  const query = `
    query books {
      allSpookyBook {
        nodes {
          author
          description
          id
          imagePath
          isbn
          title
        }
      }
    }
  `;

  const params = JSON.stringify({
    query,
    variables: {},
  });

  const b64Parms = btoa(params);

  const response = await fetch(`/graphql=${b64Parms}`, {
    method: `GET`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  const result = await response.json();
  return result?.data?.allSpookyBook?.nodes;
}

export async function getAbout() {
  const query = `
    query about {
        storyblokEntry(full_slug: { eq: "about" }) {
          content
          id
        }
      }
    `;

  const params = JSON.stringify({
    query,
    variables: {},
  });

  const b64Parms = btoa(params);

  const response = await fetch(`/graphql?query=${b64Parms}`, {
    method: `GET`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  const result = await response.json();
  return result?.data?.storyblokEntry;
}
