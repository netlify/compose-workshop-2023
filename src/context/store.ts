import { createContext } from 'react';

import type { Book, Swag } from '~/types/interfaces';

type Store = {
  books: Book[];
  swag: Swag[];
  fetchBooks: (slug?: string) => void;
  fetchSwag: () => void;
};

const StoreContext = createContext<Store>({
  books: [],
  swag: [],
  fetchBooks: () => {},
  fetchSwag: () => {},
});

export default StoreContext;
