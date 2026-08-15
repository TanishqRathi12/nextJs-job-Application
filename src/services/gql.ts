import { GraphQLClient } from "graphql-request";

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
const endpoint =
  typeof window !== "undefined"
    ? `${window.location.origin}/api/graphql`
    : "http://localhost:3000/api/graphql";

console.log("GraphQL Endpoint:", endpoint);

const gqlClient = new GraphQLClient(endpoint);

export default gqlClient;
