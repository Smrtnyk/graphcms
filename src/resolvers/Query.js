const Query = {
  users (parent, args, { db }, info) {
    if (!args.query) return db.users

    return db.users.filter(user => user.name.toLowerCase().includes(args.query.toLowerCase()))
  },
  posts (parent, args, { db }, info) {
    if (!args.query) return db.posts

    const isTitleMatch = db.posts.filter(post => post.title.toLowerCase().includes(args.query.toLowerCase()))
    const isBodyMatch = db.posts.filter(post => post.body.toLowerCase().includes(args.query.toLowerCase()))

    return isTitleMatch || isBodyMatch
  },
  comments (parent, args, { db }, info) {
    return db.comments
  },
  me () {
    return {
      id: "1",
      name: "Milan",
      email: "milan@test.com",
      age: 26
    }
  }
}

export default Query