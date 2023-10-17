# Netlify Compose 2023 Workshop

Welcome to Compose! In this workshop, you will learn how to create your first composable website with Netlify.

![](./public/images/og.jpg)

## What are we going to build?

In two and a half hours, we are going to build a Halloween-themed e-commerce bookstore. The frontend stack will be composed of React, TypeScript, Vite, and Tailwind, and served from Netlify's global high-performance edge network. It will fetch data sources from Contentstack and Storyblok  using [Netlify Connect](https://www.netlify.com/products/connect/). We will build a custom data connector using the [Netlify SDK](https://sdk.netlify.com/connectors/overview/) that reads data from an Amazon S3 bucket. Finally, the site will reach out to third-party services including Stripe and OpenAI using Netlify Functions. The future is composable! 

An example of the finished product is available here: [https://compose-workshop-2023.netlify.app](https://compose-workshop-2023.netlify.app)

## What are we going to learn?

In this workshop, you will learn how to:

- Create your first site on Netlify
- Trigger builds with Git and embrace a CI/CD workflow
- Create Deploy Previews and collaborate using the Netlify Drawer
- Manage environment variables securely in the Netlify CLI and Netlify UI
- Stream API responses from OpenAI using Netlify Functions
- Personalize user experiences with Netlify Edge Functions
- Persist cache from API responses using fine-grain cache control
- Fetch content from Contentstack and Storyblok using Netlify Connect
- Build a custom connector using the Netlify SDK to pull data from Amazon S3


## Let's get started

<details><summary>Step 0. Initial setup</summary>

i. [Fork this repo](https://github.com/netlify/compose-workshop-2023/fork) into either your personal account or one of your orgs, and ensure you copy all branches, not just `main`

ii. Install the [Netlify GitHub app](https://github.com/apps/netlify/installations/select_target) on your org or repo if you have not done so already

iii. Clone your fork, and checkout the `start-here` branch

```bash
git clone <FORK_URL>
git checkout start-here
```

iv. Install dependencies locally

```bash
npm i
```

v. Ensure you have the latest version of `netlify-cli` installed globally

```bash
npm i netlify-cli -g
```

</details>

<details><summary>Step 1. Create a new site and run local dev server </summary>

i. [Create a new site](https://app.netlify.com/start) from GitHub

ii. Rename site to something more memorable in **Site configuration > Site details > Change site name**.

iii. Log in to the CLI, link your repo to your site, and start local dev server

```bash
netlify login
netlify link
netlify dev
```

</details>

<details><summary>Step 2. Function primitives</summary>

Our site is looking a little bare. Let's add some content! First we'll fetch a list of books that we happen to have as a [CSV file saved inside the /public directory](https://github.com/netlify/compose-workshop-2023/blob/main/public/books.csv).

i. Add a getter and setter for books in `src/context/store.ts`

```diff
import { createContext } from 'react';
+import type { Book } from '~/types/interfaces';

type Store = {
+  books: Book[];
+  fetchBooks: (slug?: string) => void;
};

const StoreContext = createContext<Store>({
+  books: [],
+  fetchBooks: () => {},
});

export default StoreContext;
```

ii. Add the `Bookshelf` component to `src/pages/index.tsx`

```diff
+import Bookshelf from '~/components/Bookshelf';
import Footer from '~/components/Footer';
import Hero from '~/components/Hero';

export default function Home() {
  return (
    <section>
      <Hero />
+     <Bookshelf />
      <Footer />
    </section>
  );
}
```

iii. Return data from a CSV in an API response in `netlify/functions/books.ts`

```typescript
import csv from 'csvtojson';

export default async (req: Request) => {
  const { origin } = new URL(req.url);
  const response = await fetch(`${origin}/books.csv`);
  const csvContent = await response.text();
  const json = await csv().fromString(csvContent);
  
  return Response.json(json);
};
```

iv. Fetch from the function in `src/context/DataProvider.tsx`

```diff
function StoreProvider({ children }: Props) {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
+   if (!books.length) {
+     const response = await fetch(`/.netlify/functions/books`);
+     const data = await response.json();
+     setBooks(data);
+   }
  };
}
```

That's nice, but we can only return all the books, when sometimes we only want one book at a time. Let's add a custom path with an optional slug in the API route.

v. Export custom config to control method, route, etc in `netlify/functions/books.ts`

```typescript
export const config: Config = {
  method: 'GET',
  path: '/api/books{/:slug}?',
};
```

vi. Change your clientside API call to new route in `src/context/DataProvider.tsx`

```diff
-  const fetchBooks = async () => {
-   if (!books.length) {
-     const response = await fetch(`/.netlify/functions/books`);
-     const data = await response.json();
-     setBooks(data);
-   }
-  };
+  const fetchBooks = async (slug: string = '') => {
+    if (books.length <= 1) {
+      const response = await fetch(`/api/books/${slug}`);
+      const data = await response.json();
+      setBooks(Array.isArray(data) ? data : [data]);
+    }
+  };
```

vii. Extract and log the slug from the URL params in `netlify/functions/books.ts`

```diff
-export default async (req: Request) => {
+export default async (req: Request, context: Context) => {
+  const { slug } = context.params;
+  console.log(`Looking up ${slug || 'all books'}...`);
```

viii. Return a single book if the slug is present before the last return statement

```typescript
if (slug) {
  const book = books.find(b => b.slug === slug);
  if (!book) {
    return new Response('Not found', { status: 404, headers });
  }
  return Response.json(book, { headers });
}
```

</details>

<details><summary>Step 3. Branches, CI/CD, and Deploy Previews</summary>

Create a new branch, commit changes, push the branch, and open a pull request

```bash
git checkout -b feat/bookshelf
git add -A
git commit -m "Adding a list of books to the home page"
git push origin feat/bookshelf
```

You should see a link to the Deploy Preview as a comment by the Netlify bot on the pull request. Pushing to an open pull request [will kick off a new build](https://www.netlify.com/products/build/) in the Continuous Integration pipeline, and you can inspect the deploy logs as the build is building and deploying.

In addition to deploy logs, the Netlify UI gives you access to function logs as well. You can change the region a function executes by changing the region selector in **Site configuration > Build & deploy > Functions**.

In the Deploy Preview itself, you'll notice a floating toolbar anchored to the bottom of your screen. This is the [Netlify Drawer](https://www.netlify.com/products/deploy-previews/). You and your teammates can use this to leave feedback to each other about the Deploy Preview. Any comments you make will sync back to the pull request on GitHub (or any Git service that you may use). 

</details>

<details><summary>Step 4. Headers and redirects</summary>

You'll notice that when you refresh a page on the `/books/{slug}` route, the site 404s. Why is that? Since this frontend stack utilizes React as an SPA (Single Page Application), there is only one single HTML file (`/index.html`) inside of the deploy, and routing is managed exclusively by JavaScript referenced in that file. We'll need to add a [redirect](https://docs.netlify.com/routing/redirects/rewrites-proxies/#history-pushstate-and-single-page-apps) that routes 404s to `/index.html`.

Inside your publish directory (for this repo, `/public`), add a `_redirects` file that contains the following: 

```
/*  /index.html  200
```

- Headers
- netlify.toml

</details>

<details><summary>Step 5. Advanced fine-grained cache control</summary>

i. Set fine-grained cache-control headers before fetching in `netlify/functions/books.ts`

```typescript
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
```

ii. Purge cache of specific tags using an API call

```
```

</details>

<details><summary>Step 6. Edge Functions and personalization</summary>

We're going to make a swag section of the site that is personalized to the user based on their geolocation. Edge functions act as middleware for the CDN.

i. Add the Swag component to the home page in `src/pages/index.tsx`

```diff
import Bookshelf from '~/components/Bookshelf';
import Footer from '~/components/ui/Footer';
import Hero from '~/components/Hero';
+import Swag from '~/components/Swag';

export default function Home() {
  return (
    <section>
      <Hero />
+     <Swag />
      <Bookshelf />
      <Footer />
    </section>
  );
}
```

ii. Fetch the swag in `netlify/context/DataProvider.tsx`

```typescript
const fetchSwag = async () => {
  if (!swag.length) {
    const response = await fetch('/api/swag');
    const data = await response.json();
    setSwag(data);
  }
};
```

iii. Sort items ascending based on distance to user in `netlify/functions/swag.ts`

```diff
import { Config, Context } from '@netlify/functions'
+import haversine from 'haversine';

-export default async (req: Request) => {
+export default async (req: Request, context: Context) => {
   // ...
+  const hasGeo = context.geo?.latitude && context.geo?.longitude;
-  const items = selectRandomItems(merchandise, ITEMS_COUNT);
+  const items = hasGeo
+    ? merchandise
+        .sort(
+          (a, b) =>
+            haversine(a.location, context.geo) -
+            haversine(b.location, context.geo)
+        )
+        .slice(0, ITEMS_COUNT)
+    : selectRandomItems(merchandise, ITEMS_COUNT);

  return Response.json(items);
};
```

iv. Rewrite response bodies to contain geolocation data in `netlify/edge-functions/geo.ts`

```typescript
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
```

</details>

<details><summary>Step 7. Environment variables</summary>

We're going to use environment variables

```bash
netlify env:set OPENAI_KEY <YOUR_VALUE> --scope functions
```

</details>

<details><summary>Step 8. Building a content-driven app</summary>

- Replace merch products with Contentstack
- Add to About page with Storyblok content
- ...

</details>

<details><summary>Step 9. Utilizing existing custom data sources</summary>

- Turning CSV into data model
- Replace books CSV with AWS S3 connector
- ...

</details>

<details><summary>Step 10. Bonus features of the Netlify platform</summary>

Congrats! You just built a composable website. If we have time, we'll walk through some additional features that you might not know about the Netlify platform. 

- [Site protections](https://docs.netlify.com/security/secure-access-to-sites/site-protection/)
- [Analytics](https://docs.netlify.com/monitor-sites/site-analytics/), [Real User Metrics](https://docs.netlify.com/monitor-sites/real-user-metrics/)
- [Log Drains](https://docs.netlify.com/monitor-sites/log-drains/)
- [Slack notifications](https://docs.netlify.com/integrations/slack-app/)

</details>


## Recent Enterprise-focused resources from our blog

Read these recent blog posts focused on Enterprise releases, features,  and use cases.

- Oct 13 2023: [Cache-tags & Purge API](https://www.netlify.com/blog/cache-tags-and-purge-api-on-netlify/)
- Oct 12 2023: [Introducing Netlify Functions 2.0](https://www.netlify.com/blog/introducing-netlify-functions-2-0/)
- Sep 28 2023: [Stale-while-revalidate & fine-grained cache control](https://www.netlify.com/blog/swr-and-fine-grained-cache-control/)
- Sep 13 2023: [General Availability of Netlify Software Development Kit (SDK)](https://www.netlify.com/blog/general-availability-netlify-sdk-software-development-kit/)
- Aug 29 2023: [Elevating enterprise deployment with enhanced monorepo experience](https://www.netlify.com/blog/elevating-enterprise-deployment-introducing-an-enhanced-monorepo-experience-on-netlify/)
- Aug 24 2023: [How I learned to stop worrying and love the Content Security Policy](https://www.netlify.com/blog/general-availability-content-security-policy-csp-nonce-integration/)
- Aug 23 2023: [IP and Geo Restrictions for WAF Security](https://www.netlify.com/blog/general-availability-web-application-firewall-traffic-rules/)
- Aug 22 2023: [Secrets Controller: Proactive security for secret keys](https://www.netlify.com/blog/general-availability-secrets-controller/)