/* eslint-disable quotes */
const list_helper = require('../utils/list_helper')
const { blogs } = require('../tests/blogs')

describe('favorite blog', () => {

  test('Blog with the most likes', () => {
    const result = list_helper.favoriteBlog(blogs)
    expect(result).toStrictEqual({
      "_id": "5a422b3a1b54a676234d17f9",
      "title": "Canonical string reduction",
      "author": "Edsger W. Dijkstra",
      "url": "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      "likes": 12,
      "__v": 0
    })
  })
})
