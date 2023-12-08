import { useContext, useEffect, useState } from 'react';
import { Image } from '@unpic/react';

import DataContext from '~/context/store';
import Heading from '~/components/ui/Heading';
import Link from '~/components/ui/Link';
import { searchBooks } from '~/graphql';
import Button from './ui/Button';

function Bookshelf() {
  const { books, fetchBooks } = useContext(DataContext);
  const [stateBooks, setStateBooks] = useState([]);
  const [searchInput, setSearchTextInput] = useState(``);
  const [searchText, setSearchText] = useState(``);

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchText) {
      searchBooks(searchText)
        .then(data => {
          console.log(data);

          setStateBooks(data);
        })
        .catch(e => console.error(e));
    } else {
      setStateBooks([])
    }
  }, [searchText]);

  return (
    <section>
      <Heading id="bookshelf">☃️ Browse our boooooks! ☃️</Heading>

      <div
        className="bg-white"
        style={{
          background: `white`,
          maxWidth: `300px`,
          borderRadius: `18px`,
          paddingLeft: `16px`,
        }}
      >
        <input
          style={{ height: `50px` }}
          type="search"
          value={searchInput}
          placeholder="Search"
          onChange={e => {
            const value = e.target.value;

            if (!value) {
              setSearchTextInput(``);
              setSearchText(``)
            } else {
              setSearchTextInput(value);
            }
          }}
        />
        <Button
          onClick={() => {
            setSearchText(searchInput);
          }}
        >
          Search
        </Button>
      </div>
      <div className="flex my-8 bg-slate-600 rounded-xl gap-8 p-8 flex-wrap mt-8">
        {(searchText && stateBooks?.length ? stateBooks : books)?.map(book => (
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
