import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/common.css";
import "../styles/plotHeader.css";
import LocaleContext from "../context/LocaleContext";
import { getPlotList, searchPlotList } from "../api/plotApi";

// 플롯 헤더
function PlotHeader({ isDetail, plotCount }) {
  const [sortingOn, setSortingOn] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [isPublic, setIsPublic] = useState("All");
  const [sortBy, setSortBy] = useState("createAt");
  const [sortOrder, setSortOrder] = useState("ASC");
  const { plotList, setPlotList } = useContext(LocaleContext);
  const navigate = useNavigate();
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

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

    // 필터에 따른 플롯 가져오기
    const getData = async () => {
      if (id.includes("Public")) {
        setIsPublic("Y");
      } else if (id.includes("Private")) {
        setIsPublic("N");
      } else {
        setIsPublic("All");
      }
      const data = await getPlotList(
        userInfo.socialId,
        isPublic,
        sortBy,
        sortOrder
      );
      setPlotList(data);
    };
    getData();
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

  // 키워드로 플롯 검색
  const searchByKeyword = () => {
    const search = async () => {
      const data = await searchPlotList(userInfo.socialId, keyword);
      setPlotList(data);
    };
    search();
  };

  // 엔터 입력 시 키워드 검색
  const getSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      searchByKeyword();
    }
  };

  // 검색 버튼 (비)활성화 시키기
  const activeSearchToggle = (evt, isActive, isDetail) => {
    evt.preventDefault();
    const searchInput = document.querySelector("#search_input");
    const searchClose = document.querySelector("#search_close");
    const sortBtn = document.querySelector("#sorting");
    const container = evt.currentTarget.closest(".search-wrapper");
    const filterButtons = document.getElementById("filterButton");

    if (isActive) {
      if (!container.classList.contains("active")) {
        container.classList.add("active");
        // 정렬 버튼 숨기기
        sortBtn.classList.add("d-none");
        // 상세일 경우 필터(전체, 공개, 비공개) 숨기기
        if (isDetail) {
          filterButtons.classList.add("d-none");
        }
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
      setTimeout(() => {
        // 정렬 버튼 보여주기
        sortBtn.classList.remove("d-none");
        // 상세일 경우 필터(전체, 공개, 비공개) 보여주기
        if (isDetail) {
          filterButtons.classList.remove("d-none");
        }
      }, 300);
      // placeholer 제거
      searchInput.placeholder = "";
      searchClose.classList.add("d-none");
    }
  };

  const backToList = () => {
    navigate("/plotList");
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
  }, []);

  return (
    <div id="plotHeader" className={`${isDetail ? "onDetail" : ""}`}>
      <div className="d-flex">
        <div className="display_2">내가 작성한 플롯</div>
        <div id="plotCount" className="display_2 ft_white bg_gray_2">
          {plotList.length}
        </div>
        <div
          id="backToList"
          className={`${isDetail ? "" : "d-none"}`}
          onClick={backToList}
        >
          <img src="/arrow_back.png"></img>
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
            keyword={keyword}
            setKeyword={setKeyword}
            isDetail={isDetail}
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
        setSortingOn={setSortingOn}
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
  setKeyword,
  getSearchKeyDown,
  activeSearchToggle,
  isDetail,
}) {
  return (
    <div className="search-wrapper">
      <div className="input-holder">
        <input
          id="search_input"
          value={keyword}
          className="search-input headline_2"
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          onKeyUp={(e) => getSearchKeyDown(e)}
        ></input>
        <div
          className="search-icon"
          onClick={(evt) => activeSearchToggle(evt, true, isDetail)}
        >
          <img src="searching.png"></img>
        </div>
      </div>
      <span
        id="search_close"
        className="close headline_1 ft_black d-none"
        onClick={(evt) => activeSearchToggle(evt, false, isDetail)}
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
function SortingMenu({ sortingOn, plotList, setPlotList, setSortingOn }) {
  const sortingArr = [
    {
      id: 1,
      sort: "createAt",
      order: "asc",
      text: "작성일 최신 순 정렬",
    },
    {
      id: 2,
      sort: "createAt",
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

    console.log(userInfo);
    const sortIcon = document.getElementById("sorting");
    setSortingOn(false);
    sortIcon.classList.remove("clicked");
    const socialId = userInfo.socialId;
    const getSortList = async () => {
      const sortedList = getPlotList(socialId, isPublic, sortBy, sortOrder);
      setPlotList(sortedList);
    };

    getSortList();
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
        {sortingArr.map((d, i) => (
          <div
            key={i}
            id={`${d.sort}_${d.order}`}
            className={`d-flex sortMenuItem ${d.id == 1 ? "bg_gray_c" : ""}`}
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
