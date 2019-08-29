import { Prisma } from "prisma-binding"
import { fragmentReplacements } from "./resolvers"

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: "secretexample",
  fragmentReplacements
})

export default prisma