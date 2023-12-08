import { Config, Context } from '@netlify/functions';

const URI = `https://psedge.global/graphql`;

const URI2 = `https://staging-graphql-router-jfzpx4uqhq-uc.a.run.app`
const headers = {
  'x-polyscale-cacheid': `e40ebe07-c0d4-447a-8597-711fd058c262`,
  'x-domain': `yj-prismic-te-3jb752-prod.api.staging-netlify-connect.com`,
  'x-path': '/graphql',
  'Content-Type': 'application/json',
  Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTg2OTAyNDI1ODksImV4cCI6NDg1MjI5MDI0MjU4OSwiaXNzIjoibmV0bGlmeS1jb25uZWN0IiwiaHR0cHM6Ly9uZXRsaWZ5LmNvbS9qd3QvY2xhaW1zIjp7ImRhdGFfbGF5ZXJfaWQiOiI2M2UwMjU2Yi1kOTlkLTRkZmQtOTU1OS0zM2FlNDVmMTZkZGUiLCJkYXRhX2xheWVyX3Rva2VuX2lkIjoiM2NmMWM1Y2QtNjc0Zi00YTI2LWI2ZjUtYTRmNDFhY2MxY2IwIiwiYWNjb3VudF9wZXJtaXNzaW9ucyI6eyJyIjp0cnVlfX19.edLo5ftWbKV4eJcElKw5gxOyoXfw-qtY-OS5aokfHS8`,
};

export default async (req: Request, context: Context) => {
  const response = await fetch(URI, {
    method: `POST`,
    headers,
    body: JSON.stringify({
      query: `query {
        allStoryblokEntry {
          nodes {
            id
          }
        }
      }`,
      variables: {}
    }),
  });



  const result = await response.json();

  console.log(result)

  return Response.json(result);
};

export const config: Config = {
  method: 'GET',
  path: '/api/test',
};
