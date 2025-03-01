import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PlotBoard() {
  const navigate = useNavigate;
  useEffect(() => {
    navigate("/welcome");
  }, []);
  return (
    <>
      <div></div>
    </>
  );
}

export default PlotBoard;
