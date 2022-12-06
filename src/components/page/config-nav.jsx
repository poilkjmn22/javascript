import React from "react";
import NavList from "../nav-list/index.jsx";
import { useSelector } from "react-redux";
const selectNavList = (state) => state.navList;
const ConfigNav = () => {
  const navList = useSelector(selectNavList);
  return (
    <div className="config-nav">
      <NavList navList={navList} />
    </div>
  );
};
export default ConfigNav;
