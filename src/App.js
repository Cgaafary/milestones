import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { client } from './data/apolloClient';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Import Components
import Main from './components/Main';

// Import Functions
import './App.css';
import 'material-design-lite/material.css'

class App extends React.Component<{}, {}> {
  render() { 
    return (
      <ApolloProvider client={client}>
        <Router>
          <Route path="/" component={Main}/> 
        </Router>
      </ApolloProvider>
    );
  } 
}

export default App;
