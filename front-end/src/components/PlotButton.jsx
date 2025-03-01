function PlotButton({
  icon,
  name,
  caption,
  color,
  isDetail,
  promptValues,
  makePlotPrompt,
}) {
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
    }
  };

  return (
    <div
      className={`promptBtn ${bgColor} ${name === "내보내기" ? "dashed" : ""} ${
        isDetail ? "bigSize" : ""
      }`}
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
