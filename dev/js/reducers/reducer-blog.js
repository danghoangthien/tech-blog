import * as types from './../constants/actionTypes';

const VIEW_BLOG_DETAIL = 1
const VIEW_BLOG_NEW = 2

// default state
const initialState = {
    detail : null,
    view:VIEW_BLOG_DETAIL,
    file_elements:[]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_BLOG:
      console.log('SET_BLOG',action.payload.detail)
      return {
        ...state,
        view: VIEW_BLOG_DETAIL,
        detail: action.payload.detail
      };
    case types.SET_VIEW:
      return {
        ...state,
        view: action.payload.view
      }
    default:
      return state;  
  }
}