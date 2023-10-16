import { useEffect, useState } from 'react';
import Card from '~/components/ui/Card';
import { getHero } from '~/graphql';

function Hero() {
  const [hero, setHero] = useState<{ title: string; description: string }>();

  useEffect(() => {
    getHero()
      .then(d => {
        setHero(d);
      })
      .catch(e => {
        console.error(e);
      });
  }, []);
  return (
    <Card type="orange">
      <div className="flex justify-center">
        <span className="text-8xl">🎃</span>
      </div>
      <h1 className="text-4xl font-extrabold text-white drop-shadow-md">
        {hero?.title}
      </h1>
      <p className="text-xl text-white">{hero?.description}</p>
    </Card>
  );
}

export default Hero;
