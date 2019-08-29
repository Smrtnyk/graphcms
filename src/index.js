import { GraphQLServer, PubSub } from 'graphql-yoga'

import prisma from "./prisma"

import { resolvers, fragmentReplacements } from "./resolvers"

const pubsub = new PubSub()

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context (request) {
    return {
      db,
      pubsub,
      prisma,
      request
    }
  },
  fragmentReplacements
})

server.start(() => {
  console.log("server up")
})