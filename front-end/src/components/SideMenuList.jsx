import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

function SideMenuList({ nickName, handleClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  const menuObj = [
    {
      idx: "1",
      path: "/prompt",
      icon: "/menu_2.png",
      title: "새로운 글 작성하기",
    },
    {
      idx: "2",
      path: "/plotList",
      icon: "/menu_1.png",
      title: "나의 작성글",
    },
    {
      idx: "3",
      path: "/board",
      icon: "/menu_3.png",
      title: "게시판",
    },
  ];

  // 메뉴 선택 이벤트
  function activeMenu(path) {
    if (!userInfo && path === "/plotList") {
      alert("로그인 후 이용 가능한 메뉴입니다.");
      return;
    }
    navigate(path);
  }

  // 메뉴 선택
  useEffect(() => {
    let pathname = location.pathname;
    if (location.pathname === "/plotDetail") {
      pathname = "/plotList";
    }
    const path = document.getElementById(pathname);
    const activeMenu = document.getElementsByClassName("active");

    for (let a of activeMenu) {
      a.classList.remove("active");
    }

    path.classList.add("active");
    handleClick();
  }, [location]);

  return (
    <>
      <div id="sideMenuContainer" className="bg_gray_2">
        <div id="sideMenuList">
          {menuObj.map((d, i) => (
            <SideMenu
              key={i}
              id={d.path}
              icon={d.icon}
              title={d.title}
              onClick={() => {
                if (d.path === "/board") {
                  alert("서비스 준비중입니다.");
                } else {
                  activeMenu(d.path);
                }
              }}
            ></SideMenu>
          ))}
        </div>
        <div className="w-100 d-flex" style={{ justifyContent: "center" }}>
          <Profile name={nickName}></Profile>
        </div>
      </div>
    </>
  );
}

export default SideMenuList;
