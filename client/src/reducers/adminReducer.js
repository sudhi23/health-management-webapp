import {
  ADMIN_LOADED,
  ADMIN_LOADING,
  ADMINAUTH_ERROR,
  ADMINLOGIN_SUCCESS,
  ADMINLOGIN_FAIL,
  ADMINLOGOUT_SUCCESS,
  ADD_ADMINSUCCESS,
  ADD_ADMINFAIL,
  ADD_USERSUCCESS,
  ADD_USERFAIL,
  ADD_MEDICSUCCESS,
  ADD_MEDICFAIL,
  ADD_STAFFSUCCESS,
  ADD_STAFFFAIL,
  DELETE_STAFFSUCCESS,
  DELETE_STAFFFAIL,
  DELETE_MEDICSUCCESS,
  DELETE_MEDICFAIL,
  DELETE_USERSUCCESS,
  DELETE_USERFAIL,
  DELETE_ADMINSUCCESS,
  DELETE_ADMINFAIL,
  ADMINCHANGEPASSWORDSUCCESS,
  ADMINCHANGEPASSWORDFAIL,
} from "../actions/types";

const initialState = {
  admintoken: localStorage.getItem("admintoken"),
  adminAuthenticated: null,
  adminLoading: null,
  admin: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADMIN_LOADING:
      return {
        ...state,
        adminLoading: true,
      };
    case ADMIN_LOADED:
      return {
        ...state,
        adminLoading: false,
        adminAuthenticated: true,
        admin: action.payload,
      };
    case ADMINLOGIN_SUCCESS:
      localStorage.setItem("admintoken", action.payload.admintoken);
      return {
        ...state,
        ...action.payload,
        adminAuthenticated: true,
        adminLoading: false,
      };

    case ADMINAUTH_ERROR:
    case ADMINLOGIN_FAIL:
    case ADMINLOGOUT_SUCCESS:
      localStorage.removeItem("admintoken");
      return {
        ...state,
        admintoken: null,
        admin: null,
        adminAuthenticated: false,
        adminLoading: false,
      };

    // Add and delete Cases
    case ADD_ADMINSUCCESS:
    case ADD_ADMINFAIL:
    case ADD_USERSUCCESS:
    case ADD_USERFAIL:
    case ADD_MEDICSUCCESS:
    case ADD_MEDICFAIL:
    case ADD_STAFFSUCCESS:
    case ADD_STAFFFAIL:
    case DELETE_STAFFSUCCESS:
    case DELETE_STAFFFAIL:
    case DELETE_MEDICSUCCESS:
    case DELETE_MEDICFAIL:
    case DELETE_USERSUCCESS:
    case DELETE_USERFAIL:
    case DELETE_ADMINSUCCESS:
    case DELETE_ADMINFAIL:
    case ADMINCHANGEPASSWORDSUCCESS:
    case ADMINCHANGEPASSWORDFAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
}
