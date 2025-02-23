import { useState, useEffect } from "react";
import PlotHeader from "../components/PlotHeader";
import PlotCardList from "../components/PlotCardList";
import { getPlotList } from "../api/plotApi";
import "../styles/plotListPage.css";
import LocaleContext from "../context/LocaleContext";

function PlotListPage() {
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
        <div id="plotListPage">
          <div id="plotListPageTop">
            <PlotHeader plotCount={plotCount}></PlotHeader>
          </div>
          <div id="plotListPageBottom" className="no_scroll h-100 bg_gray_f9">
            <PlotCardList></PlotCardList>
          </div>
        </div>
      )}
    </LocaleContext.Provider>
  );
}

export default PlotListPage;
