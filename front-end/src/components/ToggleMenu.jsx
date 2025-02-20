import { useEffect, useState } from "react";
import "../styles/toggleMenu.css";

//   토글 메뉴
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

  useEffect(() => {
    // 메뉴 외부 클릭 시 메뉴 닫기
    const handleClickOutside = (event) => {
      if (
        !event.target.classList.contains("toggleMenuBox") &&
        !event.target.classList.contains("toggleMenuItem") &&
        !event.target.classList.contains("toggleElement")
      ) {
        setToggleOn(false);
      }
    };
    if (toggleOn) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleOn]);

  return (
    <div>
      <div
        id="plotCardTitleToggle"
        className="plotCardTitleToggle"
        onClick={() => toggleButtonClick()}
      >
        <img className="toggleElement" src="/burger.png"></img>
      </div>
      <div
        id={id}
        className={`toggleMenuBox shadow_black_10 ${toggleOn ? "" : "d-none"}`}
      >
        <div className="toggleMenuHeader toggleElement heading_1 ft_gray_5">
          {title}
        </div>
        <div className="toggleMenuBody w-100">
          {menuArr.map((d) => (
            <div key={d.id} className="d-flex toggleMenuItem">
              <div className="toggleElement toggleIconBox">
                <img
                  className="toggleElement toggleIcon"
                  src={`${d.icon}.png`}
                ></img>
              </div>
              <span className="toggleElement body_1 ft_gray_5">{d.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
