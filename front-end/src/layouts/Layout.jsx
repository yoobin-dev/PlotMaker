import SideMenuList from "../components/SideMenuList";
import Main from "./Main";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  });

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <>
      <div className="d-flex h-100">
        <SideMenuList handleClick={handleClick} />
        <Main>{isLoading ? <Loading></Loading> : <Outlet />}</Main>
      </div>
    </>
  );
};

export default Layout;
