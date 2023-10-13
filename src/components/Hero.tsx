import { useState } from 'react';
import netlifyLogo from '../assets/netlify.svg';

import Button from './Button';
import Card from './Card';

function Hero() {
  const [count, setCount] = useState(0);

  return (
    <Card bg="gradient">
      <div className="flex justify-center">
        <img alt="Netlify logo" height={100} src={netlifyLogo} width={100} />
      </div>
      <h1 className="text-4xl font-extrabold text-white">
        Welcome to Netlify Compose!
      </h1>
      <p className="text-xl text-white">
        Start your first composable project with TypeScript, React, Vite,
        Tailwind, and Netlify.
      </p>
      <Button onClick={() => setCount(count => count + 1)}>
        This button has been clicked {count} time{count === 1 ? '' : 's'}
      </Button>
    </Card>
  );
}

export default Hero;
