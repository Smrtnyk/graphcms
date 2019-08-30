//require('@babel/register')
import 'cross-fetch/polyfill'
import ApolloBoost, { gql } from 'apollo-boost'
import bcrypt from 'bcryptjs'
import prisma from '../src/prisma'

const client = new ApolloBoost({
  uri: 'http://localhost:4000/'
})

beforeEach(async () => {
  await prisma.mutation.deleteManyPosts()
  await prisma.mutation.deleteManyUsers()
  const user = await prisma.mutation.createUser({
    data: {
      name: 'Milan',
      email: 'milan@example.com',
      password: bcrypt.hashSync('Milan1.,')
    }
  })

  await prisma.mutation.createPost({
    data: {
      title: 'Published post',
      body: '',
      published: true,
      author: {
        connect: {
          id: user.id
        }
      }
    }
  })

  await prisma.mutation.createPost({
    data: {
      title: 'UnPublished post',
      body: '',
      published: false,
      author: {
        connect: {
          id: user.id
        }
      }
    }
  })

})

test('should create a new user', async () => {
  const createUser = gql`
    mutation {
      createUser(data: {
        name: "John",
        email: "john@example.com",
        password: "John123.,"
      }) {
        user {
          id
          name
        }
        token
      }
    }
  `

  const response = await client.mutate({
    mutation: createUser
  })

  const exists = await prisma.exists.User({
    id: response.data.createUser.user.id
  })

  expect(exists).toBe(true)
})

test('should expose public author profiles', async () => {
  const getUsers = gql`
    query {
      users {
        id
        name
        email
      }
    }
  `

  const response = await client.query({ query: getUsers })

  expect(response.data.users.length).toBe(1)
  expect(response.data.users[0].email).toBe(null)
  expect(response.data.users[0].name).toBe("Milan")
})

test('it should expose published posts', async () => {
  const getPosts = gql`
    query {
      posts {
        id
        title
        body
        published
      }
    }
  `

  const response = await client.query({
    query: getPosts
  })

  expect(response.data.posts.length).toBe(1)
  expect(response.data.posts[0].published).toBe(true)
})

test('it should not login with bad credentials', async () => {
  const login = gql`
    mutation {
      login(
        data: {
          email: "milance@example.com",
          password: "Milan12345"
        }
      ) {
        token
      }
    }
  `

  await expect(client.mutate({ mutation: login })).rejects.toThrow()

})

test('it should not sign up a new user if password invalid', async () => {
  const createUser = gql`
    mutation {
      createUser(data: {
        name: "John",
        email: "john@example.com",
        password: "J.,"
      }) {
        user {
          id
          name
        }
        token
      }
    }
  `
  await expect(client.mutate({ mutation: createUser })).rejects.toThrow()

})