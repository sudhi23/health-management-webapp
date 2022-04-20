import axios from "axios";

import { returnSuccess } from "./requestActions";
import { returnErrors } from "./errorActions";
import {
  ADD_READINGSUCCESS,
  ADD_READINGFAIL,
  STAFF_LOADED,
  STAFF_LOADING,
  STAFFAUTH_ERROR,
  STAFFLOGIN_SUCCESS,
  STAFFLOGIN_FAIL,
  STAFFLOGOUT_SUCCESS,
  PROCESS_REQUEST,
  REQUEST_DONE,
  STAFFCHANGEPASSWORDSUCCESS,
  STAFFCHANGEPASSWORDFAIL,
} from "./types";

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().staff.stafftoken;

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

// Check token and load staff
export const loadStaff = () => (dispatch, getState) => {
  // Staff loading
  dispatch({ type: STAFF_LOADING });

  axios
    .get("/auth/getStaff", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: STAFF_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data.msg, err.response.status));
      dispatch({
        type: STAFFAUTH_ERROR,
      });
    });
};

// Login Staff
export const staffLogin = ({ id, password }, { history, destination }) => (
  dispatch,
  getState
) => {
  // Processing request
  dispatch({ type: PROCESS_REQUEST });

  // Request body
  const body = JSON.stringify({ id, password });

  axios
    .post("/auth/staff", body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: STAFFLOGIN_SUCCESS,
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
          "STAFFLOGIN_FAIL"
        )
      );
      dispatch({
        type: REQUEST_DONE,
      });
      dispatch({
        type: STAFFLOGIN_FAIL,
      });
    });
};

// Logout staff
export const staffLogout = () => {
  return {
    type: STAFFLOGOUT_SUCCESS,
  };
};

export const addReading = (body) => (dispatch, getState) => {
  if (!body.id) {
    dispatch(returnErrors("Please select user", 400));
    return;
  }

  dispatch({ type: PROCESS_REQUEST });
  const { id, temperature, pulse } = body;

  axios
    .get(`/staff/addReading/${id}`, tokenConfig(getState))
    .then((res) => {
      let { readings } = res.data;
      const date = Date.now();
      readings = [{ date, temperature, pulse }, ...readings];
      axios
        .put("/staff/addReading", { id, readings }, tokenConfig(getState))
        .then((res) => {
          dispatch({ type: REQUEST_DONE });
          dispatch(returnSuccess(res.data.msg));
          dispatch({
            type: ADD_READINGSUCCESS,
          });
        });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_DONE });
      dispatch(returnErrors(err.response.data.msg, err.response.status));
      dispatch({
        type: ADD_READINGFAIL,
      });
    });
};

/* 
This section is about actions limited to the staff's profile.
  Change Password
*/

export const changePassword = ({ oldPassword, newPassword }) => (
  dispatch,
  getState
) => {
  dispatch({ type: PROCESS_REQUEST });
  axios
    .post("/staff/profile", { password: oldPassword }, tokenConfig(getState))
    .then((res) => {
      axios
        .put(
          "/staff/changePassword",
          { password: newPassword },
          tokenConfig(getState)
        )
        .then((res) => {
          dispatch({ type: REQUEST_DONE });
          dispatch(returnSuccess(res.data.msg));
          dispatch({ type: STAFFCHANGEPASSWORDSUCCESS });
        });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_DONE });
      dispatch(returnErrors(err.response.data.msg, err.response.status));
      dispatch({ type: STAFFCHANGEPASSWORDFAIL });
    });
};
