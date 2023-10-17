import { useState } from 'react';
import StoreContext from '~/context/store';
import { getBooks, getProducts } from '~/graphql';
import type { Book, Swag, ContentstackProduct } from '~/types/interfaces';

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
      const products = response.map((product: ContentstackProduct) => {
        return {
          ...product,
          imagePath: product?.image?.url,
          name: product?.title,
          slug: product?.id,
        };
      });
      setSwag(products);
    }
  };

  return (
    <StoreContext.Provider value={{ books, swag, fetchBooks, fetchSwag }}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreProvider;
