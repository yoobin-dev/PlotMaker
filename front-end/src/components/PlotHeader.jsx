import { useEffect, useState } from "react";
import "../styles/common.css";
import "../styles/plotHeader.css";

// 플롯 헤더
function PlotHeader({ plotCount = 0 }) {
  const [count, setCount] = useState(0);
  const [searchingOn, setSearchingOn] = useState(false);
  const [sortingOn, setSortingOn] = useState(false);

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

  // 검색 및 정렬 버튼 선택
  const clickCircleFilterButton = (id) => {
    const target = document.getElementById(id);
    const circles = document.getElementsByClassName("circle_filter");
    const className = target.className;

    // clicked 초기화
    setSortingOn(false);
    for (let t of circles) {
      t.classList.remove("clicked");
    }

    if (className.includes("clicked")) {
      // 이미 클릭되어 있는 경우 취소
      target.classList.remove("clicked");
    } else {
      // 클릭되지 않은 경우 clicked 적용
      target.classList.add("clicked");
      setSortingOn(true);
    }
  };

  // 렌더시 전체 필터 선택
  useEffect(() => {
    activeFilterButton("filterAll");
  }, [sortingOn]);

  return (
    <div>
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
        {CircleFilterButtonArr.map((d) => (
          <CircleFilterButton
            key={d}
            id={d}
            onClick={clickCircleFilterButton}
          ></CircleFilterButton>
        ))}
      </div>
      <SortingMenu sortingOn={sortingOn}></SortingMenu>
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

// 검색 및 정렬 버튼
function CircleFilterButton({ id, onClick }) {
  return (
    <div
      id={id}
      className="circle_filter bg_gray_e"
      onClick={() => onClick(id)}
    >
      <img src={`/${id}.png`}></img>
    </div>
  );
}

// 정렬 토글 메뉴
function SortingMenu({ sortingOn }) {
  const sortingArr = [
    {
      sort: "created",
      order: "asc",
      text: "작성일 최신 순 정렬",
    },
    {
      sort: "created",
      order: "desc",
      text: "작성일 오래된 순 정렬",
    },
    {
      sort: "view",
      order: "asc",
      text: "조회수 높은 순 정렬",
    },
    {
      sort: "view",
      order: "desc",
      text: "조회수 낮은 순 정렬",
    },
    {
      sort: "like",
      order: "asc",
      text: "좋아요 많은 순 정렬",
    },
    {
      sort: "like",
      order: "desc",
      text: "좋아요 낮은 순 정렬",
    },
  ];

  return (
    <div
      id="sortMenuBox"
      className={`shadow_black_10 ${sortingOn ? "" : "d-none"}`}
    >
      <div id="sortMenuHeader" className="heading_1 ft_gray_5">
        작품 정렬
      </div>
      <div id="sortMenuBody" className="w-100">
        {sortingArr.map((d) => (
          <div key={`${d.sort}_${d.order}`} className="d-flex sortMenuItem">
            <div className="sortIconBox">
              <img className="sortIcon" src={`sort_${d.sort}.png`}></img>
              <img className="orderIcon" src={`sort_${d.order}.png`}></img>
            </div>
            <span className="body_1 ft_gray_5">{d.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
