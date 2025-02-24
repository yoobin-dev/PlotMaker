import "../styles/plotPromptLeft.css";
import { useEffect, useState } from "react";

function PlotPromptProgressBar({ percent }) {
  return (
    <div id="progressBox">
      <div
        id="progressBar"
        className={`percent_${percent} headline_1 ft_white`}
        style={{ width: `${percent}%` }}
      >
        {Math.round(percent)}% 작성중
      </div>
    </div>
  );
}

function PlotPromptSelect({ plotDetail, handleSelect, handleOption }) {
  if (["character", "volume"].includes(plotDetail.id) && false) {
    return (
      <div className="promptInputSelectDbl">
        <div
          id={`select_${plotDetail.id}`}
          className="promptInputSelect heading_1 ft_gray_5"
        >
          {plotDetail.contents.forEach((el) => {
            <div className="">
              <input value={el}></input>
            </div>;
          })}
        </div>
        <div
          id={`select_${plotDetail.id}`}
          className="promptInputSelect heading_1 ft_gray_5"
        >
          <div>
            {plotDetail.contents.map((el, idx) => (
              <div key={idx}>
                <input value={el}></input>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div
          id={`select_${plotDetail.id}`}
          className="promptInputSelect heading_1 ft_gray_5"
          onClick={(e) => handleSelect(plotDetail.id)}
        >
          (분류)
        </div>
        <div
          id={`option_${plotDetail.id}`}
          className="promptInputOptionBox d-none"
        >
          {plotDetail.contents.map((el, idx) => (
            <div
              key={idx}
              id={`option_${plotDetail.id}_${idx}`}
              className="promptInputOption"
              onClick={() => handleOption(plotDetail.id, idx)}
            >
              <input
                value={el}
                className="heading_1 ft_gray_3"
                readOnly
              ></input>
            </div>
          ))}
        </div>
      </>
    );
  }
}

function PlotPromptInputBox({
  promptDetail,
  handleSkip,
  handleSelect,
  handleOption,
}) {
  return (
    <div id="plotPromptBox" className="shadow_gray_30 no_scroll">
      {promptDetail.map((d) => (
        <div key={d.id} className="plotPromptBoxInner">
          <div className="promptTitle ">
            <div className="title_3 ft_gray_2 d-flex">
              <div className={`promptColor ${d.color}`}></div>
              {d.title}
              {d.extra}
            </div>
            <div
              id={`write_${d.id}`}
              className={`write_${d.id} promptTitleWrite bg_black label_1 ft_white d-none`}
              onClick={() => {
                handleSkip(false, `${d.id}`);
              }}
            >
              내가 작성하기 +
            </div>
            <div
              id={`skip_${d.id}`}
              className={`promptTitleSkip`}
              onClick={() => {
                handleSkip(true, `${d.id}`);
              }}
            ></div>
          </div>
          <div id={`prompt_${d.id}`}>
            <div className="promptInput">
              <PlotPromptSelect
                plotDetail={d}
                handleSelect={handleSelect}
                handleOption={handleOption}
              ></PlotPromptSelect>
            </div>
            <div className="lengthGuide label_1 ft_gray_94">0/100자</div>
          </div>
        </div>
      ))}
      {/* <div className="addPrompt">+</div> */}

      <div id="plotPromptFooter" className="title_1 ft_white ">
        <div id="makePlotBtn">작품 만들기</div>
      </div>
    </div>
  );
}

function PlotPromptLeft() {
  const [percent, setPercent] = useState(0);

  const promptDetail = [
    {
      id: "category",
      title: "작품의 분류",
      extra: "를 선택해주세요.",
      color: "bg_gray_6",
      contents: ["시놉시스(줄거리)", "소설", "대본", "시나리오"],
    },
    {
      id: "genre",
      title: "작품의 장르",
      extra: "를 선택하거나 입력해주세요.",
      color: "bg_blue_m",
      contents: [
        "로맨스",
        "스릴러",
        "판타지",
        "무협",
        "범죄/추리",
        "+ 직접 입력",
      ],
    },
    {
      id: "timeFrame",
      title: "작품의 시대, 배경",
      extra: "을 선택하거나 입력해주세요.",
      color: "bg_yellow_m",
      contents: [
        "SF",
        "아포칼립스",
        "현대 오피스",
        "서양중세물",
        "+ 직접 입력",
      ],
    },
    {
      id: "theme",
      title: "작품의 테마",
      extra: "를 선택하거나 입력해주세요.",
      color: "bg_red_m",
      contents: ["일상", "회쉬", "빙의", "환생", "시간여행", "+ 직접 입력"],
    },
    {
      id: "speech",
      title: "작품의 문체",
      extra: "를 선택하거나 입력해주세요.",
      color: "bg_green_m",
      contents: [
        "1인칭",
        "3인칭",
        "유행어를 많이 사용",
        "고어를 많이 사용",
        "+ 직접 입력",
      ],
    },
    {
      id: "character",
      title: "작품의 등장 인물 수",
      extra: "를 선택해주세요.",
      color: "bg_blue_m",
      contents: [
        "1명",
        "2명",
        "3명",
        "4명",
        "5명",
        "6명",
        "7명",
        "8명",
        "9명",
        "10명",
      ],
    },
    {
      id: "volume",
      title: "작품의 분량 및 전개방식",
      extra: "을 선택하거나 입력해주세요.",
      color: "bg_pink_m",
      contents: ["100화", "200화", "300화"],
      contents_sub: ["속도감  있게", "세밀하게", "섬세한 감정표현"],
    },
    {
      id: "tellType",
      title: "플롯메이커의 성격",
      extra: "을 선택하거나 입력해주세요.",
      color: "bg_mustard_m",
      contents: ["트렌디한", "창의적인", "안정적인"],
    },
    {
      id: "custom",
      title: "작품 고유한 설정",
      extra: "을 추가할 수 있어요.",
      color: "bg_mint_m",
      contents: [],
    },
  ];

  // 스킵 버튼 클릭
  const handleSkip = (isSkip, btnId) => {
    setTimeout(() => {
      const skipBtn = document.getElementById(`skip_${btnId}`);
      const writeBtn = document.getElementById(`write_${btnId}`);
      const promptInput = document.getElementById(`prompt_${btnId}`);

      // 프로그레스바를 위한 요소
      const select = document.getElementById(`select_${btnId}`);
      const option = document.getElementById(`option_${btnId}`);

      if (isSkip) {
        skipBtn.classList.add("d-none");
        promptInput.classList.add("d-none");
        writeBtn.classList.remove("d-none");

        // 스킵 시 옵션 선택한걸로 간주함
        if (percent < 100 && !option.classList.contains("selected")) {
          setPercent((prev) => Math.min(prev + 100 / 7, 100));
          option.classList.add("selected");
        }
      } else {
        skipBtn.classList.remove("d-none");
        promptInput.classList.remove("d-none");
        writeBtn.classList.add("d-none");
        // 스킵 취소 시 옵션 선택 안한 걸로 간주함
        if (percent < 100 && option.classList.contains("selected")) {
          setPercent((prev) => Math.min(prev - 100 / 7, 100));
          option.classList.remove("selected");
          select.innerText = "(분류)";
        }
      }
    }, 100);
  };

  // 셀렉트 클릭
  const handleSelect = (id) => {
    const select = document.getElementById(`select_${id}`);
    const option = document.getElementById(`option_${id}`);

    select.classList.add("d-none");
    option.classList.remove("d-none");
  };

  const handleOption = (id, idx) => {
    const select = document.getElementById(`select_${id}`);
    const option = document.getElementById(`option_${id}`);
    const input = document.querySelector(`#option_${id}_${idx} input`);

    if (percent < 100 && !option.classList.contains("selected")) {
      setPercent((prev) => Math.min(prev + 100 / 7, 100));
    }

    select.innerText = input.value;
    select.classList.remove("d-none");
    option.classList.add("d-none");
    option.classList.add("selected");
  };

  return (
    <div id="plotPromptLeftBox">
      <PlotPromptProgressBar percent={percent}></PlotPromptProgressBar>
      <PlotPromptInputBox
        promptDetail={promptDetail}
        handleSkip={handleSkip}
        handleSelect={handleSelect}
        handleOption={handleOption}
      ></PlotPromptInputBox>
    </div>
  );
}

export default PlotPromptLeft;
