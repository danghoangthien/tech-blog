import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import GitHubLogin from 'react-github-login';
import 'bootstrap/dist/css/bootstrap.css';

// import actions :
import {getAuthToken,setAuthToken} from '../../actions/git-auth-action';

// import containers
import List from '../../containers/Blog/list';
import Detail from '../../containers/Blog/detail';

class Blog extends Component {
  
  constructor(props) {
    super(props)
  }
  
  componentDidMount() {
    console.log('this.props.git_auth.code',this.props.git_auth.code);
    const code = this.props.git_auth.code;
    const tokenObj = localStorage.getItem('token');
    let token = null;
    if (tokenObj) {
       token = JSON.parse(tokenObj)
    }
   
    if (code && !token) {
      this.props.doGetAuthToken(code);
    } else {
      this.props.doSetAuthToken({access_token:token});
    }
  };
  
  componentDidUpdate() {
    const token = this.props.git_auth.token;
    if (token){
      localStorage.setItem('token', JSON.stringify(token));
    }
  };
  
  render() {
    const token = this.props.git_auth.token;
    
    return (
      <div className="mt-3 ml-5" >
      {token ?
        <div>
          <div className="row">
          <button type="button" className="btn btn-primary">New</button>&nbsp;
          <button type="button" className="btn btn-dark">Logout</button></div>
          <div className="row mt-4">
            <div className="col-md-4">
              <List/>
            </div>
            <div className="col-md-8">
              <Detail/>
            </div>
          </div>
        </div>
        : 
        <div className="col-md-12">hello blog hub, we could not get token yet!</div>
        
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
function matchDispatchToProps(dispatch){
    return bindActionCreators({doGetAuthToken: getAuthToken,doSetAuthToken: setAuthToken}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Blog);
