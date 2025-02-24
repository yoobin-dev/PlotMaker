import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import NaverCallbackPage from "../pages/NaverCallbackPage";
import PlotPromptPage from "../pages/PlotPromptPage";

const root = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/login/callback/naver",
    element: <NaverCallbackPage />,
  },
  {
    path: "/prompt",
    element: <PlotPromptPage />,
  },
]);

export default root;
