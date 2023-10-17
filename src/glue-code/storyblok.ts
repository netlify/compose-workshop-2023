import StoryblokClient from 'storyblok-js-client';

// Read https://www.npmjs.com/package/storyblok-js-client to setup a client
const Storyblok = new StoryblokClient({
  accessToken: import.meta.env.VITE_STORYBLOK_ACCESS_TOKEN!,
  region: `us`,
});

// Read https://www.storyblok.com/docs/api/content-delivery/v2 to see how we can fetch the content

export async function getAbout() {
  const story = await Storyblok.get('cdn/stories/about', {});

  const storyData = story?.data?.story;

  return storyData;
}
