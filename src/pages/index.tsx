import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';

export default function Home() {
  return (
    <main className="max-w-full m-8">
      <Hero />
      <ProductGrid />
    </main>
  );
}
