const list_helper = require('../utils/list_helper')
const { blogs } = require('./blogs')

describe('blogs with the most likes', () => {

  test('Author with the most likes', () => {
    const result = list_helper.mostLikes(blogs)
    expect(result).toStrictEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
})