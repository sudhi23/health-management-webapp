import {
  STAFF_LOADED,
  STAFF_LOADING,
  STAFFAUTH_ERROR,
  STAFFLOGIN_SUCCESS,
  STAFFLOGIN_FAIL,
  STAFFLOGOUT_SUCCESS,
  ADD_READINGSUCCESS,
  ADD_READINGFAIL,
  STAFFCHANGEPASSWORDSUCCESS,
  STAFFCHANGEPASSWORDFAIL,
} from "../actions/types";

const initialState = {
  stafftoken: localStorage.getItem("stafftoken"),
  staffAuthenticated: null,
  staffLoading: null,
  staff: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STAFF_LOADING:
      return {
        ...state,
        staffLoading: true,
      };
    case STAFF_LOADED:
      return {
        ...state,
        staffLoading: false,
        staffAuthenticated: true,
        staff: action.payload,
      };
    case STAFFLOGIN_SUCCESS:
      localStorage.setItem("stafftoken", action.payload.stafftoken);
      return {
        ...state,
        ...action.payload,
        staffAuthenticated: true,
        staffLoading: false,
      };
    case STAFFAUTH_ERROR:
    case STAFFLOGIN_FAIL:
    case STAFFLOGOUT_SUCCESS:
      localStorage.removeItem("stafftoken");
      return {
        ...state,
        stafftoken: null,
        staff: null,
        staffAuthenticated: false,
        staffLoading: false,
      };

    case ADD_READINGSUCCESS:
    case ADD_READINGFAIL:
    case STAFFCHANGEPASSWORDSUCCESS:
    case STAFFCHANGEPASSWORDFAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
