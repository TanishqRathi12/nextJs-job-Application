import gql from "graphql-tag";

export const LOGIN = gql`
  query Query($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      message
      status
    }
  }
`;


