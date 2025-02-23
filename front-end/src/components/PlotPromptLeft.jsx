import "../styles/plotPromptLeft.css";

function PlotPromptProgressBar() {
  return (
    <div id="progressBox">
      <div id="progressBar" className="headline_1 ft_white">
        18% 작성중
      </div>
    </div>
  );
}

function PlotPromptInputBox({ promptDetail }) {
  return (
    <div id="plotPromptBox" className="shadow_gray_30">
      {promptDetail.map((d) => (
        <div key={d.id} className="plotPromptBoxInner">
          <div className="promptTitle ">
            <div className="title_3 ft_gray_2 ">{d.title}</div>
            <div className="promptTitleSkip"></div>
          </div>
          <div className="promptInput">
            <select id={d.id} className="promptInputSelect heading_1 ft_gray_5">
              <option value="">(분류1)</option>
              <option value="">(분류2)</option>
              <option value="">(분류3)</option>
              <option value="">(분류4)</option>
              <option value="">(분류5)</option>
            </select>
          </div>
          <div className="lengthGuide label_1 ft_gray_94">0/100자</div>
        </div>
      ))}
      <div className="addPrompt">+</div>
    </div>
  );
}

function PlotPromptLeft() {
  const promptDetail = [
    {
      id: "category",
      title: "작품의 분류를 선택해주세요.",
    },
    {
      id: "genre",
      title: "작품의 장르를 선택하거나 입력해주세요.",
    },
    {
      id: "timeFrame",
      title: "작품의 시대, 배경을 선택하거나 입력해주세요.",
    },
    {
      id: "theme",
      title: "작품의 테마를 선택하거나 입력해주세요.",
    },
    {
      id: "speech",
      title: "작품의 문제를 선택하거나 입력해주세요.",
    },
    {
      id: "character",
      title: "작품의 등장 인물 수를 선택해주세요.",
    },
    {
      id: "volume",
      title: "작품의 분량 및 전개방식을 선택하거나 입력해주세요.",
    },
    {
      id: "tellType",
      title: "플롯메이커의 성격을 선택하거나 입력해주세요.",
    },
  ];

  return (
    <div id="plotPromptLeftBox">
      <PlotPromptProgressBar></PlotPromptProgressBar>
      <PlotPromptInputBox promptDetail={promptDetail}></PlotPromptInputBox>
    </div>
  );
}

export default PlotPromptLeft;
