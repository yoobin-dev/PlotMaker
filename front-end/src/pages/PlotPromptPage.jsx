import "../styles/plotPromptPage.css";
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
  const [promptValues, setPromptValues] = useState({
    categoryCode: "",
    category: "",
    genreCode: "",
    genre: "",
    timeframeCode: "",
    timeframe: "",
    themeCode: "",
    theme: "",
    event: "",
    tellType: "",
    custom: "",
    isPublic: "",
  });

  useEffect(() => {
    if (location.state?.fadeIn) {
      setFadeIn(true);
    }
  }, [location.state]);

  return (
    <>
      <PlotInsertModal
        promptValues={promptValues}
        setPromptValues={setPromptValues}
      ></PlotInsertModal>
      <div id="plotPromptPage" className={`${fadeIn ? "fade-in" : ""}`}>
        <PlotPromptLeft
          setCreate={setCreate}
          promptValues={promptValues}
          setPromptValues={setPromptValues}
        ></PlotPromptLeft>
        <PlotPromptRight
          create={create}
          setCreate={setCreate}
          promptValues={promptValues}
          setPromptValues={setPromptValues}
        ></PlotPromptRight>
      </div>
    </>
  );
}

export default PlotPromptPage;
