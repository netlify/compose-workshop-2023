// import { useState } from 'react';
import StoreContext from '~/context/store';
// import type { Book, Swag } from '~/types/interfaces';

interface Props {
  children: React.ReactNode;
}

function StoreProvider({ children }: Props) {
  return <StoreContext.Provider value={{}}>{children}</StoreContext.Provider>;
}

export default StoreProvider;
