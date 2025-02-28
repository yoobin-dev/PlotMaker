import "../styles/plotPromptRight.css";
import "../styles/common.css";
import "../styles/plotButton.css";
import PlotButton from "./PlotButton";

function PlotPromptRight() {
  return (
    <div id="plotPromptRightBox">
      <PlotPromptResult></PlotPromptResult>
      <div id="promptBtnBox">
        <PlotButton
          name="다시쓰기"
          caption="작품을 다시 써볼래요."
          color="black"
        ></PlotButton>
        <PlotButton
          name="저장하기"
          caption="플롯메이커에 저장하기"
          color="white"
        ></PlotButton>
        <PlotButton
          name="내보내기"
          caption="작품을 파일로 저장하기"
          color="white"
        ></PlotButton>
      </div>
    </div>
  );
}

function PlotPromptResult() {
  return (
    <div
      id="plotPromptResult"
      className="shadow_gray_30 body_main ft_black h-100 no_scroll"
    >
      <div id="plotPromptResultTitle">소설 01</div>
      <div id="plotPromptResultContents">
        내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.
        내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.
        내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.
        내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.
        내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.
        내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.
        내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.
        내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.
        내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.
        내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.
        내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.
        내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.
        내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.
        내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.
      </div>
    </div>
  );
}

export default PlotPromptRight;
