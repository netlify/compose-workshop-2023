import { useContext, useEffect } from 'react';

import DataContext from '~/context/store';
import Books from '~/components/Books';
import Footer from '~/components/ui/Footer';
import Hero from '~/components/Hero';
import Merch from '~/components/Merch';

export default function Home() {
  const { books, fetchBooks, swag, fetchSwag } = useContext(DataContext);

  useEffect(() => {
    fetchBooks();
    fetchSwag();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // @ts-expect-error window.geo comes from our edge function
  const city = window.geo?.city;
  return (
    <section>
      <Hero />
      <Merch city={city} items={swag} />
      <Books books={books} />
      <Footer />
    </section>
  );
}
