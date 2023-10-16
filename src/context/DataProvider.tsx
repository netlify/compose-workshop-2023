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

  const fetchBooks = async (id: string = '') => {
    if (!books.length) {
      const response = await fetch(`/api/books/${id}`);
      const data = await response.json();
      setBooks(data);
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
          }) => {
            return {
              slug: r?.id,
              name: r?.title,
              imagePath: r?.image?.url,
              price: r?.price,
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
