import {
  GETIDSUCCESS,
  GETIDFAIL,
  GETREADINGSUCCESS,
  GETREADINGFAIL,
} from "../actions/types";

const initialState = {
  ids: [],
  readings: [
    { temperature: 98, pulse: 177, spo2: 90.01 },
    { temperature: 97.3, pulse: 82, spo2: 94.78 },
    { temperature: 97.2, pulse: 137, spo2: 86.12 },
    { temperature: 95.9, pulse: 74, spo2: 84.5 },
    { temperature: 114.1, pulse: 162, spo2: 87.4 },
    { temperature: 115.1, pulse: 84, spo2: 88.67 },
    { temperature: 104.6, pulse: 135, spo2: 96.12 },
    { temperature: 96.9, pulse: 63, spo2: 85.17 },
    { temperature: 101.5, pulse: 138, spo2: 88.16 },
    { temperature: 114.5, pulse: 167, spo2: 93.97 },
    { temperature: 111.2, pulse: 88, spo2: 85.7 },
    { temperature: 108.7, pulse: 113, spo2: 88.17 },
    { temperature: 104.7, pulse: 83, spo2: 87.61 },
    { temperature: 94.3, pulse: 171, spo2: 88.11 },
    { temperature: 115.2, pulse: 117, spo2: 84.76 },
    { temperature: 98.1, pulse: 169, spo2: 87.24 },
    { temperature: 101.5, pulse: 163, spo2: 92.36 },
    { temperature: 95.8, pulse: 93, spo2: 89.98 },
    { temperature: 106.6, pulse: 146, spo2: 93.99 },
    { temperature: 98.5, pulse: 94, spo2: 84.74 },
    { temperature: 102, pulse: 119, spo2: 84.13 },
    { temperature: 110.9, pulse: 122, spo2: 91.16 },
    { temperature: 106.7, pulse: 92, spo2: 91.59 },
    { temperature: 103, pulse: 60, spo2: 93.67 },
    { temperature: 115.7, pulse: 114, spo2: 95.17 },
    { temperature: 111.7, pulse: 147, spo2: 88.39 },
    { temperature: 104.1, pulse: 93, spo2: 93.92 },
    { temperature: 94.1, pulse: 120, spo2: 96.52 },
    { temperature: 108.8, pulse: 170, spo2: 88.04 },
    { temperature: 112.3, pulse: 142, spo2: 92.1 },
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GETIDSUCCESS:
      return {
        ...state,
        ids: action.payload,
      };
    case GETREADINGSUCCESS:
      return {
        ...state,
        readings: action.payload,
      };
    case GETREADINGFAIL:
    case GETIDFAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
