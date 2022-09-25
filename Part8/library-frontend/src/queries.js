import { gql, useSubscription } from '@apollo/client';

export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    genres
    id
    author {
      name
      born
      bookCount
      id
    }
  }
`;

export const AUTHORS_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    born
    bookCount
    id
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      genres
      id
      author {
        name
        born
        bookCount
        id
      }
    }
  }
`;

export const ALL_BOOKS = gql`
  query ($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHORS_DETAILS}
`;

export const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      born
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String]
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const CURRENT_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;
