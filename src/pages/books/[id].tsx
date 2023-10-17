import { useContext } from 'react';

import DataContext from '~/context/store';
import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import Product from '~/components/Product';
import Footer from '~/components/ui/Footer';
import { useNavigate, useParams } from '~/router';

export default function BookPage() {
  const { books, fetchBooks } = useContext(DataContext);

  const navigate = useNavigate();
  const { id } = useParams('/books/:id');

  const book = books.find(b => b.id === id);

  if (!book) {
    fetchBooks(id);
    return <Card type="loading" />;
  }

  return (
    <section>
      <Product {...book} />
      <Button onClick={() => navigate('/')}>← Back</Button>
      <Footer />
    </section>
  );
}
