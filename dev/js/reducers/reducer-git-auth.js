import * as types from './../constants/actionTypes';

// default state
const initialState = {
    code: null,
    token:null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_AUTH_CODE:
      return {
        ...state,
        code: action.payload.code
      };
    case types.SET_AUTH_TOKEN:
      return {
        ...state,
        token: action.payload.token
      };  
    default:
      return state;  
  }
}