import { useEffect, useState } from "react";
import { getBestList } from "../api/boardApi";
import { useNavigate } from "react-router-dom";
import "../styles/plotBoardBestPage.css";

function PlotBoardPage() {
  const navigate = useNavigate();
  const [bestList, setBestList] = useState([]);
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const [categoryIdx, setCategoryIdx] = useState(0);
  const [criteria, setCriteria] = useState("daily");

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

  const filterPeriodArr = [
    {
      id: "daily",
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
      id: "total",
      text: "전체",
    },
  ];

  useEffect(() => {
    const getData = async () => {
      const data = await getBestList(categoryArr[categoryIdx].code, criteria);
      setBestList(data);
    };
    getData();
  }, [categoryIdx, criteria]);

  return (
    <div id="plotBoardBestPage">
      <BoardCategoryRevolving
        categoryArr={categoryArr}
        categoryIdx={categoryIdx}
        setCategoryIdx={setCategoryIdx}
      ></BoardCategoryRevolving>
      <FilterButton
        filterArr={filterPeriodArr}
        setCriteria={setCriteria}
      ></FilterButton>
      <PlotCardTop bestList={bestList} navigate={navigate}></PlotCardTop>
      <BoardTable bestList={bestList} navigate={navigate}></BoardTable>
    </div>
  );
}

export default PlotBoardPage;

function BoardCategoryRevolving({ categoryArr, categoryIdx, setCategoryIdx }) {
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
function FilterButton({ filterArr, setCriteria }) {
  // 필터 클릭 이벤트
  const handleFilterButton = (id) => {
    const items = document.getElementsByClassName("filterItem");
    const target = document.getElementById(id);

    // 서브 메뉴 선택 효과 초기화
    for (let i of items) {
      i.classList.remove("selected");
    }

    target.classList.add("selected");

    setCriteria(id);
  };

  return (
    <div id="filterButton" className="d-flex bg_gray_e">
      {filterArr.map((d, i) => (
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
function PlotCardTop({ bestList, navigate }) {
  const topCards = [];
  for (let i = 0; i < 5; i++) {
    topCards.push(bestList[i]);
  }

  console.log(topCards);

  const goToDetail = (plot) => {
    navigate("/boardDetail", {
      state: { plotList: bestList, plot: plot },
    });
  };

  return (
    <div id="topCardList">
      {topCards.map((d, i) => (
        <div
          key={i}
          className={`topCard ${i === 0 ? "first" : ""}`}
          onClick={() => goToDetail(d)}
        >
          <div className={`rank ${i === 0 ? "display_1" : "display_2"}`}>
            {i + 1}
          </div>
          <div className={`title ${i === 0 ? "title_2" : "title_3"}`}>
            {d?.title}
          </div>
          <div className={`author ${i === 0 ? "heading_1" : "heading_2"}`}>
            {d?.author}
          </div>
          <div className="footer">
            <div className={`genre ${i === 0 ? "headline_2" : "label_1"}`}>
              {d?.genre}
            </div>
            <div>
              <img src="view.png" />
              <span className={`${i === 0 ? "label_1" : "caption_2"}`}>
                {d?.view}
              </span>
              <img src="likes.png" />
              <span className={`${i === 0 ? "label_1" : "caption_2"}`}>
                {d?.likes}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function BoardTable({ bestList, navigate }) {
  const goToDetail = (plot) => {
    navigate("/boardDetail", {
      state: { plotList: bestList, plot: plot },
    });
  };

  const tableList = [];
  for (let i = 5; i < bestList.length; i++) {
    tableList.push(bestList[i]);
  }

  return (
    <div id="boardTableBox">
      <table id="boardTable">
        <thead className="headline_2 bg_gray_f5">
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
              <td className="rank title_2">{i + 6}</td>
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
    </div>
  );
}
