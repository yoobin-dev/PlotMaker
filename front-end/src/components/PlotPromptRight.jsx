import "../styles/plotPromptRight.css";
import "../styles/common.css";
import "../styles/plotButton.css";
import PlotButton from "./PlotButton";
import { useEffect } from "react";
import { makePlot } from "../api/plotApi";

function PlotPromptRight({ create, setCreate, promptValues, setPromptValues }) {
  const buildPlot = () => {
    // 로딩이미지 실행
    if (create) {
      // 접근 이미지
      const loadingAccess = document.getElementById("plotPromptLoadingAccess");
      loadingAccess.classList.add("d-none");

      // 응답 대기 이미지
      const loadingWaiting = document.getElementById(
        "plotPromptLoadingWaiting"
      );
      loadingWaiting.classList.remove("d-none");
    }
    // 생성 완료 후 실행
    if (create === "finish") {
      // 플롯 내용 (2초 소요됨)
      const plotPromptResult = document.getElementById("plotPromptResult");
      plotPromptResult.classList.remove("goUp");
      plotPromptResult.classList.add("goDown");
      const plotPromptButton = document.getElementById("promptBtnBox");
      plotPromptButton.classList.remove("d-none");
    }
    // 다시 쓰기
    if (create === "reWrite") {
      // 플롯 내용 (1초 소요됨)
      const plotPromptResult = document.getElementById("plotPromptResult");
      plotPromptResult.classList.remove("goDown");
      plotPromptResult.classList.add("goUp");
      const plotPromptButton = document.getElementById("promptBtnBox");
      plotPromptButton.classList.add("d-none");
    }
  };

  // 플롯 생성하기
  const makePlotPrompt = async (e) => {
    setCreate("reWrite");
    const plotTitle = document.getElementById("plotPromptResultTitle");
    const plotContent = document.getElementById("plotPromptResultContents");
    const returnData = await makePlot(promptValues);
    setPromptValues(returnData);
    plotContent.innerText = returnData.plotContent;
    plotTitle.innerText = returnData.category;
    setCreate("finish");
  };

  useEffect(() => {
    buildPlot();
  });

  return (
    <div id="plotPromptRightBox">
      <PlotPromptResult></PlotPromptResult>
      <div id="promptBtnBox" className="d-none">
        <PlotButton
          name="다시쓰기"
          caption="작품을 다시 써볼래요."
          color="black"
          icon="recycle_white.png"
          promptValues={promptValues}
          makePlotPrompt={makePlotPrompt}
        ></PlotButton>
        <PlotButton
          name="저장하기"
          caption="플롯메이커에 저장하기"
          color="white"
          icon="save_black.svg"
          promptValues={promptValues}
        ></PlotButton>
        <PlotButton
          name="내보내기"
          caption="작품을 파일로 저장하기"
          color="white"
          icon="export_medium.svg"
          promptValues={promptValues}
        ></PlotButton>
      </div>
    </div>
  );
}

function PlotPromptResult() {
  return (
    <>
      <div
        id="plotPromptResult"
        className="shadow_gray_30 body_main ft_black h-100 no_scroll"
      >
        <div id="plotPromptResultTitle">소설 01</div>
        <div id="plotPromptResultContents">
          내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.
          내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.
          내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.니다.내용입니다.내용입니다.내용입니다.
        </div>
      </div>
      <div id="plotPromptLoadingAccess" className="">
        <img src="loading_prompt_acess.gif" className="access"></img>
      </div>
      <div id="plotPromptLoadingWaiting" className="d-none">
        <img src="loading_prompt_waiting.gif"></img>
        <span className="title_3 ft_black">
          플롯 메이커가 내용을 채우는 중...
        </span>
      </div>
    </>
  );
}

export default PlotPromptRight;
