import { createSchema } from "graphql-yoga";
import { prisma } from "@/lib/prisma";

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Movie {
      id: ID!
      title: String!
      description: String!
      genre: String!
      releaseYear: Int!
      posterUrl: String!
      duration: Int!
      featured: Boolean!
    }

    type Query {
      movies: [Movie!]!
      movie(id: ID!): Movie
      featuredMovies: [Movie!]!
    }
  `,

  resolvers: {
    Query: {
      movies: () =>
        prisma.movie.findMany({
          orderBy: { createdAt: "desc" },
        }),

      movie: (_: unknown, args: { id: string }) =>
        prisma.movie.findUnique({
          where: { id: args.id },
        }),

      featuredMovies: () =>
        prisma.movie.findMany({
          where: { featured: true },
          orderBy: { createdAt: "desc" },
        }),
    },
  },
});
