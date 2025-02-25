import "../styles/plotPromptLeft.css";
import { useEffect, useState } from "react";
import Select from "react-select";

function PlotPromptProgressBar({ percent }) {
  return (
    <div id="progressBox">
      <div
        id="progressBar"
        className={`headline_1 ft_white`}
        style={{ width: `${30 + percent}%` }}
      >
        {Math.round(percent) === 100
          ? "작성 완료"
          : `${Math.round(percent)}% 작성중`}
      </div>
    </div>
  );
}

function PlotPromptSelect({ plotDetail, handleSelect, handleOption }) {
  const options = [
    { value: "chocolate", label: "Chocolate", style: { color: "red" } },
    { value: "strawberry", label: "Strawberry", style: { color: "red" } },
    { value: "vanilla", label: "Vanilla", style: { color: "red" } },
  ];

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      border: "1px solid #222", // 테두리 색상 #222
      boxShadow: "none", // 기본 box-shadow 제거
      "&:hover": {
        border: "1px solid rgba(0,0,0,0.2)", // hover 시 테두리 색상 변경
      },
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isDisabled
        ? "red"
        : isSelected
        ? "rgba(0,0,0,0.2)" // 선택된 항목 배경색
        : isFocused
        ? "rgba(0,0,0,0.1)" // hover 시 배경색
        : "white",
      color: "#222", // 텍스트 색상
      cursor: isDisabled ? "not-allowed" : "default",
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0.2)", // hover 시 배경색 변경
      },
    }),
  };

  return (
    <>
      <Select options={options} style={colourStyles}></Select>
    </>
  );
  // return (
  //   <>
  //     <div
  //       id={`select_${plotDetail.id}`}
  //       className="promptInputSelect heading_1 ft_gray_5"
  //       onClick={(e) => handleSelect(plotDetail.id)}
  //     >
  //       <span>(분류)</span>
  //     </div>
  //     <div
  //       id={`option_${plotDetail.id}`}
  //       className="promptInputOptionBox d-none"
  //     >
  //       {plotDetail.contents.map((el, idx) => (
  //         <div
  //           key={idx}
  //           id={`option_${plotDetail.id}_${idx}`}
  //           className="promptInputOption"
  //           onClick={() => handleOption(plotDetail.id, idx)}
  //         >
  //           <input value={el} className="heading_1 ft_gray_3" readOnly></input>
  //         </div>
  //       ))}
  //     </div>
  //   </>
  // );
}

function PlotPromptInputBox({
  promptDetail,
  handleSkip,
  handleSelect,
  handleOption,
  percent,
}) {
  return (
    <div id="plotPromptBox" className="shadow_gray_30 no_scroll">
      {promptDetail.map((d) => (
        <div key={d.id} className="plotPromptBoxInner">
          <div className="promptTitle ">
            <div className="title_3 ft_gray_2 d-flex">
              <div className={`promptColor ${d.color}`}></div>

              <span id={`write_title_${d.id}`} className="">
                {d.title}
                {d.extra}
              </span>

              <span id={`skip_title_${d.id}`} className="d-none">
                {d.title}은(는) 플롯메이커가 정해드릴게요.
              </span>
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
              className={`promptTitleSkip ${
                d.id === "category" ? "d-none" : ""
              }`}
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

      <div id="plotPromptFooter" className={`title_1 ft_white`}>
        <div
          id="makePlotBtn"
          className={`makePlotBtn ${percent > 99 ? "activation" : ""}`}
        >
          작품 만들기
        </div>
      </div>
    </div>
  );
}

function PlotPromptLeft() {
  const promptDetailObj = [
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
      contents: ["일상", "회귀", "빙의", "환생", "시간여행", "+ 직접 입력"],
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

  const [percent, setPercent] = useState(0);
  const [promptDetail, setPromptDetail] = useState(promptDetailObj);

  // 스킵 버튼 클릭
  const handleSkip = (isSkip, btnId) => {
    setTimeout(() => {
      const skipBtn = document.getElementById(`skip_${btnId}`);
      const writeBtn = document.getElementById(`write_${btnId}`);
      const promptInput = document.getElementById(`prompt_${btnId}`);

      // 프로그레스바를 위한 요소
      const select = document.getElementById(`select_${btnId}`);
      const option = document.getElementById(`option_${btnId}`);

      // 스킵 선택 시 바뀌는 제목
      const writeTitle = document.getElementById(`write_title_${btnId}`);
      const skipTitle = document.getElementById(`skip_title_${btnId}`);

      if (isSkip) {
        skipBtn.classList.add("d-none");
        promptInput.classList.add("d-none");
        writeBtn.classList.remove("d-none");
        writeTitle.classList.add("d-none");
        skipTitle.classList.remove("d-none");

        // 스킵 시 옵션 선택한걸로 간주함 (고유설정 제외)
        if (
          percent <= 100 &&
          !option.classList.contains("selected") &&
          btnId !== "custom"
        ) {
          setPercent((prev) => Math.min(prev + 100 / 7, 100));
          option.classList.add("selected");
        }
      } else {
        skipBtn.classList.remove("d-none");
        promptInput.classList.remove("d-none");
        writeBtn.classList.add("d-none");
        writeTitle.classList.remove("d-none");
        skipTitle.classList.add("d-none");
        // 스킵 취소 시 옵션 선택 안한 걸로 간주함
        if (
          percent <= 100 &&
          option.classList.contains("selected") &&
          btnId !== "custom"
        ) {
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

    console.log(id);

    if (percent <= 100 && !option.classList.contains("selected")) {
      setPercent((prev) => Math.min(prev + 100 / 7, 101));
    }

    // 선택된 값으로 보여주기
    select.innerText = input.value;
    select.classList.remove("d-none");
    // 옵션 숨기기
    option.classList.add("d-none");
    // 선택된 옵션 체크
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
        percent={percent}
      ></PlotPromptInputBox>
    </div>
  );
}

export default PlotPromptLeft;
