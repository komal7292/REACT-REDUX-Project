import storedReducers from "../reducer/connectReducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const { createStore, applyMiddleware } = require("redux");

const store = createStore(
  storedReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
