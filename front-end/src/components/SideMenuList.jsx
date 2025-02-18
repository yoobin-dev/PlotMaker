import { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Profile from "../components/Profile";
import "../styles/sideMenu.css";

function SideMenu({ icon, title }) {
  return (
    <div className="sideMenu fw-600">
      <span>{title}</span>
    </div>
  );
}

function SideMenuList() {
  const menuObj = [
    {
      idx: "1",
      path: "/myStorage",
      icon: "fa-regular fa-file-lines",
      title: "나의 작성글",
    },
    {
      idx: "2",
      path: "/newPlot",
      icon: "fa-regular fa-square-plus",
      title: "새로운 글 작성하기",
    },
    {
      idx: "3",
      path: "/board",
      icon: "fa-solid fa-boxes-stacked",
      title: "게시판",
    },
  ];

  return (
    <div id="sideMenuList">
      {/* 우측 메뉴 구현 시 사용
       <Routes>
       {menuObj.map((d) => (
        <Route
        key={d.idx}  
        path={d.path}
        element={<SideMenu icon={d.icon} title={d.title}></SideMenu>}
        ></Route>
        ))}
        </Routes> */}
      <div>
        {
          /* 우측 구현 전까지 사용 */
          menuObj.map((d) => (
            <SideMenu key={d.idx} icon={d.icon} title={d.title}></SideMenu>
          ))
        }
      </div>
      <div
        className="w-100"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Profile name="CSS가 어려운 사람"></Profile>
      </div>
    </div>
  );
}

export default SideMenuList;
