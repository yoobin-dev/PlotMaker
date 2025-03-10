import PlotDetailList from "./PlotDetailList";
import "../styles/boardDetailList.css";

function BoardDetailList({ setPlot, bestList }) {
  const handleListButton = () => {
    const list = document.getElementById("boardDetailList");
    const main = document.getElementById("boardDetailMain");
    if (list.classList.contains("goRight")) {
      main.classList.remove("goRight");
      list.classList.remove("goRight");
    } else {
      main.classList.add("goRight");
      list.classList.add("goRight");
    }
  };

  return (
    <>
      <div id="boardDetailList">
        <div id="detailListButton" onClick={handleListButton}>
          <img src="play.png" />
        </div>
        <PlotDetailList
          setPlot={setPlot}
          plotList={bestList}
          isBoard={true}
        ></PlotDetailList>
      </div>
    </>
  );
}

export default BoardDetailList;
