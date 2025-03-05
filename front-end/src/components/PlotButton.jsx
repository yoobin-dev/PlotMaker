import { useNavigate } from "react-router-dom";

function PlotButton({
  icon,
  name,
  caption,
  color,
  isDetail,
  promptValues,
  makePlotPrompt,
  isContinue,
}) {
  const navigate = useNavigate();

  // 버튼 색상에 따른 배경과 폰트색
  let bgColor = "";
  let ftColor = "";

  if (color === "white") {
    bgColor = "bg_white";
    ftColor = "ft_black";
  } else {
    bgColor = "bg_gray_1";
    ftColor = "ft_white";
  }

  const handlePlotButton = async () => {
    if (name === "다시쓰기") {
      makePlotPrompt();
    } else if (name === "저장하기") {
      const modal = document.getElementById("plotInsertModalBackground");
      modal.classList.remove("d-none");
    } else if (name === "내보내기") {
      alert("서비스 준비중입니다.");
    } else if (name == "이어쓰기") {
      if (isDetail) {
        const modal = document.getElementById("confirmModalBackground");
        modal.classList.remove("d-none");
      }
    }
  };
  console.log(name);
  console.log(isContinue ? "true" : "false");
  return (
    <div
      className={`promptBtn ${bgColor} 
      ${name === "내보내기" ? "dashed" : ""} 
      ${isDetail ? "bigSize" : ""} 
      ${!isContinue && name === "다시쓰기" ? "d-none" : ""}
      ${isContinue ? "w-33" : ""}`}
      onClick={handlePlotButton}
    >
      <div className="promptBtnIcon">
        <img src={icon}></img>
      </div>
      <div className={`promptBtnText ${ftColor}`}>
        <div className="promptBtnName heading_1">{name}</div>
        <div className="promptBtnCaption body_1">{caption}</div>
      </div>
    </div>
  );
}

export default PlotButton;
