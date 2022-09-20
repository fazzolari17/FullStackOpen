const {
  ApolloServer,
  gql,
  ValidationError,
  UserInputError,
} = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const Author = require('./models/author')
const Book = require('./models/book')
const book = require('./models/book')
const User = require('./models/user')
// Need to move to environment file
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const MONGODB_URI = `mongodb+srv://fullstack:yjHyvUrltbkLkhtx@cluster0.jcoqm6h.mongodb.net/bookDatabase?retryWrites=true&w=majority`

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => console.log('error connection to MongoDB:', error.message))

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    bookCount: Int
    born: Int
    id: ID!
  }

  type Book {
    title: String!
    author: Author!
    published: String!
    genres: [String!]!
    id: ID!
  }

  type Query {
    me: User
    bookCount(author: String): Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author]
  }

  type Mutation {
    createUser(username: String!, favoriteGenre: String): User

    login(username: String!, password: String!): Token

    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]
    ): Book

    editAuthor(name: String!, born: Int!): Author
  }
`

const resolvers = {
  Query: {
    me: async (root, args, context) => {
      return context.currentUser
    },
    bookCount: async (root, args) => {
      if (args.author === undefined) {
        return await Book.countDocuments()
      } else {
        const author = await Author.findOne({ name: args.author })
        const counted = await Book.find({ author: { $in: author._id } })
      }
    },
    authorCount: async () => await Author.countDocuments(),
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
        return newBook
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
