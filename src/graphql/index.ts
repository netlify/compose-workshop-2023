const CONNECT_API_URL = `https://compose-conf-o5lhw4-prod.api.netlify-connect.com/graphql`;
const API_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTcyMjgwMzYyNDMsImV4cCI6NDg1MDgyODAzNjI0MywiaXNzIjoibmV0bGlmeS1jb25uZWN0IiwiaHR0cHM6Ly9uZXRsaWZ5LmNvbS9qd3QvY2xhaW1zIjp7ImRhdGFfbGF5ZXJfaWQiOiJjYjM0ZTdmMi00YWVmLTQ1ZDgtOGViOC0zMmFiZWVkNTA1OTAiLCJkYXRhX2xheWVyX3Rva2VuX2lkIjoiYTdjNTIyMWEtODFhNi00MjNlLTg3YjktOGIzNjYwZThhMWJhIiwiYWNjb3VudF9wZXJtaXNzaW9ucyI6eyJyIjp0cnVlfX19.A6lTiggYCXAsHc7o7KfbnunPCju2FMBlcZsmW13smdY`;

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

export async function getHero() {
  const query = `
    query hero($id: String!) {
        contentstackHero(uid: { eq: $id }) {
            slug: id
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
