import { createStore, applyMiddleware } from "redux";
import reqMiddleware from "./reducer/reqMiddleware.js";
import rootReducer from "./reducer/index.js";

const middlewareEnhancer = applyMiddleware(reqMiddleware);

const store = createStore(rootReducer, middlewareEnhancer);
export default store;
