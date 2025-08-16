import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import { login, signup } from "./resolvers/resolver";
import { typeDefs } from "./typeDefs/typeDef";

const resolvers = {
  Query: {
    login,
  },
  Mutation: {
    signup,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});


export async function GET(req: NextRequest, context: unknown) {
  return handler(req);
}

export async function POST(req: NextRequest, context: unknown) {
  return handler(req);
}