import Heading from '~/components/ui/Heading';
import Link from '~/components/ui/Link';

interface Props {
  books: Array<{
    id: string;
    imagePath: string;
  }>;
}

function Books({ books }: Props) {
  return (
    <section>
      <Heading id="bookshelf">👻 Browse our boooooks! 👻</Heading>
      <div className="flex my-8 bg-slate-600 rounded-xl gap-8 p-8 flex-wrap mt-8">
        {books.map(book => (
          <Link
            key={book.id}
            className="max-w-[calc(25%-24px)] hover:scale-105 transition-transform duration-300"
            to={`/books/${book.id}`}
          >
            <img
              className="aspect-square drop-shadow rounded-lg"
              loading="lazy"
              src={book.imagePath}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Books;
