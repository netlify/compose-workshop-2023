import BuyNow from '~/components/BuyNow';
import Card from '~/components/ui/Card';
import { ContentstackProduct } from '~/types/interfaces';

export default function Product(props: ContentstackProduct) {
  const {
    author,
    description,
    imagePath,
    price,
    stripe_price_id,
    name,
    title,
  } = props;
  return (
    <Card type="slate">
      <div className="flex">
        <img
          className="aspect-square drop-shadow rounded-lg"
          height={400}
          src={imagePath?.replace('"', '').replace('"', '')}
          width={400}
        />
        <div className="text-left ml-8">
          <h1 className="text-4xl font-extrabold text-white">
            {title || name}
          </h1>
          {author && <p className="mt-4 text-xl text-white">by {author}</p>}
          <p className="mt-8 text-2xl text-white">{description}</p>
          {price && (
            <>
              <p className="mt-8 mb-16 text-2xl font-semibold text-green-500">
                ${price}
              </p>
              {stripe_price_id && <BuyNow priceId={stripe_price_id} />}
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
