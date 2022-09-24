const { gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('../models/author')
const Book = require('../models/book')

const typeDef = gql`
  type Author {
    name: String!
    bookCount: Int
    born: Int
    id: ID!
  }

  type Query {
    authorCount: Int!
    allAuthors: [Author]
  }

  type Mutation {
    editAuthor(name: String!, born: Int!): Author
  }
`

const resolvers = {
  Query: {
    authorCount: async () => await Author.countDocuments(),
    allAuthors: async (root, args) => {
      const author = await Author.find({})
      const books = await Book.find({}).populate('author')

      const response = author.map((author) => {
        const booksAuthored = books.filter(
          (book) => book.author.name === author.name
        )
        return {
          id: author._id,
          name: author.name,
          born: author.born,
          bookCount: booksAuthored.length,
        }
      })
      return response
    },
  },
  Mutation: {
    editAuthor: async (root, args, context) => {
      // Logged in Error Handling
      if (!context.currentUser) {
        throw new UserInputError('must be logged in', {
          invalidArgs: args,
        })
      }
      if (!context.currentUser) {
      }
      try {
        return await Author.findOneAndUpdate(
          { name: args.name },
          { $set: { born: args.born } }
        )
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
  },
}

module.exports = {
  typeDef,
  resolvers,
}
