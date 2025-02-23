import { RouterProvider, useRoutes } from "react-router-dom";
import root from "./routes/root.jsx";
import "./styles/common.css";
function App() {

  return (
  <RouterProvider route={root} />
  )
}

export default App;
