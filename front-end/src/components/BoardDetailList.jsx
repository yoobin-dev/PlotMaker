import "../styles/boardDetailList.css";
import Pagination from "../components/Pagination";
import { getTotalList, getBestList } from "../api/boardApi";
import { useState, useEffect } from "react";

function BoardDetailList({
  plot,
  setPlot,
  plotList,
  setPlotList,
  isBest,
  criteria,
}) {
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(10);
  const [categoryCode, setCategoryCode] = useState(plot.categoryCode);
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  useEffect(() => {
    const getData = async () => {
      let data;
      if (isBest) {
        data = await getBestList(plot.categoryCode, criteria);
        setPlotList(data);
      } else {
        data = await getTotalList(
          plot.categoryCode,
          currentPage,
          userInfo.socialId
        );
        setPlotList(data.data);
      }

      setTotalPage(data.paging?.totalPage ? data.paging?.totalPage : 1);
      setMaxPage(Math.ceil(currentPage / 10) * 10);
    };
    getData();
  }, [categoryCode, currentPage]);

  const handleListButton = () => {
    const list = document.getElementById("boardDetailList");
    const main = document.getElementById("boardDetailMain");
    if (list.classList.contains("goRight")) {
      main.classList.remove("goRight");
      list.classList.remove("goRight");
    } else {
      main.classList.add("goRight");
      list.classList.add("goRight");
    }
  };

  const handleDetailCard = (promptSeq) => {
    const plotTitle = document.getElementById("plotDetailTitle");
    const plotContent = document.getElementById("plotDetailContents");

    for (let p of plotList) {
      if (p.promptSeq === promptSeq) {
        plotTitle.innerText = p.title;
        plotContent.innerText = p.plotContent;
        setPlot(p);
        break;
      }
    }
  };

  return (
    <>
      <div id="boardDetailList">
        <div id="boardDetailListBox">
          <div id="detailListButton" onClick={handleListButton}>
            <img src="play.png" />
          </div>
          <div>
            {plotList.map((plotItem, i) => (
              <BoardDetailCard
                key={i}
                plot={plot}
                plotItem={plotItem}
                handleDetailCard={handleDetailCard}
              ></BoardDetailCard>
            ))}
          </div>
        </div>
        <Pagination
          maxPage={maxPage}
          totalPage={totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        ></Pagination>
      </div>
    </>
  );
}

function BoardDetailCard({ plot, plotItem, handleDetailCard }) {
  return (
    <>
      <div
        id={plotItem.promptSeq}
        className={`boardDetailCard ${
          plot.promptSeq === plotItem.promptSeq ? "selected" : ""
        }`}
        onClick={() => handleDetailCard(plotItem.promptSeq)}
      >
        <div className="header d-flex">
          <div style={{ display: "flex", gap: "8px", maxWidth: "290px" }}>
            <div className="title heading_1 ft_gray_3">{plotItem.title}</div>
            <div className="tag label_1 ft_gray_6">{plotItem.category}</div>
          </div>
          <div className="body_2 ft_gray_94">{plotItem.createAt}</div>
        </div>
        <div className="body d-flex">
          <div className="contents body_1 ft_gray_5">
            {plotItem.plotContent}
          </div>
          <div className="extra_info body_1 ft_gray_5">
            <img src="view.png"></img>
            {plotItem.view}
            <img src="likes.png"></img>
            {plotItem.likes}
          </div>
        </div>
      </div>
    </>
  );
}

export default BoardDetailList;
