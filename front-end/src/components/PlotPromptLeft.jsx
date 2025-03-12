import "../styles/plotPromptLeft.css";
import { useEffect, useState } from "react";
import Select from "react-select";
import { getPromptCode, makePlot, writeNextPlot } from "../api/plotApi";

// 직접 입력할 프롬프트
const textPrpt = ["event", "tellType", "custom"];

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

function PlotPromptSelect({
  plotDetail,
  promptValues,
  handleSelect,
  handleTextarea,
}) {
  let prptValue = {
    id: plotDetail.id,
    value: promptValues[plotDetail.id + "Code"],
    label: promptValues[plotDetail.id],
  };

  let options = [];
  // select2에 사용하기 위한 options 객체로 만들기
  for (let opt of plotDetail.contents) {
    let optObj = {
      id: plotDetail.id,
      value: opt.value,
      label: opt.label,
    };
    options.push(optObj);
  }

  return (
    <>
      <Select
        id={`select_${plotDetail.id}`}
        values={prptValue}
        options={options}
        className={`react-select-container ${
          // 문체, 성격, 고유 설정은 select없이 textarea 노출
          textPrpt.includes(plotDetail.id) ? "d-none" : ""
        }`}
        classNamePrefix="react-select"
        placeholder="(분류)"
        onChange={(e) => handleSelect(e)}
      ></Select>

      <textarea
        id={`textarea_${plotDetail.id}`}
        className={`promptTextarea heading_1 ${
          // 문체, 성격, 고유 설정은 select없이 textarea 노출
          textPrpt.includes(plotDetail.id) ? "" : "d-none"
        }`}
        values={prptValue || ""}
        maxLength={100}
        onChange={(e) => {
          handleTextarea(e);
        }}
      ></textarea>
      <div
        id={`textarea_${plotDetail.id}_length`}
        className={`lengthGuide label_1 ft_gray_94 ${
          // 문체, 성격, 고유 설정은 select없이 textarea 노출
          textPrpt.includes(plotDetail.id) ? "" : "d-none"
        }`}
      >
        {prptValue?.length}/100자
      </div>
    </>
  );
}

function PlotPromptInputBox({
  promptDetail,
  handleSkip,
  handleSelect,
  handleTextarea,
  percent,
  promptValues,
  setPromptValues,
  setReturnData,
  makePlotPrompt,
  isContinue,
}) {
  // ${isContinue ? "d-none" : ""}
  return (
    <div id="plotPromptBox" className={`shadow_gray_30 no_scroll`}>
      {promptDetail.map((d) => (
        <div key={d.id} className={`plotPromptBoxInner`}>
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
              className={`promptTitleSkip lable_1 ${
                d.id === "category" ? "d-none" : ""
              }`}
              onClick={() => {
                handleSkip(true, `${d.id}`);
              }}
            >
              Skip <img src="play.png"></img>
            </div>
          </div>
          <div id={`prompt_${d.id}`}>
            <div className={`promptInput`}>
              <PlotPromptSelect
                plotDetail={d}
                promptValues={promptValues}
                handleSelect={handleSelect}
                handleTextarea={handleTextarea}
                isContinue={isContinue}
              ></PlotPromptSelect>
            </div>
          </div>
        </div>
      ))}

      <div id="plotPromptFooter" className={`title_1 ft_white`}>
        <div
          id="makePlotBtn"
          className={`makePlotBtn ${percent > 99 ? "activation" : ""}`}
          onClick={(e) => {
            makePlotPrompt(e);
          }}
        >
          작품 만들기
        </div>
      </div>
    </div>
  );
}

