import { Outlet } from 'react-router-dom';

import Nav from '~/components/Nav';

export default function App() {
  return (
    <main className="max-w-full px-8">
      <Nav />
      <Outlet />
    </main>
  );
}
