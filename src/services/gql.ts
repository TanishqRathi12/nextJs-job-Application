import { GraphQLClient } from "graphql-request";

const gqlClient = new GraphQLClient("https://next-js-job-application.vercel.app/api/graphql");

export default gqlClient;
