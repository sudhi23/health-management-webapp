import axios from "axios";

import { returnSuccess } from "./requestActions";
import { returnErrors } from "./errorActions";
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
  DELETE_ADMINSUCCESS,
  DELETE_USERSUCCESS,
  DELETE_MEDICSUCCESS,
  DELETE_STAFFSUCCESS,
  DELETE_ADMINFAIL,
  DELETE_USERFAIL,
  DELETE_MEDICFAIL,
  DELETE_STAFFFAIL,
  PROCESS_REQUEST,
  REQUEST_DONE,
  ADMINCHANGEPASSWORDSUCCESS,
  ADMINCHANGEPASSWORDFAIL,
} from "./types";

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().admin.admintoken;
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

// Check token and load admin
export const loadAdmin = () => (dispatch, getState) => {
  // Admin loading
  dispatch({ type: ADMIN_LOADING });

  axios
    .get("/auth/getAdmin", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADMIN_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data.msg, err.response.status));
      dispatch({
        type: ADMINAUTH_ERROR,
      });
    });
};

// Login Admin
export const adminLogin = ({ id, password }, { history, destination }) => (
  dispatch,
  getState
) => {
  // Processing request
  dispatch({ type: PROCESS_REQUEST });

  // Request body
  const body = JSON.stringify({ id, password });

  axios
    .post("/auth/admin", body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADMINLOGIN_SUCCESS,
        payload: res.data,
      });
      // Done processing request
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
          "ADMINLOGIN_FAIL"
        )
      );
      dispatch({
        type: REQUEST_DONE,
      });
      dispatch({
        type: ADMINLOGIN_FAIL,
      });
    });
};

// Logout admin
export const adminLogout = () => {
  return {
    type: ADMINLOGOUT_SUCCESS,
  };
};

/* 
This section is about actions limited to the admin's functionalities.
  Add members
  Delete members
*/

// Add admin
export const addAdmin = ({ name, id, password }) => (dispatch, getState) => {
  dispatch({ type: PROCESS_REQUEST });

  // Request body
  const body = JSON.stringify({ name, id, password });

  axios
    .post("/admin/add/admin", body, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: REQUEST_DONE });
      dispatch(returnSuccess(res.data.msg));
      dispatch({
        type: ADD_ADMINSUCCESS,
      });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_DONE });
      dispatch(
        returnErrors(
          err.response.data.msg,
          err.response.status,
          "ADD_ADMINFAIL"
        )
      );
      dispatch({
        type: ADD_ADMINFAIL,
      });
    });
};

// Add user
export const addUser = ({ name, id, password, medicid, staffid }) => (
  dispatch,
  getState
) => {
  dispatch({ type: PROCESS_REQUEST });
  axios
    .get(`/admin/getAssignedUsers/${medicid}&${staffid}`, tokenConfig(getState))
    .then((res) => {
      let { stafflist, mediclist } = res.data;
      stafflist = [id, ...stafflist];
      mediclist = [id, ...mediclist];
      // Request body
      const body = JSON.stringify({ name, id, password, medicid, staffid });
      axios.post("/admin/add/user", body, tokenConfig(getState)).then((res) => {
        axios
          .put(
            "/admin/assignUser",
            { medicid, staffid, mediclist, stafflist },
            tokenConfig(getState)
          )
          .then((res) => {
            dispatch({ type: REQUEST_DONE });
            dispatch(returnSuccess(res.data.msg));
            dispatch({
              type: ADD_USERSUCCESS,
            });
          });
      });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_DONE });
      dispatch(
        returnErrors(err.response.data.msg, err.response.status, "ADD_USERFAIL")
      );
      dispatch({
        type: ADD_USERFAIL,
      });
    });
};

// Add medical staff
export const addMedic = ({ name, id, password }) => (dispatch, getState) => {
  dispatch({ type: PROCESS_REQUEST });
  // Request body
  const body = JSON.stringify({ name, id, password });

  axios
    .post("/admin/add/medic", body, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: REQUEST_DONE });
      dispatch(returnSuccess(res.data.msg));
      dispatch({
        type: ADD_MEDICSUCCESS,
      });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_DONE });
      dispatch(
        returnErrors(
          err.response.data.msg,
          err.response.status,
          "ADD_MEDICFAIL"
        )
      );
      dispatch({
        type: ADD_MEDICFAIL,
      });
    });
};

