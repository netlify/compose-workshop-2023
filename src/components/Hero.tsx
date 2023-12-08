import Card from '~/components/ui/Card';

function Hero() {
  return (
    <Card type="green">
      <div className="flex justify-center">
        <span className="text-8xl">🎄</span>
      </div>
      <h1 className="text-4xl font-extrabold text-white drop-shadow-md">
        Welcome to the Holiday bookstore!
      </h1>
      <p className="text-xl text-white">
        Your one-stop shop for stories and swag.
      </p>
    </Card>
  );
}

export default Hero;
