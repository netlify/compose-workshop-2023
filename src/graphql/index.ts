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

  const response = await fetch(CONNECT_API_URL, {
    method: `POST`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({ query }),
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

export async function getSimilarProducts(nodeId: string) {
  const query = `
    query similar($id: ID!) {
        similarContentstackProduct(id: $id, limit: 4) {
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

  const response = await fetch(CONNECT_API_URL, {
    method: `POST`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({ query, variables: { id: nodeId } }),
  });

  const result = await response.json();

  const products = result?.data?.similarContentstackProduct?.nodes?.filter(
    ({ id }: { id: string }) => id !== nodeId
  );
  return products;
}

export async function getBooks() {
  const query = `
    query books {
      allHolidayStory {
        nodes {
          body
          id
          image
          title
        }
      }
    }
  `;

  const response = await fetch(CONNECT_API_URL, {
    method: `POST`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  const result = await response.json();
  return result?.data?.allHolidayStory?.nodes;
}

export async function getSimilarBooks(nodeId: string) {
  const query = `
    query similar($id: ID!) {
        similarHolidayStory(id: $id, limit: 4) {
          nodes {
            id
            title
            body
            image 
          }
        }
      }
    `;

  const response = await fetch(CONNECT_API_URL, {
    method: `POST`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({ query, variables: { id: nodeId } }),
  });

  const result = await response.json();

  const products = result?.data?.similarHolidayStory?.nodes?.filter(
    ({ id }: { id: string }) => id !== nodeId
  );
  return products;
}

export async function getAbout() {
  const query = `
    query about {
        test2StoryblokEntry(full_slug: { eq: "about" }) {
          content
        }
      }
    `;

  const response = await fetch(CONNECT_API_URL, {
    method: `POST`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  const result = await response.json();
  return result?.data?.test2StoryblokEntry;
}
