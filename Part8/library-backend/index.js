const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')

const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')

const express = require('express')
const http = require('http')
const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const User = require('./models/user')
const schema = require('./schema/schema')

const MONGODB_URI = `mongodb+srv://fullstack:yjHyvUrltbkLkhtx@cluster0.jcoqm6h.mongodb.net/bookDatabase?retryWrites=true&w=majority`

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => console.log('error connection to MongoDB:', error.message))

mongoose.set('debug', true)

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: '',
    }
  )

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close()
            },
          }
        },
      },
    ],
  })

  await server.start()

  server.applyMiddleware({
    app,
    path: '/',
  })

  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

start()
