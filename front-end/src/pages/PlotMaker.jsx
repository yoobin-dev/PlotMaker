import { NavLink } from "react-router-dom";

function PlotMaker() {
  return (
    <nav>
      <NavLink to="/plotList" exact>
        홈
      </NavLink>
      <NavLink to="/newPlot">소개</NavLink>
      <NavLink to="/board">연락처</NavLink>
    </nav>
  );
}

export default PlotMaker;
