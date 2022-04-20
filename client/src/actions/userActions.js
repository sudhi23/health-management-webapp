import axios from "axios";

import { returnSuccess } from "./requestActions";
import { returnErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  USERAUTH_ERROR,
  USERLOGIN_SUCCESS,
  USERLOGIN_FAIL,
  USERLOGOUT_SUCCESS,
  PROCESS_REQUEST,
  REQUEST_DONE,
  USERCHANGEPASSWORDSUCCESS,
  USERCHANGEPASSWORDFAIL,
} from "./types";

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().user.usertoken;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/auth/getUser", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data.msg, err.response.status));
      dispatch({
        type: USERAUTH_ERROR,
      });
    });
};

// Login User
export const userLogin = ({ id, password }, { history, destination }) => (
  dispatch,
  getState
) => {
  // Processing request
  dispatch({ type: PROCESS_REQUEST });

  // Request body
  const body = JSON.stringify({ id, password });

  axios
    .post("/auth/user", body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USERLOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: REQUEST_DONE,
      });
      history.push(destination);
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data.msg,
          err.response.status,
          "USERLOGIN_FAIL"
        )
      );
      dispatch({
        type: REQUEST_DONE,
      });
      dispatch({
        type: USERLOGIN_FAIL,
      });
    });
};

// Logout user
export const userLogout = () => {
  return {
    type: USERLOGOUT_SUCCESS,
  };
};

/* 
This section is about actions limited to the user's profile.
  Change Password
*/

export const changePassword = ({ oldPassword, newPassword }) => (
  dispatch,
  getState
) => {
  dispatch({ type: PROCESS_REQUEST });
  axios
    .post("/user/profile", { password: oldPassword }, tokenConfig(getState))
    .then((res) => {
      axios
        .put(
          "/user/changePassword",
          { password: newPassword },
          tokenConfig(getState)
        )
        .then((res) => {
          dispatch({ type: REQUEST_DONE });
          dispatch(returnSuccess(res.data.msg));
          dispatch({ type: USERCHANGEPASSWORDSUCCESS });
        });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_DONE });
      dispatch(returnErrors(err.response.data.msg, err.response.status));
      dispatch({ type: USERCHANGEPASSWORDFAIL });
    });
};
