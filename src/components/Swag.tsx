import { useContext, useEffect } from 'react';

import DataContext from '~/context/store';
import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import Link from '~/components/ui/Link';
import Heading from '~/components/ui/Heading';

function Swag() {
  const { swag, fetchSwag } = useContext(DataContext);

  useEffect(() => {
    fetchSwag();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // @ts-expect-error This comes from our geo edge function
  const city = window.geo?.city;
  return (
    <section>
      <Heading id="swag">
        {city ? `📍 Shop for swag in ${city} 📍` : 'Shop for swag'}
      </Heading>
      <div className="flex gap-8">
        {swag.length === 0 && <Card type="loading" />}
        {swag.map(item => (
          <Card key={item.slug} type="slate">
            <Link key={item.slug} to={`/swag/${item.slug}`}>
              <img
                className="aspect-square drop-shadow rounded-lg hover:scale-105 transition-transform duration-300"
                src={item.imagePath}
              />
            </Link>
            <h3 className="text-xl font-bold text-white">{item?.name}</h3>
            <p className="text-xl text-green-500">${item.price}</p>
            <Button>Buy now</Button>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Swag;
