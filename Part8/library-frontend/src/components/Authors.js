import { gql, useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useField } from '../hooks/useField';

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      born
    }
  }
`;

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const name = useField('text');
  const born = useField('text');

  const authors = result.data ? result.data.allAuthors : [];

  if (!props.show) {
    return null;
  }

  const updateAuthor = (e) => {
    e.preventDefault();
    editAuthor({
      variables: {
        name: name.value,
        born: parseInt(born.value),
      },
    });
    name.onReset();
    born.onReset();
  };

  const authorSelection = result.data
    ? result.data.allAuthors.map((a) => (
        <option key={a.id}>{a.name}</option>
      ))
    : [];

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set Birthyear</h2>
      <form>
        <label>
          name
          <select {...name}>
            <option>-</option>
            {authorSelection}
          </select>
        </label>
        <br />
        <label>
          born
          <input {...born}></input>
        </label>
        <button onClick={updateAuthor}>
          Update Author
        </button>
      </form>
    </div>
  );
};

export default Authors;
