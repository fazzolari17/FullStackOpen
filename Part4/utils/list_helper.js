const { blogs } = require('../tests/blogs')

const dummy = () => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((a, b) => (a + b.likes ), 0)
}

const favoriteBlog = blogs => {
  return blogs.find(blog => blog.likes === 12)
}

const mostBlogs = blogs => {
  let count = {}

  blogs.forEach(element => {
    count[element.author] = (count[element.author] || 0) + 1
  })

  const maxValue = Object.entries(count).sort((x, y) => y[1] - x[1])

  return { author: maxValue[0][0], blogs: maxValue[0][1] }
}

const mostLikes = blogs => {
  let count = {}

  blogs.forEach(element => {
    count[element.author] = (count[element.author] || 0) + element.likes
  })

  const maxValue = Object.entries(count).sort((x, y) => y[1] - x[1])

  return { author: maxValue[0][0], likes: maxValue[0][1] }
}

console.log(mostLikes(blogs))

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}