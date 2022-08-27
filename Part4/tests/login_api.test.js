const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')


test('a user is able to login and receive a valid token', async () => {
  let token = ''
  let user = ''

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

  expect(token).toHaveLength(195)
})