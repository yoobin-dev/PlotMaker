import { useState } from "react";
import PlotHeader from "./PlotHeader";
import PlotCardList from "./PlotCardList";
import "../styles/plotBox.css";

function PlotListBox() {
  const [plotCount, setPlotCount] = useState(0);

  return (
    <div id="plotBox">
      <div id="plotBoxTop" style={{ paddingBottom: "32px" }}>
        <PlotHeader plotCount={plotCount}></PlotHeader>
      </div>
      <div id="plotBoxBottom" className="no_scroll h-100 bg_gray_f9">
        <PlotCardList></PlotCardList>
      </div>
    </div>
  );
}

export default PlotListBox;
