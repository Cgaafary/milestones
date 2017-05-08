import { gql } from 'react-apollo';

export default gql`
    query GetStudents {
        allUsers(filter: {
            userType: STUDENT
        }) {
            id
            fullName
        }
    }
`;