import { Outlet } from 'react-router-dom';

import DataProvider from '~/context/DataProvider';
import Nav from '~/components/Nav';

export default function App() {
  return (
    <DataProvider>
      <main className="max-w-full px-8">
        <Nav />
        <Outlet />
      </main>
    </DataProvider>
  );
}
