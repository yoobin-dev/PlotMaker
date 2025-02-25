import { useContext, useEffect, useState } from "react";
import "../styles/common.css";
import "../styles/plotHeader.css";
import LocaleContext from "../context/LocaleContext";

// 플롯 헤더
function PlotHeader({ plotCount = 0 }) {
  const [count, setCount] = useState(0);
  const [sortingOn, setSortingOn] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { plotList, setPlotList } = useContext(LocaleContext);

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
    // {
    //   id: "filterFolder",
    //   text: "폴더",
    // },
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
    for (let t of circles) {
      t.classList.remove("clicked");
    }
    // 정렬 토글 메뉴 숨기기
    if (id === "sorting") setSortingOn(false);

    if (className.includes("clicked")) {
      // 이미 클릭되어 있는 경우 취소
      target.classList.remove("clicked");
    } else {
      // 클릭되지 않은 경우 clicked 적용
      target.classList.add("clicked");
      if (id === "sorting") setSortingOn(true);
    }
  };

  // 엔터 입력 시 키워드 검색
  const getSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      searchByKeyword();
    }
  };

  // 키워드로 플롯 검색
  const searchByKeyword = (e) => {
    const searchInput = document.querySelector("#search_input");
    // 검색 기능 추가 (임시로 필터 axios로 받아와야함)
    const filterList = plotList.filter((plot) =>
      plot.email.includes(searchInput.value)
    );
    setPlotList(filterList);
  };

  // 검색 버튼 (비)활성화 시키기
  const activeSearchToggle = (evt, isActive) => {
    evt.preventDefault();
    const searchInput = document.querySelector("#search_input");
    const searchClose = document.querySelector("#search_close");
    const sortBtn = document.querySelector("#sorting");
    const container = evt.currentTarget.closest(".search-wrapper");

    if (isActive) {
      if (!container.classList.contains("active")) {
        container.classList.add("active");
        // 정렬 버튼 숨기기
        sortBtn.classList.add("d-none");
        // placeholer 추가
        setTimeout(() => {
          searchInput.placeholder = "제목";
          searchClose.classList.remove("d-none");
        }, 550);
      } else {
        searchByKeyword();
      }
    } else {
      container.classList.remove("active");
      container.querySelector(".search-input").value = ""; // 입력값 초기화
      // 정렬 버튼 보여주기
      setTimeout(() => {
        sortBtn.classList.remove("d-none");
      }, 300);
      // placeholer 제거
      searchInput.placeholder = "";
      searchClose.classList.add("d-none");
    }
  };

  // 렌더시 전체 필터 선택
  useEffect(() => {
    // 전체 필터 선택
    activeFilterButton("filterAll");

    // 정렬 메뉴 외부 클릭 시 메뉴 닫기
    const handleClickOutside = (event) => {
      if (
        !document.getElementById("sortMenuBox").contains(event.target) &&
        !document.getElementById("sorting").contains(event.target)
      ) {
        setSortingOn(false);
        document.getElementById("sorting").classList.remove("clicked");
      }
    };
    if (sortingOn) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sortingOn]);

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
        <div className="d-flex" style={{ gap: "8px" }}>
          <SearchFilterButton
            id={"searching"}
            plotList={plotList}
            setPlotList={setPlotList}
            activeSearchToggle={activeSearchToggle}
            getSearchKeyDown={getSearchKeyDown}
            onClick={clickCircleFilterButton}
          ></SearchFilterButton>

          <SortingFilterButton
            id={"sorting"}
            plotList={plotList}
            setPlotList={setPlotList}
            onClick={clickCircleFilterButton}
          ></SortingFilterButton>
        </div>
      </div>
      <SortingMenu
        sortingOn={sortingOn}
        plotList={plotList}
        setPlotList={setPlotList}
      ></SortingMenu>
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
function SearchFilterButton({
  id,
  plotList,
  setPlotList,
  keyword,
  getSearchKeyDown,
  activeSearchToggle,
}) {
  return (
    <div className="search-wrapper">
      <div className="input-holder">
        <input
          id="search_input"
          value={keyword}
          className="search-input headline_2"
          onKeyDown={getSearchKeyDown}
        ></input>
        <div
          className="search-icon"
          onClick={(evt) => activeSearchToggle(evt, true)}
        >
          <img src="searching.png"></img>
        </div>
      </div>
      <span
        id="search_close"
        className="close headline_1 ft_black d-none"
        onClick={(evt) => activeSearchToggle(evt, false)}
      >
        취소
      </span>
    </div>
  );
}
// 정렬 버튼
function SortingFilterButton({ id, onClick }) {
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
function SortingMenu({ sortingOn, plotList, setPlotList }) {
  const sortingArr = [
    {
      id: 1,
      sort: "created",
      order: "asc",
      text: "작성일 최신 순 정렬",
    },
    {
      id: 2,
      sort: "created",
      order: "desc",
      text: "작성일 오래된 순 정렬",
    },
    {
      id: 3,
      sort: "view",
      order: "asc",
      text: "조회수 높은 순 정렬",
    },
    {
      id: 4,
      sort: "view",
      order: "desc",
      text: "조회수 낮은 순 정렬",
    },
    {
      id: 5,
      sort: "like",
      order: "asc",
      text: "좋아요 많은 순 정렬",
    },
    {
      id: 6,
      sort: "like",
      order: "desc",
      text: "좋아요 낮은 순 정렬",
    },
  ];

  // 정렬 시키기
  function sortPlotList(sort, order, id) {
    // 정렬 방식 강조 지우기
    const items = document.getElementsByClassName("sortMenuItem");
    for (let i of items) {
      i.classList.remove("bg_gray_c");
    }

    // 선택한 정렬 방식 강조
    const target = document.getElementById(id);
    target.classList.add("bg_gray_c");

    const sortedList = plotList.sort((a, b) => {
      // 오름차순일 경우 b - a, 내림차순일 경우 a - b로 비교
      if (order === "asc") {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
    setPlotList((prev) => [...sortedList]);
  }

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
          <div
            key={d.id}
            id={`${d.sort}_${d.order}`}
            className="d-flex sortMenuItem"
            onClick={() => {
              sortPlotList(d.sort, d.order, `${d.sort}_${d.order}`);
            }}
          >
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
