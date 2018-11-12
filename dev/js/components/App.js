import React, { Component } from 'react';
import { Switch,Route,Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { withRouter } from 'react-router';

import Login from '../containers/Login';
import Blog from '../containers/Blog';

require('../../scss/style.scss');

export default class App extends Component {
  render(){
    const { match, store, history} = this.props;
    return (
      <div>
      <ConnectedRouter history={history}>
        <div>
        <Route path="/login" component={Login} />
        <Route path="/blog" component={Blog} />
        </div>
      </ConnectedRouter>
      </div>
    
    );
  }
} 

