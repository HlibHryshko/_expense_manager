import { gql } from "apollo-server-express";

// Define your type definitions (schema)
export const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define your resolvers
export const resolvers = {
  Query: {
    hello: () => "Hello, world!",
  },
};
