const { merge } = require('lodash')
const { typeDef: User, resolvers: userResolvers } = require('./user')
const { typeDef: Author, resolvers: authorResolvers } = require('./author')
const { typeDef: Book, resolvers: bookResolvers } = require('./book')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const schema = makeExecutableSchema({
  typeDefs: [User, Author, Book],
  resolvers: merge(authorResolvers, userResolvers, bookResolvers),
})

module.exports = schema
