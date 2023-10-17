import { useState } from 'react';
import StoreContext from '~/context/store';
import { getProducts } from '~/graphql';
import type { Book, Swag } from '~/types/interfaces';

interface Props {
  children: React.ReactNode;
}

function StoreProvider({ children }: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const [swag, setSwag] = useState<Swag[]>([]);

  const fetchBooks = async (slug: string = '') => {
    if (books.length <= 1) {
      const response = await fetch(`/api/books/${slug}`);
      const data = await response.json();
      setBooks(Array.isArray(data) ? data : [data]);
    }
  };

  const fetchSwag = async () => {
    if (!swag.length) {
      const response = await getProducts();
      setSwag(
        response.map(
          (r: {
            id: string;
            title: string;
            image: { url: string };
            price: string;
            description: string
          }) => {
            return {
              slug: r?.id,
              name: r?.title,
              imagePath: r?.image?.url,
              price: r?.price,
              description: r?.description,
            };
          }
        )
      );
    }
  };

  return (
    <StoreContext.Provider value={{ books, swag, fetchBooks, fetchSwag }}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreProvider;
