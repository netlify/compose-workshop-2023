import { useState } from 'react';
import StoreContext from '~/context/store';
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
