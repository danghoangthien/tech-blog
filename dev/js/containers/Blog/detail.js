import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import GitHubLogin from 'react-github-login';
import PrismCode from 'react-prism';

import 'bootstrap/dist/css/bootstrap.css';

require('prismjs');
require('prismjs/plugins/line-numbers/prism-line-numbers.js');
require('prismjs/themes/prism.css');
require('prismjs/plugins/line-numbers/prism-line-numbers.css');

var loadLanguages = require('prismjs/components/');


class Detail extends Component {
  render_files (files) {
    let rendered_files = [];
    Object.keys(files).forEach(e => {
      console.log(`key=${e}  value=${files[e]}`);
      const file_name = e;
      const file_obj = files[e];
      const language = file_obj.language.toLowerCase();
      //const file_content = Prism.highlight(file_obj.content, Prism.languages.javascript, 'javascript');
      loadLanguages([language]);
      rendered_files.push(
        <section key={file_obj.name}>
          <hr/>
          <h5>{file_obj.filename}</h5>
          <hr/>
          <PrismCode component="pre" className={"line-numbers"+" "+"language-"+language}>
            {file_obj.content}
          </PrismCode>
        </section>
      )
      
    }
    );
    return rendered_files;
  }
  render() {
    const blog = this.props.blog;
    console.log('----> blog', this.props.blog)
    if (blog && blog.detail) {
      const files = blog.detail.files;
      const rendered_files = this.render_files(files);
      return (
          <div>
            <h3>{blog.detail.description}</h3>
            {rendered_files}
          </div>
      );
    } else {
      return (
        <div>
          Please select one item from list to see detail
        </div>
      )
    }
    
  }
}

// Get apps state and pass it as props to UserList
//      > whenever state changes, the UserList will automatically re-render
function mapStateToProps(state) {
    return {
        blog: state.blog
    };
}

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Detail);