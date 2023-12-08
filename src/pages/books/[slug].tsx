import { useContext } from 'react';

import DataContext from '~/context/store';
import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import Footer from '~/components/ui/Footer';
import { useNavigate, useParams } from '~/router';
import Book from '~/components/Book';

export default function BookPage() {
  const { books, fetchBooks } = useContext(DataContext);

  const navigate = useNavigate();
  const { slug } = useParams('/books/:slug');

  const book = books.find(b => b.id === slug);

  if (!book) {
    fetchBooks(slug);
    return <Card type="loading" />;
  }

  return (
    <section>
      <Book {...book} />
      <Button onClick={() => navigate('/')}>← Back</Button>
      <Footer />
    </section>
  );
}
