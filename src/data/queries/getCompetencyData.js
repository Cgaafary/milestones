import { gql } from 'react-apollo';

export default gql`
query getCompetencyData($competencyId: ID!) {
	Competency(id: $competencyId) {
    title
    slug
    milestones {
      id
      description
      level
    }
  }
}
`;