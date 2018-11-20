import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import GitHubLogin from 'react-github-login';
import 'bootstrap/dist/css/bootstrap.css';

// import actions :
import {getBlog} from '../../actions/blog-action';
import {getAuthUser} from '../../actions/git-auth-action';

class List extends Component {
  
  render() {
    const list = this.props.list;
    console.log('list====',list)
    const listRender = list.map((item,index)=>{
      const id = item.id
      const {token} = this.props.git_auth;
      return (
        <div className="row">
          <div className="col-md-8" key={id} >{index+1}- {item.description} </div>
          <div className="col-md-4"> 
            <a type="button" onClick={()=>{this.props.doGetBlog(token,id)}} className="badge badge-light">Detail</a> 
          </div>
        </div>
        )
    })
    return (
      <div>
      {
        list.length==0 ? 
        <p>There are no blogs for current user</p>
        :
        <div >
          {listRender}
        </div>
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
    return bindActionCreators({
      doGetBlog: getBlog,
      doGetAuthUser: getAuthUser
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(List);