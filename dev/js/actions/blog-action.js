import axios from 'axios';

import APPCONFIG from './../constants/appConfig';
import * as types from './../constants/actionTypes';

const proxy = APPCONFIG.proxyUrl;
const clientId = APPCONFIG.gitAuth.clientId;
const clientSecret = APPCONFIG.gitAuth.clientSecret;

//setAuthUser
export const setBlogs = (payload) => {
  console.log('action::setBlogs',payload);
  return {
    type: types.SET_BLOG_LIST,
    payload: {
        list:payload
    }
  }
};

export const getBlogList = (access_token) => {
  console.log('action::getBlogList access_token',access_token);
  return (dispatch) => {
  return axios.get(`${proxy}/https://api.github.com/gists`, {
    headers: {
      'Accept':'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Authorization': `token ${access_token}` 
    }
  })
  .then(response => {
    console.log('response.data',response.data);
    console.log('response.status',response.status);
    dispatch(setBlogs(response.data));
  }).catch((error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
      if (error.response.status == 404){
        const message = "not found";
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
  }
}
