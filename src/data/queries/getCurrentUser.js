import { gql } from 'react-apollo';

export default gql`
query GetCurrentUser {
  user {
    id
    fullName
    userType
  }
}
`;