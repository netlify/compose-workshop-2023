import { createContext } from 'react';

const StoreContext = createContext({
  books: [],
  swag: [],
  fetchBooks: () => {},
  fetchSwag: () => {},
});

export default StoreContext;
