import { useState, useRef, useEffect, useContext } from "react";
import "../styles/plotDetailList.css";
import "../styles/common.css";
import LocaleContext from "../context/LocaleContext"; // LocaleContext import
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function PlotDetailList() {
  const { plotList, setPlotList } = useContext(LocaleContext);
  const [toggleOn, setToggleOn] = useState(false);

  useEffect(() => {
    console.log(plotList);
  }, []);

  return (
    <div id="plotDetailList" className="no_scroll">
      {plotList.map((d, i) => (
        <PlotDetailCard key={i} info={d} id={i}></PlotDetailCard>
      ))}
    </div>
  );
}

function PlotDetailCard({ id, info }) {
  return (
    <>
      <div id={info.id} className="plotDetailCard">
        <div className="header d-flex">
          <div className="title heading_1 ft_gray_3">{info.email}</div>
          <div className="tag label_1 ft_gray_6">소설</div>
        </div>
        <div className="body d-flex">
          <div className="contents body_1 ft_gray_5">{info.body}</div>
          <div className="body_2 ft_gray_94">2024.12.14</div>
        </div>
      </div>
    </>
  );
}

export default PlotDetailList;
