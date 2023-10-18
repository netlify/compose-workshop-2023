import { useState } from 'react';
import StoreContext from '~/context/store';
import type { Book, Swag } from '~/types/interfaces';

interface Props {
  children: React.ReactNode;
}

function StoreProvider({ children }: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const swag = [] as Swag[];

  const fetchBooks = async (id: string = '') => {
        if (books.length <= 1) {
          const response = await fetch(`/api/books/${id}`);
          const data = await response.json();
          setBooks(Array.isArray(data) ? data : [data]);
        }
     };

  const fetchSwag = async () => {};

  return (
    <StoreContext.Provider
      value={{
        books,
        swag,
        fetchBooks,
        fetchSwag,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export default StoreProvider;
