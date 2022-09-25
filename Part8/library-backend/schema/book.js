const { gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('../models/author')
const Book = require('../models/book')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const typeDef = gql`
  type Subscription {
    bookAdded: Book!
  }

  type Book {
    title: String!
    author: Author!
    published: String!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount(author: String): Int!
    allBooks(author: String, genre: String): [Book!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]
    ): Book
  }
`

const resolvers = {
  Query: {
    bookCount: async (root, args) => {
      if (args.author === undefined) {
        return await Book.countDocuments()
      } else {
        const author = await Author.findOne({ name: args.author })
        const counted = await Book.find({ author: { $in: author._id } })
      }
    },
    allBooks: async (roots, args) => {
      const author = await Author.find({ name: args.author })

      if (args.author === undefined && args.genre === undefined) {
        return await Book.find({}).populate('author')
      } else if (args.author !== undefined && args.genre === undefined) {
        const filteredByAuthor = await Book.find({
          author: author[0]._id,
        }).populate('author')
        return filteredByAuthor
      } else if (args.genre !== undefined && args.author === undefined) {
        return await Book.find({ genres: args.genre }).populate('author')
      }
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const itemInDb = await Book.find({ title: args.title })
      // Logged in Error Handling
      if (!context.currentUser) {
        throw new UserInputError('must be logged in', {
          invalidArgs: args,
        })
      }
      // Error Handling
      if (args.author.length < 4) {
        throw new UserInputError(
          `author name (${args.author}) must be 4 or more characters`,
          {
            invalidArgs: args.author,
          }
        )
      }
      if (args.title.length < 3) {
        throw new UserInputError(
          `Book title (${args.title}) must be 3 or more characters`,
          {
            invalidArgs: args.title,
          }
        )
      }
      if (itemInDb.length > 0) {
        throw new UserInputError(
          `(${args.title}) already exists in database, new books must be unique`,
          {
            invalidArgs: args.title,
          }
        )
      }

      try {
        const author = await Author.findOne({ name: args.author })
        if (!author) {
          const author = new Author({ name: args.author })
          await author.save()
        }

        const authorInDb = await Author.findOne().where({ name: args.author })
        const book = new Book({ ...args, author: authorInDb })

        const newBook = await book.save()

        pubsub.publish('BOOK_ADDED', { bookAdded: newBook })
        return newBook
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

module.exports = {
  typeDef,
  resolvers,
}
