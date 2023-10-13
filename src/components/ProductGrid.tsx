// import Button from './Button';
import Card from './Card';

const items = [
  {
    name: 'sup1',
    desc: 'homie',
  },
  {
    name: 'sup2',
    desc: 'homie',
  },
  {
    name: 'sup3',
    desc: 'homie',
  },
  {
    name: 'sup4',
    desc: 'homie',
  },
];

function ProductGrid() {
  return (
    <section className="flex gap-8 mt-8">
      {items.map(item => (
        <Card key={item.name} bg="white">
          {item.name}
        </Card>
      ))}
    </section>
  );
}

export default ProductGrid;
