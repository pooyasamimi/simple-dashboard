import React, { useContext, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import Posts from "./posts/Posts";
import style from "./style.module.css";
import Users from "./users/Users";
import { Navigate, Route, Routes } from "react-router-dom";
import AddUser from "./users/AddUser";
// import AddPost from "./posts/AddPost";
import AddPost2 from "./posts/AddPost2";
import Page404 from "./404/Page404";

const Content = () => {
  const { showMenu, setShowMenu } = useContext(MainContext);
  const [isUser, setIsUser] = useState(true);

  const handleShowMenu = (event) => {
    event.stopPropagation();
    setShowMenu(!showMenu);
  };

  return (
    <div
      className={`${style.content_section} ${!showMenu ? "w-100" : ""}`}
      onClick={() => {
        setShowMenu(false);
      }}
    >
      <i
        className={`${style.menu_button} fas fa-bars text-dark m-2 pointer  `}
        onClick={handleShowMenu}
      ></i>
      <Routes>
        <Route path="/" element={<Navigate to="/user" />} />
        <Route
          path="/user"
          element={isUser ? <Users /> : <div>please login</div>}
        />
        <Route path="user/add" element={<AddUser />}>
          <Route path=":id" />
        </Route>
        <Route path="/post" element={<Posts />} />
        <Route path="post/add" element={<AddPost2 />}>
          <Route path=":id" />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
};

export default Content;
