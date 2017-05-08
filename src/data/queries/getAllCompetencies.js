import { gql } from 'react-apollo';

export default gql`
    query GetCompetencies {
    allCompetencies {
        id
        slug
        title
    }
    }
`;