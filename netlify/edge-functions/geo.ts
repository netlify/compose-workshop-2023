import { Config, Context } from '@netlify/edge-functions';

export default async (request: Request, context: Context) => {
  const response = await context.next();
  response.headers.set('x-custom-header', 'invoked');

  // html GETs only
  const isGET = request.method?.toUpperCase() === 'GET';
  const isHTMLResponse = response.headers
    .get('content-type')
    ?.startsWith('text/html');
  if (!isGET || !isHTMLResponse) {
    return response;
  }

  const body = await response.text();
  const transformedBody = body.replace(
    'window.geo = {}',
    `window.geo = ${JSON.stringify(context.geo)}`
  );

  return new Response(transformedBody, response);
};

export const config: Config = {
  path: '/*',
  excludedPath: '/(api|assets|images)/*',
};
