import { useLayoutEffect, useRef } from "react";
import "../styles/plotTag.css";

function PlotTag({ name, color, width }) {
  return <div className={`plotTag bg_${color}_s ft_${color}_m`}>{name}</div>;
}
export default PlotTag;
