import Footer from '~/components/ui/Footer';
import Hero from '~/components/Hero';
import Bookshelf from '~/components/Bookshelf';

export default function Home() {
  return (
    <section>
      <Hero />
      <Bookshelf />
      <Footer />
    </section>
  );
}
