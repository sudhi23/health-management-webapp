import axios from "axios";

import { returnSuccess } from "./requestActions";
import { returnErrors } from "./errorActions";
import {
  PRESCRIPT_SUCCESS,
  PRESCRIPT_FAIL,
  MEDIC_LOADED,
  MEDIC_LOADING,
  MEDICAUTH_ERROR,
  MEDICLOGIN_SUCCESS,
  MEDICLOGIN_FAIL,
  MEDICLOGOUT_SUCCESS,
  PROCESS_REQUEST,
  REQUEST_DONE,
  MEDICCHANGEPASSWORDSUCCESS,
  MEDICCHANGEPASSWORDFAIL,
  SUCCESSGET_USER,
  FAILGET_USER,
} from "./types";

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().medic.medictoken;

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

// Check token and load medical staff
export const loadMedic = () => (dispatch, getState) => {
  // Medical staff loading
  dispatch({ type: MEDIC_LOADING });

  axios
    .get("/auth/getMedic", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: MEDIC_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data.msg, err.response.status));
      dispatch({
        type: MEDICAUTH_ERROR,
      });
    });
};

// Login Medical staff
export const medicLogin = ({ id, password }, { history, destination }) => (
  dispatch,
  getState
) => {
  // Processing request
  dispatch({ type: PROCESS_REQUEST });

  // Request body
  const body = JSON.stringify({ id, password });

  axios
    .post("/auth/medic", body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: MEDICLOGIN_SUCCESS,
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
          "MEDICLOGIN_FAIL"
        )
      );
      dispatch({
        type: REQUEST_DONE,
      });
      dispatch({
        type: MEDICLOGIN_FAIL,
      });
    });
};

// Logout medical staff
export const medicLogout = () => {
  return {
    type: MEDICLOGOUT_SUCCESS,
  };
};

export const getUser = (id) => (dispatch, getState) => {
  axios
    .get(`/medic/getUser/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: REQUEST_DONE });
      dispatch(returnSuccess(res.data.msg));
      dispatch({
        type: SUCCESSGET_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_DONE });
      dispatch(returnErrors(err.response.data.msg, err.response.status));
      dispatch({ type: FAILGET_USER });
    });
};

export const prescript = (body) => (dispatch, getState) => {
  dispatch({ type: PROCESS_REQUEST });
  const { id, readings } = body;
  axios
    .put("/medic/prescript", { id, readings }, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: REQUEST_DONE });
      dispatch(returnSuccess(res.data.msg));
      dispatch({
        type: PRESCRIPT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_DONE });
      dispatch(returnErrors(err.response.data.msg, err.response.status));
      dispatch({ type: PRESCRIPT_FAIL });
    });
};

/* 
This section is about actions limited to the medic's profile.
  Change Password
*/

export const changePassword = ({ oldPassword, newPassword }) => (
  dispatch,
  getState
) => {
  dispatch({ type: PROCESS_REQUEST });
  axios
    .post("/medic/profile", { password: oldPassword }, tokenConfig(getState))
    .then((res) => {
      axios
        .put(
          "/medic/changePassword",
          { password: newPassword },
          tokenConfig(getState)
        )
        .then((res) => {
          dispatch({ type: REQUEST_DONE });
          dispatch(returnSuccess(res.data.msg));
          dispatch({ type: MEDICCHANGEPASSWORDSUCCESS });
        });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_DONE });
      dispatch(returnErrors(err.response.data.msg, err.response.status));
      dispatch({ type: MEDICCHANGEPASSWORDFAIL });
    });
};
