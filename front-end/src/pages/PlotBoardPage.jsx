import { use, useEffect, useState } from "react";
import { getTotalList, getSearchTotalList } from "../api/boardApi";
import { useNavigate } from "react-router-dom";
import "../styles/plotBoardPage.css";
import Pagination from "../components/Pagination";

function PlotBoardPage() {
  const [plotList, setPlotList] = useState([]);
  const [categoryCode, setCategoryCode] = useState("T001");
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(10);
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  const categoryArr = [
    {
      code: "T001",
      code_name: "소설",
    },
    {
      code: "T002",
      code_name: "대본",
    },
    {
      code: "T003",
      code_name: "시나리오",
    },
    {
      code: "T000",
      code_name: "시놉시스",
    },
  ];

  useEffect(() => {
    const getData = async () => {
      const data = await getTotalList(categoryCode, currentPage);
      setPlotList(data.data);
      setTotalPage(data.paging.totalPage);
      setMaxPage(Math.ceil(currentPage / 10) * 10);
    };
    getData();
  }, [categoryCode, currentPage]);

  return (
    <div id="plotBoardPage">
      <div id="plotBoardTop">
        <FilterButton
          categoryArr={categoryArr}
          setCategoryCode={setCategoryCode}
          setCurrentPage={setCurrentPage}
        ></FilterButton>
        <BoardHeader
          plotList={plotList}
          setPlotList={setPlotList}
        ></BoardHeader>
      </div>
      <BoardTable
        plotList={plotList}
        totalPage={totalPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        maxPage={maxPage}
      ></BoardTable>
    </div>
  );
}

export default PlotBoardPage;

// 필터 버튼
function FilterButton({ categoryArr, setCategoryCode, setCurrentPage }) {
  // 필터 클릭 이벤트
  const handleFilterButton = (id) => {
    const items = document.getElementsByClassName("filterItem");
    const target = document.getElementById(id);

    // 서브 메뉴 선택 효과 초기화
    for (let i of items) {
      i.classList.remove("selected");
    }

    target.classList.add("selected");

    setCategoryCode(id);
    setCurrentPage(1);
  };

  return (
    <div id="filterButton" className="d-flex bg_gray_e">
      {categoryArr.map((d, i) => (
        <div
          key={i}
          id={d.code}
          className={`filterItem headline_1 ft_gray_6 ${
            i === 0 ? "selected" : ""
          }`}
          onClick={() => handleFilterButton(d.code)}
        >
          {d.code_name}
        </div>
      ))}
    </div>
  );
}

function BoardTable({
  plotList,
  totalPage,
  currentPage,
  setCurrentPage,
  maxPage,
}) {
  const navigate = useNavigate();

  const goToDetail = (plot) => {
    navigate("/boardDetail", {
      state: { plotList: plotList, plot: plot },
    });
  };

  return (
    <div id="boardTableBox">
      <table id="boardTable">
        <thead className="headline_2 bg_gray_f5">
          <tr>
            <th className="rank" style={{ width: "84px" }}>
              No.
            </th>
            <th className="title">작품</th>
            <th className="author">작가</th>
            <th className="genre">장르</th>
            <th className="views">조회수</th>
            <th className="likes">좋아요</th>
            <th className="createAt">작성일</th>
          </tr>
        </thead>
        <tbody>
          {plotList.map((d, i) => (
            <tr key={i} onClick={() => goToDetail(d)}>
              <td className="rank title_2">{i + 1 + (currentPage - 1) * 10}</td>
              <td className="title heading_1">{d.title}</td>
              <td className="author headline_2">{d.nickname}</td>
              <td className="genre headline_2">{d.genre}</td>
              <td className="veiws">
                <img src="view.png" />
                <span className="heading_2">{d.view}</span>
              </td>
              <td className="likes">
                <img src="likes.png" />
                <span className="heading_2">{d.likes}</span>
              </td>
              <td className="createAt label_2">{d.createAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        maxPage={maxPage}
        totalPage={totalPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      ></Pagination>
    </div>
  );
}

function BoardHeader({ plotList, setPlotList }) {
  const [sortingOn, setSortingOn] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("createAt");
  const [sortOrder, setSortOrder] = useState("desc");

  // 검색 및 정렬 버튼 배열
  const CircleFilterButtonArr = ["searching", "sorting"];

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
      const data = await getSearchTotalList(keyword);
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
      setTimeout(() => {
        // 정렬 버튼 보여주기
        sortBtn.classList.remove("d-none");
      }, 300);
      // placeholer 제거
      searchInput.placeholder = "";
      searchClose.classList.add("d-none");
    }
  };

  // 렌더시 전체 필터 선택
  useEffect(() => {
    // 정렬 메뉴 외부 클릭 시 메뉴 닫기
    const handleClickOutside = (event) => {
      console.log(event);
      if (
        !document.getElementById("boardSortBox").contains(event.target) &&
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
    <>
      <div id="boardFilter">
        <div className="d-flex" style={{ gap: "8px" }}>
          <SearchFilterButton
            id={"searching"}
            keyword={keyword}
            setKeyword={setKeyword}
            activeSearchToggle={activeSearchToggle}
            getSearchKeyDown={getSearchKeyDown}
            onClick={clickCircleFilterButton}
          ></SearchFilterButton>

          <SortingFilterButton
            id={"sorting"}
            onClick={clickCircleFilterButton}
          ></SortingFilterButton>
        </div>
      </div>
      <SortingMenu
        sortingOn={sortingOn}
        setSortingOn={setSortingOn}
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
      ></SortingMenu>
    </>
  );
}

// 검색 버튼
function SearchFilterButton({
  keyword,
  setKeyword,
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
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          onKeyUp={(e) => getSearchKeyDown(e)}
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
function SortingMenu({ sortingOn, setSortingOn, setSortBy, setSortOrder }) {
  const sortingArr = [
    {
      id: 1,
      sort: "createAt",
      order: "desc",
      text: "작성일 최신 순 정렬",
    },
    {
      id: 2,
      sort: "createAt",
      order: "asc",
      text: "작성일 오래된 순 정렬",
    },
    {
      id: 3,
      sort: "view",
      order: "desc",
      text: "조회수 높은 순 정렬",
    },
    {
      id: 4,
      sort: "view",
      order: "asc",
      text: "조회수 낮은 순 정렬",
    },
    {
      id: 5,
      sort: "likes",
      order: "desc",
      text: "좋아요 많은 순 정렬",
    },
    {
      id: 6,
      sort: "likes",
      order: "asc",
      text: "좋아요 낮은 순 정렬",
    },
  ];

  // 정렬 시키기
  function sortPlotList(sort, order, id) {
    // 정렬 방식 강조 지우기
    const items = document.getElementsByClassName("sortMenuItem");
    const target = document.getElementById(id);
    const sortIcon = document.getElementById("sorting");

    // 강조 표시 초기화
    sortIcon.classList.remove("clicked");
    for (let i of items) {
      i.classList.remove("bg_gray_c");
    }
    // 선택한 정렬 방식 강조
    target.classList.add("bg_gray_c");
    // 정렬 모달 닫기
    setSortingOn(false);
    // 정렬 방식 변경
    setSortBy(sort);
    setSortOrder(order);
  }

  return (
    <div
      id="boardSortBox"
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
