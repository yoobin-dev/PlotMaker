import { useState, useEffect } from "react";
import PlotHeader from "../components/PlotHeader";
import PlotDetailList from "../components/PlotDetailList";
import PlotTag from "../components/PlotTag";
import PlotButton from "../components/PlotButton";
import PlotComment from "../components/PlotComment";
import { getPlotList } from "../api/plotApi";
import "../styles/plotDetailPage.css";
import "../styles/common.css";
import LocaleContext from "../context/LocaleContext";
import { useLocation } from "react-router-dom";

function PlotDetailPage() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [plot, setPlot] = useState(location.state.plot);
  const [plotList, setPlotList] = useState(location.state.plotList);

  // 태그에 필요한 값 배열 만들기
  const plotTagsArr = Object.entries(plot)
    .filter(([key, _]) => !key.includes("Code"))
    .filter(([key, _]) => !key.includes("like"))
    .filter(([key, _]) => !key.includes("view"))
    .filter(([key, _]) => !key.includes("plot"))
    .filter(([key, _]) => !key.includes("Seq"))
    .filter(([key, _]) => !key.includes("public"))
    .map(([_, value]) => value);

  // 플롯 목록 가져오기
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <LocaleContext.Provider value={{ plotList, setPlotList }}>
      <div id="plotDetailPage">
        <div id="plotDetailLeft" className="no_scroll">
          <div id="plotDetailLeftTop">
            <PlotHeader isDetail={true}></PlotHeader>
          </div>
          <div id="plotDetailLeftBottom" className="h-100 bg_gray_f9 no_scroll">
            <PlotDetailList></PlotDetailList>
          </div>
        </div>
        <div id="plotDetailRight" className="no_scroll">
          <div id="plotDetailTitle" className="body_main">
            {plot.title}
          </div>
          <div id="plotDetailContents" className="body_main">
            {plot.plotContent}
          </div>
          <div id="plotDetailTags">
            <PlotTag name="판타지fdasfasd" color="blue"></PlotTag>
          </div>
          <div id="plotDetailButtons">
            <PlotButton
              name="이어쓰기"
              caption="플롯메이커와 계속해서 작품을 이어나갈 수 있어요."
              isDetail={true}
              icon="Relay_large_white.svg"
            ></PlotButton>
            <PlotButton
              name="내보내기"
              caption=".txt 확장자로 작품을 저장할 수 있어요."
              color="white"
              isDetail={true}
              icon="export_large.svg"
            ></PlotButton>
          </div>
          <PlotComment plot={plot}></PlotComment>
        </div>
      </div>
    </LocaleContext.Provider>
  );
}

export default PlotDetailPage;
