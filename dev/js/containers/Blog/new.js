import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import GitHubLogin from 'react-github-login';
import 'bootstrap/dist/css/bootstrap.css';

// import actions :
import {getAuthToken,setAuthToken,getAuthUser} from '../../actions/git-auth-action';
import {createBlog} from '../../actions/blog-action';

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seq:0,
      gist_description:null,
      file_elements:[],
      file_name_array: [],
      file_content_array: [],
      files_object:{},
      validations:{
        
      }
    }
  }
  
  onGistDescriptionChange(value){
    if (value) {
      this.setState({
        gist_description:value
      });
    } else {
      let validations =this.state.validations;
      validations['empty_gist_description_error'] = 'Gist description could not be blank';
      this.setState({
        validations:validations
      });
    }  
  }
  
  onFileNameChange(value,index) {
    if (value) {
      let file_name_array = this.state.file_name_array;
      file_name_array[index] = value;
      this.setState({
        file_name_array:file_name_array
      });
    } else {
      let validations =this.state.validations;
      validations['empty_file_name_error'] = 'file name could not be blank';
      this.setState({
        validations:validations
      });
    }
  }
  
  onFileContentChange(value,index) {
    if (value) {
      let file_content_array = this.state.file_content_array;
      file_content_array[index] = value;
      this.setState({
        file_content_array:file_content_array
      })
    } else {
      let validations =this.state.validations;
      validations['empty_file_name_error'] = 'file name could not be blank';
      this.setState({
        validations:validations
      });
    }
    
  }
  
  onSubmit() {
    const file_elements = this.state.file_elements;
    const file_name_array = this.state.file_name_array;
    const file_content_array = this.state.file_content_array;
    const gist_description = this.state.gist_description;
    let validations =this.state.validations;
    let files_object = {}
    
    if (!gist_description){
      validations = {
        ...validations,
        empty_gist_description_error:'Gist description could not be blank'
      }
    } else {
      delete validations["empty_gist_description_error"];
    }
    
    file_name_array.map((file_name,index) => {
      if (file_content_array[index]) {
        files_object[file_name] = {
          content:file_content_array[index]
        }
      }
    });
    if (file_elements && Object.keys(files_object).length < file_elements.length) {
      validations = {
        ...validations,
        empty_file_name_error:'File name could not be blank',
        empty_file_content_error: 'File content could not be blank'
      }
      
    } else {
      delete validations["empty_file_name_error"];
      delete validations["empty_file_content_error"];
    }
    
    this.setState({
      validations:validations
    });
    if (Object.keys(validations).length==0){
      const {token} = this.props.git_auth;
      this.props.doCreateBlog(token,gist_description,files_object)
    }
    console.log('files_object onSubmit',files_object)
  }
  
  renderFileElement(index) {
    return (
      <section key={index} className="mt-2">
        <div className="row">
          <label className="col-md-3">File name</label>
          <input onChange={(e)=>{this.onFileNameChange(e.target.value,index)}} className="col-md-9" />
        </div>
        <div className="row mt-2">
          <label className="col-md-3">File content</label>
          <textarea rows="5" onChange={(e)=>{this.onFileContentChange(e.target.value,index)}} className="col-md-9"/>
        </div>
        <div className="row mt-2">
          <div className="col-md-12">
              <span  className="float-right badge badge-warning" onClick={(e)=>{this.removeFileElement(index)}}>Remove file</span>
          </div>
        </div>
        <br/>
        <br/>
      </section>
    )
  }
  
  removeFileElement(index) {
    console.log('removeFileElement@index',index);
    let file_elements = this.state.file_elements;
    let file_name_array = this.state.file_name_array;
    let file_content_array = this.state.file_content_array;
    
    file_elements[index] = null;
    file_name_array[index]=null;
    file_content_array[index]=null;
    console.log('file_elements after splice',file_elements);
    this.setState({
      file_elements:file_elements,
      file_name_array:file_name_array,
      file_content_array:file_content_array
    });
    
  }
  
  addFileElement() {
    let file_elements = this.state.file_elements;
    const index = file_elements.length;
    const element = this.renderFileElement(index);
    file_elements.push(element)
    this.setState({file_elements:file_elements})
  }
  
  render() {
    const file_elements = this.state.file_elements;
    const validations = this.state.validations;
    return (
      <div>
        <section className="mt-2">
          <div className="row">
            <label className="col-md-3">Gist description</label>
            <input onChange={(e)=>{this.onGistDescriptionChange(e.target.value,index)}} className="col-md-9" />
          </div>
        </section>
        <hr/>
        {file_elements}
        <section className="mt-2">
          <div className="row">
            <div className="col-md-12">
              <span  className="float-right badge badge-primary" onClick={()=>{this.addFileElement()}}>Add file</span>&nbsp;
            </div>
          </div>
        </section>
        <hr/>
        {validations &&
        <section className="mt-2">
          <ul>
            {Object.keys(validations).map((validation,index)=>{
              return <li>{validations[validation]}</li>
            })}
          </ul>
        </section>
        }
        {file_elements.length>0 &&  
        <section>
          <div className="row">
            <div className="col-md-12">
              <button  className="btn btn-primary" onClick={()=>{this.onSubmit()}}>Create</button>&nbsp;
            </div>
          </div>
        </section>
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
      doGetAuthUser: getAuthUser,
      doCreateBlog:createBlog
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(New);