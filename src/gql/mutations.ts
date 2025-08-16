import gql from "graphql-tag";

export const SIGNUP = gql`
  mutation Mutation($name: String!, $signupEmail2: String!, $signupPassword2: String!) {
    signup(name: $name, email: $signupEmail2, password: $signupPassword2) {
      success
      message
      status
    }
  }
`;