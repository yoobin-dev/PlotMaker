import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./styles/common.css";
import SideMenuList from "./components/SideMenuList";
import PlotHeader from "./components/PlotHeader";

function App() {
  const [count, setCount] = useState(0);
  const [plotCount, setPlotCount] = useState(0);

  return (
    <BrowserRouter>
      <div className="d-flex h-100">
        <SideMenuList nickName="CSS가 어려운 사람"></SideMenuList>
        <PlotHeader plotCount={plotCount}></PlotHeader>
      </div>
    </BrowserRouter>
  );
}

export default App;
