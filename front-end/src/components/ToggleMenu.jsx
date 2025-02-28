import { useEffect, useState } from "react";
import "../styles/toggleMenu.css";

// 플롯 카드 리스트 햄버거
export function PlotCardTitleToggle({ id, title }) {
  const [toggleOn, setToggleOn] = useState(false);

  const menuArr = [
    {
      id: "share",
      icon: "view",
      text: "공개 설정",
    },
    // {
    //   id: "folder",
    //   icon: "folder",
    //   text: "폴더에 저장",
    // },
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
        <div className="toggleMenuHeader d-flex ft_gray_5">
          <div className="toggleElement headline_1">{title}</div>
          <div className="toggleElement body_1">선택</div>
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
          {/* <PlotCardShareToggle></PlotCardShareToggle> */}
        </div>
      </div>
    </div>
  );
}

// 플롯 카드 공개 비공개
export function PlotCardNameToggle({ id }) {
  const [toggleOn, setToggleOn] = useState(false);

  const menuArr = [
    {
      id: "share",
      icon: "",
      text: "공개",
    },
    {
      id: "unShare",
      icon: "",
      text: "비공개",
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
        id={id}
        className={`toggleMenuBox shadow_black_10 ${toggleOn ? "" : "d-none"}`}
      >
        <div className="toggleMenuHeader d-flex ft_gray_5">
          <div className="toggleElement heading_1">공개 설정</div>
        </div>
        <div className="toggleMenuBody w-100">
          {menuArr.map((d) => (
            <div key={d.id} className="d-flex toggleMenuItem">
              <span className="toggleElement body_1 ft_gray_5">{d.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// 플롯 카드 이름 바꾸기
export function PlotCardShareToggle({ id }) {
  const [toggleOn, setToggleOn] = useState(false);

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
        id={id}
        className={`toggleMenuBox shadow_black_10 ${toggleOn ? "" : "d-none"}`}
      >
        <div className="toggleMenuHeader d-flex ft_gray_5">
          <div className="toggleElement heading_1">공개 설정</div>
        </div>
        <div className="toggleMenuBody w-100">
          {menuArr.map((d) => (
            <div key={d.id} className="d-flex toggleMenuItem">
              <span className="toggleElement body_1 ft_gray_5">{d.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
