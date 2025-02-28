import { useEffect, useState } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Profile from "../components/Profile";
import "../styles/sideMenu.css";

function SideMenu({ id, icon, title, onClick }) {
  return (
    <div id={id} className="sideMenu" onClick={onClick}>
      <img src={icon}></img>
      <span className="heading_2">{title}</span>
    </div>
  );
}

function SideMenuList({ nickName = "떠오르는 신예 작가" }) {
  const menuObj = [
    {
      idx: "1",
      path: "/plotList",
      icon: "/menu_1.png",
      title: "나의 작성글",
    },
    {
      idx: "2",
      path: "/prompt",
      icon: "/menu_2.png",
      title: "새로운 글 작성하기",
    },
    {
      idx: "3",
      path: "/board",
      icon: "/menu_3.png",
      title: "게시판",
    },
  ];

  // 메뉴 선택 이벤트
  function activeMenu(idx, path) {
    // 기존 active 해제
    const menuList = document.getElementsByClassName("sideMenu");
    for (let menu of menuList) {
      menu.classList.remove("active");
    }
    // 클릭한 메뉴 active
    const target = document.getElementById(`menu_${idx}`);
    target.classList.add("active");
  }

  // 렌더 시 첫번째 메뉴 선택
  useEffect(() => {
    activeMenu("2");
  }, []);

  return (
    <div id="sideMenuContainer" className="bg_gray_2">
      <div id="sideMenuList">
        {menuObj.map((d) => (
          <NavLink key={d.idx} to={d.path} className="sideMenu">
            <SideMenu
              id={`menu_${d.idx}`}
              icon={d.icon}
              title={d.title}
              onClick={() => {
                activeMenu(d.idx, d.path);
              }}
            ></SideMenu>
          </NavLink>
        ))}
      </div>
      <div className="w-100 d-flex" style={{ justifyContent: "center" }}>
        <Profile name={nickName}></Profile>
      </div>
    </div>
  );
}

export default SideMenuList;
