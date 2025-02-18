import { useEffect, useState } from "react";
import "../styles/common.css";
import "../styles/plotHeader.css";

function FilterButton({ id, text, onClick }) {
  return (
    <div id={id} className="headline_1 ft_gray_6" onClick={onClick}>
      {text}
    </div>
  );
}

function PlotHeader({ plotCount = 0 }) {
  const [count, setCount] = useState(0);
  const [searchingOn, setSearchingOn] = useState(false);
  const [sortingOn, setSortingOn] = useState(false);

  const buttonArr = [
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

  // 필터 버튼 선택
  function activeFilterButton(id) {
    // active 초기화
    const buttons = document.getElementById("filterButton");
    for (let t of buttons.children) {
      t.classList.remove("active");
    }

    // 선택한 버튼 active 적용
    const target = document.getElementById(id);
    target.classList.add("active");
  }

  // 검색 및 정렬 버튼 선택
  function clickCircleFilter(id) {
    const target = document.getElementById(id);
    const circles = document.getElementsByClassName("circle_filter");
    const className = target.className;

    // clicked 초기화
    for (let t of circles) {
      t.classList.remove("clicked");
    }

    if (className.includes("clicked")) {
      // 이미 클릭되어 있는 경우 취소
      target.classList.remove("clicked");
    } else {
      // 클릭되지 않은 경우 clicked 적용
      target.classList.add("clicked");
    }
  }

  // 렌더시 전체 필터 선택
  useEffect(() => {
    activeFilterButton("filterAll");
  }, []);
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
          {buttonArr.map((d) => (
            <FilterButton
              key={d.id}
              id={d.id}
              text={d.text}
              onClick={(e) => activeFilterButton(e.currentTarget.id)}
            ></FilterButton>
          ))}
        </div>
        <div
          id="searchKeyword"
          className="circle_filter bg_gray_e"
          onClick={(e) => clickCircleFilter(e.currentTarget.id)}
        >
          <img src="/search.png"></img>
        </div>
        <div
          id="sorting"
          className="circle_filter bg_gray_e"
          onClick={(e) => clickCircleFilter(e.currentTarget.id)}
        >
          <img src="/sorting.png"></img>
        </div>
      </div>
    </div>
  );
}

export default PlotHeader;
