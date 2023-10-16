# Netlify Compose 2023 Workshop

Welcome to Compose! In this workshop, you will learn how to create composable websites with Netlify.

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



Step 1. Create a new site

- Log into Netlify UI
- Create a new site from a GitHub repo in UI
- Team Overview → Import existing project
- Rename site to something more memorable (UI)

2. Local development

- `netlify login`
- `netlify link`
- `netlify dev`

3. Branches and Deploy Previews

- Create a new branch
- Push the branch, open pull request
- Navigate to Deploy Preview
- Netlify Drawer

4. Function primitives (books.ts)

Add a getter and setter for books in `src/context/store.ts`

```diff
import { createContext } from 'react';

-// import type { Book } from '~/types/interfaces';
+import type { Book } from '~/types/interfaces';

const StoreContext = createContext({
-  // books: [] as Book[],
-  // fetchBooks: () => {},
+  books: [] as Book[],
+  fetchBooks: () => {},
});

export default StoreContext;

```

Add the `Bookshelf` component to `src/pages/index.tsx`

```diff
+ import Bookshelf from '~/components/Bookshelf';
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

Return data from a CSV in an API response

```typescript
// netlify/functions/books.ts

import csv from 'csvtojson';

export default async (req: Request, context: Context) => {

  const { origin } = new URL(req.url);
  const response = await fetch(`${origin}/books.csv`);
  const csvContent = await response.text();
  const json = await csv().fromString(csvContent);
  
  return Response.json(json);
};
```


- Functions 2.0 Config object
- Fine-grained cache control

5. Personalization with `context.geo` (merch.ts)
6. Streaming API responses

- Environment variables

7. CI/CD

- Push up changes to repo
- Deploy logs
- Build settings
  - Function region selection
- Function logs

8. Building a content-driven app

- Replace merch products with Contentstack
- Add to About page with Storyblok content
- ...

9. Utilize existing custom data sources

- Turning CSV into data model
- Replace books CSV with AWS S3 connector
- ...

10. Back to dashboard

- Site protections
- Analytics, RUM
- Log Drains
- Slack notifications
