import { useEffect, useState } from "react";
import "../styles/toggleMenu.css";

// 정렬 토글 메뉴
export function PlotCardTitleToggle({ id, title }) {
  const [toggleOn, setToggleOn] = useState(false);

  const menuArr = [
    {
      id: "share",
      icon: "view",
      text: "공개 설정",
    },
    {
      id: "folder",
      icon: "folder",
      text: "폴더에 저장",
    },
    {
      id: "edit_name",
      icon: "edit_name",
      text: "이름 바꾸기",
    },
    {
      id: "delete",
      icon: "delete",
      text: "삭제",
    },
  ];

  // 토글 이벤트
  const toggleButtonClick = () => {
    const toggles = document.getElementsByClassName("toggleMenuBox");
    for (let t of toggles) {
      t.classList.add("d-none");
    }
    setToggleOn((prev) => !prev);
  };

  return (
    <div>
      <div
        id="plotCardTitleToggle"
        className="plotCardTitleToggle"
        onClick={() => toggleButtonClick()}
      >
        <img src="/burger.png"></img>
      </div>
      <div
        id={id}
        className={`toggleMenuBox shadow_black_10 ${toggleOn ? "" : "d-none"}`}
      >
        <div className="toggleMenuHeader heading_1 ft_gray_5">{title}</div>
        <div className="toggleMenuBody w-100">
          {menuArr.map((d) => (
            <div key={d.id} className="d-flex toggleMenuItem">
              <div className="toggleIconBox">
                <img className="toggleIcon" src={`${d.icon}.png`}></img>
              </div>
              <span className="body_1 ft_gray_5">{d.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
