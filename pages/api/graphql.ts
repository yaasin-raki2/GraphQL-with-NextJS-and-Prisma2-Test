import { ApolloServer } from "apollo-server-micro";
import { makeExecutableSchema } from "graphql-tools";
import Cors from "micro-cors";

import { typeDefs } from "../../utils/api/typeDefs";
import { resolvers } from "../../utils/api/resolvers";

const cors = Cors();

export const config = {
  api: {
    bodyParser: false,
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const handler = new ApolloServer({
  schema,
}).createHandler({
  path: "/api/graphql",
});

export default cors((req: any, res: any) => {
  if (req.method === "OPTIONS") {
    return res.status(200).send();
  }
  return handler(req, res);
});
