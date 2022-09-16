import express from "express";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import { buildSchema, NonEmptyArray } from "type-graphql";
import "reflect-metadata";

import { CLIENT_URL, getContext, PROD_ENV, SERVER_PORT } from "./config";
import * as resolverObj from "./resolvers";

async function main() {
  const resolvers = Object.entries(resolverObj).map((v) => v[1]) as unknown as
    | NonEmptyArray<Function>
    | NonEmptyArray<string>;

  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers,
      validate: false,
    }),
    context: getContext,
  });

  app.use(cookieParser());

  app.get("/ping", (_, res) => res.json("pong"));

  app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}`));

  await apolloServer.start();
  const origin = [CLIENT_URL];
  if (!PROD_ENV) {
    origin.push("https://studio.apollographql.com");
  }
  apolloServer.applyMiddleware({
    app,
    cors: {
      origin,
      credentials: true,
    },
  });
}

main();
