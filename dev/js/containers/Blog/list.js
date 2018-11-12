import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import GitHubLogin from 'react-github-login';
import 'bootstrap/dist/css/bootstrap.css';

class List extends Component {
  render() {
    const list = this.props.list;
    console.log('list====',list)
    const listRender = list.map((item)=>{
      return <li key={item.id} >{item.description} | {item.url} </li>
    })
    return (
      <div>
      {
        list.length==0 ? 
        <p>There are no blogs for current user</p>
        :
        <ul>
          {listRender}
        </ul>
      }
      </div>
      

    )
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
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(List);