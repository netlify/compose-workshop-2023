const CONNECT_API_URL = import.meta.env.VITE_CONNECT_API_URL!;
const API_TOKEN = import.meta.env.VITE_CONNECT_API_AUTH_TOKEN!;

export async function getBooks() {
  const query = `
    query books {
      allSpookyBook {
        nodes {
          id
          isbn
          title
          author
          description
          imagePath
        }
      }
    }
  `;

  const response = await window.fetch(CONNECT_API_URL, {
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

export async function getProducts() {
  const query = `
    query products {
        allContentstackProduct {
          nodes {
            id
            title
            rating
            description
            image {
              url
            }
            price
            stripe_price_id
          }
        }
      }
    `;

  const response = await window.fetch(CONNECT_API_URL, {
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

export async function getAbout() {
  const query = `
  query about {
      storyblokEntry(full_slug: { eq: "about" }) {
          id
          content
      }
    }
  `;

  const response = await window.fetch(CONNECT_API_URL, {
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

export async function getHero() {
  const query = `
    query hero($id: String!) {
        contentstackHero(uid: { eq: $id }) {
            id
            title
            description
        }
      }
    `;

  const response = await window.fetch(CONNECT_API_URL, {
    method: `POST`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({ query, variables: { id: 'blt42848774b8918f80' } }),
  });

  const result = await response.json();

  return result?.data?.contentstackHero;
}
