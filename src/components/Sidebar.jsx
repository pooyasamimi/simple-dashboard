import React, { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import style from './style.module.css'
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { showMenu, setShowMenu } = useContext(MainContext);


  return (
    <div
      className={`${style.sidebar_section} ${
        showMenu ? "end-0" : ""
      } bg-secondary`}
    >
      <ul className={`${style.sidebar_list} m-0 p-0`}>
        <li className={style.sidebar_avatar}>
          <img src="../assets/images/react.png" alt="img"/>
        </li>
        <NavLink
          className={({ isActive }) => (isActive ? "active_nav" : "")}
          to="/user"
        >
          <li>کاربران</li>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active_nav" : "")}
          to="/post"
        >
          <li>پست ها</li>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active_nav" : "")}
          to="/todo"
        >
          <li>کارها</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
