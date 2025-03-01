import "../../styles/modal/PlotInsertModal.css";
import { useEffect, useState } from "react";
import { savePlot } from "../../api/plotApi";

function PlotInsertModal({ promptValues, setPromptValues }) {
  const [step, setStep] = useState("title");
  const [plotTitle, setPlotTitle] = useState("");

  useEffect(() => {
    if (step === "folder") {
      const save = async () => {
        const result = await savePlot("1", promptValues);
      };
      save();

      // 폴더 고도화 시 삭제
      const bg = document.getElementById("plotInsertModalBackground");
      bg.classList.add("d-none");
    }
    setPlotTitle("");
  }, [step]);
  return (
    <div id="plotInsertModalBackground" className="d-none">
      <div id="plotInsertModal">
        {step === "title" ? (
          <PlotInsertTitle
            setStep={setStep}
            plotTitle={plotTitle}
            setPlotTitle={setPlotTitle}
            promptValues={promptValues}
            setPromptValues={setPromptValues}
          ></PlotInsertTitle>
        ) : step === "public" ? (
          <PlotInsertPublic
            setStep={setStep}
            promptValues={promptValues}
            setPromptValues={setPromptValues}
          ></PlotInsertPublic>
        ) : (
          // step === "folder" ? (
          //   <PlotInsertFolder
          //     setStep={setStep}
          //     promptValues={promptValues}
          //     setPromptValues={setPromptValues}
          //   ></PlotInsertFolder>
          // ) :
          <PlotInsertTitle
            setStep={setStep}
            plotTitle={plotTitle}
            setPlotTitle={setPlotTitle}
            promptValues={promptValues}
            setPromptValues={setPromptValues}
          ></PlotInsertTitle>
        )}
      </div>
    </div>
  );
}

function PlotInsertTitle({
  setStep,
  plotTitle,
  setPlotTitle,
  promptValues,
  setPromptValues,
}) {
  console.log(plotTitle);
  const stepAfterTitle = () => {
    const title = document.getElementById("title_name");
    setPromptValues((prev) => ({ ...prev, title: title.value }));
    setStep("public");
  };

  const closeModal = () => {
    const bg = document.getElementById("plotInsertModalBackground");
    bg.classList.add("d-none");
  };

  const handleTitle = (e) => {
    setPlotTitle(e.target.value);
  };

  return (
    <>
      <div className="title heading_1">작품의 제목을 입력해주세요.</div>
      <div className="body">
        <input
          id="title_name"
          className="heading_1"
          value={plotTitle}
          onChange={handleTitle}
        ></input>
        <span className="caption_1 ft_gray_94" style={{ marginLeft: "12px" }}>
          {plotTitle.length}/50
        </span>
      </div>
      <div className="footer label_1">
        <button className="blackBtn" onClick={stepAfterTitle}>
          다음
        </button>
        <button className="whiteBtn" onClick={closeModal}>
          취소
        </button>
      </div>
    </>
  );
}

function PlotInsertPublic({ setStep, promptValues, setPromptValues }) {
  const stepAfterPublic = (isPublic) => {
    setPromptValues((prev) => ({ ...prev, isPublic: isPublic }));
    setStep("folder");
  };

  return (
    <>
      <div className="title heading_1">공개 설정</div>
      <div className="body">
        <div className="option body_1" onClick={() => stepAfterPublic("Y")}>
          공개
        </div>
        <div className="option body_1" onClick={() => stepAfterPublic("N")}>
          비공개
        </div>
      </div>
      <div className="footer">
        <button className="whiteBtn" onClick={() => setStep("title")}>
          이전
        </button>
      </div>
    </>
  );
}

function PlotInsertFolder({ setStep, promptValues, setPromptValues }) {
  const stepAfterPublic = () => {
    // setStep("name");
    const modal = document.getElementById("plotInsertModalBackground");
    modal.classList.add("d-none");
  };

  return (
    <>
      <div className="title heading_1">저장 경로</div>
      <div className="body">
        <div className="option body_1" onClick={stepAfterPublic}>
          경로를 지정하지 않고 저장하기
        </div>
        <div className="body_1 ft_gray_9" style={{ padding: "0 12px" }}>
          + 폴더별 저장 기능 지원 예정입니다.
        </div>
      </div>
      <div className="footer">
        <button className="whiteBtn" onClick={() => setStep("public ")}>
          이전
        </button>
      </div>
    </>
  );
}

export default PlotInsertModal;
