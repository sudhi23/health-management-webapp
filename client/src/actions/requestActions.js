import { GET_SUCCESS, CLEAR_SUCCESS } from "./types";

// Return success message
export const returnSuccess = (msg) => {
  return {
    type: GET_SUCCESS,
    payload: msg,
  };
};

// Clear success message
export const clearSuccess = () => {
  return {
    type: CLEAR_SUCCESS,
  };
};
