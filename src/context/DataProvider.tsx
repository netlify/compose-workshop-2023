import { useState } from 'react';
import StoreContext from '~/context/store';

interface Props {
  children: React.ReactNode;
}

function StoreProvider({ children }: Props) {
  const [books, setBooks] = useState([]);
  const [swag, setSwag] = useState([]);

  const fetchBooks = async (id: string = '') => {
    if (!books.length) {
      const response = await fetch(`/api/books/${id}`);
      const data = await response.json();
      setBooks(data);
    }
  };

  const fetchSwag = async () => {
    if (!swag.length) {
      const response = await fetch('/api/merch');
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
