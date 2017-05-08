import { gql } from 'react-apollo';

export default gql`
  query GetUserById($id: ID!) {
    User(id:$id) {
      fullName
      id
    }
  }
`;