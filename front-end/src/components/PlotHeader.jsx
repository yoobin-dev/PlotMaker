import { useEffect, useState, useRef } from "react";
import "../styles/common.css";
import "../styles/plotHeader.css";
import { SortingMenu } from "./ToggleMenu";

// 플롯 헤더
function PlotHeader({ plotCount = 0 }) {
  const [count, setCount] = useState(0);
  const [toggleOn, setToggleOn] = useState(false);
  const buttonRef = useRef(null);

  // 필터 버튼 배열
  const filterButtonArr = [
    {
      id: "filterAll",
      text: "전체",
    },
    {
      id: "filterPublic",
      text: "공개",
    },
    {
      id: "filterPrivate",
      text: "비공개",
    },
    {
      id: "filterFolder",
      text: "폴더",
    },
  ];

  // 검색 및 정렬 버튼 배열
  const CircleFilterButtonArr = ["searching", "sorting"];

  // 필터 버튼 선택
  const activeFilterButton = (id) => {
    // active 초기화
    const buttons = document.getElementById("filterButton");
    for (let t of buttons.children) {
      t.classList.remove("active");
    }

    // 선택한 버튼 active 적용
    const target = document.getElementById(id);
    target.classList.add("active");
  };

  // 검색 및 정렬 버튼 클릭
  const clickCircleFilterButton = (id) => {
    const target = document.getElementById(id);
    const circles = document.getElementsByClassName("circle_filter");

    // clicked 초기화
    for (let t of circles) {
      t.classList.remove("clicked");
    }

    if (!toggleOn) {
      // 이미 클릭되어 있는 경우 취소
      target.classList.remove("clicked");
      if (buttonRef.current.id === id) setToggleOn(true);
    } else {
      // 클릭되지 않은 경우 clicked 적용
      target.classList.add("clicked");
      if (buttonRef.current.id === id) setToggleOn(false);
    }
  };

  // 렌더시 전체 필터 선택
  useEffect(() => {
    // 전체 필터 선택
    activeFilterButton("filterAll");

    // 토글(정렬) 메뉴 외부 클릭 시 메뉴 닫기
    const handleClickOutside = (event) => {
      const toggleMenu = document.querySelector(".toggleMenuBox");
      const isClickInside = Array.from(toggleMenu).some(
        (menu) =>
          menu.contains(event.target) &&
          buttonRef.current.contains(event.target)
      );

      if (!isClickInside) {
        setToggleOn(false);
        buttonRef.current.classList.remove("clicked");
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
    <div id="plotHeader">
      <div className="d-flex">
        <div className="display_2">내가 작성한 플롯</div>
        <div id="plotCount" className="display_2 ft_white bg_gray_2">
          {count}
        </div>
      </div>
      <div id="plotFilter">
        <div id="filterButton" className="d-flex bg_gray_e">
          {filterButtonArr.map((d) => (
            <FilterButton
              key={d.id}
              id={d.id}
              text={d.text}
              onClick={(e) => activeFilterButton(e.currentTarget.id)}
            ></FilterButton>
          ))}
        </div>
        <SearchFilterButton
          id="searching"
          onClick={clickCircleFilterButton}
        ></SearchFilterButton>
        <SortingFilterButton
          id="sorting"
          toggleOn={toggleOn}
          onClick={clickCircleFilterButton}
          buttonRef={buttonRef}
        ></SortingFilterButton>
      </div>
    </div>
  );
}

export default PlotHeader;

// 전체, 공개, 비공개, 폴더 버튼
function FilterButton({ id, text, onClick }) {
  return (
    <div id={id} className="headline_1 ft_gray_6" onClick={onClick}>
      {text}
    </div>
  );
}

// 검색 버튼
function SearchFilterButton({ id, onClick }) {
  return (
    <>
      <div
        id={id}
        className="circle_filter bg_gray_e"
        onClick={() => onClick(id)}
      >
        <img src={`/${id}.png`}></img>
      </div>
    </>
  );
}
// 정렬 버튼
function SortingFilterButton({ id, toggleOn, buttonRef, menuRef, onClick }) {
  return (
    <>
      <div
        id={id}
        className="circle_filter bg_gray_e"
        ref={buttonRef}
        onClick={() => onClick(id)}
      >
        <img src={`/${id}.png`}></img>
      </div>
      <SortingMenu toggleOn={toggleOn}></SortingMenu>
    </>
  );
}
