import { gql } from 'react-apollo';

export default gql`
mutation SubmitEvaluation ($achieved: Boolean!, $evaluatedUserId: ID!, $evaluatingUserId: ID!, $milestoneId: ID!) {
  createEvaluation(achieved: $achieved, evaluatedUserId: $evaluatedUserId, evaluatingUserId: $evaluatingUserId, milestoneId: $milestoneId) {
    id
    achieved
    milestone {
      level
      description
    }
  }
}
`;