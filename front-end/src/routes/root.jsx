import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import NaverCallbackPage from "../pages/NaverCallbackPage";

const root = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/login/callback/naver",
    element: <NaverCallbackPage />,
  },
]);

export default root;
