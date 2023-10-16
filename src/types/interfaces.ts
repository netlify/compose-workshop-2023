export interface Book {
  author: string;
  description: string;
  imagePath: string;
  isbn: string;
  price: number;
  slug: string;
  title: string;
}

export interface Swag {
  description: string;
  imagePath: string;
  name: string;
  price: number;
  rating: number;
  sku: string;
  slug: string;
  location: {
    latitude: number;
    longitude: number;
  };
}
