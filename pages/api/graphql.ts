import { ApolloServer } from "apollo-server-micro";
import { makeExecutableSchema } from "graphql-tools";
import { applyMiddleware } from "graphql-middleware";
import Cors from "micro-cors";

import { typeDefs } from "../../utils/api/typeDefs";
import { resolvers } from "../../utils/api/resolvers";
import { log } from "../../utils/api/log";

const cors = Cors();

export const config = { api: { bodyParser: false } };

const schema = applyMiddleware(makeExecutableSchema({ typeDefs, resolvers }), log);

const handler = new ApolloServer({ schema }).createHandler({ path: "/api/graphql" });

export default cors((req: any, res: any) => {
  if (req.method === "OPTIONS") {
    return res.status(200).send();
  }
  return handler(req, res);
});
