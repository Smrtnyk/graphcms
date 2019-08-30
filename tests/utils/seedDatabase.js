import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import prisma from '../../src/prisma'

const userOne = {
  input: {
    name: 'Milan',
    email: 'milan@example.com',
    password: bcrypt.hashSync('Milan1.,')
  },
  user: undefined,
  jwt: undefined
}

const postOne = {
  input: {
    title: 'Published post',
    body: '',
    published: true,
  },
  post: undefined
}

const postTwo = {
  input: {
    title: 'UnPublished post',
    body: '',
    published: false,
  },
  post: undefined
}

const seedDatabase = async () => {
  // Delete test data
  //
  await prisma.mutation.deleteManyPosts()
  await prisma.mutation.deleteManyUsers()

  // Create user one
  //
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  })

  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET)

  // Create post one
  //
  postOne.post = await prisma.mutation.createPost({
    data: {
      ...postOne.input,
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  })

  // Create post two
  //
  postTwo.post = await prisma.mutation.createPost({
    data: {
      ...postTwo.input,
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  })

}

export { userOne, postOne, postTwo }
export default seedDatabase