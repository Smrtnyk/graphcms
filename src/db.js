// Scalar types: String, Boolean, Int, Float, ID

// Demo user data
const users = [
  {
    id: "1",
    name: 'Mike',
    email: 'mike@test.com'
  },
  {
    id: "2",
    name: 'Milan',
    email: 'milan@test.com',
    age: 26
  },
  {
    id: "3",
    name: 'Sara',
    email: 'sara@test.com',
    age: 18
  }
]

// Demo posts Data
const posts = [
  {
    id: "1",
    title: "Post 1",
    body: "Body content 1",
    published: true,
    author: "2"
  },
  {
    id: "2",
    title: "Post 2",
    body: "Body content 2",
    published: true,
    author: "3"
  },
  {
    id: "3",
    title: "Post 3",
    body: "Body content 3",
    published: false,
    author: "2"
  }
]

// Demo comments data
const comments = [
  {
    id: "101",
    text: "Comment 1",
    author: "2",
    post: "3"
  },
  {
    id: "102",
    text: "Comment 2",
    author: "2",
    post: "1"
  },
  {
    id: "103",
    text: "Comment 3",
    author: "2",
    post: "3"
  },
  {
    id: "104",
    text: "Comment 4",
    author: "1",
    post: "2"
  }
]

export default {
  users,
  comments,
  posts
}