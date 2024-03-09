import { createStore, applyMiddleware } from "redux";
import { fetchNavList } from "./reducer";
import rootReducer from "./reducer";

const middlewareEnhancer = applyMiddleware(fetchNavList);

// store 现在就可以在 `dispatch` 中接收 thunk 函数了
const store = createStore(rootReducer, middlewareEnhancer);
export default store;
