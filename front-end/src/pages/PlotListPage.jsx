import { useState, useEffect } from "react";
import PlotHeader from "../components/PlotHeader";
import PlotCardList from "../components/PlotCardList";
import Loading from "../components/Loading";
import { getPlotList } from "../api/plotApi";
import "../styles/plotListPage.css";
import LocaleContext from "../context/LocaleContext";

function PlotListPage() {
  const [plotCount, setPlotCount] = useState(0);
  const [plotList, setPlotList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  // 플롯 목록 가져오기
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      const data = await getPlotList(userInfo.socialId, "All");
      setIsLoading(false);
    };
    getData();
  }, []);

  return (
    <LocaleContext.Provider value={{ plotList, setPlotList }}>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div id="plotListPage">
          <div id="plotListPageTop">
            <PlotHeader plotCount={plotCount} isDetail={false}></PlotHeader>
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
