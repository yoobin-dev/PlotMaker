import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  NavLink,
  useNavigate,
  Navigate,
} from "react-router-dom";
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
  const [menuIdx, setMenuIdx] = useState("1");
  const navigate = useNavigate();

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
  function activeMenu(idx, path) {
    setMenuIdx(idx);
    localStorage.setItem("menuIdx", idx);
    navigate(path);
  }

  // 메뉴 선택
  useEffect(() => {
    const rememberMenu = localStorage.getItem(`menuIdx`);
    setMenuIdx(rememberMenu);

    // 기존 active 해제
    const menuList = document.getElementsByClassName("sideMenu");
    for (let menu of menuList) {
      menu.classList.remove("active");
    }

    const target = document.getElementById(`menu_${menuIdx}`);
    target.classList.add("active");

    handleClick();
  }, [menuIdx]);

  return (
    <div id="sideMenuContainer" className="bg_gray_2">
      <div id="sideMenuList">
        {menuObj.map((d, i) => (
          <SideMenu
            key={i}
            id={`menu_${d.idx}`}
            icon={d.icon}
            title={d.title}
            onClick={() => {
              if (d.path === "/board") {
                alert("서비스 준비중입니다.");
              } else {
                activeMenu(d.idx, d.path);
              }
            }}
          ></SideMenu>
        ))}
      </div>
      <div className="w-100 d-flex" style={{ justifyContent: "center" }}>
        <Profile name={nickName}></Profile>
      </div>
    </div>
  );
}

export default SideMenuList;
