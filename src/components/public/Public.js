import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import SignIn from './SignIn';
class Public extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.handleSignIn();
    }

    render() {
        return (
            <div>
            <Link to="/signin"><button>Sign In</button></Link>
            <Route path="/signin" render={props => <SignIn {...props} handleSignIn={this.props.handleSignIn} />} />
            </div>
        );
    }
}

export default Public;