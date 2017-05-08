// @flow
import React, { Component } from 'react';
import { graphql } from 'react-apollo';

// import components
import Public from './public/Public';
import AuthenticatedUser from './protected/AuthenticatedUser';

// Queries and Mutations
import getCurrentUser from '../data/queries/getCurrentUser';

class Main extends Component {
  state: {loggedIn: bool, currentUser: {id?: string, userType?: string, fullName?: string}}
  handleSignIn: Function;
  handleSignOut: Function;

  constructor(props: Object) {
    super(props);

    this.state = {
      loggedIn: false,
      currentUser: {}
     }

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignIn(user) {
    this.setState({loggedIn: true, currentUser: user})
    this.props.history.replace('/');
  }

  handleSignOut() {
    localStorage.removeItem('token');
    this.props.history.replace('/');
    location.reload();
  }

  // The problem with auth has been identified to this function
  componentWillReceiveProps(nextProps) {
    const { loading, user } = nextProps.data;

    if (loading) {
      return;
    }

    if (user) {
      this.setState({ loggedIn: true, currentUser: user })
    }

  }


  render() {
    const { loggedIn, currentUser } = this.state;
    if (!loggedIn) {
      return(
      <div>
        <Public handleSignIn={this.handleSignIn}/>
      </div>
      );
    } else {
      return (
        <div>
         <AuthenticatedUser handleSignOut={this.handleSignOut} currentUser={currentUser}/>
        </div>
      );
    }
  }
}
export default graphql(getCurrentUser)(Main);
