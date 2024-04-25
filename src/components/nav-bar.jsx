import React from "react";
import { Link } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";

const NavBar = () => {
  const selectNavList = (state) => state.navList;
  const navList = useSelector(selectNavList);

  const dispatch = useDispatch();
  dispatch({
    type: 'navList',
  })

  return (
    <div className="navbar navbar-default">
      <ul className="nav nav-pills navbar-nav ">
        {navList?.map((item, idx) => {
          return (
            <li key={idx} className="">
              <Link className="link-base" to={`/${item.name}`}>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default NavBar;
