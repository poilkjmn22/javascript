import React from "react";
import NavList from "../nav-list/index.jsx";
import { useSelector } from "react-redux";
import { toTree } from "@/utils/array-to-tree";

const selectNavList = (state) => state.navList;
const ConfigNav = () => {
  const navList = useSelector(selectNavList);
  const navListTree = toTree(navList, {
    parentProperty: "parentId",
    customId: "id",
    withLevel: true,
  });
  console.log(navListTree);
  return (
    <div className="config-nav">
      <NavList navList={navListTree} />
    </div>
  );
};
export default ConfigNav;
