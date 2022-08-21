const list_helper = require('../utils/list_helper')
const { blogs } = require('./blogs')

describe('Most blogs', () => {

  test('Author with the most blogs', () => {
    const result = list_helper.mostBlogs(blogs)
    expect(result).toStrictEqual({ author: 'Robert C. Martin', blogs: 3 })
  })
})