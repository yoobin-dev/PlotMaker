import "../styles/plotBoardDetailPage.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import BoardDetailList from "../components/BoardDetailList";
import BoardDetailMain from "../components/BoardDetailMain";

function PlotBoardDetail() {
  const location = useLocation();
  const [plot, setPlot] = useState(location.state.plot);
  const [plotList, setPlotList] = useState(location.state.plotList);

  return (
    <div id="boardDetail">
      <BoardDetailMain plot={plot}></BoardDetailMain>
      <BoardDetailList setPlot={setPlot} plotList={plotList}></BoardDetailList>
    </div>
  );
}

export default PlotBoardDetail;
