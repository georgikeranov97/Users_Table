// import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import UsersReducer from "./UsersReducer";

const rootReducer = combineReducers({
  // router: connectRouter(history),

  usersReducer: UsersReducer,
});

export default rootReducer;
