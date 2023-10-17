// https://www.contentstack.com/docs/developers/sdks/content-delivery-sdk/nodejs/get-started-with-nodejs-delivery-sdk

import { Stack } from 'contentstack';

// @N.B. This is deprecated. Now I have to find out how to instantiate it
// const Stack = Contentstack.Stack("api_key", "delivery_token", "environment_name");

const stack = Stack({
  api_key: import.meta.env.VITE_CONTENTSTACK_KEY!,
  delivery_token: import.meta.env.VITE_CONTENTSTACK_DELIVERY_TOKEN!,
  environment: 'production',
});

// Now i need to see how i can query content
// https://www.contentstack.com/docs/developers/sdks/content-delivery-sdk/nodejs/get-started-with-nodejs-delivery-sdk#get-multiple-entries

export async function getProducts() {
  // This returns a whole data object but not everything is really necessary to render a page
  const [data] = await stack.ContentType('product').Query().toJSON().find();

  return data?.map((p: any) => {
    return {
      id: p?.uid,
      title: p?.title,
      price: p?.price,
      rating: p?.rating,
      description: p?.description,
      stripe_price_id: p?.stripe_price_id,
      image: {
        url: p?.image?.url,
      },
    };
  });
}
