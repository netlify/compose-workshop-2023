import netlifyLogo from '../assets/netlify.svg';

import Card from './Card';

function Hero() {
  const city = window.geo?.city;
  return (
    <Card bg="gradient">
      <div className="flex justify-center">
        <img alt="Netlify logo" height={100} src={netlifyLogo} width={100} />
      </div>
      <h1 className="text-4xl font-extrabold text-white">
        Welcome to HalloweenTown!
      </h1>
      <p className="text-xl text-white">
        Start your first composable project with TypeScript, React, Vite,
        Tailwind, and Netlify.
      </p>
      {city && <p className="text-sm text-white">Hello, {city}!</p>}
    </Card>
  );
}

export default Hero;
