import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    login(email: String!, password: String!): Auth
  }
  type Mutation {
    signup(name: String!, email: String!, password: String!): Auth
  }
  type Auth {
    success: Boolean!
    message: String!
    status: Int!
  }
`;
