import { useEffect, useState } from 'react';

import Button from '~/components/Button';
import Card from '~/components/Card';
import Product from '~/components/Product';
import Footer from '~/components/Footer';
import { useNavigate, useParams } from '~/router';

export default function Book() {
  const [book, setBook] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams('/books/:id');

  useEffect(() => {
    if (id) {
      fetch(`/api/books/${id}`)
        .then(response => response.json())
        .then(json => setBook(json));
    }
  }, [id]);

  if (!book) {
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
