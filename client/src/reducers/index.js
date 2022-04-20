import { combineReducers } from "redux";

import adminReducer from "./adminReducer";
import userReducer from "./userReducer";
import medicReducer from "./medicReducer";
import staffReducer from "./staffReducer";
import errorReducer from "./errorReducer";
import requestReducer from "./requestReducer";
import testReducer from "./testReducer";

export default combineReducers({
  admin: adminReducer,
  user: userReducer,
  medic: medicReducer,
  staff: staffReducer,
  error: errorReducer,
  request: requestReducer,
  test: testReducer,
});
