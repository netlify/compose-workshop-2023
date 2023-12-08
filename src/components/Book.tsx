import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BuyNow from '~/components/BuyNow';
import Card from '~/components/ui/Card';
// import { getSimilarProducts } from '~/graphql';

interface Props {
  id: string;
  body: string;
  image: string;
  title?: string;
}

export default function Book(props: Props) {
  const { title, body, image, id } = props;

  //   const [similarProducts, setSimilarProducts] = useState([]);

  //   useEffect(() => {
  //     getSimilarProducts(id)
  //       .then(data => {
  //         console.log(data);
  //         setSimilarProducts(data);
  //       })
  //       .catch(e => {
  //         console.error(e);
  //       });
  //   }, []);

  return (
    <>
      <Card type="slate">
        <div className="flex">
          <img
            className="aspect-square drop-shadow rounded-lg"
            height={400}
            src={image}
            width={400}
          />
          <div className="text-left ml-8">
            <h1 className="text-4xl font-extrabold text-white">{title}</h1>
            {/* {author && <p className="mt-4 text-xl text-white">by {author}</p>} */}
            <p className="mt-8 text-2xl text-white">{body}</p>
          </div>
        </div>
      </Card>
      {/* 
      {similarProducts?.length && (
        <>
          <h1 className="text-4xl font-extrabold text-white">
            Similar Products
          </h1>
          <div className="flex gap-8">
            {similarProducts.map(item => (
              <Card key={item.slug} type="slate">
                <Link key={item.slug} to={`/swag/${item.slug}`}>
                  <img
                    className="aspect-square drop-shadow rounded-lg hover:scale-105 transition-transform duration-300"
                    src={item.image?.url}
                  />
                </Link>
                <h3 className="text-xl font-bold text-white">{item?.title}</h3>
                <p className="text-xl text-green-500">${item.price}</p>
                <BuyNow priceId={item?.stripe_price_id} />
              </Card>
            ))}
          </div>
        </>
      )} */}
    </>
  );
}
