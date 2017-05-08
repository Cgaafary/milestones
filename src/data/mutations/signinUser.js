import { gql } from 'react-apollo';

export default gql`
mutation SigninUser ($email: String!, $password: String!){
  signinUser(email: {email: $email, password: $password}) {
    user {
      id
      fullName
      userType
    }
    token
  }
}
`;