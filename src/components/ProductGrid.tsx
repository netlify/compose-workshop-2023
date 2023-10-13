// import Button from './Button';
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
  return (
    <section className="flex gap-8 mt-8">
      {items.map(item => (
        <Card bg="white">{item.name}</Card>
      ))}
    </section>
  );
}

export default ProductGrid;