// Add staff
export const addStaff = ({ name, id, password }) => (dispatch, getState) => {
  dispatch({ type: PROCESS_REQUEST });
  // Request body
  const body = JSON.stringify({ name, id, password });

  axios
    .post("/admin/add/staff", body, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: REQUEST_DONE });
      dispatch(returnSuccess(res.data.msg));
      dispatch({
        type: ADD_STAFFSUCCESS,
      });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_DONE });
      dispatch(
        returnErrors(
          err.response.data.msg,
          err.response.status,
          "ADD_STAFFFAIL"
        )
      );
      dispatch({
        type: ADD_STAFFFAIL,
      });
    });
};

// Remove members
export const deleteAdmin = (id) => (dispatch, getState) => {
  dispatch({
    type: PROCESS_REQUEST,
  });
  axios
    .delete(`/admin/delete/admin/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: REQUEST_DONE });
      dispatch(returnSuccess(res.data.msg));
      dispatch({
        type: DELETE_ADMINSUCCESS,
      });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_DONE });
      dispatch(returnErrors(err.response.data.msg, err.response.status));
      dispatch({
        type: DELETE_ADMINFAIL,
      });
    });
};

export const deleteUser = (id) => (dispatch, getState) => {
  dispatch({ type: PROCESS_REQUEST });

  axios
    .get(`/admin/getAssignedStaffs/${id}`, tokenConfig(getState))
    .then((res) => {
      const { medicid, staffid } = res.data;
      axios
        .get(
          `/admin/getAssignedUsers/${medicid}&${staffid}`,
          tokenConfig(getState)
        )
        .then((res) => {
          let { mediclist, stafflist } = res.data;
          mediclist.splice(mediclist.indexOf(id), 1);
          stafflist.splice(stafflist.indexOf(id), 1);
          axios
            .put(
              "/admin/assignUser",
              { medicid, staffid, mediclist, stafflist },
              tokenConfig(getState)
            )
            .then((res) => {
              axios
                .delete(`/admin/delete/user/${id}`, tokenConfig(getState))
                .then((res) => {
                  dispatch({ type: REQUEST_DONE });
                  dispatch(returnSuccess(res.data.msg));
                  dispatch({
                    type: DELETE_USERSUCCESS,
                  });
                });
            });
        });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_DONE });
      dispatch(returnErrors(err.response.data.msg, err.response.status));
      dispatch({
        type: DELETE_USERFAIL,
      });
    });
};

export const deleteMedic = (id) => (dispatch, getState) => {
  dispatch({ type: PROCESS_REQUEST });
  axios
    .delete(`/admin/delete/medic/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: REQUEST_DONE });
      dispatch(returnSuccess(res.data.msg));
      dispatch({
        type: DELETE_MEDICSUCCESS,
      });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_DONE });
      dispatch(returnErrors(err.response.data.msg, err.response.status));
      dispatch({
        type: DELETE_MEDICFAIL,
      });
    });
};

export const deleteStaff = (id) => (dispatch, getState) => {
  dispatch({ type: PROCESS_REQUEST });
  axios
    .delete(`/admin/delete/staff/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: REQUEST_DONE });
      dispatch(returnSuccess(res.data.msg));
      dispatch({
        type: DELETE_STAFFSUCCESS,
      });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_DONE });
      dispatch(returnErrors(err.response.data.msg, err.response.status));
      dispatch({
        type: DELETE_STAFFFAIL,
      });
    });
};

/* 
This section is about actions limited to the admin's profile.
  Change Password
*/

export const changePassword = ({ oldPassword, newPassword }) => (
  dispatch,
  getState
) => {
  dispatch({ type: PROCESS_REQUEST });
  axios
    .post("/admin/profile", { password: oldPassword }, tokenConfig(getState))
    .then((res) => {
      axios
        .put(
          "/admin/changePassword",
          { password: newPassword },
          tokenConfig(getState)
        )
        .then((res) => {
          dispatch({ type: REQUEST_DONE });
          dispatch(returnSuccess(res.data.msg));
          dispatch({ type: ADMINCHANGEPASSWORDSUCCESS });
        });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_DONE });
      dispatch(returnErrors(err.response.data.msg, err.response.status));
      dispatch({ type: ADMINCHANGEPASSWORDFAIL });
    });
};
