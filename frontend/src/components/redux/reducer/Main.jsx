import getProductReducers from "./ProductReducers";

import { combineReducers } from "redux";

const rootreducers = combineReducers({
  getproductsdata: getProductReducers,
});

export default rootreducers;
