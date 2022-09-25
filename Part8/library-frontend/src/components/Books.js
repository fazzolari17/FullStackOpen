import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ADD_BOOK } from '../queries';
import { v4 as uuidv4 } from 'uuid';

const Books = ({ setGenreFilter, genreFilter, show }) => {
  const result = useQuery(ALL_BOOKS, {
    variables: {
      genre:
        genreFilter === 'all' ? undefined : genreFilter,
    },
    refetchQueries: [
      { query: ALL_BOOKS },
      { query: ADD_BOOK },
    ],
  });
  if (!show) {
    return null;
  }

  let books =
    result.data === undefined ? [] : result.data.allBooks;

  let genres =
    result.data === undefined
      ? []
      : result.data.allBooks
          .map((item) => item.genres)
          .flat();
  genres = [...new Set(genres)];

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button
          key={uuidv4()}
          onClick={() => setGenreFilter(genre)}
        >
          {genre}
        </button>
      ))}
      <button onClick={() => setGenreFilter('all')}>
        ALL
      </button>
    </div>
  );
};

export default Books;
