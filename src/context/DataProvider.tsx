// import { useState } from 'react';
import StoreContext from '~/context/store';
import type { Book, Swag } from '~/types/interfaces';

interface Props {
  children: React.ReactNode;
}

function StoreProvider({ children }: Props) {
  const books = [] as Book[];
  const swag = [] as Swag[];

  const fetchBooks = async () => {};

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
