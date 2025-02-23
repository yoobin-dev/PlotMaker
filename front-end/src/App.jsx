import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./styles/common.css";
import SideMenuList from "./components/SideMenuList";
import PlotHeader from "./components/PlotHeader";
import LoginPage from "./pages/LoginPage";

function App() {
  const [count, setCount] = useState(0);
  const [plotCount, setPlotCount] = useState(0);

  return (
    <>
      <LoginPage />
    </>
  );
}

export default App;
