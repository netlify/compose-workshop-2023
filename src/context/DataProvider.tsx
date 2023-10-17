import { useState } from 'react';
import StoreContext from '~/context/store';
import { getBooks, getProducts } from '~/graphql';
import type { Book, Swag } from '~/types/interfaces';

interface Props {
  children: React.ReactNode;
}

function StoreProvider({ children }: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const [swag, setSwag] = useState<Swag[]>([]);

  const fetchBooks = async () => {
    if (!books.length) {
      const response = await getBooks();
      setBooks(response);
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
            stripe_price_id: string;
            description: string;
          }) => {
            return {
              slug: r?.id,
              name: r?.title,
              imagePath: r?.image?.url,
              price: r?.price,
              stripe_price_id: r?.stripe_price_id,
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
