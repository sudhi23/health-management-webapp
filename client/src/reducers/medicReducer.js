import {
  MEDIC_LOADED,
  MEDIC_LOADING,
  MEDICAUTH_ERROR,
  MEDICLOGIN_SUCCESS,
  MEDICLOGIN_FAIL,
  MEDICLOGOUT_SUCCESS,
  PRESCRIPT_SUCCESS,
  PRESCRIPT_FAIL,
  MEDICCHANGEPASSWORDSUCCESS,
  MEDICCHANGEPASSWORDFAIL,
  SUCCESSGET_USER,
  FAILGET_USER,
} from "../actions/types";

const initialState = {
  user: {
    readings: [
      {
        date: null,
        temperature: null,
        pulse: null,
        prescription: null,
      },
    ],
  },
  medictoken: localStorage.getItem("medictoken"),
  medicAuthenticated: null,
  medicLoading: null,
  medic: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MEDIC_LOADING:
      return {
        ...state,
        medicLoading: true,
      };
    case MEDIC_LOADED:
      return {
        ...state,
        medicLoading: false,
        medicAuthenticated: true,
        medic: action.payload,
      };
    case MEDICLOGIN_SUCCESS:
      localStorage.setItem("medictoken", action.payload.medictoken);
      return {
        ...state,
        ...action.payload,
        medicAuthenticated: true,
        medicLoading: false,
      };
    case MEDICAUTH_ERROR:
    case MEDICLOGIN_FAIL:
    case MEDICLOGOUT_SUCCESS:
      localStorage.removeItem("medictoken");
      return {
        ...state,
        medictoken: null,
        medic: null,
        medicAuthenticated: false,
        medicLoading: false,
      };
    case SUCCESSGET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case PRESCRIPT_SUCCESS:
    case PRESCRIPT_FAIL:
    case MEDICCHANGEPASSWORDSUCCESS:
    case MEDICCHANGEPASSWORDFAIL:
    case FAILGET_USER:
      return {
        ...state,
      };
    default:
      return state;
  }
}
