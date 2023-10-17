const CONNECT_API_URL = import.meta.env.VITE_CONNECT_API_URL!;
const API_TOKEN = import.meta.env.VITE_CONNECT_API_AUTH_TOKEN!;

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
  return result?.data?.allContentstackProduct?.nodes;
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

  const response = await fetch(CONNECT_API_URL, {
    method: `POST`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({ query }),
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

  const response = await fetch(CONNECT_API_URL, {
    method: `POST`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  const result = await response.json();
  return result?.data?.storyblokEntry;
}
