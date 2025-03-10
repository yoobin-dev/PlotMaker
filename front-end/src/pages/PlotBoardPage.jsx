import { useEffect, useState } from "react";
import { getPlotList } from "../api/plotApi";
import { useNavigate } from "react-router-dom";
import "../styles/plotBoardPage.css";

function PlotBoardPage() {
  const [bestList, setBestList] = useState([]);
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  useEffect(() => {
    const getData = async () => {
      const data = await getPlotList(userInfo.socialId, "All");

      setBestList(data);
    };
    getData();
  }, []);

  return (
    <div id="plotBoardPage">
      <BoardCategoryRevolving></BoardCategoryRevolving>
      <FilterButton></FilterButton>
      <PlotCardTop></PlotCardTop>
      <BoardTable bestList={bestList}></BoardTable>
    </div>
  );
}

export default PlotBoardPage;

function BoardCategoryRevolving() {
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
      code_name: "시놉시스(줄거리)",
    },
  ];
  const [categoryIdx, setCategoryIdx] = useState(0);
  const nextIdx = categoryIdx + 1 === categoryArr.length ? 0 : categoryIdx + 1;
  const prevIdx = categoryIdx - 1 < 0 ? 3 : categoryIdx - 1;

  const categoryRevolving = () => {
    setCategoryIdx(nextIdx);
  };
  return (
    <div id="boardCategory">
      <div id="prevDisplay" className="label_1 ft_gray_c">
        {categoryArr[prevIdx].code_name}
      </div>
      <button className="revolvingButton" onClick={categoryRevolving}>
        {" "}
        &lt;{" "}
      </button>
      <div id="selectedDisplay" className="display_2">
        {categoryArr[categoryIdx]?.code_name}
      </div>
      <button className="revolvingButton" onClick={categoryRevolving}>
        {" "}
        &gt;{" "}
      </button>
      <div id="nextDisplay" className="label_1 ft_gray_c">
        {categoryArr[nextIdx].code_name}
      </div>
    </div>
  );
}

// 필터 버튼
function FilterButton() {
  const filterButtonArr = [
    {
      id: "today",
      text: "투데이",
    },
    {
      id: "weekly",
      text: "주간",
    },
    {
      id: "monthly",
      text: "월간",
    },
    {
      id: "whole",
      text: "전체",
    },
  ];

  // 필터 클릭 이벤트
  const handleFilterButton = (id) => {
    const items = document.getElementsByClassName("filterItem");
    const target = document.getElementById(id);

    // 서브 메뉴 선택 효과 초기화
    for (let i of items) {
      i.classList.remove("selected");
    }

    target.classList.add("selected");
  };

  return (
    <div id="filterButton" className="d-flex bg_gray_e">
      {filterButtonArr.map((d, i) => (
        <div
          key={i}
          id={d.id}
          className={`filterItem headline_1 ft_gray_6 ${
            i === 0 ? "selected" : ""
          }`}
          onClick={() => handleFilterButton(d.id)}
        >
          {d.text}
        </div>
      ))}
    </div>
  );
}

// 탑 5
function PlotCardTop() {
  const topCards = [
    {
      rank: 1,
      title: "붉은 달의 저주",
      author: "별빛 고양이",
      genre: "판타지",
      views: 1234,
      likes: 1234,
    },
    {
      rank: 2,
      title: "푸른 바람의 노래",
      author: "바람 소년",
      genre: "로맨스",
      views: 2345,
      likes: 1567,
    },
    {
      rank: 3,
      title: "어둠의 그림자",
      author: "검은 늑대",
      genre: "미스터리",
      views: 3456,
      likes: 1890,
    },
    {
      rank: 4,
      title: "빛의 전설",
      author: "하얀 용",
      genre: "판타지",
      views: 4567,
      likes: 2103,
    },
    {
      rank: 5,
      title: "별들의 속삭임",
      author: "푸른 별",
      genre: "SF",
      views: 5678,
      likes: 2456,
    },
  ];

  return (
    <div id="topCardList">
      {topCards.map((d, i) => (
        <div key={i} className={`topCard ${i === 0 ? "first" : ""}`}>
          <div className={`rank ${i === 0 ? "display_1" : "display_2"}`}>
            {i + 1}
          </div>
          <div className={`title ${i === 0 ? "title_2" : "title_3"}`}>
            {d.title}
          </div>
          <div className={`author ${i === 0 ? "heading_1" : "heading_2"}`}>
            {d.author}
          </div>
          <div className="footer">
            <div className={`genre ${i === 0 ? "headline_2" : "label_1"}`}>
              {d.genre}
            </div>
            <div>
              <img src="view.png" />
              <span className={`${i === 0 ? "label_1" : "caption_2"}`}>
                {d.views}
              </span>
              <img src="likes.png" />
              <span className={`${i === 0 ? "label_1" : "caption_2"}`}>
                {d.likes}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function BoardTable({ bestList }) {
  console.log(bestList);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(bestList.length / itemsPerPage);

  const goToDetail = (plot) => {
    navigate("/boardDetail", {
      state: { bestList: bestList, plot: plot },
    });
  };

  return (
    <div id="boardTableBox">
      <table id="boardTable">
        <thead className="headline_2 bg_gray_c">
          <tr>
            <th className="rank" style={{ width: "84px" }}>
              순위
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
          {bestList.map((d, i) => (
            <tr key={i} onClick={() => goToDetail(d)}>
              <td className="rank title_2">{i + 1}</td>
              <td className="title heading_1">{d.title}</td>
              <td className="author headline_2">황금빛여우</td>
              <td className="genre headline_2">판타지</td>
              <td className="veiws">
                <img src="view.png" />
                <span className="heading_2">1234</span>
              </td>
              <td className="likes">
                <img src="likes.png" />
                <span className="heading_2">1234</span>
              </td>
              <td className="createAt label_2">{d.createAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
