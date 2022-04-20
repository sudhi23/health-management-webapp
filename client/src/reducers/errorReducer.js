import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {
  msg: null,
  isError: false,
  status: null,
  id: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
        isError: true,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        msg: {},
        isError: false,
        status: null,
        id: null,
      };
    default:
      return state;
  }
}