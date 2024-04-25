import React from "react";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import NavBar from "root/src/components/nav-bar.jsx";
import ConfigNotecate from "./config-notecate.jsx";
import ConfigNav from "./config-nav.jsx";
import RecordDetail from "./record-detail.jsx";
import BugRecord from "../bug-record.jsx";
import Mianshi from "../mianshi.jsx";
import StatisticAnalysis from "./statistic-analysis.jsx";

  function Content() {
    return (
      <div>
        <h1 className="header">JavaScript Palyground.</h1>
        <div className="main-content">
          <NavBar />
        </div>
      </div>
    );
  }
export default Content;
