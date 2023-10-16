import { useContext } from 'react';

import DataContext from '~/context/store';
import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import Product from '~/components/Product';
import Footer from '~/components/ui/Footer';
import { useNavigate, useParams } from '~/router';

export default function SwagPage() {
  const { swag, fetchSwag } = useContext(DataContext);

  const navigate = useNavigate();
  const { slug } = useParams('/swag/:slug');

  const product = swag.find(s => s.slug === slug);

  if (!product) {
    fetchSwag();
    return <Card type="loading" />;
  }

  return (
    <section>
      <Product {...product} />
      <Button onClick={() => navigate('/')}>← Back</Button>
      <Footer />
    </section>
  );
}
