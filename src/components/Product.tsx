import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';

interface Props {
  author?: string;
  description: string;
  imagePath: string;
  name?: string;
  title?: string;
  price: number;
}

export default function Product(props: Props) {
  const { author, description, imagePath, price, name, title } = props;
  return (
    <Card type="slate">
      <div className="flex">
        <img
          className="aspect-square drop-shadow rounded-lg"
          height={400}
          src={imagePath}
          width={400}
        />
        <div className="text-left ml-8">
          <h1 className="text-4xl font-extrabold text-white">
            {title || name}
          </h1>
          {author && <p className="mt-4 text-xl text-white">by {author}</p>}
          <p className="mt-8 text-2xl text-white">{description}</p>
          <p className="mt-8 mb-16 text-2xl font-semibold text-green-500">
            ${price}
          </p>
          <Button>Buy now</Button>
        </div>
      </div>
    </Card>
  );
}
