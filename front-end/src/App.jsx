import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./styles/common.css";
import "./styles/App.css";
import SideMenuList from "./components/SideMenuList";
import PlotListPage from "./pages/PlotListPage";
import PlotPromptPage from "./pages/PlotPromptPage";

function App() {
  return (
    <BrowserRouter>
      <div id="" className="d-flex h-100">
        <SideMenuList nickName="CSS가 어려운 사람"></SideMenuList>
        {/* <PlotListPage></PlotListPage> */}
        <PlotPromptPage></PlotPromptPage>
        {/* modalOn 클래스 부여하면 모달 배경 깔림 */}
        <div id="modalBackground" className="bg_black_hover"></div>
      </div>
    </BrowserRouter>
  );
}

export default App;
