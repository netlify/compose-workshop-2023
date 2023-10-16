import { createContext } from 'react';

import type { Book, Swag } from '~/types/interfaces';

const StoreContext = createContext({
  books: [] as Book[],
  swag: [] as Swag[],
  fetchBooks: () => {},
  fetchSwag: () => {},
});

export default StoreContext;
