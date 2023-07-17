import { combineReducers } from "redux";
import allUsers from "./allUsers";
import currentUser from "./currentUser";

export default combineReducers({
  allUsers,
  currentUser,
});
