import * as dotenv from "dotenv";
import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./graphql/schema";

dotenv.config();

const app: Application = express();

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });

  // Start the Apollo Server before applying middleware
  await server.start();

  // @ts-ignore
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(
      `Server is running on http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer();
