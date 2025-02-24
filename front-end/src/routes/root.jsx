import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import NaverCallbackPage from "../pages/NaverCallbackPage";
import PlotPromptPage from "../pages/PlotPromptPage";
import Layout from "../layouts/Layout";

const root = createBrowserRouter(
  [
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/login/callback/naver',
      element: <NaverCallbackPage />
    },
    {
      path: '',
      element: <Layout />,
      children: [
        {
          path: '/prompt',
          element: <PlotPromptPage />
        }
      ]
    }
  ]
)

export default root;