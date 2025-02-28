function PlotButton({ icon, name, caption, color, isDetail }) {
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
    <div
      className={`promptBtn ${bgColor} ${name === "내보내기" ? "dashed" : ""} ${
        isDetail ? "bigSize" : ""
      }`}
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
