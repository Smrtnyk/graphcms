import { Prisma } from "prisma-binding"

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://192.168.99.100:4466/"
})

export default prisma

// prisma.query prisma.mutation prisma.subscription prisma.exists

// prisma.query.users(null, "{ id name email }").then(data => {
//   console.log(data)
// })