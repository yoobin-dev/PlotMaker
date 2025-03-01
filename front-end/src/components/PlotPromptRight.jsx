import "../styles/plotPromptRight.css";
import "../styles/common.css";
import "../styles/plotButton.css";
import PlotButton from "./PlotButton";
import { useEffect } from "react";

function PlotPromptRight({ create }) {
  const buildPlot = () => {
    if (create) {
      // 플롯 내용 (2초 소요됨)
      const plotPromptResult = document.getElementById("plotPromptResult");
      plotPromptResult.classList.add("goDown");

      // 접근 이미지
      const loadingAccess = document.getElementById("plotPromptLoadingAccess");

      // 응답 대기 이미지
      const loadingWaiting = document.getElementById(
        "plotPromptLoadingWaiting"
      );
      // loadingWaiting.classList.remove("d-none");
    }
  };

  useEffect(() => {
    buildPlot();
  });

  return (
    <div id="plotPromptRightBox">
      <PlotPromptResult></PlotPromptResult>
      <div id="promptBtnBox">
        <PlotButton
          name="다시쓰기"
          caption="작품을 다시 써볼래요."
          color="black"
          icon="recycle_white.png"
        ></PlotButton>
        <PlotButton
          name="저장하기"
          caption="플롯메이커에 저장하기"
          color="white"
          icon="save_black.svg"
        ></PlotButton>
        <PlotButton
          name="내보내기"
          caption="작품을 파일로 저장하기"
          color="white"
          icon="export_medium.svg"
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
