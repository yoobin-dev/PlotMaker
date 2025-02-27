import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import NaverCallbackPage from "../pages/NaverCallbackPage";
import PlotPromptPage from "../pages/PlotPromptPage";
import PlotListPage from "../pages/PlotListPage";
import PlotDetailPage from "../pages/PlotDetailPage";
import Layout from "../layouts/Layout";
import NicknamePage from "../pages/NicknamePage";
import WelcomePage from "../pages/WelcomePage";

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
    path: "/login/nickname",
    element: <NicknamePage />,
  },
  {
    path: "/welcome",
    element: <WelcomePage />,
  },
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/prompt",
        element: <PlotPromptPage />,
      },
      {
        path: "/plotList",
        element: <PlotListPage />,
      },
      {
        path: "/plotDetail",
        element: <PlotDetailPage />,
      },
    ],
  },
]);

export default root;
