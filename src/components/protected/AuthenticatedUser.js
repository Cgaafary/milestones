import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Header from './Header';
import FacultyOnly from './FacultyComponents/FacultyOnly';
import StudentsOnly from './StudentComponents/StudentsOnly';

class AuthenticatedUser extends Component {
    conditionallyRenderComponents() {
        const { currentUser } = this.props;
        const { userType } = currentUser;

        if (userType === "FACULTY") {
            return <FacultyOnly {...this.props} />
        }
        else { 
            return <StudentsOnly />}
        }

    render() {
        return (
        <div>
            <Route path="/" render={props => <Header {...props} {...this.props}/>} />
            {this.conditionallyRenderComponents()}
        </div>
        );
    }
}

export default AuthenticatedUser;