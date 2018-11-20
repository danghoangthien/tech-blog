// react stuffs
import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
// redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 3rd parties
import GitHubLogin from 'react-github-login';
import qs from 'query-string';

// core components :
import {setAuthCode} from '../../actions/git-auth-action';


class Login extends Component {
  
  constructor(props) {
    super(props)
  }
  
  onSuccess(response) {
    console.log(response);
    this.props.onGotAuthCode(response.code)
    
  };
  
  onFailure(response) {
    console.error('error::',response);
  };
  
  componentDidMount() {
    const params = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    if (params['type'] && params['type'] == 'logout') {
      localStorage.setItem('token', null);
    }
  };
  
  componentDidUpdate() {
    console.log('this.props.git_auth.code',this.props.git_auth.code)
  };
  
  render() {
    
    return (
      <div>
        {
          this.props.git_auth.code ?
          <Redirect to={'/blog'} /> :
          <GitHubLogin 
            clientId="0de06009ecae0da13870"
            redirectUri=""
            onSuccess={(response)=>this.onSuccess(response)}
            scope={"gist"}
            onFailure={(response)=>this.onFailure(response)}
          />
        } 
      </div>
    );
  }

}

// Get apps state and pass it as props to UserList
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
    return {
        git_auth: state.git_auth
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    return bindActionCreators({onGotAuthCode: setAuthCode}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);
