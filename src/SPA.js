import "style/index.css";
const React = require("react");
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { fetchNavList } from "./reducer";
import Content from "./components/page/content.jsx";
import store from "./store.js";

const Router = process.env.NODE_ENV !== "dev" ? BrowserRouter : HashRouter;
ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Content />
    </Provider>
  </Router>,
  document.getElementById("app")
);

store.dispatch(fetchNavList);
