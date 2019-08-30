//require('@babel/register')
import 'cross-fetch/polyfill'
import prisma from '../src/prisma'

import getClient from "./utils/getClient"
import seedDatabase, { userOne } from "./utils/seedDatabase"
import { getUsers, getProfile, createUser, login } from "./utils/operations"

const client = getClient()

beforeEach(seedDatabase)

test('should create a new user', async () => {
  const variables = {
    data: {
      name: "John",
      email: "john@example.com",
      password: "John123.,"
    }
  }
  const response = await client.mutate({
    mutation: createUser,
    variables
  })

  const exists = await prisma.exists.User({
    id: response.data.createUser.user.id
  })

  expect(exists).toBe(true)
})

test('should expose public author profiles', async () => {

  const response = await client.query({ query: getUsers })

  expect(response.data.users.length).toBe(2)
  expect(response.data.users[0].email).toBe(null)
  expect(response.data.users[0].name).toBe("Milan")
})

test('it should not login with bad credentials', async () => {
  const variables = {
    data: {
      email: "milance@example.com",
      password: "Milan12345"
    }
  }

  await expect(client.mutate({ mutation: login, variables })).rejects.toThrow()

})

test('it should not sign up a new user if password invalid', async () => {
  const variables = {
    data: {
      name: "John",
      email: "john@example.com",
      password: "J.,"
    }
  }

  await expect(client.mutate({ mutation: createUser, variables })).rejects.toThrow()
})

test('should fetch user profile', async () => {
  const client = getClient(userOne.jwt)
  const { data } = await client.query({ query: getProfile })

  expect(data.me.id).toBe(userOne.user.id)
  expect(data.me.name).toBe(userOne.user.name)
  expect(data.me.email).toBe(userOne.user.email)
})