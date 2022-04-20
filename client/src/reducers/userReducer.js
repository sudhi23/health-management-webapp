import {
  USER_LOADED,
  USER_LOADING,
  USERAUTH_ERROR,
  USERLOGIN_SUCCESS,
  USERLOGIN_FAIL,
  USERLOGOUT_SUCCESS,
  USERCHANGEPASSWORDSUCCESS,
  USERCHANGEPASSWORDFAIL,
} from "../actions/types";

const initialState = {
  usertoken: localStorage.getItem("usertoken"),
  userAuthenticated: null,
  userLoading: null,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        userLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        userLoading: false,
        userAuthenticated: true,
        user: action.payload,
      };
    case USERLOGIN_SUCCESS:
      localStorage.setItem("usertoken", action.payload.usertoken);
      return {
        ...state,
        ...action.payload,
        userAuthenticated: true,
        userLoading: false,
      };
    case USERAUTH_ERROR:
    case USERLOGIN_FAIL:
    case USERLOGOUT_SUCCESS:
      localStorage.removeItem("usertoken");
      return {
        ...state,
        usertoken: null,
        user: null,
        userAuthenticated: false,
        userLoading: false,
      };
    case USERCHANGEPASSWORDSUCCESS:
    case USERCHANGEPASSWORDFAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
