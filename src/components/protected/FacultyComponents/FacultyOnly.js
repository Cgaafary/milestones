import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import StudentList from './StudentList';
import StudentPage  from './StudentPage';

class FacultyOnly extends Component {
    render() {
        return (
            <div>
                <Switch>
                <Route exact path="/" component={StudentList} />
                <Route
                    path="/student/:id"
                    render={props => <StudentPage {...props} {...this.props}/>} />
                </Switch>
            </div>
        );
    }
}

export default FacultyOnly;