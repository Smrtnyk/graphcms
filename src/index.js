import "core-js/stable"
import "regenerator-runtime/runtime"

import { GraphQLServer, PubSub } from "graphql-yoga"

import prisma from "./prisma"

import { resolvers, fragmentReplacements } from "./resolvers"

const pubsub = new PubSub()

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context (request) {
    return {
      pubsub,
      prisma,
      request
    }
  },
  fragmentReplacements
})

server.start({ port: process.env.PORT || 4000 }, () => {
  console.log("server up")
})