import * as types from './../constants/actionTypes';

// default state
const initialState = {
    blogs : []
}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;  
  }
}