import "../styles/plotBoardDetailPage.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { addBoardView, getPrompt } from "../api/boardApi";
import BoardDetailList from "../components/BoardDetailList";
import BoardDetailMain from "../components/BoardDetailMain";

function PlotBoardDetail() {
  const location = useLocation();
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const [promptSeq, setPromptSeq] = useState(location.state.plot.promptSeq);
  const [plotList, setPlotList] = useState(location.state.plotList);
  const [liked, setLiked] = useState(false);
  const [plot, setPlot] = useState(location.state.plot);
  const isBest = location.state.isBest;
  const criteria = location.state.criteria;

  useEffect(() => {
    const getData = async () => {
      const data = await getPrompt(userInfo.socialId, promptSeq);
      setPlot(data);
      setLiked(data.liked);
    };
    getData();
  }, [liked]);

  // 조회수
  useEffect(() => {
    const addView = async () => {
      const result = await addBoardView(promptSeq);
    };
    addView();
  }, []);

  return (
    <div id="boardDetail">
      <BoardDetailMain
        plot={plot}
        setPlot={setPlot}
        liked={liked}
        setLiked={setLiked}
      ></BoardDetailMain>
      <BoardDetailList
        plot={plot}
        setPlot={setPlot}
        plotList={plotList}
        setPlotList={setPlotList}
        isBest={isBest}
        criteria={criteria}
      ></BoardDetailList>
    </div>
  );
}

export default PlotBoardDetail;
