import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';
import Heading from '~/components/ui/Heading';

interface Props {
  city?: string;
  items: Array<{
    description: string;
    imagePath: string;
    name: string;
    price: number;
    rating: number;
    sku: string;
    location: {
      latitude: number;
      longitude: number;
    };
  }>;
}

function Merch({ city, items }: Props) {
  return (
    <section>
      <Heading id="swag">
        {city ? `📍 Shop for swag in ${city} 📍` : 'Shop for swag'}
      </Heading>
      <div className="flex gap-8">
        {items.length === 0 && <Card type="loading" />}
        {items.map(item => (
          <Card key={item.name} type="slate">
            <img
              className="aspect-square drop-shadow rounded-lg"
              src={item.imagePath}
            />
            <h3 className="text-xl font-bold text-white">{item.name}</h3>
            <p className="text-xl text-green-500">${item.price}</p>
            <Button>Add to cart</Button>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Merch;
