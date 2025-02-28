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

function PlotDetailPage() {
  const [plotCount, setPlotCount] = useState(0);
  const [plotList, setPlotList] = useState([]);
  const [loading, setLoading] = useState(true);

  // 플롯 목록 가져오기
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await getPlotList();
      setPlotList(data);
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <LocaleContext.Provider value={{ plotList, setPlotList }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div id="plotDetailPage">
          <div id="plotDetailLeft" className="no_scroll">
            <div id="plotDetailLeftTop">
              <PlotHeader plotCount={plotCount} isDetail={true}></PlotHeader>
            </div>
            <div
              id="plotDetailLeftBottom"
              className="no_scroll h-100 bg_gray_f9 no_scroll"
            >
              <PlotDetailList></PlotDetailList>
            </div>
          </div>
          <div id="plotDetailRight">
            <div id="plotDetailTitle" className="body_main">
              소설 01
            </div>
            <div id="plotDetailContents" className="body_main">
              내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.
            </div>
            <div id="plotDetailTags">
              <PlotTag name="판타지" color="blue"></PlotTag>
              <PlotTag name="판타지" color="blue"></PlotTag>
              <PlotTag name="판타지" color="blue"></PlotTag>
              <PlotTag name="판타지" color="blue"></PlotTag>
              <PlotTag name="판타지" color="blue"></PlotTag>
              <PlotTag name="판타지" color="blue"></PlotTag>
              <PlotTag name="판타지" color="blue"></PlotTag>
              <PlotTag name="판타지" color="blue"></PlotTag>
              <PlotTag name="판타지" color="blue"></PlotTag>
              <PlotTag name="판타지" color="blue"></PlotTag>
              <PlotTag name="판타지" color="blue"></PlotTag>
              <PlotTag name="판타지" color="blue"></PlotTag>
              <PlotTag name="판타지" color="blue"></PlotTag>
              <PlotTag name="판타지" color="blue"></PlotTag>
              <PlotTag name="판타지" color="blue"></PlotTag>
              <PlotTag name="판타지fdsaf" color="blue"></PlotTag>
              <PlotTag name="판타지" color="blue"></PlotTag>
              <PlotTag name="판타지" color="blue"></PlotTag>
              <PlotTag name="판타지fdasfasd" color="blue"></PlotTag>
            </div>
            <div id="plotDetailButtons">
              <PlotButton
                name="이어쓰기"
                caption="플롯메이커와 계속해서 작품을 이어나갈 수 있어요."
                isDetail={true}
              ></PlotButton>
              <PlotButton
                name="내보내기"
                caption=".txt 확장자로 작품을 저장할 수 있어요."
                color="white"
                isDetail={true}
              ></PlotButton>
            </div>
            <PlotComment></PlotComment>
          </div>
        </div>
      )}
    </LocaleContext.Provider>
  );
}

export default PlotDetailPage;
