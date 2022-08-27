const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

let token = ''
let user = ''
beforeAll(async () => {
  await User.deleteOne({})

  user = await api
    .post('/api/users')
    .send({
      username: 'root',
      name: 'superuser',
      password: 'password' })
    .expect(201)


  await api
    .post('/api/login')
    .send({
      username: user.body.username,
      password: 'password'
    })
    .expect(200)
    .then(res => {
      token = res.text.substring(10, 205)
    })

})

beforeEach(async () => {
  await Blog.deleteMany({})
  const addedUser = helper.initialblogs.map(blog => ({ ...blog, user: user.body.id }))

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(addedUser[0])

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(addedUser[1])
})

describe('when there is initially some blogs saved', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialblogs.length)
  })

  test('a specific blog is within the saved blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body[0].title).toStrictEqual('First Test Blog')
  })

  test('a specific blog is included with returned blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const contents = response.body.map(r => r.title)
    expect(contents).toContain('First Test Blog')
  })

})


describe('check the fields of submitted blog', () => {

  test('check that blog contains id field', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body[0].id).toBeDefined()
  })

  test('check that blog contains title field', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body[0].title).toBeDefined()
  })

  test('check that blog contains author field', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body[0].author).toBeDefined()
  })

  test('check that blog contains url field', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body[0].url).toBeDefined()
  })

  test('check that blog contains likes field', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body[0].likes).toBeDefined()
  })

  test('blog added without likes, default likes to 0', async () => {
    const userInDb = await helper.usersInDb()

    const userId = userInDb[0].id

    const newBlog = {
      title: 'Blog without likes',
      author: 'Post Request',
      url: 'https://reactpatterns.com/',
      userId: userId
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const likes = response.body.map(r => r.likes)

    expect(response.body).toHaveLength(helper.initialblogs.length + 1)
    expect(likes).toBeDefined()
    expect(likes).toContain('0')
  })

  test('a blog without a title returns 400', async () => {
    const userInDb = await helper.usersInDb()
    const userId = userInDb[0].id

    const newBlog = {
      title: '',
      author: 'No Title',
      url: 'https://reactpatterns.com/',
      likes: 1,
      userId: userId
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('a blog without a url returns 400', async () => {
    const userInDb = await helper.usersInDb()
    const userId = userInDb[0].id

    const newBlog = {
      title: 'A blog missing URL',
      author: 'No URL',
      url: '',
      likes: 1,
      userId: userId
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

describe('viewing a specific blog', () => {

  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('fails with status code 404 if note does not exist', async () => {
    const validNonExistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${validNonExistingId}`)
      .set('Authorization', `bearer ${token}`)
      .expect(404)
      .expect('Content-Type', /application\/json/)
  })

  test('fails with a statuscode 400 id is invalid', async () => {
    const invalidId = '6304ef273328f27b67fbc7f2-123'

    await api
      .get(`/api/blogs/${invalidId}`)
      .set('Authorization', `bearer ${token}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

describe('deletion of a blog', () => {

  test('succeeds with a status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialblogs.length - 1)

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('backend functionality', () => {

  test('A valid blog can be added', async () => {
    const newBlog = {
      title: 'Additional Blog',
      author: 'Post Request',
      url: 'https://reactpatterns.com/',
      likes: 10,
      userId: user.body.id
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const title = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialblogs.length + 1)
    expect(title).toContain('Additional Blog')
  })

  test('a blog can be deleted from the server', async () => {
    const newBlog = {
      title: 'A blog to be deleted',
      author: 'Delete Request',
      url: 'https://reactpatterns.com/',
      likes: 10,
      user: user.body.id
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .get('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogToDelete = response.body.map(r => r)

    await api
      .delete(`/api/blogs/${blogToDelete[2].id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const secondResponse = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(secondResponse.body).toHaveLength(helper.initialblogs.length)

  })

  test('a blog can be updated', async () => {

    const newBlog = {
      title: 'A blog not Updated',
      author: 'PUT Request',
      url: 'https://reactpatterns.com/',
      likes: 10,
      user: user.body.id
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogToUpdate = response.body.map(r => r)

    const updatedBlog = {
      title: 'A blog UPDATED',
      author: 'PUT Request',
      url: 'https://reactpatterns.com/',
      likes: 100
    }

    await api
      .put(`/api/blogs/${blogToUpdate[2].id}`)
      .send(updatedBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const secondResponse = await api
      .get('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(secondResponse.body).toHaveLength(helper.initialblogs.length + 1)
    expect(secondResponse.body[2].title).toStrictEqual('A blog UPDATED')
    expect(secondResponse.body[2].likes).toBe('100')
    expect(secondResponse.body[2].edited).toBeDefined()


  })


})

afterAll(() => {
  mongoose.connection.close()
})