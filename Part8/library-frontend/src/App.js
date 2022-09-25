import { useEffect, useState } from 'react';
import {
  useApolloClient,
  useSubscription,
} from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import LoginForm from './components/LoginForm';
import NewBook from './components/NewBook';
import Notify from './components/Notify';
import { ALL_BOOKS, BOOK_ADDED } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [genreFilter, setGenreFilter] = useState('all');
  const client = useApolloClient();

  // pulls user from localstorage and sets to current user for the user's fovorite genre
  useEffect(() => {
    setCurrentUser(
      JSON.parse(localStorage.getItem('user'))
    );
  }, []); //eslint-disable-line

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage('authors');
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newBook = subscriptionData.data.bookAdded;
      notify(`${newBook.title} added`);
      // console.log(subscriptionData, client, client.cache)
      // updateCache(client.cache, { query: ALL_BOOKS }, newBook)

      client.cache.updateQuery(
        { query: ALL_BOOKS },
        ({ allBooks }) => {
          return {
            allBooks: allBooks.concat(newBook),
          };
        }
      );
    },
  });

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>
          authors
        </button>
        <button onClick={() => setPage('books')}>
          books
        </button>
        {token && (
          <>
            <button onClick={() => setPage('add')}>
              add book
            </button>
            <button
              onClick={() =>
                setGenreFilter(currentUser.favoriteGenre)
              }
            >
              Recommended
            </button>
            <button onClick={logout}>Logout</button>
          </>
        )}
        {!token && (
          <button onClick={() => setPage('login')}>
            Login
          </button>
        )}
      </div>

      <div>
        <Notify errorMessage={errorMessage} />
        <LoginForm
          show={page === 'login'}
          setPage={setPage}
          setToken={setToken}
          setError={notify}
        />
      </div>

      <Authors show={page === 'authors'} />

      <Books
        show={page === 'books'}
        setGenreFilter={setGenreFilter}
        genreFilter={genreFilter}
      />

      <NewBook show={page === 'add'} setPage={setPage} />
    </div>
  );
};

export default App;
