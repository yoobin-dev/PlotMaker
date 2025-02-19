import { useEffect, useState } from "react";
import "../styles/toggleMenu.css";

// 정렬 토글 메뉴
export function PlotCardTitleToggle({ toggleOn }) {
  return (
    <>
      <div className="plotCardTitleToggle">
        <img src="/burger.png"></img>
      </div>
      <div
        className={`toggleMenuBox shadow_black_10 ${toggleOn ? "" : "d-none"}`}
      >
        <div className="toggleMenuHeader heading_1 ft_gray_5">작품 정렬</div>
        <div className="toggleMenuBody w-100">
          {sortingArr.map((d) => (
            <div key={`${d.sort}_${d.order}`} className="d-flex toggleMenuItem">
              <div className="toggleIconBox">
                <img className="toggleIcon" src={`sort_${d.sort}.png`}></img>
              </div>
              <span className="body_1 ft_gray_5">{d.text}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
