import * as types from './../constants/actionTypes';

// default state
const initialState = {
    list : []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_BLOG_LIST:
      console.log('SET_BLOG_LIST',action.payload.list)
      return {
        ...state,
        list: action.payload.list
      };
    default:
      return state;  
  }
}