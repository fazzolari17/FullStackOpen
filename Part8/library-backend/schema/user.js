const { gql } = require('apollo-server')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'
const User = require('../models/user')

const typeDef = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    createUser(username: String!, favoriteGenre: String): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    me: async (root, args, context) => {
      return context.currentUser
    },
  },
  Mutation: {
    createUser: async (root, args) => {
      console.log(args)
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) => {
      console.log(args)
      const user = await User.findOne({ username: args.username })

      // Hardcoded password for simplicity
      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
}

module.exports = {
  typeDef,
  resolvers,
}
