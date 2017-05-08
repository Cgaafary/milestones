import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';

// Queries and Mutations;
import getStudents from '../../../data/queries/getStudents';

class StudentList extends Component {
    constructor() {
        super();
        this.renderUsers = this.renderUsers.bind(this);
    }

    renderUsers(users) {
        return users.map(({id, fullName}) => (
            <li key={id}><Link to={`/student/${id}/competencies`}>{fullName}</Link></li>
            ))
    };

    render() {
        const { loading, allUsers: students} = this.props.data;

        if (loading) { return <div>Loading...</div>}
    
        return(
        <div>
            <h2>Choose a student</h2>
            <ul>{this.renderUsers(students)}</ul>
        </div>
        );
    }
}


export default graphql(getStudents)(StudentList);