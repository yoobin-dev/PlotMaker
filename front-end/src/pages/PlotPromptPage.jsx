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
  // 상세 페이지에서 이어쓰기 할 경우 가져온 promptValues
  const [isContinue, setIsContinue] = useState(location.state);

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
          isContinue={isContinue}
        ></PlotPromptLeft>
        <PlotPromptRight
          create={create}
          setCreate={setCreate}
          promptValues={promptValues}
          setPromptValues={setPromptValues}
          isContinue={isContinue}
        ></PlotPromptRight>
      </div>
    </>
  );
}

export default PlotPromptPage;
