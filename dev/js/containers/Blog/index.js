import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import GitHubLogin from 'react-github-login';
import 'bootstrap/dist/css/bootstrap.css';

// import actions :
import {getAuthToken,setAuthToken,getAuthUser} from '../../actions/git-auth-action';
import {getBlogList,setView} from '../../actions/blog-action';
// import containers
import List from '../../containers/Blog/list';
import Detail from '../../containers/Blog/detail';
import New from '../../containers/Blog/new';

const VIEW_BLOG_DETAIL = 1
const VIEW_BLOG_NEW = 2

class Blog extends Component {
  
  constructor(props) {
    super(props);
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
    const {token,user} = this.props.git_auth;
    const list = this.props.blogs.list;
    if (token){
      localStorage.setItem('token', JSON.stringify(token));
      if (!user) {
        this.props.doGetAuthUser(token);
        if (list.length == 0){
          this.props.doGetBlogList(token);
        }
      }
    }
  };

  render() {
    const {token,user} = this.props.git_auth;
    console.log("user ",user)
    const list = this.props.blogs.list;
    console.log("blog ",this.props.blogs)
    console.log("blog index list",list)
    return (
      <div className="container-fluid mt-3" >
      {token ?
        <div>
          <div className="row">
            <div className="col-md-3">
              <button type="button" className="btn btn-primary" onClick={()=>{this.props.doSetView(VIEW_BLOG_NEW)}}>New</button>&nbsp;
            </div>
            { (user && user.login) &&
            <div className="col-md-9">
              <span className="badge badge-primary float-right mr-3">Welcome back, {user.login}! (<a style={{color:"#ffffff"}} href="#/login?type=logout" >Logout</a>)</span>
            </div>
            }
          </div>
          <div className="row mt-4">
            <div className="col-md-3">
              <List list={list}/>
            </div>
            <div className="col-md-8">
              { this.props.blog.view == VIEW_BLOG_DETAIL && <Detail /> }
              { this.props.blog.view == VIEW_BLOG_NEW && <New /> }
            </div>
          </div>
        </div>
        : 
        <div className="col-md-12">
          {"hello blog hub user, we could not get token yet! please click here  to retry "}
          <a href="#/login" >Login with github</a>
        </div>
        
      }
      
      </div>
    );
  }

}

// Get apps state and pass it as props to UserList
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
    return {
        git_auth: state.git_auth,
        blogs:state.blogs,
        blog:state.blog
    };
}

// Get actions and pass them as props to to UserList
function matchDispatchToProps(dispatch){
    return bindActionCreators({
      doGetAuthToken: getAuthToken,
      doSetAuthToken: setAuthToken,
      doGetAuthUser: getAuthUser,
      doGetBlogList: getBlogList,
      doSetView: setView
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Blog);
