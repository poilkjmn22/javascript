import "style/index.css";
const React = require("react");
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Content from "./components/page/content.jsx";
import store from "./store.js";

const Router = process.env.NODE_ENV !== "dev" ? BrowserRouter : HashRouter;
const elApp = document.getElementById("app");
const root = createRoot(elApp);
root.render(
  <Router>
    <Provider store={store}>
      <Content />
    </Provider>
  </Router>
);
