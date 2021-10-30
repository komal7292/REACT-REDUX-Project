import { setBanner } from "./rootReducers";
import { combineReducers } from "redux";

const storedReducers = combineReducers({ setBanner });
export default storedReducers;
