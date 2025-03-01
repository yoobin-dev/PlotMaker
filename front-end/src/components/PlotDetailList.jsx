import { useState, useRef, useEffect, useContext } from "react";
import "../styles/plotDetailList.css";
import "../styles/common.css";
import LocaleContext from "../context/LocaleContext"; // LocaleContext import
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function PlotDetailList() {
  const { plotList, setPlotList } = useContext(LocaleContext);
  const [toggleOn, setToggleOn] = useState(false);

  const handleDetailCard = (promptSeq) => {
    const plotTitle = document.getElementById("plotDetailTitle");
    const plotContent = document.getElementById("plotDetailContents");

    for (let p of plotList) {
      if (p.promptSeq === promptSeq) {
        plotTitle.innerText = p.title;
        plotContent.innerText = p.plotContent;
        break;
      }
    }
  };

  return (
    <div id="plotDetailList" className="no_scroll">
      {plotList.map((plot, i) => (
        <PlotDetailCard
          key={i}
          plot={plot}
          handleDetailCard={handleDetailCard}
        ></PlotDetailCard>
      ))}
    </div>
  );
}

function PlotDetailCard({ plot, handleDetailCard }) {
  return (
    <>
      <div
        id={plot.promptSeq}
        className="plotDetailCard"
        onClick={() => handleDetailCard(plot.promptSeq)}
      >
        <div className="header d-flex">
          <div className="title heading_1 ft_gray_3">{plot.title}</div>
          <div className="tag label_1 ft_gray_6">{plot.category}</div>
        </div>
        <div className="body d-flex">
          <div className="contents body_1 ft_gray_5">{plot.plotContent}</div>
          <div className="body_2 ft_gray_94">{plot.createAt}</div>
        </div>
      </div>
    </>
  );
}

export default PlotDetailList;
