import Bookshelf from '~/components/Bookshelf';
import Footer from '~/components/ui/Footer';
import Hero from '~/components/Hero';
import Swag from '~/components/Swag';

export default function Home() {
  return (
    <section>
      <Hero />
      <Swag />
      <Bookshelf />
      <Footer />
    </section>
  );
}
