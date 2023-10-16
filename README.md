# Netlify Compose 2023 Workshop

Using core Netlify features to create your first composable project

## What are we going to build?

A Halloween-themed e-commerce bookstore!

## What are we going to learn?

- A primer on Netlify UI and CLI
- How to use Netlify core primitives
  - Intro to basic serverless functions
  - On-Demand Builders: cache Functions with a TTL
  - Fine-grained cache control: persist browser cache across deploys
  - Stream API responses from OpenAI
  - Edge Functions: add responses headers and transform response bodies with geolocation data
- How to pull content from multiple different data sources
  - Storyblok
  - Contentstack
- How to use the Netlify SDK to build connectors to custom data sources
  - AWS S3 bucket

## Checklist

~- [x] Fetch follower count with ODBs and redirects (use case: rate-limiting)~

- [x] Fetch book data from CSV with fine-grained cache control (use case: 304s from function responses)
- [x] Fetch recommended merch data with geolocation data (use case: personalization)
- [x] Generate text with Functions 2.0 streaming (use case: AI funsies)

- [ ] Replace merch JSON API with Connect
- [ ] Replace books CSV API with SDK custom connector

0. Initial setup

- Clone repo
- Checkout base branch
- Install dependencies
- Download the latest version of `netlify-cli`

1. Create a new site

- Log into Netlify UI
- Create a new site from a GitHub repo in UI
- Team Overview → Import existing project
- Rename site to something more memorable (UI)

2. Local development

- `netlify login`
- `netlify link`
- `netlify dev`

3. Function primitives (books.ts)

- Return data from a CSV in an API response
- Functions 2.0 Config object
- Fine-grained cache control

4. Personalization with `context.geo` (merch.ts)
5. Streaming API responses

- Environment variables

6. CI/CD

- Push up changes to repo
- Deploy logs
- Build settings
  - Function region selection
- Function logs

7. Branches and Deploy Previews

- Create a new branch
- Push the branch, open pull request
- Navigate to Deploy Preview
- Netlify Drawer

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
