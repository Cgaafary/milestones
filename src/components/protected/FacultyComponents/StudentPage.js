import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { graphql } from 'react-apollo';

// Custom Components
import CompetencyList from '../CompetencyList';
import CompetencyEvaluationPage from './CompetencyEvaluationPage';

// GraphQL queries and mutations
import getUserById from '../../../data/queries/getUserById';

class StudentPage extends Component {
    render() {
        const { loading, User: student } = this.props.data;
        if (loading) { return <div>Loading...</div> }
        const {match} = this.props;
        return (
            <div>
            <h4>Evaluating {student.fullName}</h4>
            <Route path={`${match.url}/competencies`} component={CompetencyList} />
            <Route path={`${match.url}/competency/:id`} render={props => <CompetencyEvaluationPage {...props} evaluatedUser={student.id} evaluatingUser={this.props.currentUser.id}/>} />
            </div>
        ); 
    }
}

export default graphql(getUserById, {
    options: ({match}) => ({ variables: { id: match.params.id }})
})(StudentPage);