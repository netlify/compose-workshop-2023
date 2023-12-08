import { useContext, useEffect } from 'react';
import { Image } from '@unpic/react';

import DataContext from '~/context/store';
import Heading from '~/components/ui/Heading';
import Link from '~/components/ui/Link';

function Bookshelf() {
  const { books, fetchBooks } = useContext(DataContext);

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <Heading id="bookshelf">☃️ Browse our boooooks! ☃️</Heading>
      <div className="flex my-8 bg-slate-600 rounded-xl gap-8 p-8 flex-wrap mt-8">
        {books?.map(book => (
          <Link
            key={book.id}
            className="max-w-[calc(25%-24px)] hover:scale-105 transition-transform duration-300"
            to={`/books/${book.id}`}
          >
            <Image
              src={book.image}
              layout="constrained"
              width={400}
              height={300}
              alt="A lovely bath"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Bookshelf;
