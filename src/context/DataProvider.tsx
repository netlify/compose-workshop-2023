import { useState } from 'react';
import StoreContext from '~/context/store';
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
      const response = await fetch('/api/swag');
      const data = await response.json();
      setSwag(data);
    }
  };

  return (
    <StoreContext.Provider value={{ books, swag, fetchBooks, fetchSwag }}>
      {children}
    </StoreContext.Provider>
  );
}

export default StoreProvider;
