import { useEffect, useState } from 'react';

import Books from '~/components/Books';
import Footer from '~/components/Footer';
import Hero from '~/components/Hero';
import Merch from '~/components/Merch';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [merch, setMerch] = useState([]);

  useEffect(() => {
    fetch('/api/books')
      .then(response => response.json())
      .then(json => setBooks(json));

    fetch('/api/merch')
      .then(response => response.json())
      .then(json => setMerch(json));
  }, []);

  const city = window.geo?.city;
  return (
    <section>
      <Hero />
      <Merch city={city} items={merch} />
      <Books books={books} />
      <Footer />
    </section>
  );
}
