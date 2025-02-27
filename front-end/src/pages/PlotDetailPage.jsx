import { useState, useEffect } from "react";
import PlotHeader from "../components/PlotHeader";
import PlotDetailList from "../components/PlotDetailList";
import { getPlotList } from "../api/plotApi";
import "../styles/plotDetailPage.css";
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
          <div id="plotDetailLeft">
            <div id="plotDetailLeftTop">
              <PlotHeader plotCount={plotCount} isDetail={true}></PlotHeader>
            </div>
            <div
              id="plotDetailLeftBottom"
              className="no_scroll h-100 bg_gray_f9"
            >
              <PlotDetailList></PlotDetailList>
            </div>
          </div>
          <div id="plotDetailRight"></div>
        </div>
      )}
    </LocaleContext.Provider>
  );
}

export default PlotDetailPage;
