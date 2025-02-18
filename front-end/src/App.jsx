import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "./styles/reset.css";
import "./styles/common.css";
import Profile from "./components/Profile";
import SideMenuList from "./components/SideMenuList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <SideMenuList></SideMenuList>
    </BrowserRouter>
  );
}

export default App;
