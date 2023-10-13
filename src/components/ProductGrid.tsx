// import Button from './Button';
import { useEffect, useState } from 'react';
import { getProducts } from '../graphql';
import Card from './Card';

const items = [
  {
    name: 'sup',
    desc: 'homie',
  },
  {
    name: 'sup',
    desc: 'homie',
  },
  {
    name: 'sup',
    desc: 'homie',
  },
  {
    name: 'sup',
    desc: 'homie',
  },
];

function ProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then(d => {
        console.log(d);
        setProducts(d);
      })
      .catch(e => {
        console.error(e);
      });
  }, []);

  return (
    <section className="flex gap-8 mt-8">
      {products?.map(item => <Card bg="white">{item.title}</Card>)}
    </section>
  );
}

export default ProductGrid;
