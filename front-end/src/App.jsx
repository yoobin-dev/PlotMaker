import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./styles/common.css";
import "./styles/App.css";
import SideMenuList from "./components/SideMenuList";
import PlotListBox from "./components/PlotListBox";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex h-100">
        <SideMenuList nickName="CSS가 어려운 사람"></SideMenuList>
        <PlotListBox></PlotListBox>
      </div>
    </BrowserRouter>
  );
}

export default App;
