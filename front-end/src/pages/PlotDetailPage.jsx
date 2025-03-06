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
import ConfirmModal from "../components/modal/ConfirmModal";

function PlotDetailPage() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [plot, setPlot] = useState(location.state.plot);
  const [plotList, setPlotList] = useState(location.state.plotList);

  // 태그에 필요한 값 배열 만들기
  const tagsArr = [
    {
      value: plot.categoryCode,
      label: plot.category,
      color: "gray",
    },
    {
      value: plot.genreCode,
      label: plot.genre,
      color: "blue",
    },
    {
      value: plot.timeframeCode,
      label: plot.timeframe,
      color: "yellow",
    },
    {
      value: plot.themeCode,
      label: plot.theme,
      color: "red",
    },
    {
      value: plot.event,
      label: plot.event,
      color: "green",
    },
    {
      value: plot.tellType,
      label: plot.tellType,
      color: "mustard",
    },
    {
      value: plot.custom,
      label: plot.custom,
      color: "mint",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <LocaleContext.Provider value={{ plotList, setPlotList }}>
      <ConfirmModal
        message={`${plot.title}에 이어쓰시겠습니까?`}
        params={plot}
      ></ConfirmModal>
      <div id="plotDetailPage">
        <div id="plotDetailLeft" className="no_scroll">
          <div id="plotDetailLeftTop">
            <PlotHeader isDetail={true}></PlotHeader>
          </div>
          <div id="plotDetailLeftBottom" className="h-100 bg_gray_f9 no_scroll">
            <PlotDetailList setPlot={setPlot}></PlotDetailList>
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
            {tagsArr.map((d, i) => (
              <PlotTag key={i} name={d.label} color={d.color}></PlotTag>
            ))}
          </div>
          <div id="plotDetailButtons">
            <PlotButton
              name="이어쓰기"
              caption="플롯메이커와 계속해서 작품을 이어나갈 수 있어요."
              isDetail={true}
              icon="Relay_large_white.svg"
              promptValues={plot}
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
