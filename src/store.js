import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
// import { composeWithDevTools } from 'redux-devtools-extension'
import appReducer from "./reducer";

// const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const composedEnhancer = applyMiddleware(thunkMiddleware);

// store 现在就可以在 `dispatch` 中接收 thunk 函数了
const store = createStore(appReducer, composedEnhancer);
export default store;
