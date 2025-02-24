import SideMenuList from "../components/SideMenuList";
import Main from "./Main";
import { Outlet } from "react-router-dom";

const Layout = () => {

  return (
    <>
      <div className="d-flex h-100">
        <SideMenuList />
        <Main>
          <Outlet />
        </Main>
      </div>
    </>
  )

}

export default Layout;