import {
  PROCESS_REQUEST,
  REQUEST_DONE,
  CLEAR_SUCCESS,
  GET_SUCCESS,
} from "../actions/types";

const initialState = {
  msg: null,
  processing: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PROCESS_REQUEST:
      return {
        ...state,
        processing: true,
      };
    case REQUEST_DONE:
      return {
        ...state,
        processing: false,
      };
    case GET_SUCCESS:
      return {
        ...state,
        msg: action.payload,
      };
    case CLEAR_SUCCESS:
      return {
        ...state,
        msg: null,
      };
    default:
      return state;
  }
}
