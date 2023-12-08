export interface Book {
  id: string;
  image: string;
  title: string;
  body: string
}

export interface Swag {
  description: string;
  imagePath: string;
  location: {
    latitude: number;
    longitude: number;
  };
  name: string;
  price: number;
  rating: number;
  sku: string;
  slug: string;
  stripe_price_id?: string;
}

export interface ContentstackProduct extends Swag {
  id: string;
  title: string;
  image: {
    url: string;
  };
  stripe_price_id: string;
}

export interface AboutPage {
  content: {
    title: string;
    headerImage: {
      filename: string;
    };
    subHeaderImage: {
      filename: string;
    };
    footerImage: {
      filename: string;
    };
    description: string;
    body: {
      items: {
        _uid: string;
        itemValue: string;
      }[];
    }[];
  };
}
