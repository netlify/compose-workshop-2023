import { useEffect, useState } from 'react';
import netlifyLogo from '../assets/netlify.svg';
import { getHero } from '../graphql';

import Card from './Card';

function Hero() {
  const [hero, setHero] = useState({});

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
    <Card bg="gradient">
      <div className="flex justify-center">
        <img alt="Netlify logo" height={100} src={netlifyLogo} width={100} />
      </div>
      <h1 className="text-4xl font-extrabold text-white">{hero?.title}</h1>
      <p className="text-xl text-white">{hero?.description}</p>
    </Card>
  );
}

export default Hero;
