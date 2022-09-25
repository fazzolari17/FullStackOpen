const { gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('../models/author')
const Book = require('../models/book')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const typeDef = gql`
  type Subscription {
    authorEdited: Author!
  }

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
      const authors = await Author.find({})
      const allAuthors = authors.map((author) => {
        return {
          id: author._id,
          name: author.name,
          born: author.born,
          bookCount: author.books.length,
        }
      })
      return allAuthors
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
        const editedAuthor = await Author.findOneAndUpdate(
          { name: args.name },
          { $set: { born: args.born } }
        )
        pubsub.publish('AUTHOR_EDITED', { authorEdited: editedAuthor })
        return editedAuthor
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
  },
  Subscription: {
    authorEdited: {
      subscribe: () => pubsub.asyncIterator(['AUTHOR_EDITED']),
    },
  },
}

module.exports = {
  typeDef,
  resolvers,
}
