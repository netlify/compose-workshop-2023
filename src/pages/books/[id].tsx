import { useContext } from 'react';

import DataContext from '~/context/store';
import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import Product from '~/components/Product';
import Footer from '~/components/ui/Footer';
import { useNavigate, useParams } from '~/router';

export default function Book() {
  const { books, fetchBooks } = useContext(DataContext);

  const navigate = useNavigate();
  const { id } = useParams('/books/:id');

  // @ts-expect-error will fix later
  const book = books.find(b => b.id === id);

  if (!book) {
    fetchBooks();
    return <Card type="loading" />;
  }

  return (
    <section>
      {/* @ts-expect-error will fix later */}
      <Product {...book} />
      <Button onClick={() => navigate('/')}>← Back</Button>
      <Footer />
    </section>
  );
}
