import axios from "axios";

import {
  GETIDSUCCESS,
  GETIDFAIL,
  GETREADINGSUCCESS,
  GETREADINGFAIL,
} from "./types";

export const getids = () => (dispatch) => {
  axios
    .get("/tests/allid")
    .then((res) => {
      dispatch({
        type: GETIDSUCCESS,
        payload: res.data.map(({ id }) => id),
      });
    })
    .catch((err) => {
      dispatch({
        type: GETIDFAIL,
      });
    });
};

export const getReading = (id) => (dispatch) => {
  axios
    .get(`/tests/getReading/${id}`)
    .then((res) => {
      dispatch({
        type: GETREADINGSUCCESS,
        payload: res.data.readings,
      });
    })
    .catch((err) => {
      dispatch({
        type: GETREADINGFAIL,
      });
    });
};
