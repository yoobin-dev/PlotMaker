import "../styles/plotBoardDetailPage.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import BoardDetailList from "../components/BoardDetailList";
import BoardDetailRight from "../components/BoardDetailMain";

function PlotBoardDetail() {
  const location = useLocation();
  const [plot, setPlot] = useState(location.state.plot);
  const [bestList, setBestList] = useState(location.state.bestList);

  console.log(plot);
  console.log(bestList);

  return (
    <div id="boardDetail">
      <BoardDetailRight plot={plot}></BoardDetailRight>
      <BoardDetailList setPlot={setPlot} bestList={bestList}></BoardDetailList>
    </div>
  );
}

export default PlotBoardDetail;
