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

- Clone repo
- Checkout base branch
- Install dependencies
- Download the latest version of `netlify-cli`

</details>

<details><summary>Step 1. Create a new site </summary>

- Log into Netlify UI
- Create a new site from a GitHub repo in UI
- Team Overview → Import existing project
- Rename site to something more memorable (UI)

</details>

<details><summary>Step 2. Local development</summary>

- `netlify login`
- `netlify link`
- `netlify dev`

</details>

<details><summary>Step 3. Function primitives</summary>

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

<details><summary>Step 4. Branches, CI/CD, and Deploy Previews</summary>

- Create a new branch
- Push the branch, open pull request
- Navigate to Deploy Preview
- Netlify Drawer
- Deploy logs
- Build settings
  - Function region selection
- Function logs

</details>

<details><summary>Step 5. Headers and redirects</summary>

- Redirects
- Headers
- netlify.toml

</details>

<details><summary>Step 6. Advanced fine-grained cache control</summary>

ix. Set fine-grained cache-control headers before fetching in `netlify/functions/books.ts`

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

</details>

<details><summary>Step 7. Edge Functions and personalization</summary>

- Edge functions as middleware for the CDN
- Personalization with `context.geo` (merch.ts)

</details>

<details><summary>Step 8. Environment variables</summary>

- Streaming API responses

</details>

<details><summary>Step 9. Building a content-driven app</summary>

- Replace merch products with Contentstack
- Add to About page with Storyblok content
- ...

</details>

<details><summary>Step 10. Utilizing existing custom data sources</summary>

- Turning CSV into data model
- Replace books CSV with AWS S3 connector
- ...

</details>

<details><summary>Step 11. Bonus features of the Netlify platform</summary>

- Site protections
- Analytics, RUM
- Log Drains
- Slack notifications

</details>