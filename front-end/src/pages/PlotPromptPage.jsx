import "../styles/PlotPromptPage.css";
import PlotPromptLeft from "../components/PlotPromptLeft";
import PlotPromptRight from "../components/PlotPromptRight";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PlotInsertModal from "../components/modal/PlotInsertModal";

function PlotPromptPage() {
  const location = useLocation();
  const [fadeIn, setFadeIn] = useState(false);
  const [create, setCreate] = useState(false);

  useEffect(() => {
    if (location.state?.fadeIn) {
      setFadeIn(true);
    }
  }, [location.state]);

  return (
    <div id="plotPromptPage" className={`${fadeIn ? "fade-in" : ""}`}>
      <PlotInsertModal></PlotInsertModal>
      <PlotPromptLeft setCreate={setCreate}></PlotPromptLeft>
      <PlotPromptRight create={create}></PlotPromptRight>
    </div>
  );
}

export default PlotPromptPage;