function PlotPromptLeft({
  setCreate,
  promptValues,
  setPromptValues,
  setReturnData,
  isContinue,
}) {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const promptDetailObj = [
    {
      id: "category",
      title: "작품의 분류",
      extra: "를 선택해주세요.",
      color: "bg_gray_6",
      contents: [],
    },
    {
      id: "genre",
      title: "작품의 장르",
      extra: "를 선택하거나 입력해주세요.",
      color: "bg_blue_m",
      contents: [],
    },
    {
      id: "timeframe",
      title: "작품의 시대, 배경",
      extra: "을 선택하거나 입력해주세요.",
      color: "bg_yellow_m",
      contents: [],
    },
    {
      id: "theme",
      title: "작품의 테마",
      extra: "를 선택하거나 입력해주세요.",
      color: "bg_red_m",
      contents: [],
    },
    {
      id: "event",
      title: "작품의 사건",
      extra: "을 입력해주세요.",
      color: "bg_green_m",
      contents: [{ value: "999", label: "+ 직접 입력" }],
    },
    {
      id: "tellType",
      title: "플롯메이커의 성격",
      extra: "을 선택하거나 입력해주세요.",
      color: "bg_mustard_m",
      contents: [{ value: "999", label: "+ 직접 입력" }],
    },
    {
      id: "custom",
      title: "작품 고유한 설정",
      extra: "을 추가할 수 있어요.",
      color: "bg_mint_m",
      contents: [{ value: "999", label: "+ 직접 입력" }],
    },
  ];

  const [percent, setPercent] = useState(0);
  const [promptDetail, setPromptDetail] = useState(promptDetailObj);
  // 선택된 프롬프트 기록 (프로그레스바)
  const [selectedPrompt, setSelectedPrompt] = useState([]);

  // 스킵 버튼 클릭
  const handleSkip = (isSkip, btnId) => {
    setTimeout(() => {
      const skipBtn = document.getElementById(`skip_${btnId}`);
      const writeBtn = document.getElementById(`write_${btnId}`);
      const promptInput = document.getElementById(`prompt_${btnId}`);

      // 스킵 선택 시 바뀌는 제목
      const writeTitle = document.getElementById(`write_title_${btnId}`);
      const skipTitle = document.getElementById(`skip_title_${btnId}`);

      // 스킵 버튼 클릭
      if (isSkip) {
        skipBtn.classList.add("d-none");
        promptInput.classList.add("d-none");
        writeBtn.classList.remove("d-none");
        writeTitle.classList.add("d-none");
        skipTitle.classList.remove("d-none");

        // 스킵 시 옵션 선택한걸로 간주함 (고유설정 제외)
        if (
          percent <= 100 &&
          !promptInput.classList.contains("selected") &&
          btnId !== "custom"
        ) {
          setPercent((prev) => Math.min(prev + 100 / 6, 100));
          setSelectedPrompt((prev) => [...prev, btnId]);
          // 불변성을 유지하여 promptValues 업데이트
          // 스킵시 직접 코드를 직접입력으로 수정
          const resetCode =
            btnId === "genre" ? "G" : btnId === "timeframe" ? "F" : "M";
          setPromptValues((prev) => ({
            ...prev,
            [`${btnId}Code`]: resetCode + "999",
          }));
        }
      }
      // 내가 작성하기 클릭
      else {
        skipBtn.classList.remove("d-none");
        promptInput.classList.remove("d-none");
        writeBtn.classList.add("d-none");
        writeTitle.classList.remove("d-none");
        skipTitle.classList.add("d-none");
        // 스킵 취소 시 선택한 옵션 유지함
        if (
          percent <= 100 &&
          btnId !== "custom" &&
          !promptInput.classList.contains("selected")
        ) {
          setPercent((prev) => Math.min(prev - 100 / 6, 100));
          setSelectedPrompt((prev) => prev.filter((prpt) => prpt !== btnId));
          setPromptValues((prev) => ({
            ...prev,
            [btnId]: prev[btnId].replace("_skip", ""),
          }));
        }
      }
    }, 100);
  };

  // 셀렉트 클릭
  const handleSelect = (e) => {
    const target = document.getElementById(`prompt_${e.id}`);
    const text = document.getElementById(`textarea_${e.id}`);
    const length = document.getElementById(`textarea_${e.id}_length`);

    // 직접 입력 선택한 경우 textarea 노출
    if (e.value.includes("999")) {
      text.classList.remove("d-none");
      length.classList.remove("d-none");
    } else {
      text.classList.add("d-none");
      length.classList.add("d-none");
    }

    // 직접 입력하는 프롬프트를 제외한
    if (!textPrpt.includes(e.value)) {
      // 선택되어 있지 않은 경우 진행상태 증가
      if (percent <= 100 && !target.classList.contains("selected")) {
        setPercent((prev) => Math.min(prev + 100 / 6, 100));
      }
      setSelectedPrompt((prev) => [...prev, e.value]);

      const code = `${e.id}Code`;
      const label = e.label;

      setPromptValues((prev) => ({ ...prev, [code]: e.value }));
      setPromptValues((prev) => ({ ...prev, [e.id]: e.label }));
    }

    // 선택한 프롬프트 체크하기(프로그레스바)
    target.classList.add("selected");
  };

  // 사용자 직접 입력 이벤트
  const handleTextarea = (e) => {
    const id = e.target.id.replace("textarea_", ""); // ID에서 "textarea_" 제거하여 키 값 추출
    const value = e.target.value;

    setPromptValues((prev) => ({
      ...prev, // 기존 데이터 유지
      [id]: value, // 특정 id 값만 업데이트
    }));

    // 글자 수 업데이트
    const length = document.getElementById(`${e.target.id}_length`);
    if (length) {
      length.innerText = `${value.length}/100자`;
    }

    if (textPrpt.includes(id)) {
      // 직접 입력 시 진행률 증가/감소
      const prevLength = promptValues[id] ? promptValues[id].length : 0;
      const newLength = value.length;

      if (prevLength === 0 && newLength > 0) {
        // 처음 입력 시 진행률 증가
        setPercent((prev) => Math.min(prev + 100 / 6, 100));
      } else if (prevLength > 0 && newLength === 0) {
        // 내용 삭제 시 진행률 감소
        setPercent((prev) => Math.max(prev - 100 / 6, 0));
      }
    }
  };

  // 플롯 생성하기
  const makePlotPrompt = async (e) => {
    if (percent < 100) {
      return;
    } else {
      e.target.classList.remove("activation");
      const plotTitle = document.getElementById("plotPromptResultTitle");
      const plotContent = document.getElementById("plotPromptResultContents");
      const plotPromptResult = document.getElementById("plotPromptResult");

      // 우측 화면 작성으로 변경
      setCreate("reWrite");
      const returnData = await makePlot(promptValues);
      setReturnData(returnData);
      plotContent.innerText = returnData.plotContent;
      plotTitle.innerText = returnData.category;
      e.target.innerText = "다시쓰기";
      e.target.classList.add("activation");

      // 우측 화면 작성글 노출로 변경
      setCreate("finish");
    }
  };

  useEffect(() => {
    // 프롬프트 코드 조회
    const getCodeData = async () => {
      const prptdata = await getPromptCode();

      setPromptDetail((prevState) =>
        prevState.map((e) => ({
          ...e,
          contents: e.contents.concat(
            prptdata
              .filter((d) => d.codeType === e.id)
              .map((d) => ({ value: d.code, label: d.codeName }))
          ),
        }))
      );
    };
    getCodeData();

    // 상세에서 이어쓰기 할 경우 즉시 실행
    if (isContinue) {
      // 우측 화면 작성으로 변경
      setCreate(true);
      const continuePlot = async () => {
        const returnData = await writeNextPlot(isContinue.promptSeq);
        setReturnData(returnData);
        const plotTitle = document.getElementById("plotPromptResultTitle");
        const plotContent = document.getElementById("plotPromptResultContents");

        plotContent.innerText = returnData.plotContent;
        plotTitle.innerText = returnData.category;
        // 우측 화면 작성글 노출로 변경
        setCreate("finish");
      };
      continuePlot();
    }
  }, []);

  return (
    <div id="plotPromptLeftBox" className={`${isContinue ? "d-none" : ""}`}>
      <PlotPromptProgressBar percent={percent}></PlotPromptProgressBar>
      <PlotPromptInputBox
        promptDetail={promptDetail}
        handleSkip={handleSkip}
        handleSelect={handleSelect}
        handleTextarea={handleTextarea}
        percent={percent}
        promptValues={promptValues}
        setPromptValues={setPromptValues}
        makePlotPrompt={makePlotPrompt}
        isContinue={isContinue}
      ></PlotPromptInputBox>
    </div>
  );
}

export default PlotPromptLeft;
