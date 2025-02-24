import "../styles/plotPromptRight.css";
import "../styles/common.css";
function PlotPromptRight() {
  return (
    <div id="plotPromptRightBox">
      <PlotPromptResult></PlotPromptResult>
      <div id="promptBtnBox">
        <PlotPromptButton
          name="다시쓰기"
          caption="작품을 다시 써볼래요."
          color="black"
        ></PlotPromptButton>
        <PlotPromptButton
          name="저장하기"
          caption="플롯메이커에 저장하기"
          color="white"
        ></PlotPromptButton>
        <PlotPromptButton
          name="내보내기"
          caption="작품을 파일로 저장하기"
          color="white"
        ></PlotPromptButton>
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

function PlotPromptButton({ icon, name, caption, color }) {
  let bgColor = "";
  let ftColor = "";

  if (color === "white") {
    bgColor = "bg_white";
    ftColor = "ft_black";
  } else {
    bgColor = "bg_gray_1";
    ftColor = "ft_white";
  }

  return (
    <div className={`promptBtn  ${bgColor}`}>
      <div className="promptBtnIcon"></div>
      <div className={`promptBtnText ${ftColor}`}>
        <div className="promptBtnName heading_1">{name}</div>
        <div className="promptBtnCaption body_1">{caption}</div>
      </div>
    </div>
  );
}

export default PlotPromptRight;
