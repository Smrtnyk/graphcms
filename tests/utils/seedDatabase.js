import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import prisma from '../../src/prisma'

// Users data
//
const userOne = {
  input: {
    name: 'Milan',
    email: 'milan@example.com',
    password: bcrypt.hashSync('Milan1.,')
  },
  user: undefined,
  jwt: undefined
}
const userTwo = {
  input: {
    name: 'Zemo',
    email: 'zemo@example.com',
    password: bcrypt.hashSync('Zemara1.,')
  },
  user: undefined,
  jwt: undefined
}

// Posts data
//
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

// Comments Data
const commentOne = {
  input: {
    text: "Great comment!"
  },
  comment: undefined
}
const commentTwo = {
  input: {
    text: "Another Great comment!"
  },
  comment: undefined
}

const seedDatabase = async () => {
  // Delete test data
  //
  await prisma.mutation.deleteManyComments()
  await prisma.mutation.deleteManyPosts()
  await prisma.mutation.deleteManyUsers()

  // Create user one
  //
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  })
  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET)

  // Create user two
  //
  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input
  })
  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET)

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

  // Create comment one
  //
  commentOne.comment = await prisma.mutation.createComment({
    data: {
      ...commentOne.input,
      post: {
        connect: {
          id: postOne.post.id
        }
      },
      author: {
        connect: {
          id: userTwo.user.id
        }
      }
    }
  })

  // Create comment two
  //
  commentTwo.comment = await prisma.mutation.createComment({
    data: {
      ...commentTwo.input,
      post: {
        connect: {
          id: postOne.post.id
        }
      },
      author: {
        connect: {
          id: userOne.user.id
        }
      }
    }
  })

}

export { userOne, userTwo, postOne, postTwo, commentOne, commentTwo }
export default seedDatabase